# NOTES
- This app followed this guide: https://vercel.com/kb/guide/nextjs-prisma-postgres

Overview
- CLI Required: `npm`v22, `nvm`v0.40.3, `vercel`v50, `prisma`v6.8.0
- Vercel Project created @ https://vercel.com/bobs-projects-0709b979

Quick Start (after all is setup)
- `cd` into project folder...
- `npm run dev`
- New Terminal tab: `npx prisma studio` - shows db. 

### ~Journal

Step 1: Set up your Next.js starter project
- Create folder, `cd` into folder and create `readme.md`
- `npx create-next-app --example https://github.com/prisma/blogr-nextjs-prisma/tree/main blogr-nextjs-prisma`
- Got error (need to use node v22)
  - `nvm ls` - `nvm install 22` - `nvm use 22` - `nvm alias default 22`
  - Try ☝️ Again: `npx create-next...` 
- `npm run dev`

Step 2: Set up your Postgres database
- `vercel env pull .env` (not installed? run `npm i -g vercel`)
- Error: Your codebase isn’t linked to a project on Vercel. 
  - Run `vercel link` to begin.
  - Toggle through defaults... y,y, etc...
- Can run `vercel env pull .env` again to double check you're linked

Step 3: Setup Prisma and create the database schema
- `npm install prisma --save-dev`
- Errors: typescript version issues.
  - `npm install typescript@latest --save-dev` -> 
  - Try ☝️ Again: `npm install prisma --save-dev`
- Create: `/prisma` folder, then `schema.prisma` (add code from guide)
- Copy paste code from "guide" ☝️"
- Create Tables: `npx prisma db push`
- ERROR: Looks like code is for Prisma 6, we've installed 7
  - Create: `/prisma.config.ts` (See code added (was from copilot))
  - Update `/prisma/schema.prisma` by removing the lines with `env` method
  - Select your project from ☝️ Vercel account, which was previously created
  - Select the Storage tab 
  - Select "Prisma Postgres" > [Accept and Create] > [continue] > Accept name.
  - [Connect Project] > Select Project > [Connect]
  - NOW, run `vercel env pull .env --yes`
  - Try ☝️ Again: `npx prisma db push`
- Run `npx prisma studio`

Step 4. Install and generate Prisma Client
- `npm install @prisma/client`
- When you need to update db -> `npx prisma generate`

My Work: Seed Data (See `/prisma/seed_data`)
- `npm install @prisma/client tsx`
- `npx prisma generate`
- `npm install dotenv`
- `npm install @prisma/adapter-pg pg`
- now you should be able to seed by running `npm run seed office-data`

Step 5. Update the existing views to load data from the database
- see `/pages` code and update files as directed in guide
- `npm run dev `
- NOW you should see your seeded code

----



