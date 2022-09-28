
## init minimal spring boot project

```shell
spring init
```

## Add Backend API capabilities

- https://medium.com/geekculture/jwt-authentication-with-oauth2-resource-server-and-an-external-authorization-server-2b8fd1524fc8


```
spring.security.oauth2.resourceserver.jwt.issuer-uri=http://localhost:9080/realms/acme
spring.security.oauth2.resourceserver.jwt.jwk-set-uri=http://localhost:9080/realms/acme/protocol/openid-connect/certs
```

