# ---------- Build Stage ----------
FROM node:22 AS build
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy the Angular source code
COPY . .

# Build Angular in production mode
# With your angular.json, this will output to: dist/my-angular-app
RUN npm run build --prod

# ---------- Runtime Stage ----------
FROM nginx:alpine

# Remove default nginx website content
RUN rm -rf /usr/share/nginx/html/*

# Copy Angular build output (your project name is my-angular-app)
# Angular build output is actually in dist/my-angular-app/browser
COPY --from=build /app/dist/my-angular-app/browser/ /usr/share/nginx/html

# Use custom Nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
