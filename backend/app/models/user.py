from sqlalchemy import Boolean
from sqlalchemy import Column
from sqlalchemy import DateTime
from sqlalchemy import Integer
from sqlalchemy import String
from sqlalchemy.sql import func
from sqlalchemy import ForeignKey
from sqlalchemy.orm import relationship

from app.database.base import Base


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)

    first_name = Column(String(100), nullable=False)

    last_name = Column(String(100), nullable=False)

    email = Column(String(255), unique=True, nullable=False, index=True)

    password_hash = Column(String(255), nullable=False)

    department = Column(String(100), nullable=True)

    job_title = Column(String(100), nullable=True)

    role_id = Column(
        Integer,
        ForeignKey("roles.id"),
        nullable=False,
        default=3
    )

    is_active = Column(Boolean, default=True)

    is_verified = Column(Boolean, default=False)

    created_at = Column(
        DateTime(timezone=True),
        server_default=func.now()
    )

    updated_at = Column(
        DateTime(timezone=True),
        server_default=func.now(),
        onupdate=func.now()
    )

    last_login = Column(
        DateTime(timezone=True),
        nullable=True
    )

    role = relationship(
    "Role",
    back_populates="users"
    )