# Use an official Node.js runtime as the base image
FROM node:14-alpine

# Set the working directory in the container to /app
WORKDIR /app

# Copy application code to the working directory
COPY . .

# Install the application dependencies
RUN npm install

# Build the application
RUN npm run build

# Expose port 4200 for the application
EXPOSE 4200

# Define the command to run the application
CMD [ "npm", "run", "serve" ]