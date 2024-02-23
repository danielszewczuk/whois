from flask import Flask, render_template, url_for
from api.query import *

app = Flask(__name__, static_url_path='/static')
app.register_blueprint(api, url_prefix="/api")

@app.errorhandler(404)
def notfound(error):
    return render_template("404.html"), 404

@app.route("/")
def root():
    return render_template("index.html")

if __name__ == "__main__":
    app.run(debug=True)