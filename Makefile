install:
	npm ci

build:
	NODE_ENV=production npx webpack

open:
	npx webpack serve

lint:
	npx eslint .