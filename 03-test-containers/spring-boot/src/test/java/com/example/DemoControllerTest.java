package com.example;

import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.web.client.TestRestTemplate;

import static org.assertj.core.api.Assertions.assertThat;

public class DemoControllerTest extends AbstractIntegrationTest {

    @Autowired
    TestRestTemplate restTemplate;

    @Autowired
    DemoRepository demoRepository;

    @Test
    public void simpleTest() {
        String fooResource = "/foo";

        restTemplate.put(fooResource, "bar");

        assertThat(restTemplate.getForObject(fooResource, String.class)).as("value is set").isEqualTo("bar");
    }

    @Test
    public void simpleJPATest() {
        DemoEntity demoEntity = new DemoEntity();
        demoEntity.setValue("Some value");
        demoRepository.save(demoEntity);

        DemoEntity result = restTemplate.getForObject("/" + demoEntity.getId(), DemoEntity.class);

        assertThat(result.getValue()).as("value is set").isEqualTo("Some value");
    }

}
