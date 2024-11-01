from flask import Flask, url_for, request, render_template, flash, make_response, session, redirect
from markupsafe import escape

app = Flask(__name__)
app.secret_key = b'ultra_secret_plaintext_key'

@app.route("/")
def hello_world():
    if 'username' in session:
        return f"Logged in as {session['username']}."
    return "You are not logged in."

# Variable routes.
@app.route("/hello/")
@app.route("/hello/<name>")
def hello(name=None):
    return render_template('hello.html', person=name)

@app.route('/post/<int:post_id>')
def show_post(post_id: int):
    return f'Post {post_id}'

# URL Building + can use for redirects.
with app.test_request_context():
    print(url_for('hello_world'))
    print(url_for('show_post', post_id=2))

def valid_login(username: str, password: str) -> bool:
    return username == 'admin' and password == 'secret'

# HTTP methods. Default accepts only GET.
# Accessing data transmitted in POST/PUT.
# Setting cookie.
@app.route('/login', methods=['GET', 'POST'])
def login():
    error = None
    if request.method == 'POST':
        if valid_login(request.form['username'], request.form['password']):
            session['username'] = request.form['username']
            # Cookies can only be set in response objects.
            resp = make_response(render_template('login_successful.html'))
            resp.set_cookie('username', request.form['username'])
            return resp
        else:
            # flash('Wrong username/password combination.')
            error = 'Invalid username/password.'
    return render_template('login.html', error=error)

# Alternative: two separate functions, decorate with @app.get('/login') and @app.post('/login').

# Uploading a file.
@app.route('/upload', methods=['GET', 'POST'])
def upload_file():
    if request.method == 'POST':
        f = request.files['the_file']
        f.save('./uploads/uploaded_file.txt')
        return 'Upload successful!'
    else:
        return render_template('upload.html')

@app.route('/logout')
def logout():
    session.pop('username', None)
    flash("Logged out!")
    return redirect(url_for('hello_world'))