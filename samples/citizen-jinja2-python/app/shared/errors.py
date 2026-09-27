class NotFoundError(RuntimeError):
    """找不到指定 Business Entity。"""


class ConflictError(RuntimeError):
    """資料版本衝突，通常代表使用者畫面資料已過期。"""
