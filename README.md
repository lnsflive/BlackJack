# BLACK JACK

### `Black Jack Game - With working leaderboard`

Complete matching game done with VueJS

Visit official game at: [Black Jack Game](https://jaimegonzalezjr.com/games/blackjack/).

## Built With
* VueJs (Front-End)
* Vuetify (Styling Framework)
* Strapi Headless CMS (Back-End)

![Screenshot](https://github.com/lnsflive/BlackJack/blob/master/static/img/ss1.png)
![Screenshot](https://github.com/lnsflive/BlackJack/blob/master/static/img/ss2.png)
![Screenshot](https://github.com/lnsflive/BlackJack/blob/master/static/img/ss3.png)

## Build Setup

```bash
# install dependencies
$ yarn install

# serve with hot reload at localhost:3000
$ yarn dev

# build for production and launch server
$ yarn build
$ yarn start

# generate static project
$ yarn generate
```

## Google account login and Web Station deployment

The browser uses native Strapi REST with a shared strapi_jwt local-storage bearer token. Google returns through TimeForge's /Projects/TimeForge/auth/google callback, validates a per-tab nonce, then returns to the initiating game. Native game collections enforce account ownership on the server. Existing anonymous names require administrator migration. API_BASE_URL defaults to https://api.jaimegonzalezjr.com.

Set `API_BASE_URL` and `APP_BASE_PATH` in the build environment; `DEPLOY_DIR` controls the Web Station output directory. Defaults preserve `/games/blackjack/`. Run `npm run test:auth`, then `npm run generate`, `npm run deploy:preview`, and `npm run deploy`. Deployment backs up existing files into ignored `.deploy-backups/` and retains old hashed assets. It does not delete old URLs or update Google callback configuration.

The legacy Nuxt 2 build pins matching Vue 2.6.14 renderer/compiler versions and enables the OpenSSL compatibility provider for its Webpack 4 build on Node 22. Framework modernization remains separate work.
