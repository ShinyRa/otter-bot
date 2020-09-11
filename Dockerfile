FROM arm32v7/node

# Set workdir to /app
WORKDIR /app

# Copy everything except files in dockerignore
COPY . .

# Install dependancies
RUN yarn install

# Run tests (build fails if tests fail)
RUN yarn test

# Run in productionmode
CMD ["yarn", "production"]
