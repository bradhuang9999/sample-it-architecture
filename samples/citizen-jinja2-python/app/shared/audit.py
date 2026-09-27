from __future__ import annotations

import logging
from typing import Any

logger = logging.getLogger("wut1.audit")


def audit(action: str, **fields: Any) -> None:
    """Citizen Sample 的最小 Audit Boundary。

    正式公司平台應由共用 SDK 接手，不應讓每個 Citizen App 自行設計 Audit 格式。
    """
    logger.info("action=%s fields=%s", action, fields)
