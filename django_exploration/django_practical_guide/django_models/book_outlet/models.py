from django.db import models

# Create your models here.
class Book(models.Model):
    # Automatically added: autoincrementing id field.
    title = models.CharField(max_length=50)
    rating = models.IntegerField()