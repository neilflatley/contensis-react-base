FROM node:8 as builder
# The following prevents errors when cwebp is installing.
RUN apt-get update
RUN apt-get install libglu1 git -y
WORKDIR /usr/src/app
COPY package.json .
COPY package-lock.json .
COPY patches /usr/src/app/patches
RUN npm install -g mocha
RUN git config --global url."https://gitlab+deploy-token-2:xAprxEv22QDzmu6UtKUb@gitlab.zengenti.com/".insteadOf https://gitlab.zengenti.com/
RUN npm install --loglevel error
RUN npm run postinstall
COPY config /usr/src/app/config
COPY public /usr/src/app/public

COPY src /usr/src/app/src
RUN mkdir -p /usr/src/app/src/dist/static
COPY webpack /usr/src/app/webpack
COPY babel.config.js .
COPY babel.config.legacy.js .
COPY babel.config.modern.js .
COPY .env* ./
COPY .eslintignore .
COPY .eslintrc.js .
COPY .nvmrc .
COPY .prettierignore .
COPY .prettierrc .
COPY .stylelintrc .
RUN npm run build
RUN mocha --timeout=5000 dist/server/start.js -tests
COPY version.json /usr/src/app/dist/static/version.json
RUN cat /usr/src/app/dist/static/version.json
