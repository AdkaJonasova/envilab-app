from typing import Optional


class GeoserverException(BaseException):
    """
    A class used to represent a custom exception. This exception is raised when calling a GeoServer endpoint fails.
    Attributes
    ----------
    message
        exception message
    status : int, optional
        status code returned from the failed request
    """
    def __init__(self, message, status: Optional[int] = None):
        self.status = status
        self.message = message
        if status is not None:
            super().__init__(f"Failed with status {self.status} and message: {self.message}")
        else:
            super().__init__(f"Failed with message: {self.message}")
