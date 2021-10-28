## Scripts
- `start`: production
- `dev`: development
- `build:ui`: build React UI and copy into same directory as server
- `update:server`: deploy application if only applied change to server code, i.e. a UI rebuild is not required
- `deploy`: deploy contents of server directory to Heroku
- `deploy:full`: combination of `build:ui` and `deploy`

**Examples**
- If you have modified the server code only, you can deploy an updated version of the application with `npm run update:server`
- If you have modified the UI source code, you need to rebuild the UI and copy it into the server directory. This is done with `npm rn deply:full`