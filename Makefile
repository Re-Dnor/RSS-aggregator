install:
	npm ci

build:
	rm -rf dist
	NODE_ENV=production npx webpack

open:
	npx webpack serve

lint:
	npx eslint .