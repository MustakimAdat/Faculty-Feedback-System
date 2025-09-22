from flask import Blueprint, render_template, request, redirect, url_for, flash
from flask_login import login_required, current_user
from app.extensions import mongo, bcrypt
from app.models.users.users import User
from bson.objectid import ObjectId

admin_bp = Blueprint('admin', __name__, url_prefix='/admin')

@admin_bp.route('/add_user', methods=['GET', 'POST'])
@login_required
def add_user():
    if current_user.role != 'admin':
        flash('You do not have permission to access this page.', 'danger')
        return redirect(url_for('feedback_form.form_dashboard'))
    
    if request.method == 'POST':
        first_name = request.form.get('first_name')
        last_name = request.form.get('last_name')
        email = request.form.get('email')
        password = request.form.get('password')
        role = request.form.get('role')
        
        if not all([first_name, last_name, email, password, role]):
            flash('All fields are required.', 'danger')
            return redirect(url_for('admin.add_user'))
        
        existing_user = User.find_by_email(email)
        if existing_user:
            flash('Email already exists.', 'danger')
            return redirect(url_for('admin.add_user'))
        
        User.create_user(first_name, last_name, email, password, role)
        flash('User added successfully.', 'success')
        return redirect(url_for('admin.manage_users'))
    
    return render_template('admin/add_user.html', segment='admin')

@admin_bp.route('/manage_users', methods=['GET'])
@login_required
def manage_users():
    if current_user.role != 'admin':
        flash('You do not have permission to access this page.', 'danger')
        return redirect(url_for('feedback_form.form_dashboard'))
    
    users = mongo.db.users.find()
    return render_template('admin/manage_users.html', users=users, segment='admin')

@admin_bp.route('/edit_user/<user_id>', methods=['GET', 'POST'])
@login_required
def edit_user(user_id):
    if current_user.role != 'admin':
        flash('You do not have permission to access this page.', 'danger')
        return redirect(url_for('feedback_form.form_dashboard'))
    
    user = mongo.db.users.find_one({'_id': ObjectId(user_id)})
    if not user:
        flash('User not found.', 'danger')
        return redirect(url_for('admin.manage_users'))
    
    if request.method == 'POST':
        first_name = request.form.get('first_name')
        last_name = request.form.get('last_name')
        email = request.form.get('email')
        role = request.form.get('role')
        
        update_data = {
            'first_name': first_name,
            'last_name': last_name,
            'email': email,
            'role': role
        }
        
        if 'password' in request.form and request.form['password']:
            hashed_password = bcrypt.generate_password_hash(request.form['password']).decode('utf-8')
            update_data['password'] = hashed_password
        
        mongo.db.users.update_one({'_id': ObjectId(user_id)}, {'$set': update_data})
        flash('User updated successfully.', 'success')
        return redirect(url_for('admin.manage_users'))
    
    return render_template('admin/edit_user.html', user=user, segment='admin')

@admin_bp.route('/delete_user/<user_id>', methods=['POST'])
@login_required
def delete_user(user_id):
    if current_user.role != 'admin':
        flash('You do not have permission to perform this action.', 'danger')
        return redirect(url_for('feedback_form.form_dashboard'))
    
    mongo.db.users.delete_one({'_id': ObjectId(user_id)})
    flash('User deleted successfully.', 'success')
    return redirect(url_for('admin.manage_users'))