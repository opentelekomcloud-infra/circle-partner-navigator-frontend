ARG ARTIFACTORY_URL
FROM ${ARTIFACTORY_URL}/dhi.io/node:24-alpine-dev AS build

ARG NODE_ENV
ARG BASE_URL
# AUTH_TOKEN is a Strapi API token. Docker builds pass it as a BuildKit
# secret (see the RUN below); kaniko has no secret-mount support, so it can
# be supplied as a build arg instead. The value is only used inside this
# build stage and is never written to the final image.
ARG AUTH_TOKEN

ENV BASE_URL=${BASE_URL}
ENV NODE_ENV=${NODE_ENV}

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN yarn install --omit=dev

# Copy the rest of the application code to the working directory
COPY . .

# AUTH_TOKEN is a Strapi API token and must never be a build argument in
# attestation-producing builders: build args are recorded in the provenance
# attestation of docker/build-push-action, which is exactly how the production
# token ended up in the public quay.io attestations. Docker builds therefore
# pass it as a BuildKit secret, which is excluded from all of those:
#
#   docker build --secret id=auth_token,src=$HOME/.cpn_auth_token .
#   docker/build-push-action:
#     secrets: auth_token=${{ secrets.AUTH_TOKEN }}
#
# Kaniko (used on the internal runners) does not support BuildKit secret
# mounts, so it passes AUTH_TOKEN as a build arg; kaniko does not produce
# attestations and does not persist build args in the image.
#
# The guard below makes the build fail loudly when neither is provided,
# instead of building with an empty token.
RUN --mount=type=secret,id=auth_token \
    if [ -s /run/secrets/auth_token ]; then \
        AUTH_TOKEN="$(cat /run/secrets/auth_token)"; \
    fi; \
    test -n "$AUTH_TOKEN" || { \
        echo "ERROR: AUTH_TOKEN is missing - pass --secret id=auth_token,src=<file> (docker) or --build-arg AUTH_TOKEN=<token> (kaniko)" >&2; \
        exit 1; \
    }; \
    export AUTH_TOKEN; \
    yarn build

## now add the build to nginx
FROM ${ARTIFACTORY_URL}/dhi.io/nginx:1-alpine-dev

# Copy the build to the nginx directory
COPY --from=build /app/out /usr/share/nginx/html

# Expose port 8080 (DHI nginx listens on 8080 by default)
EXPOSE 8080

# Start Nginx server
CMD ["nginx", "-g", "daemon off;"]
