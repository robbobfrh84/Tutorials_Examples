# Create a basic Google Cloud SQL Instance

NOTE: This Walkthrough assumes you have a google developer account, have activated billing, and installed the gcloud SDK for use in your mac Terminal or windows $git bash.

### Rough Overview.
- Select project (Or: create new) and enabled api: https://console.cloud.google.com/flows/enableapi?apiid=sqladmin&redirect=https:%2F%2Fconsole.cloud.google.com&_ga=2.251493318.-1338182541.1545325673&_gac=1.20696010.1547422715.CjwKCAiA4OvhBRAjEiwAU2FoJXm3l_9JDimCKacrBfJp_xctV3cqQKD0WEUaVitDkqt5uHwN0hrsNhoCpPwQAvD_BwE
- Select Project and [Create Instance] for sql:
  - Select The hamburger `icon` in the upper left.
    - Select `SQL` > `Enable Billing` > `Set Account` > `Create instance`
    - Choose `MySQL` > Name it (record the name) > Set Root Password
    - Leave the rest default and `Create Instance`
- Create... and wait....
- Go to new project and select the sql instance.

Now, you have the option to use the mysql commandline within Terminal, or the build-in google cloud console.

#### CommandLine Cli
- First $`cd` in folder that has any .sql files to setup/seet(not required).
- Select the project you just create. Select your project on the google console to find the strange id they give you. Use this id in next step
- $`gcloud config set project <project-id>`
- check to confirm your project was selected $`gcloud config list`
- $`gcloud sql connect myinstance3 -u root`
  - Enter Password
  - Answer 'y'

Once within the "mysql>" commandline you can run any sql command for building db here. even add a .sql schema with mysql>`source schema.sql` (file included here) must be at directory before execution. See data mysql>`USE SE burgers_db;` mysql>`SELECT * FROM actors;`


#### Using Google Clouds Shell Console
- Select the [<] code icon in the blue navbar to open Google Cloud Shell
- $`gcloud sql connect myinstance --user=root`
  - Replace `root` with password
- $`CREATE DATABASE guestbook;`
- $`USE guestbook;
    CREATE TABLE entries (guestName VARCHAR(255), content VARCHAR(255),
    entryID INT NOT NULL AUTO_INCREMENT, PRIMARY KEY(entryID));
    INSERT INTO entries (guestName, content) values ("first guest", "I got here!");
    INSERT INTO entries (guestName, content) values ("second guest", "Me too!");`
- $`SELECT * FROM entries;`

----
# Resources

- Youtube Setting up local command-line:
  - https://www.youtube.com/watch?v=78itdGJpJAQ
- Intial Guide:
  - https://cloud.google.com/sql/docs/mysql/quickstart
- Creating a Google Cloud SQL instance for MySQL Workbench:
  - http://grainier.net/connect-google-cloud-sql-with-mysql-workbench/
- What's my IP address:
  - http://whatismyip.host/
