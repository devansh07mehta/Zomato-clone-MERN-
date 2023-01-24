FROM node:alpine

WORKDIR /app
COPY ./package*.json ./
RUN npm install
COPY . ./

ENV MONGO_URI=mongodb+srv://devansh:devanshMehta@cluster0.mbigziy.mongodb.net/?retryWrites=true&w=majority
ENV AWS_S3_ACCESS_KEY=AKIAS2KUM2FU4TJUJF7N
ENV AWS_S3_SECRET_KEY=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
ENV GOOGLE_CLIENT_ID=82892324402-l89pvubj359ck7lgk6riti18cbke5ghc.apps.googleusercontent.com
ENV GOOGLE_CLIENT_SECRET=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

RUN npm run build

CMD ["npm", "run", "start"]