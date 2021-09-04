# Install all node_modules and build the project
FROM mhart/alpine-node:14 as builder
WORKDIR /app

COPY package.json yarn.lock ./
RUN apk add --no-cache make gcc g++ python3 libtool autoconf automake
RUN yarn install --pure-lockfile

COPY . .
RUN NODE_ENV=production yarn blitz prisma generate && yarn build

# Install node_modules for production
FROM mhart/alpine-node:14 as production
WORKDIR /app

COPY package.json yarn.lock ./
RUN apk add --no-cache make gcc g++ python3 libtool autoconf automake
RUN yarn install --pure-lockfile --production

# Copy the above into a slim container
FROM mhart/alpine-node:slim-14
WORKDIR /app

COPY . .
COPY --from=production /app/node_modules ./node_modules
COPY --from=builder /app/node_modules/.prisma ./node_modules/.prisma
# Important, otherwise app will start but fail on first request. Doesn't look like Prisma is copied with @benjick's suggestion
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/.blitz ./.blitz

EXPOSE 3000
#
# If possible, run your container using `docker run --init`
# Otherwise, you can use `tini`:
# RUN apk add --no-cache tini

# ENTRYPOINT ["/sbin/tini", "--"]

CMD ["./node_modules/.bin/blitz", "start"]
