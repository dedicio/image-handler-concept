start:
	docker compose up -d

stop:
	docker compose down

restart:
	docker compose down
	docker compose up -d

test:
	k6 run k6/script.js

setup:
	CP .env.example .env
	cp localstack.env.example localstack.env