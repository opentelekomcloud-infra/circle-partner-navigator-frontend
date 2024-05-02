# Use the ubi8 Node.js 20 image as the base image
FROM node:20-alpine as build

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
FROM nginx:alpine

RUN rm /usr/share/nginx/html/*

# Copy the build to the nginx directory
COPY --from=build /app/out /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start Nginx server
CMD ["nginx", "-g", "daemon off;"]
