FROM node:14-alpine

# from https://github.com/nodejs/docker-node/pull/367
RUN apk --no-cache add git

WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

COPY package.json ./

COPY yarn.lock ./

# issue with `--frozen-lockfile` is the different arch/platforms
# means different lockfiles for each
# meaning this is rickety
# seems this is important for stability/package management though
# see here: https://github.com/yarnpkg/yarn/issues/4147
#RUN yarn install --frozen-lockfile
# for github actions timeouts?
RUN yarn install --network-timeout 100000

COPY . ./

EXPOSE 5454

CMD ["npm", "start"]
