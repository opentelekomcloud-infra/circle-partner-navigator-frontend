ARG ARTIFACTORY_URL
FROM ${ARTIFACTORY_URL}/dhi.io/node:24-alpine-dev AS build

ARG NODE_ENV
ARG BASE_URL

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

# AUTH_TOKEN is a Strapi API token and must never be a build argument:
# build args (and any ENV derived from them) are recorded in the provenance
# attestation, image history and SBOM, which is exactly how the production
# token ended up in the public quay.io attestations. It is passed as a
# BuildKit secret instead, which is excluded from all of those.
#
#   docker build --secret id=auth_token,src=$HOME/.cpn_auth_token .
#   docker/build-push-action:
#     secrets: auth_token=${{ secrets.AUTH_TOKEN }}
#
# The guard below makes the build fail loudly when the secret is not mounted,
# instead of building with an empty token.
RUN --mount=type=secret,id=auth_token \
    test -s /run/secrets/auth_token || { \
        echo "ERROR: build secret 'auth_token' is missing - pass --secret id=auth_token,src=<file>" >&2; \
        exit 1; \
    }; \
    export AUTH_TOKEN="$(cat /run/secrets/auth_token)"; \
    yarn build

## now add the build to nginx
FROM ${ARTIFACTORY_URL}/dhi.io/nginx:1-alpine-dev

# Copy the build to the nginx directory
COPY --from=build /app/out /usr/share/nginx/html

# Expose port 8080 (DHI nginx listens on 8080 by default)
EXPOSE 8080

# Start Nginx server
CMD ["nginx", "-g", "daemon off;"]
