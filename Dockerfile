ARG ARTIFACTORY_URL
FROM ${ARTIFACTORY_URL}/dhi.io/node:24-alpine-dev AS build

ARG NODE_ENV
ARG AUTH_TOKEN
ARG BASE_URL

ENV BASE_URL=${BASE_URL}
ENV NODE_ENV=${NODE_ENV}
ENV AUTH_TOKEN=${AUTH_TOKEN}

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN yarn install --omit=dev

# Copy the rest of the application code to the working directory
COPY . .

RUN yarn build

## now add the build to nginx
FROM ${ARTIFACTORY_URL}/dhi.io/nginx:1-alpine-dev

# Copy the build to the nginx directory
COPY --from=build /app/out /usr/share/nginx/html

# Expose port 8080 (DHI nginx listens on 8080 by default)
EXPOSE 8080

# Start Nginx server
CMD ["nginx", "-g", "daemon off;"]
