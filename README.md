# Open_RMM

It's been **O** days since last rewrite

I don't know what I am doing.

"Simple" service for monitoring Windows, Mac and Linux computers.

## Toolchain dependencies

- **pnpm** (node stuff)
- **cargo** (rust)

## pnpm scripts

- `pnpm run update` - run npm-check-updates to check for npm packages updates
- `pnpm run upgrade` - run npm-check-updates to update all npm packages
- `pnpm run server:dev` - run only server app with hot reload
- `pnpm run www:dev` - run server & www apps with hot reload
- `pnpm run agent:dev` - run agent & and www apps with hot reload (may have some issue because pnpm is running cargo)
- `pnpm run dev` - run all apps with hot reload
