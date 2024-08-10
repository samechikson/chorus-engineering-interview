# Chorus Interview

## About this Interview

Welcome to Chorus Engineering's Interview project!

We're looking for engineers who are experienced, passionate, and obsessed with strong systems and high productivity.

In order to facilitate this, we are providing an interview project that mirrors the technical stack that used
here at Chorus.

**You, the interviewee, have the power to decide if this is the technology that you want to work on!**

The goal of this interview is to identify strengths through a take home project, followed by
a 1 hour pairing session that will extend your work by creating features together.

## Tech Stack
React UI
Emotion CSS
Typescript
Node/NestJS Backend
NX Monorepo
Github Actions CI
PostgreSQL Database
Docker / Docker Desktop

## Prerequisites
Package Manager: pnpm 8.15.8
Node: 20.14.0 (LTS)

## Instructions
1. [Install pnpm](https://pnpm.io/installation)
2. [Install nvm](https://github.com/nvm-sh/nvm?tab=readme-ov-file#installing-and-updating)
- Our recommendation: use brew and run `brew install nvm`
  Brew Install Instructions 
  ```bash
  /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
  ```
3. Run `pnpm install`
4. Run `pm2 start`

The API and React server will automatically watch for changes. You can manage start/stop using `pm2`

Use `pm2 stop all` to stop the servers.
Use `pm2 delete all` to delete the entry from the pm2 process list.

### Troubleshooting

> I can't execute pm2!

pm2 is part of the devDependencies, so when you install the dependencies, you should be able to
execute the binary from node_modules.

Either use `pnpm pm2` or add `node_modules/.bin` to your `PATH`.


## Prompt

Lets make a Pokémon Team builder!

We want to create a way to select 6 Pokémon to be on our team.

The UI should allow the user to:
1. View a list of the first 150 Pokémon
2. Select from the list of Pokémon
3. Submit the Pokémon that we have selected to the backend.

**It does not have to be a beautiful UX experience. We're aiming for functional.**

### Completion Criteria
1. There should be a profile table
2. A table for Pokémon related to a profile (up to 6)
3. The UI should allow for a profile to be created.
4. Show a list of Pokémon
5. Allow the profile to have up to 6 Pokémon applied
6. Have a way to submit profile and Pokémon to the backend for storage in the DB.
