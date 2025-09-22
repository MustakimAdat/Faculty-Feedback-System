from flask import Blueprint, render_template, request, redirect, url_for, flash
from flask_login import login_user, logout_user, login_required
from app.models.users.users import User
from app.extensions import mongo

auth_bp = Blueprint("auth", __name__, template_folder="../../templates/auth")

@auth_bp.route("/login", methods=["GET", "POST"])
def login():
    if request.method == "POST":
        email = request.form["email"]
        password = request.form["password"]
        remember = "remember" in request.form  # Remember Me

        user = User.find_by_email(email)

        if user and user.check_password(password):
            login_user(user, remember=remember)
            flash("Login successful!", "success")
            return redirect(url_for("feedback_form.form_dashboard"))  
        else:
            flash("Invalid email or password", "danger")

    return render_template("login.html")

@auth_bp.route("/register", methods=["GET", "POST"])
def register():
    if request.method == "POST":
        first_name = request.form["first_name"]
        last_name = request.form["last_name"]
        email = request.form["email"]
        password = request.form["password"]
        confirm_password = request.form["confirm_password"]

        if password != confirm_password:
            flash("Passwords do not match!", "danger")
            return redirect(url_for("auth.register"))

        if User.find_by_email(email):
            flash("Email already registered!", "danger")
            return redirect(url_for("auth.register"))

        User.create_user(first_name, last_name, email, password)
        flash("Account created! Please login.", "success")
        return redirect(url_for("auth.login"))

    return render_template("register.html")

@auth_bp.route("/logout")
@login_required
def logout():
    logout_user()
    flash("You have been logged out.", "success")
    return redirect(url_for("auth.login"))


