FROM node:12.14.1-slim

# Copia
COPY . /customer-challenge
WORKDIR /customer-challenge

ENV TZ=America/Sao_Paulo
ENV SEVER_PORT=5000
ENV BASE_URL_LUIZALABS=http://challenge-api.luizalabs.com/api/product/
ENV TOKEN_CRYPT=crypttoken
ENV EXPIRES_IN=600000

# Prepara node aplication
RUN npm cache clean --force && rm -rf ~/.npm && npm config set strict-ssl false && rm -rf node_modules/ && rm -f package-lock.json && npm install

CMD ["npm", "start"]
