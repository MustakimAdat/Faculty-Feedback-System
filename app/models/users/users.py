from app.extensions import mongo, bcrypt, login_manager
from flask_login import UserMixin
from datetime import datetime
from bson import ObjectId


class User(UserMixin):
    def __init__(self, user_data):
        self.id = str(user_data["_id"])  # ✅ MongoDB ObjectId ko string me convert karo
        self.first_name = user_data["first_name"]
        self.last_name = user_data["last_name"]
        self.email = user_data["email"]
        self.password = user_data["password"]
        self.role = user_data.get("role", "user")
        self.created_at = user_data.get("created_at", datetime.utcnow())

    @staticmethod
    def create_user(first_name, last_name, email, password, role="user"):
        hashed_password = bcrypt.generate_password_hash(password).decode("utf-8")
        user = {
            "first_name": first_name,
            "last_name": last_name,
            "email": email,
            "password": hashed_password,
            "role": role,
            "created_at": datetime.utcnow(),
        }
        mongo.db.users.insert_one(user)

    @staticmethod
    def find_by_email(email):
        user_data = mongo.db.users.find_one({"email": email})
        return User(user_data) if user_data else None

    def check_password(self, password):
        return bcrypt.check_password_hash(self.password, password)


# ✅ Corrected `load_user` function:
@login_manager.user_loader
def load_user(user_id):
    user_data = mongo.db.users.find_one({"_id": ObjectId(user_id)})
    return User(user_data) if user_data else None  # ✅ Return `User` object
