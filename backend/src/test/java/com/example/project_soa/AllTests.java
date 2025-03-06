package com.example.project_soa;

import org.junit.platform.suite.api.IncludeEngines;
import org.junit.platform.suite.api.SelectPackages;
import org.junit.platform.suite.api.Suite;

@Suite
@IncludeEngines("junit-jupiter")
@SelectPackages({"com.example.project_soa.controller", "com.example.project_soa.service"})
public class AllTests {
}
