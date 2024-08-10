# Chorus Interview

## About this Interview

Welcome to Chorus Engineering's Interview project!

We're looking for engineers are experienced, passionate, and are obsessed over strong systems and high productivity.

In order to facilitate this, we use this interview project as a pretend project that mirrors the exact technical stack that we use
here at Chorus.

**You, the interviewee, have the power to decide if this is the technology that you want to work on!**

The goal of this interview is to identify as much about you as we can through a simple take home project, and then
a 1 hour pairing session on the take home project where we create features together.

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
2. Run `pnpm install`
3. Run `pm2 start`

The API and React server will automatically watch for changes. You can manage start/stop using `pm2`

Use `pm2 stop all` to stop the servers.
Use `pm2 delete all` to delete the entry from the pm2 process list.

### Troubleshooting

> I can't execute pm2!

pm2 is part of the devDependencies, so when you install the dependencies, you should be able to
execute the binary from node_modules.

Either use `pnpm pm2` or add `node_modules/.bin` to your `PATH`.


## Prompt

Lets make a Pokemon Team builder!

We want to create a way to select 6 pokemon to be on our team.

The UI should allow the user to:
1. View a list of the first 150 Pokemon
2. Select from the list of pokemon
3. Submit the pokemon that we have selected to the backend.

### Completion Criteria
1. There should be a profile table
2. There should be a table for pokemon related to a profile (up to 6)
3. The UI should allow for a profile to be created.
4. The UI should show a list of pokemon
5. The UI should allow the profile to have up to 6 pokemon applied
6. The UI should have a way to submit profile and pokemon to the backend for storage in the DB.