# Use a smaller base image
FROM node:18-alpine

WORKDIR /app

# Copy only package files first (better caching)
COPY package*.json ./

# Install only production dependencies and clean cache
RUN npm ci --only=production && npm cache clean --force

# Copy source code
COPY . .

EXPOSE 5050
CMD ["npm", "start"]

