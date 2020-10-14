FROM node:12.14.1-slim

# Copia
COPY . /customer-challenge
WORKDIR /customer-challenge

ENV TZ=America/Sao_Paulo

# Prepara node aplication
RUN npm cache clean --force && rm -rf ~/.npm && npm config set strict-ssl false && rm -rf node_modules/ && rm -f package-lock.json && npm install

CMD ["npm", "start"]
