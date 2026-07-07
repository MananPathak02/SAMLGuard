# The Role of this File is that it Validates the Request and Validates the Response 

from pydantic import BaseModel, ConfigDict, EmailStr, Field

class RoleResponse(BaseModel):
    id: int
    name: str

    model_config = ConfigDict(from_attributes=True)

class UserCreate(BaseModel):
    first_name: str = Field(..., min_length=2, max_length=100)
    last_name: str = Field(..., min_length=2, max_length=100)
    email: EmailStr
    password: str = Field(..., min_length=8)
    department: str | None = None
    job_title: str | None = None


class UserResponse(BaseModel):
    id: int
    first_name: str
    last_name: str
    email: EmailStr
    department: str | None
    job_title: str | None
    is_active: bool
    is_verified: bool

    role: RoleResponse

    model_config = ConfigDict(from_attributes=True)

class UserLogin(BaseModel):
    email: EmailStr
    password: str


class Token(BaseModel):
    access_token: str
    token_type: str