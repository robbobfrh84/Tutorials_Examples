# Create a basic Google Cloud SQL Instance

NOTE: This Walkthrough assumes you have a google developer account, have activated billing, and installed the gcloud SDK for use in your mac Terminal or windows $git bash.

### Rough Overview.
- created new project in console.cloud.google.com
- Select project and enabled api: https://console.cloud.google.com/flows/enableapi?apiid=sqladmin&redirect=https:%2F%2Fconsole.cloud.google.com&_ga=2.251493318.-1338182541.1545325673&_gac=1.20696010.1547422715.CjwKCAiA4OvhBRAjEiwAU2FoJXm3l_9JDimCKacrBfJp_xctV3cqQKD0WEUaVitDkqt5uHwN0hrsNhoCpPwQAvD_BwE
- Select Project and [Create Instance] for sql: https://console.cloud.google.com/projectselector/sql/instances?_ga=2.207428435.-1338182541.1545325673&_gac=1.120303610.1547422715.CjwKCAiA4OvhBRAjEiwAU2FoJXm3l_9JDimCKacrBfJp_xctV3cqQKD0WEUaVitDkqt5uHwN0hrsNhoCpPwQAvD_BwE&supportedpurview=project
  - [x] MySQL > [Next] / [Second Generation]
- Enter Instance ID: `myinstance` > it's whatever you want.
- Select Password for Instance
- Create and wait.
- Go to new project and select the sql instance.
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
