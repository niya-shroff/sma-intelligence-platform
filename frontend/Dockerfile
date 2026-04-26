FROM node:22-alpine

WORKDIR /app

# Copy package files
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy source code
COPY . .

# Expose port for dev server
EXPOSE 5173

# Start dev server
CMD ["npm", "run", "dev", "--", "--host"]
