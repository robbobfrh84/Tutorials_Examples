# Raw terminal commands

### General Commands
- $`zip -9 -r ../twitter-bot.zip *`


### Loops
- $`for i in myFolder/*; do echo "hello" $i; done` >>> loops through files/folders in folder.
- $`for i in lab/*.html; do echo "hello" $i; done` >>> only html files

---
### File/directory CRUD
- cd directory			>>> move into current directory
- cd ..				>>> move back a directory
- ls 				>>> shows all files/folders at current directory
- touch newFileName.whatever 	>>> create new file at current directory
- open filename.whatever		>>> opens file with default
- atom filename.whatever		>>> opens in atom.
- cat filename.whatever		>>> print contents of file in terminal
- rm filename.whatever		>>> removes/deletes file
- My\ Folder			>>> backslash+space for space if file/dir has spaces

##### Save url file to location
* $`brew install curl` (if you don't already have `curl`)
* $`curl -O <url>`

---
### CPUish stuff
- arp -a 				>>> shows all http server LAN IP addresses
- ps -e				>>> shows all running directory locations
- top				>>> shows all running programs in real time on CPU
- htop			>>> same as top but nicer UI
- top -o cpu			>>> shows running programs sorted by cpu time
- kill <PID>			>>> find PID in ^^^. This will kill that program

----
# LocalHost/Server/ IP address stuff!

### Iphone hotspot/mac host wireless network. 
- Connect to hot spot 
- host on mac `http-server -c-1` OR: `lr-http-server -c-1`
- `ifconfig` lists some open ports (hard to find, but should be found in the log here..)
- `Starting up http-server, serving ./
	Available on:
  http://127.0.0.1:8080
  http://172.20.10.3:8080`
- similar but the last example works on other devices. `http://172.20.10.3:8080`
- RESOURCE: https://serverfault.com/questions/229441/how-do-i-access-a-local-web-server-on-my-laptop-from-another-computer

### kill a local port when it freezes/blocks
- lsof -i :3000
	- this will check the port that stuck. Will return a few different results.
	- if new command line just shows up it means none r open. seems they oddly get stuck.
	- find PID in looks related to port i.e. stuck with a node app.
- kill -QUIT 10658		>>> 10658 === PID

- htop				>>> little program i installed that makes navigating top nice
- `ls /dev/tty.*` >>> list devices on port


### Bluetooth
- $`system_profiler SPBluetoothDataType` lists all paired bluetooth devices.


### MongoDB
- KILL mongod mongo mongodb! `mongo --eval "db.getSiblingDB('admin').shutdownServer()"`
——————————————————————————————————————————————————
mongod (or: sudo mongo)		>>> opons the mongoDB service/programe/whatever…
mongo				>>> opens mongo command line for MongoDB files/database
- see men-crud-basics for more
