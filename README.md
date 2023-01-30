<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>


# Run in dev mode

1. Clone repo
2. Execute
```
npm install
```
3. Have NestJs installed
```
npm i -g @nestjs/cli
```
4. Create DB
```
docker-compose up -d
```
5. Clone the file __.env.template__ y rename the copy to __.env__ 
6. Fill the env variables in the __.env__ file
7. Execute the app in dev
```
npm run start
```
8. Create database with seed
```
http://localhost:3000/api/v2/seed
```

## Stack
* MongoDB
* Nest