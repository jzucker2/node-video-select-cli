# https://github.com/nodejs/docker-node/issues/1589
FROM node:16 AS debian_base

# from https://github.com/nodejs/docker-node/pull/367
FROM debian_base AS node_dependencies
ARG SERVER_VERSION=14.0.1
RUN yarn global add serve@${SERVER_VERSION}

WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

COPY package.json package.json

COPY yarn.lock yarn.lock

# issue with `--frozen-lockfile` is the different arch/platforms
# means different lockfiles for each
# meaning this is rickety
# seems this is important for stability/package management though
# see here: https://github.com/yarnpkg/yarn/issues/4147
#RUN yarn install --frozen-lockfile
# for github actions timeouts?
RUN yarn install --network-timeout 100000

FROM node_dependencies AS source_code
COPY src/ src/

FROM source_code AS build_prod
RUN yarn build
# this needs to match the env var in the app
EXPOSE 3131

FROM build_prod AS run_server
CMD ["serve", "-s", "build", "-l", "3131"]
