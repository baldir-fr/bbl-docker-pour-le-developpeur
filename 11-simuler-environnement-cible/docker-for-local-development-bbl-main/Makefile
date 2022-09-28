all: fullstack

fullstack:
	docker compose up -d

frontend:
	npm --prefix frontend-app-5173 run dev

backend:
	mvn -f backend-api-8081/pom.xml clean spring-boot:run