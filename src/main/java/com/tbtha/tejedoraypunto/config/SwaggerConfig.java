package com.tbtha.tejedoraypunto.config;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.info.License;
import io.swagger.v3.oas.models.servers.Server;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.List;

@Configuration
public class SwaggerConfig {

    @Value("${server.port:8082}")
    private String serverPort;

    @Bean
    public OpenAPI customOpenAPI() {
        Server server = new Server()
                .url("http://localhost:" + serverPort)
                .description("Servidor de desarrollo");

        Contact contact = new Contact()
                .name("Tejedora y Punto Team")
                .email("contacto@tejedoraypunto.com")
                .url("https://tejedoraypunto.com");

        License license = new License()
                .name("MIT License")
                .url("https://opensource.org/licenses/MIT");

        Info info = new Info()
                .title("Tejedora y Punto API")
                .version("1.0.0")
                .description("API REST para la gestión de productos de tejido, categorías y usuarios de Tejedora y Punto")
                .contact(contact)
                .license(license);

        return new OpenAPI()
                .info(info)
                .servers(List.of(server));
    }
}