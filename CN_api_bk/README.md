# API + BK
## EJEMPLO
+ base de datos
 + PostgreSQL
## Tables
```` sql

    CREATE TABLE users (
  ID SERIAL PRIMARY KEY,
  name VARCHAR(30),
  email VARCHAR(30));
````
# Proyecto
## paqueteria para trabajar con el proyecto
+ git
    + debian
    ```` Console
    apt intstall git
    ```` 
+ curl
    + debian
    ```` Console
    apt install curl
    ````
+  Nginx
    + debian
    ```` Console
    apt install nginx
    ```` 
## Dependencias
+ nodejs (npm)
    + Descargar de [https://nodejs.org/en/download](https://nodejs.org/en/download)
    o
    + ```` Console 
        curl -fsSL https://deb.nodesource.com/setup_21.x | bash - &&\
        apt-get install -y nodejs
      ```` 
    + Ubuntu
        + ```` Console
          curl -fsSL https://deb.nodesource.com/setup_21.x | sudo -E bash - && sudo apt-get install -y nodejs
          ````  


## Descargar de github y desplegar
```` console
git clone https://github.com/evil2014/CN_api_bk.git
````
### instalar dependecias
```` console
 npm install
 node index.js
````



