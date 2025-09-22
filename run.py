from flask import Flask, redirect, url_for
from app.config import Config
from app.extensions import mongo, bcrypt, login_manager
from app.blueprint.auth.routes import auth_bp
from app.blueprint.feedback_form.routes import feedback_bp
from app.blueprint.admin.route import admin_bp

app = Flask(__name__, template_folder="app/templates", static_folder="app/static")
app.config.from_object(Config)

# Initialize Extensions
mongo.init_app(app)
bcrypt.init_app(app)
login_manager.init_app(app)

# Register Blueprints
app.register_blueprint(auth_bp, url_prefix="/auth")
app.register_blueprint(feedback_bp, url_prefix='/form')
app.register_blueprint(admin_bp, url_prefix='/admin')

@app.route("/")
def index():
    return redirect(url_for("auth.login"))  # Default to login page

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)