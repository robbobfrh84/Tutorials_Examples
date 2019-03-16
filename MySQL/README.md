### MySQL GUIDE

This Guide uses MySQL Server and the mysql cli. If you're interested in using MySQL Workbench or Sequel Pro, and/or running your instance with MAMP. See "Setting up with Workbench and Sequel Pro"

### Command line Directions:

Run Local Instance:
- $`mysql -u root -p`
- Password is whatever you set it to in the MySQL local software you installed

Run Google Cloud Instance:
- $`gcloud beta sql connect <instance-name> -u root`

Once Inside the "mysql>" command line(cli). CAPs are not required. In fact it's gonna be a lot easier in the cli if you just don't. But here we are for clarity.

- mysql> `SOURCE schema.sql` to run schema.sql file
- mysql> `SHOW DATABASES;` > shows all DBs
- mysql> `USE <some_db>;` to select a DB
- mysql> `SHOW TABLES;` > Shows all tables of selected DBs
<<<<<<< HEAD
- mysql> `SELECT * FROM some_table;` > to read all contents in table
- mysql> `show columns from some_table;` to show a list of all columns in table.
- mysql> `DROP DATABASE seinfeld;` removes a detabase
=======
- mysql> `SHOW COLUMNS FROMm <some_name>;`
- mysql> `SELECT * FROM <some_name>;` to read all contents in table
- mysql> `DROP DATABASE <some_db>;` removes a detabase
>>>>>>> 46cf42450c28098c91ea15ea0597a79280d6d063
- mysql> `SELECT USER()` < shows selected user
- mysql> `SELECT DATABASE()` < shows selected database

More:
- mysql> `SELECT some_col FROM some_table` < only return specific column
- mysql> `SELECT col_1, col_b FROM some_table` < only return specific columns


### ORM (Object Relational Mapping) using NodeJS
NOTE: See example_ORM.js for example methods.

Return rows with specific values from select table.
- STRING: "SELECT * FROM ?? WHERE ?? = ?"
- Example Execution: `orm.selectWhere("some_table", "some_column", "some_value");`
  - Example: `SELECT * FROM some_table WHERE some_column = "some_value"`
    - ^ This will return the value of a column in a table if it exists. for multiple value cases... 👇
  - Example: `SELECT * FROM some_table WHERE some_column = "some_value" OR some_column = "some_value"`

Return order selection
- STRING: "SELECT ?? FROM ?? ORDER BY ?? DESC"
- Example Execution: `orm.selectAndOrder("some_col", "some_table", "some_other_col");`
  - Example: `SELECT some_col FROM some_table ORDER BY some_other_col DESC`
  - Swap `ASC` for `DESC` < will fip order and alphabetize too.

Return value in a column(of one table) whose's row id is included in the most rows of a different table.
- STRING: "SELECT ??, COUNT(??) AS count FROM ?? LEFT JOIN ?? ON ??.??= buyer_name.id GROUP BY ?? ORDER BY count DESC LIMIT 1";"
- Example Execution: `orm.findWhoHasMost("buyer_name", "buyer_id", "buyers", "pets");`
  - Example: `SELECT buyer_name, COUNT(buyer_name) AS count FROM buyers LEFT JOIN pets ON pets.buyer_id = buyers.id GROUP BY buyer_name ORDER BY count DESC LIMIT 1;`

----
### MySQL local system locations.

The MySQL folder is located @ ` /usr/local/mysql/data`. To get there from Terminal, first...

- $`cd /`: Unlike $`cd ~`m this will take you to the system root; rather than the user root. Then...
- $ `cd /usr/local/mysql`, then if you $`open .` You'll see you can't see what's inside the file.

----
### Setting up with Workbench and Sequel Pro
Instructions for mac OS(I think it's comparable with Windows): Follow the steps for installing and running with MySQL Server, and Workbench(or: Sequel Pro). Also, you can use MAMP if desired to run the MySQL instance with both Workbench and Sequel Pro.

Download MySQL Server: https://www.insidehighered.com/news/2018/01/31/boot-camp-sector-keeps-growing-while-influencing-traditional-higher-education.

Downlaod MySQL Workbench: https://www.mysql.com/products/workbench/

After installing and installing the software, make sure you've reset the password and are using "lagacy password"
- Apple Logo > System Preferences > MySQL > Initialize Database,
- then type your new password and select 'Use legacy password'
- then I just entered "password" as my password

Open Sequal Pro:
- By following the directions below it'll work. However, there's a massive bug that makes it drop whenever I try to select a database. So I just switched back to mySQL workbench. however, input these fields to see if it'll work for you. It's a better interface for mac IMO.
  - Name: <I left it empty>  
  - Host: localhost > (!forces you to change to 172.0.0.1, which is correct)
  - Username: root
  - password: <password-you-changed-to>
  - Database: <I left it empty>
  - Port: 3306 (it'll default if you leave it empty)

FOR MySQL Workbench:
- I have two separate programs setup for the workbench.
  - If you're using MySQL Server set your port to...
    - 3306: for this port you MUST run the mySQL instance in "system Preferences". That username is "root", password is password-you-changed-to> port is 3306.
  - if you're using MAMP, set your port to...
    - 8889: Open MAMP to run on this port. User is "root" pass is "root"(default) port is 8889.

----
# References;
- https://www.tutorialspoint.com/mysql/mysql-where-clause.htm
