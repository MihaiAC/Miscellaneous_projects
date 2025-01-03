from datetime import date
from django.shortcuts import render
from django.http import HttpResponse, HttpRequest

ALL_POSTS = [
    {
        "post_id": "mountain-vikings",
        "image": "vikings.jpg",
        "author": "Maxo Blog",
        "date": date(2024, 12, 30),
        "title": "Mountain Viking",
        "excerpt": "I thought we were going hiking, but I'm dyslexic",
        "content": 
        """
        It started as a simple plan—a relaxing hike through rolling green hills, fresh air, and the promise of solitude. 
        For Maxo, an avid outdoorsman, it was supposed to be another weekend adventure exploring nature's beauty. 
        But fate had other plans. Instead of hiking, Maxo went... viking.

        As he trekked up a grassy slope, Maxo (the Bouncy) bounced upon something extraordinary—a group of people dressed as Vikings, rowing longboats through the grass. 
        At first, he thought it was some elaborate historical reenactment. Yet, the more he observed, the more he felt an inexplicable pull toward the scene.

        Before he knew it, he was handed a wooden oar and welcomed aboard one of the boats. With the rhythmic chants of rowing songs echoing across the hills, 
        Maxo (the Bouncy) found himself swept into a world he never expected. They called themselves "Alpine Vikings" and their mission was to find the legendary "All Green".
        """
    },

    {
        "post_id": "stranded-vikings",
        "image": "stranded_vikings.jpg",
        "author": "Maxo Blog",
        "date": date(2024, 12, 31),
        "title": "Stranded Vikings",
        "excerpt": "Close encounters of the odd kind",
        "content": 
        """
        As Maxo ascended the rocky trail, he stumbled upon an odd sight—a small boat, impossibly perched in a puddle atop the mountain. Four figures sat inside, their long beards and fur-lined garments unmistakably Viking. 
        The boat, though too small for a sea voyage, looked like an ancient longboat, its wooden hull etched with runes.
        """
    },

        {
        "post_id": "hello-kitty-vikings",
        "image": "hello_kitty_vikings.jpg",
        "author": "Maxo Blog",
        "date": date(2025, 1, 1),
        "title": "Mountain Vikings",
        "excerpt": "Maxo finds himself in a bizarre situation",
        "content": 
        """
        Maxo (The Ever Bouncing) stood frozen at the top of the slope, watching two Vikings in a small boat with a 
        Hello Kitty logo on its side, slowly sliding down the grass. Their massive, bearded faces were expressionless 
        as they steered the boat with slow, deliberate strokes, gliding smoothly over the hillside. 
        Not a word was spoken between them, and the wind whispered through the trees, adding to the strange, surreal silence. 
        Maxo immediately thought that it had to be the work of an enemy Stand.
        """
    }
]

def starting_page(request: HttpRequest) -> HttpResponse:
    sorted_posts = sorted(ALL_POSTS, key=lambda x: x.get('date'))
    latest_posts = sorted_posts[-3:]
    return render(request, "blog/index.html", {
        "posts": latest_posts
    })

def posts(request: HttpRequest) -> HttpResponse:
    return render(request, "blog/all-posts.html", {
        "all_posts": ALL_POSTS
    })

def single_post(request: HttpRequest, post_id: str) -> HttpResponse:
    identified_post = next(post for post in ALL_POSTS if post['post_id'] == post_id)
    return render(request, "blog/post-detail.html", {
        "post": identified_post
    })

