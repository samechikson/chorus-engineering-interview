# Base image for Node.js 20
FROM node:20-alpine

# Install pnpm globally
RUN npm install -g pnpm

# Set working directory inside the container
WORKDIR /app

# Copy files
COPY . .

# Install dependencies using pnpm
RUN pnpm install

# Expose ports for backend
EXPOSE 3000

CMD ["pnpm", "run", "pokemon-user-backend:serve"]
