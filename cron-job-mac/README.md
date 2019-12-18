# Setting up a Mac OS bash command cron job
NOTE: depending on your OS, you may need to add both Terminal and Cron to your security and privacy settings.

### Run this command to create a cron job Mac OS.
$`env EDITOR=nano crontab -e`

### Add this line to the editor and save (command+)
- $`11 * * * *  /Users/robbobfrh84/Desktop/cron-test/cron-test.sh`
  - This will run that file every hour.

### logs and errors located at "/temp/cron.out"
- Add `>> /tmp/cron.out 2>&1` to the end of the line.
  - `11 * * * *  /Users/robbobfrh84/Desktop/cron-test/cron-test.sh >> /tmp/cron.out 2>&1`

### Add more than one.
```
  25 12* * *  /Users/robbobfrh84/Desktop/cron-test/cron-test.sh
  */10 * * * *  /Users/robbobfrh84/Desktop/cron-test/cron-test.sh
```
will run at 12:25 AND every ten minutes

### Check your jobs
- $`crontab -l`

#Resources
https://ole.michelsen.dk/blog/schedule-jobs-with-crontab-on-mac-osx.html
