### MySQL GUIDE

This Guide uses MySQL Server and the mysql cli. If you're interested in using MySQL Workbench or Sequel Pro, and/or running your instance with MAMP. See "Setting up with Workbench and Sequel Pro"

### Command line Directions:

Run Local Instance:
- $`mysql -u root -p`
- Password is whatever you set it to in the MySQL local software you installed

Run Google Cloud Instance:
- $`gcloud beta sql connect <instance-name> -u root`

Once Inside the "mysql>" command line

- mysql> `source schema.sql` to run an .sql file
- mysql> `USE burgers_db;` to select a DB
- mysql> `SELECT * FROM burgers;` to read all contents in table
- mysql> `SHOW DATABASES;`
- mysql> `SHOW TABLES;`
- mysql> `DROP DATABASE seinfeld;` removes a detabase

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
