from pydantic import BaseModel, ConfigDict, StringConstraints
from typing import Annotated


NonEmptyStr = Annotated[str, StringConstraints(strip_whitespace=True, min_length=1)]


class UserBase(BaseModel):
    model_config = ConfigDict(str_strip_whitespace=True)

    first_name: NonEmptyStr
    last_name: NonEmptyStr
    address: NonEmptyStr
    phone_number: NonEmptyStr
    username: NonEmptyStr


class UserCreate(UserBase):
    pass


class UserUpdate(UserBase):
    pass


class UserResponse(UserBase):
    id: int

    class Config:
        from_attributes = True
