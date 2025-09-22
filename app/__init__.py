from flask_login import LoginManager
from app.models.users.users import User  # ✅ User Model import karo

login_manager = LoginManager()

@login_manager.user_loader
def load_user(user_id):
    return User.get(user_id)  # ✅ Ensure yeh `User` ka instance return kare
