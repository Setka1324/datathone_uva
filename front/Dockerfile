# Stage 1: Build the React app
FROM node:20-alpine AS builder
WORKDIR /app
COPY package.json package-lock.json ./
# Or if you only have package.json:
# COPY package.json ./
RUN npm install --legacy-peer-deps 
# Or: RUN npm ci (if you have a package-lock.json and want stricter installs)
COPY . .
RUN npm run build


# Stage 2: Serve the built app with Nginx
FROM nginx:1.28.0-alpine
COPY --from=builder /app/dist /usr/share/nginx/html
# *** UNCOMMENT OR ADD THIS LINE: ***
COPY nginx.conf /etc/nginx/conf.d/default.conf 
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]