from typing import Optional


class GeoserverException(Exception):
    def __init__(self, message, status: Optional[int] = None):
        self.status = status
        self.message = message
        if status is not None:
            super().__init__(f"Failed with status {self.status} and message: {self.message}")
        else:
            super().__init__(f"Failed with message: {self.message}")
