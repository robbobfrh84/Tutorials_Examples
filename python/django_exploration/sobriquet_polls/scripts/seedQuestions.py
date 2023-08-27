from django.core.management.base import BaseCommand, CommandError
from polls.models import Question, Choice

from django.utils import timezone

Question(
    question_text="How do you seed a question?",
    pub_date=timezone.now()
).save()

Question(
    question_text="Can you seed another Question?",
    pub_date=timezone.now()
).save()

Question(
    question_text="Is it possible to do THREE Question?",
    pub_date=timezone.now()
).save()

print( "\n\n Question(s) Seeded! \n\n" )
