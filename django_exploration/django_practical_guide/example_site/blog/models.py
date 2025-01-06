from django.db import models

# Create your models here.
class Author(models.Model):
    first_name = models.CharField(max_length=255)
    last_name = models.CharField(max_length=255)
    email_address = models.CharField(max_length=255)

class Tag(models.Model):
    caption = models.CharField(max_length=255)

class Post(models.Model):
    post_title = models.CharField(max_length=255)
    image_name = models.CharField(max_length=255)
    date = models.DateField()
    excerpt = models.TextField(default="", null=False, blank=True)
    slug = models.SlugField(default="", null=False, blank=True)
    content = models.TextField(default="", null=False, blank=True)
    
    # 1-to-many
    author = models.ForeignKey(Author, on_delete=models.CASCADE, related_name="posts", null=False)

    # many-to-many
    tag = models.ManyToManyField(Tag)
