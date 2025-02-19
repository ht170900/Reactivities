# Use Node.js image to build the frontend
FROM node:18 AS build

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY client/package.json client/package-lock.json ./

# Install dependencies
RUN npm install

# Copy the rest of the client-side code
COPY client/ ./

# Build the frontend (Vite outputs to dist/)
RUN npm run build

# Use NGINX to serve the frontend
FROM nginx:latest

# Copy built Vite files (dist/ instead of build/)
COPY --from=build /app/dist /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start NGINX
CMD ["nginx", "-g", "daemon off;"]
