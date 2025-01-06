from datetime import date
from django.shortcuts import render
from django.http import HttpResponse, HttpRequest
from .models import Post, Tag, Author

def starting_page(request: HttpRequest) -> HttpResponse:
    posts = Post.objects.all().order_by("-date")[:3]
    return render(request, "blog/index.html", {
        "posts": posts
    })

def posts(request: HttpRequest) -> HttpResponse:
    posts = Post.objects.all().order_by("-date")
    return render(request, "blog/all-posts.html", {
        "all_posts": posts
    })

def single_post(request: HttpRequest, slug: str) -> HttpResponse:
    identified_post = Post.objects.get(slug=slug)
    return render(request, "blog/post-detail.html", {
        "post": identified_post,
        "tags": identified_post.tag.all()
    })

