FROM node:24.8.0-alpine3.22 AS builder
# Install pnpm
RUN corepack enable pnpm
RUN wget -qO- https://get.pnpm.io/install.sh | ENV="$HOME/.shrc" SHELL="$(which sh)" sh -
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
# stage 1
WORKDIR /app

COPY package*.json pnpm-lock.yaml /app/
COPY . .
# Clean up any existing node_modules to avoid conflicts
RUN rm -rf node_modules
RUN rm -f package-lock.json

RUN pnpm install

# Install NX CLI globally
RUN pnpm add -g nx

RUN npx nx build frontend --configuration=production

#stage 2
FROM nginx:alpine
EXPOSE 80
EXPOSE 443
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/dist/frontend /usr/nginx/html