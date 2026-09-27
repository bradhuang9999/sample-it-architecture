from __future__ import annotations

from dataclasses import dataclass


@dataclass(frozen=True)
class EnterpriseApiConfig:
    base_url: str


class EnterpriseApiClient:
    """Enterprise API Boundary 範例。

    目前 Sample 使用 Local SQLite，因此沒有真正呼叫核心系統。
    未來若要取得公司核心資料，應在這個 Boundary 封裝公司核准的 API / SDK，
    不得讓 Feature 直接連 Oracle / SQL Server Core Database。
    """

    def __init__(self, config: EnterpriseApiConfig) -> None:
        self.config = config
