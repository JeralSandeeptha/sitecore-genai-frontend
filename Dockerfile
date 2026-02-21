# ===============================
# Stage 1: Build
# ===============================
FROM node:lts-alpine AS build

# Set working directory
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm ci

# Copy source code
COPY . .

# Build the frontend
RUN npm run build

# ===============================
# Stage 2: Production image
# ===============================
FROM nginx:alpine

# Install gettext for envsubst command
RUN apk add --no-cache gettext

# Remove default nginx website
RUN rm -rf /usr/share/nginx/html/*

# Copy built frontend from previous stage
COPY --from=build /app/dist /usr/share/nginx/html

COPY public/env.template.js /usr/share/nginx/html/env.template.js
COPY env.sh /usr/share/nginx/html/env.sh

RUN chmod +x /usr/share/nginx/html/env.sh

# Copy custom nginx config if you have one (optional)
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80

# Start entrypoint
ENTRYPOINT ["/usr/share/nginx/html/env.sh"]