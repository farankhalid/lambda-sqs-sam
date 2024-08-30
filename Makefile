include .env

default: help

.PHONY: help
help:
	@echo "Usage: make [dev|stg|prod]"
	@echo "Commands:"
	@echo "  dev        Deploy the development environment"
	@echo "  stg        Deploy the staging environment"
	@echo "  prod       Deploy the production environment"

.PHONY: dev
dev:
	cd src && \
	npm install && \
	npm run compile;
	sam build \
	--beta-features && \
	sam deploy \
	--stack-name DemoServiceDevelopment \
	--parameter-overrides Environment=development MongoDBUri=$(MONGODB_URI_DEV)

.PHONY: stg
stg:
	cd src && \
	npm install && \
	npm run compile;
	sam build \
	--beta-features && \
	sam deploy \
	--stack-name DemoServiceStaging \
	--parameter-overrides Environment=staging MongoDBUri=$(MONGODB_URI_STG)

.PHONY: prod
prod:
	cd src && \
	npm install && \
	npm run compile;
	sam build \
	--beta-features && \
	sam deploy \
	--stack-name DemoServiceProduction \
	--parameter-overrides Environment=production MongoDBUri=$(MONGODB_URI_PROD)