package com.example.wut1sample.shared.audit;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

/**
 * 提供異動人員代號。
 *
 * <p>Sample 尚未接公司 Keycloak，因此先由設定值提供。
 * 正式系統應改成從已驗證的 Security Principal 取得，不得信任 Frontend 自行傳入使用者代號。</p>
 */
@Component
public class AuditUserProvider {

    private final String defaultUser;

    public AuditUserProvider(@Value("${app.audit.default-user}") String defaultUser) {
        this.defaultUser = defaultUser;
    }

    public String currentUser() {
        return defaultUser;
    }
}
