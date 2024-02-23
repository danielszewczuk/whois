from flask import Flask, render_template, url_for
from api.query import *

app = Flask(__name__, static_url_path='/static')
app.register_blueprint(api, url_prefix="/api")

@app.errorhandler(404)
def notfound(error):
    return render_template("error.html", error=404), 404

@app.errorhandler(405)
def notallowed(error):
    return render_template("error.html", error="Method Not Allowed (405)"), 405

@app.errorhandler(500)
def internalerror(error):
    return render_template("error.html", error="Internal Server Error"), 500

@app.route("/")
def root():
    return render_template("index.html")

if __name__ == "__main__":
    app.run(debug=True)