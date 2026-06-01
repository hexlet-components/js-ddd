install:
	npm install

test:
	npm test

lint:
	npx biome check .

publish:
	npm publish

.PHONY: test
