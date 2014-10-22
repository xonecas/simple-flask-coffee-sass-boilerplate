import os

from flask import Flask
from flask import render_template
from flask.ext.assets import Bundle
from flask.ext.assets import Environment

DEBUG = True

app = Flask(__name__)
app.debug = DEBUG

assets = Environment(app)
assets.debug = DEBUG

assets.load_path = [
    os.path.join(os.path.dirname(__file__), 'sass'),
    os.path.join(os.path.dirname(__file__), 'coffee'),
    os.path.join(os.path.dirname(__file__), 'bower_components'),
]

assets.register(
    'css',
    Bundle(
        '**/*.css',
        Bundle(
            '*.sass',
            filters="sass",
            output="sass.css"
        ),
        filters="cssmin",
        output="style.css"
    )
)

assets.register(
    'js',
    Bundle(
        'three.js/three.js',
        'jquery/dist/jquery.js',
        Bundle(
            '*.coffee',
            filters='coffeescript',
            output='coffee.js'
        ),
        filters='jsmin',
        output="app.js"
    )
)


@app.route('/')
@app.route('/<text>')
def greet(text="Welcome to the world of tomorrow!"):
    return render_template('index.html', text=text)

if __name__ == '__main__':
    app.run(host='0.0.0.0')
