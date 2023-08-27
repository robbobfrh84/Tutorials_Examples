from django.db import model

class Player(model.Model):
    full_name = model.CharField(max_length=70)

    def __str__(self):
        return self.full_name

class City(models.Model):
    date_founded: models.DataField()
    city_name: models.CharField(max_length=70)
    population: model.IntegerField()
    motto: models.CharField(max_length=200)



# - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

# rom django.db import models
#
# class Reporter(models.Model):
#     full_name = models.CharField(max_length=70)
#
#     def __str__(self):
#         return self.full_name
#
# class Article(models.Model):
#     pub_date = models.DateField()
#     headline = models.CharField(max_length=200)
#     content = models.TextField()
#     reporter = models.ForeignKey(Reporter, on_delete=models.CASCADE)
#
#     def __str__(self):
#         return self.headline
