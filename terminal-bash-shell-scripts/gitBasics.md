# Git Basics
Resource link: http://rogerdudler.github.io/git-guide/
----
## Command Overview

$ `git init <newRepositoryName>`

$ `git clone path/to/repository`, OR: $ `git clone url`

$ `git checkout -b 'new-branch'`

$ `git checkout master`, OR: `get checkout some-branch`

$ `git add <aFile>`, OR: $ `git add *` (for all files/folders)

$ `git status`

$ `git commit -m 'leave a message to commit with'`

$ `get checkout -- <file>`: Removes changes of file from existing branch.

$ `git push origin <branch-name>`, OR: $ `git remote add origin <server>`

$ `git merge <branch>`, from branch you want to mergin into(* master)

$ `git pull`

$ `git fetch`

$ `git rebase <of branch i.e. master>`

----

### Create A new Repository
Start in **Terminal** and move to the directory you want your new repository... probably should be your github folder.

Open Terminal
- $ `cd github`
- $ `git init <yourRepositoryName>`

### Add repository to GitHub
Open Github Desktop
- Find and click the `+` dropdown button in the upper left corner.
- Click the `choose` button and find your new repository folder.

You will now see your new repository under the "Other" section below the "GitHub" section. Click to highlight it if it isn't already
- Now, click the `Publish` button in the upper right corner.
- Add a description if you'd like and click `Publish Repository`.
- You should now see your repository in the "Github" section as well as on your github profile @ github.com.

### Checkout a Repository
Create a working copy of a local repository, or from GitHub.
- In a new folder directory (Can not be the same one you just created your repo)
- $ `cd ../desktop` < from my github folder for example.
- $ `git clone ../github/jsHelper` ...in my case
- OR: $ `git clone https://github.com/robbobfrh84/jsHelper.git` if you created it on gitHub.
  - Note: you should get an error if you've duplicated your folder.

### Workflow
Your local repository consists of three "trees" maintained by git.
- 1st, the **Working Directory**: This directory hold the actual files.
- 2nd, the **Index**: This acts as a staging area.
- 3rd, the **HEAD**: which points to the last commit you've made.

### Create a branch
Branches are used to develop features isolated from each other. The **Master** branch is the default branch when you create a repository. Use other branches for development and **merge** them back to the master branch upon completion.

To create a new branch from your default directory use **Terminal** to navigate to inside your repository.
- $ `cd github/jsHelpter`

Now, to see what branch  you're on
- $ `git branch` < this should return `*master`

To create a new branch, run this command
- $ `git checkout -b myNewBranchName` < I called my `first-branch`
- run $ `git branch` again and you should see `*first-branch` selected by the asterisk and the `master` branch below.

### Add a file
Lets say you want to add an index.html to your repository on your new branch. You can create a file in **Terminal** if you want with this command...
- $ `touch index.html`

To see if you were successful, run this command and it will show you all files/folders within your repository. Including, the one(s) you just added.
- $ `ls`

Now, add this file to you **Index** with this command...
- $ `git add index.html`
- you can also add ALL the files you added (can also just drag and drop in the folder with the finder(mac)) with $ `git add *`

Now, the files are staged! to see your **Staged** files run.
- $ `git status`

Now, you can **Commit** to commit these changes with this command...
- $ `git commit -m 'Leave a message to be added to your commit'`

If you run git status again and you should get the message...
- `On branch first-branch, nothing to commit, working tree clean`

So now you know all your changes have been added.

#### *Side Note:*
When making this guide, I actually started working on this repo for a real purpose, and added a bunch of stuff to this branch.

So when I pick up where I left off I discovered this message after $ `git status`
```
Changes not staged for commit:
  (use "git add/rm <file>..." to update what will be committed)
  (use "git checkout -- <file>..." to discard changes in working directory)

	modified:   JS-built-in-examples/filter.html
	modified:   JS-built-in-examples/map.html
	modified:   JS-built-in-examples/promise.html
	modified:   JS-built-in-examples/reduce.html
	deleted:    error.html

Untracked files:
  (use "git add <file>..." to include in what will be committed)

	JS-built-in-examples/error.html

```
So, Lets add this changes by...
- $ `git add *`
- $ `git commit -m 'adding changed made during development of other projectg'`

Now, run $ `git status` to see there's still an issue with a file that was deleted `error.html`.

So, follow the instructions printed out and run $ `get checkout -- error.html`. This said it would `discard changes in working directory`.

After running $ `get status` again, we see we're working with a clean directory now.

### Push file to Master Branch

These changes were made to the HEAD of our local copy `first-branch`. To send those changes to your remote repository, run...
- $ `git push origin first-branch`, after that we should return > `Everything is up-to-date`

If you have not cloned an existing repository and want to connect your repository to a remote server you need to add it with...
- $ `git remote add origin <server>`

NOTE: don't do anything yet. BUT, Checkout your repository on github and see that you can "compare & pull request" for the breach you just pushed. Also, on your github desktop, you should be able to see all of your commits to that file.

### Update & Merge

Move to the master branch $ `git checkout master`.

- Now, run $ `git merge first-branch`
- Now, to finilize, run $ `git pull` to update your master on your local.

### fetch & rebase

Lets say the branch I'm working on needs updated code from the master branch.

Go to you your branch and run the command...
- $ `git fetch`, this will get the changes from master and put it on your index.

Now execute the changes on top of you code.
- $ `git rebase master`

### flow: add commit push merge pull delete
- $ `git add .`
- $ `git commit -m 'some message'`
- $ `git push origin <branch>`
- $ `git checkout master`
- $ `git merge origin <branch>`
- $ `git push origin master`
- $ `git pull`
- $ `git branch -d <branch>`
