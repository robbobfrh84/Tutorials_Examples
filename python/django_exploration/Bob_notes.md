# Django website tutorial app

### Writing your first Django app, part 1 (Setup)
- using https://docs.djangoproject.com/en/1.11/intro/tutorial01/

Check version
- The Django docs default to 3.0. HOWEVER, *Joplin* uses 1.11.
  - To change, make sure you toggle the hover button version in the lower right.
  - Check version > $`python -m django --version`

Creating a project: $`django-admin startproject sobriquet`

Run Server: $`python manage.py runserver`: http://127.0.0.1:8000

**/sobriquet/urls.py** is the root developer directory for the project. "table of contents" of your Django-powered site.

Creating the Polls app
- $`python manage.py startapp polls` ("polls" being the var here...)
🔥true ?
- NOTE: in joplin, you'd need to prefix with `docker exec -it joplin_app_1 python joplin/manage.py`

Writing your first View (copy/pasted code from link 👇)
- https://docs.djangoproject.com/en/1.11/intro/tutorial01/#write-your-first-view
- Now, visit: http://127.0.0.1:8000/polls/
  - NOTE: just http://127.0.0.1:8000 will ERROR now.


### Writing your first Django app, part 2 (DB & Models)

##### Database setup (see: `mysite/settings.py`)
- Default is sqlite3 (Joplin uses postgres)
- MORE info: https://docs.djangoproject.com/en/1.11/intro/tutorial02/#database-setup

To **create the tables** in the database before we can use them, Run...
- $`python manage.py migrate`
  - NOTE: no migrations for what we coded yet (i.e... "polls")
- The migrate command looks at the `INSTALLED_APPS` setting in `mysite/settings.py` and creates any necessary db tables according to the database settings in `mysite/settings.py`

View DB Data in Terminal
- $`python manage.py dbshell`
  - sqlite>`.schema` > shows all schemas
  - sqlite>`.tab`> Shows all tables

##### Creating Models: https://docs.djangoproject.com/en/1.11/intro/tutorial02/#creating-models
- A model is the single, definitive source of truth about your data.
- **migrations are entirely derived from your models file, and are essentially just a history that Django can roll through to update your database schema to match your current models**
- Bob, "think of it like inheritance to track your genes through time!"

See: `polls/models.py` (copy/pasted code from link 👇)
- Create a `Question` and `Choice` class for our model
- Also see, `./_shed/models_examples.py` for more model examples

##### Activating models: https://docs.djangoproject.com/en/1.11/intro/tutorial02/#activating-models
- Create a database schema (CREATE TABLE statements) for this app.
- Create a Python database-access API for accessing Question and Choice objects.

See: `/sobriquet/settings.py`
- Add @line 31:  `    'polls.apps.PollsConfig',`
- Now Django knows to include the polls app.

Now, run $`python manage.py makemigrations polls`
- `makemigrations` tells django we've changed our model(in this case created a new one!).
  - see `./polls/migrations/0001_initial.py`
- This Python code translates to sql, to see it run...
- `python manage.py sqlmigrate polls 0001`

Now, run the migrations with
- $`python manage.py migrate`


##### Playing with the API: https://docs.djangoproject.com/en/1.11/intro/tutorial02/#playing-with-the-api
- $`python manage.py shell`
- More than just typing “python”, because manage.py sets the DJANGO_SETTINGS_MODULE environment variable,
- Which gives Django the Python import path to your mysite/settings.py file.
- >>>`from polls.models import Question, Choice`
- >>>`Question.objects.all()` >
  - Returns `<QuerySet []>`

Create a new Question
- (See link above for rest of command-line executions to build Database entries.)
- Then, at the end you can run >>>`Question.objects.all()` again to see entries.
  - `<QuerySet [<Question: Question object>]>`

Let's make that 👆Readable:
- in `polls/models.py` > add ...
```python
def __str__(self):
       return self.question_text
```
- And
```python
def __str__(self):
       return self.choice_text
```
- ... to the end of each Model. Which now... can be view as...
-  `<QuerySet [<Question: What's up?>]>`
  - NOTE: you'll need to restart the shell after saving code to log like so.
    - >>>`exit()`
    - >>>`python manage.py shell`
    - >>>`from polls.models import Question, Choice`
    - >>>`Question.objects.all()`


##### Logging the data (Bob off the rails)

Adding `scripts` folder helper and `shell` scripts to *log* and *seed* data
- The example showed how to log a specific value of an db entry of a model.
- But, I wanted to show all the key/values of the entry.
- So I did some digging and created the scipts folder to do these operations.
- $`cat scripts/viewData.py | ./manage.py shell` > Executes the shell script to view all entries from *Questions*. Also, noted code to view one by id
- $`cat scripts/seedQuestions.py | ./manage.py shell` > seeds question(s)
- $`cat scripts/removeRecords.py | ./manage.py shell` > removes question(s)

##### Back to Playing with the API: https://docs.djangoproject.com/en/1.11/intro/tutorial02/#playing-with-the-api

Adding More Python Methods
- In the Question Class of `polls/models.py`
🔥
🤓 WHERE I LEFT OFF 🤓


### Ideas going forward
- [ ] - create json objects
- [ ] - finish step 2
- [ ] - joplin: test use on info/service/guide
- [ ] - Create Json db backup.


### Writing your first Django app, part 3 (Public interface "views")
### Writing your first Django app, part 4 (Form processing)
### Writing your first Django app, part 5 (Automating tests)
### Writing your first Django app, part 6 (Stylesheet and images)
### Writing your first Django app, part 7 (Auto-generated Admin site)
### Next... Advanced: How to write re-usable apps.






----
### General Notes

- $`python manage.py dbshell`
  - sqlite>`.schema`
  - sqlite>`.tab`

### Resources

More info on db cli with Django
- https://docs.djangoproject.com/en/3.0/ref/django-admin/#dbshell

Django Website: Documentation
- https://docs.djangoproject.com/en/1.11/ref/models/

Django Website: "Write your first Django App, part 1"
- https://docs.djangoproject.com/en/1.11/intro/tutorial01/

modelcluster example
- https://github.com/wagtail/django-modelcluster
