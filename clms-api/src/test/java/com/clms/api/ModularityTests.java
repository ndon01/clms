package com.clms.api;

import org.junit.jupiter.api.Test;
import org.springframework.modulith.core.ApplicationModules;
import org.springframework.modulith.docs.Documenter;

class ModularityTests {
    static ApplicationModules modules = ApplicationModules.of(ClmsApplication.class);

    @Test
    void verifiesModularStructure() {
        for (var m : modules)
            System.out.println(m.getName() + ":" + m.getBasePackage());
        modules.verify();
    }

    @Test
    void createModuleDocumentation() {
        new Documenter(modules).writeDocumentation();
    }
}
