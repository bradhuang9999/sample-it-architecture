/*
 * Shared 只放跨 Business Module 且穩定的橫切能力。
 * 設為 OPEN 是為了讓各 Module 可使用 error / audit 等共用能力；
 * 不代表可以把 Business Logic 放進 shared。
 */
@org.springframework.modulith.ApplicationModule(
        type = org.springframework.modulith.ApplicationModule.Type.OPEN
)
package com.example.wut1sample.shared;
