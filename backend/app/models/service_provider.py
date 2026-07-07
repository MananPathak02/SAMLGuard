from sqlalchemy import Boolean
from sqlalchemy import Column
from sqlalchemy import Integer
from sqlalchemy import String

from app.database.base import Base


class ServiceProvider(Base):
    __tablename__ = "service_providers"

    id = Column(Integer, primary_key=True)

    name = Column(
        String(100),
        unique=True,
        nullable=False
    )

    entity_id = Column(
        String(255),
        unique=True,
        nullable=False
    )

    acs_url = Column(
        String(255),
        nullable=False
    )

    enabled = Column(
        Boolean,
        default=True
    )