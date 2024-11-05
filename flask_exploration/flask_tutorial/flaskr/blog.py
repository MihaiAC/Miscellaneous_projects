from flask import (
    Blueprint, flash, g, redirect, render_template, request, url_for
)
from werkzeug.exceptions import abort

from flaskr.auth import login_required
from flaskr.db import get_db

bp = Blueprint('blog', __name__)

@bp.route('/')
def index():
    db = get_db()
    posts = db.execute(
        'SELECT p.id, title, body, created, author_id, username'
        ' FROM post p JOIN user u ON p.author_id = u.id'
        ' ORDER BY created DESC'
    ).fetchall()
    
    user_likes = [False]*len(posts)
    if g.user is not None:
        for post_idx, post in enumerate(posts):
            liked = db.execute('SELECT * FROM likes WHERE user_id=? AND post_id=?', (g.user['id'], post['id'])).fetchone()
            if liked is not None:
                user_likes[post_idx] = True
            else:
                user_likes[post_idx] = False

    return render_template('blog/index.html', posts=posts, user_likes=user_likes)

@bp.route('/create', methods=('GET', 'POST'))
@login_required
def create():
    if request.method == 'POST':
        title = request.form['title']
        body = request.form['body']
        error = None

        if not title:
            error = 'Title is required.'
        
        if error is not None:
            flash(error)
        else:
            db = get_db()
            db.execute(
                'INSERT INTO post (title, body, author_id)'
                ' VALUES (?, ?, ?)',
                (title, body, g.user['id'])
            )
            db.commit()
            return redirect(url_for('blog.index'))
    return render_template('blog/create.html')

def get_post(id, check_author=True):
    post = get_db().execute(
        'SELECT p.id, title, body, created, author_id, username'
        ' FROM post p JOIN user u ON p.author_id = u.id'
        ' WHERE p.id = ?',
        (id,)
    ).fetchone()

    if post is None:
        abort(404, f"Post id {id} doesn't exist.")
    
    if check_author and post['author_id'] != g.user['id']:
        abort(403)
    
    return post

@bp.route('/<int:id>/update', methods=('GET', 'POST'))
@login_required
def update(id):
    post_id = id
    post = get_post(post_id)

    if request.method == 'POST':
        title = request.form['title']
        body = request.form['body']
        error = None

        if not title:
            error = 'Title is required.'
        
        if error is not None:
            flash(error)
        else:
            db = get_db()
            db.execute(
                'UPDATE post SET title = ?, body = ?'
                ' WHERE id = ?',
                (title, body, post_id)
            )
            db.commit()
            return redirect(url_for('blog.index'))
    return render_template('blog/update.html', post=post)

@bp.route('/<int:id>/delete', methods=('POST',))
@login_required
def delete(id):
    post_id = id
    get_post(post_id)
    db = get_db()
    db.execute('DELETE FROM post WHERE id = ?', (post_id,))
    db.execute(
        'DELETE FROM likes WHERE post_id = ?',
        (post_id,)
    )
    db.commit()
    return redirect(url_for('blog.index'))

# Viewing a single post.
@bp.route('/<int:id>/view', methods=("GET",))
def view_post(id):
    db = get_db()
    post = db.execute(        
        'SELECT p.id, title, body, created, author_id, username'
        ' FROM post p JOIN user u ON p.author_id = u.id'
        ' WHERE p.id = ?'
        ' ORDER BY created DESC', (id,)
        ).fetchone()
    
    if post is None:
        abort(404)
    
    return render_template('blog/single_post.html', post=post)

# Return 404 if post is not found.
@bp.errorhandler(404)
def post_not_found(error):
    return render_template('blog/404.html'), 404

# Add like/dislike functionality.
@bp.route('/<int:id>/like', methods=("GET",))
@login_required
def like_post(id):
    db = get_db()
    db.execute(
        'INSERT INTO likes (user_id, post_id) '
        ' VALUES (?, ?)',
        (g.user['id'], id)
    )
    db.commit()
    return redirect(request.referrer)

@bp.route('/<int:id>/unlike', methods=("GET",))
@login_required
def unlike_post(id):
    db = get_db()
    db.execute(
        'DELETE FROM likes WHERE user_id = ? AND post_id = ?',
        (g.user['id'], id)
    )
    db.commit()
    return redirect(request.referrer)
