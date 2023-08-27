from django.http import HttpResponse

def index(request):
    print('- bob -', request)
    return HttpResponse("Hello, world. You're at the polls index.")
