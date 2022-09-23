all: 01-slides 01-pdf
.PHONY: 01-slides

01-slides :
	docker compose run build-slides
01-pdf:
	docker compose run build-pdf