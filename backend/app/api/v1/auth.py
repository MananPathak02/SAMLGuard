# The Purpose of this file is Register Endpoint and Login Endpoint

from fastapi import APIRouter
from fastapi import Depends
from fastapi import HTTPException

from sqlalchemy.orm import Session

from app.database.session import get_db
from app.models.user import User
from app.schemas.user import UserCreate
from app.schemas.user import UserResponse
from app.security.password import hash_password
from app.schemas.user import UserLogin
from app.schemas.user import Token
from app.security.password import verify_password
from app.security.jwt import create_access_token
from app.models.role import Role

router = APIRouter(
    prefix="/auth",
    tags=["Authentication"]
)


@router.post(
    "/register",
    response_model=UserResponse,
    status_code=201
)
def register_user(
    user: UserCreate,
    db: Session = Depends(get_db)
):

    existing_user = db.query(User).filter(
        User.email == user.email
    ).first()

    if existing_user:
        raise HTTPException(
            status_code=400,
            detail="Email already registered."
        )

    employee_role = db.query(Role).filter(
        Role.name == "Employee"
    ).first()

    if employee_role is None:
        raise HTTPException(
            status_code=500,
            detail="Employee role not found."
        )

    new_user = User(
        first_name=user.first_name,
        last_name=user.last_name,
        email=user.email,
        password_hash=hash_password(user.password),
        department=user.department,
        job_title=user.job_title,
        role_id=employee_role.id,
    )

    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    return new_user

@router.post(
    "/login",
    response_model=Token
)
def login_user(
    user: UserLogin,
    db: Session = Depends(get_db)
):

    existing_user = db.query(User).filter(
        User.email == user.email
    ).first()

    if not existing_user:
        raise HTTPException(
            status_code=401,
            detail="Invalid email or password."
        )

    if not verify_password(
        user.password,
        existing_user.password_hash
    ):
        raise HTTPException(
            status_code=401,
            detail="Invalid email or password."
        )

    access_token = create_access_token(
        data={
            "sub": existing_user.email
        }
    )

    return {
        "access_token": access_token,
        "token_type": "bearer"
    }