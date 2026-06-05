# Crear Dockerfile con contenido
cat > Dockerfile << 'EOF'
FROM mcr.microsoft.com/playwright:v1.38.0-jammy

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .

CMD ["npx", "playwright", "test"]
EOF

