FROM node:18-alpine AS base

RUN npm install -g pnpm
RUN npm install -g typescript

WORKDIR /app

COPY package.json pnpm-lock.yaml  ./

RUN pnpm install

RUN pnpm run build

FROM base as prod

RUN pnpm install --prod 

ENV PORT=3001
# it works
COPY apps/api/dist/ apps/api/dist/
COPY apps/web/dist/ apps/web/dist/

EXPOSE 3001

CMD ["pnpm", "start"]