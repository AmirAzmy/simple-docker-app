FROM node:14 as base
WORKDIR /app
COPY package.json .

FROM base as development

ARG NODE_ENV
RUN npm install
COPY . .
EXPOSE 4000
CMD ["npm","run","start-dev"]

FROM base as production

ARG NODE_ENV
RUN npm install --only=production
COPY . .
EXPOSE 4000
CMD ["npm","start"]