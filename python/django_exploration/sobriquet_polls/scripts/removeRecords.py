from django.core.management.base import BaseCommand, CommandError
from polls.models import Question, Choice

# - - Remove One by Id

# record = Question.objects.get(id=1)
# record.delete()


# - - Remove All

Question.objects.all().delete()


print( "\n\n Record(s) Removed! \n\n" )
# print( Question.objects.get(id=1) )
