<h1 align="center"> TFC </h1>

<p align="right">
<img src="http://img.shields.io/static/v1?label=STATUS&message=%20FINISHED&color=GREEN&style=for-the-badge"/>
</p>

## ✔ Technologies used

-  <img align="center" alt="Matheus-DOCKER" height="30" src="https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white">
-  <img align="center" alt="Matheus-Typescript" height="30" src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white"> 
-  <img align="center" alt="Matheus-MYSQL" height="30" src="https://img.shields.io/badge/MySQL-00000F?style=for-the-badge&logo=mysql&logoColor=white">
-  <img align="center" alt="Matheus-NODE" height="30" src="https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white">
-  <img align="center" alt="Matheus-SQUELIZE" height="30" src="https://img.shields.io/badge/sequelize-323330?style=for-the-badge&logo=sequelize&logoColor=blue">

## 📒 Introduction

This was a full-stack project, in which I implemented only the back end. TFC is an informative website about football matches and rankings!

The back end was built using Docker and data modeling through Sequelize.

To perform CRUD actions, a token is required. This token is obtained through a login. There are two types of users:

  - Admin;
  - Common.

If the logged-in user is an Admin, they have additional privileges compared to a common user.

This verification is done automatically by passing the token via the header.



## :bulb: Installation

To start the project, it is necessary to install npm in the directory and start the Docker. Docker-compose needs to be version 1.29 or higher.

install the dependencies:

```bash
docker-compose up -d

npm install
```
