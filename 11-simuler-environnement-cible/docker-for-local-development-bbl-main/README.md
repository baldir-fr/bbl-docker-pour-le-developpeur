## TODO

- use vue plugin
- use route guards
- narrow plugin contract (generic interface)
- use vue routes for
  - callback
  - silent-renew
- fix ts typecheck
- vueuse axios?
  - https://vueuse.org/integrations/useAxios/

## Run full docker compose

need to add on your host machine

in `/etc/hosts`
```
127.0.0.1        kubernetes.docker.internal
```

## Run

**Run keycloak server**

```shell
docker compose up -d
# server run on http://kubernetes.docker.internal:8080

# shut down and destroy server
docker compose down
```

Admin console access
- User: admin
- Password: admin

**Run frontend**

```shell
npm --prefix frontend-app-5173 run dev 
# Frontend runs on http://localhost:5173
```

- User: user
- Password: user

**Run Backend API**

```shell
mvn -f backend-api-8081/pom.xml clean spring-boot:run 
```


## Generate docker compose diagram

```shell
docker run --rm -it --name dcv -v $(pwd):/input pmsipilot/docker-compose-viz render -m image docker-compose.yml
```