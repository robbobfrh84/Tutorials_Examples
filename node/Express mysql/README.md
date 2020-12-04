# Express mysql

##### Resources
- https://www.mysqltutorial.org/mysql-nodejs/insert/

### Install mysql
- https://dev.mysql.com/downloads/mysql/
- macOS 10.15 (x86, 64-bit), DMG Archive
- Install
  - password: `password`
- $`export PATH=${PATH}:/usr/local/mysql/bin`  
- $` mysql --version` > should return version stuff...


### Create The DB and configure user
- May need to do this again > $`export PATH=${PATH}:/usr/local/mysql/bin`  
- $`mysql -u root -p` > `password`
- >`CREATE DATABASE demo;`
- >`ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password';`
- >`flush privileges;`
- >`exit`

### Configure with your app
- $`npm install mysql`

- in the *demo_db_connection.js* file configure your
  - if you named everything and gave the same password you'll look like this...

```javascript
var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  database: 'demo'
});
```

- $`node demo_db_connection.js`
