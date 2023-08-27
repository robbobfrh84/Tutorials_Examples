from django.core.management.base import BaseCommand, CommandError
from polls.models import Question, Choice

print("\n - - - - \n")
print( Question.objects.all() )
print("\n - - - - \n")

# print( Question.objects.get(id=1) )
