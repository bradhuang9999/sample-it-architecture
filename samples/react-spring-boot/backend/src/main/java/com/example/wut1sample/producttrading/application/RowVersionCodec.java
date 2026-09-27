package com.example.wut1sample.producttrading.application;

import com.example.wut1sample.shared.error.ConflictException;

/**
 * 將 Database 的 ROW_VERSION 與 API 使用的字串格式互相轉換。
 *
 * <p>SQLite 範例使用遞增整數實作 Optimistic Concurrency。API 仍以字串傳遞，
 * 避免 Frontend 與特定 Database 型別耦合。</p>
 */
public final class RowVersionCodec {

    private RowVersionCodec() {
    }

    public static String encode(long rowVersion) {
        return Long.toString(rowVersion);
    }

    public static long decode(String rowVersion) {
        try {
            long value = Long.parseLong(rowVersion);
            if (value <= 0) {
                throw new NumberFormatException("ROW_VERSION must be positive");
            }
            return value;
        }
        catch (NumberFormatException exception) {
            throw new ConflictException("ROW_VERSION 格式無效，請重新整理資料後再試。");
        }
    }
}
