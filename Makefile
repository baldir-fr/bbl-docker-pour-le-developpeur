all: 01-slides 01-pdf 01-epub
.PHONY: 01-slides

01-slides :
	docker compose run build-slides
01-pdf:
	docker compose run build-pdf
01-epub:
	docker compose run build-epub