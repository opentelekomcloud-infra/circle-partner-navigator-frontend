# Use the ubi8 Node.js 20 image as the base image
FROM registry.access.redhat.com/ubi8/nodejs-20:1-22

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
RUN npm install --omit=dev

# Copy the rest of the application code to the working directory
COPY . .

RUN npm run build

# Expose a port (if your application listens on a specific port)
EXPOSE 3000

# Start the application
CMD [ "npm", "run", "serve" ]
