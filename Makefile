install:
	pnpm install

test:
	pnpm test

lint:
	pnpm --silent run lint
	pnpm --silent run format:check

publish:
	npm publish

.PHONY: test
