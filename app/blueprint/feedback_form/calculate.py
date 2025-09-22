from pymongo import MongoClient

# MongoDB Connection
client = MongoClient('mongodb://localhost:27017/')
db = client['faculty_feedback_db']

def update_calculated_data(form_id, subject_name, ratings, lab_ratings, syllabus_covered):
    """
    Jab naya response aaye, to calculate_data collection mein counts update karo.
    """
    # Document ka filter
    filter = {'form_id': form_id, 'subject_name': subject_name}
    
    # Update operations
    update_operations = {
        '$inc': {
            'response_count': 1,  # Total responses ka count badhao
            'total_syllabus_covered': int(syllabus_covered)  # Syllabus covered ka total
        }
    }
    
    # Ratings ke counts increment karo
    for cat, rating in ratings.items():
        update_operations['$inc'][f'ratings.{cat}.{rating}'] = 1
    
    # Lab ratings ke counts increment karo
    for cat, rating in lab_ratings.items():
        update_operations['$inc'][f'lab_ratings.{cat}.{rating}'] = 1
    
    # Document update karo, agar nahi hai to insert karo (upsert)
    db.calculate_data.update_one(filter, update_operations, upsert=True)

def get_calculated_data(form_id, subject_name):
    """
    Pre-calculated data ko retrieve karo analysis ke liye.
    """
    return db.calculate_data.find_one({'form_id': form_id, 'subject_name': subject_name})