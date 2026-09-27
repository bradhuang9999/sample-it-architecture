package com.example.wut1sample.architecture;

import org.junit.jupiter.api.Test;
import org.springframework.modulith.core.ApplicationModules;

import com.example.wut1sample.SampleApplication;

class ArchitectureTest {

    @Test
    void applicationModulesShouldFollowDeclaredBoundaries() {
        ApplicationModules.of(SampleApplication.class).verify();
    }
}
