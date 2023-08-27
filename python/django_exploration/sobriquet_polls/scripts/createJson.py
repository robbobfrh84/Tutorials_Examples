from django.core.management.base import BaseCommand, CommandError

import json
import pprint
import sys

from polls.models import Question, Choice

print("\n - - - - \n")
data = './scripts/data.json'
obj = {
 "Question": {}
}

all = Question.objects.all()

for field in all[0]._meta.get_fields():
    # print(field.name, getattr(all[0], field.name, ''))
    obj["Question"][field.name] = getattr(all[0], field.name, '')

print("obj: "+str(obj))

with open(data, 'w') as write_file:
    outputdict = json.dumps(str(obj), indent=2)
    write_file.write(outputdict)

pprint.pprint(obj)
# print( all )
print("\n - - - - \n")
