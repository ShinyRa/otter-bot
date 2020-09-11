FROM node:14-stretch

# Set workdir to /app
WORKDIR /app

# Copy everything except files in dockerignore
COPY . ./

# Install dependancies
RUN yarn install

# Run tests
# RUN yarn test

# Run in productionmode
CMD ["yarn", "production"]

# EXPOSE 3000
EXPOSE 3000
