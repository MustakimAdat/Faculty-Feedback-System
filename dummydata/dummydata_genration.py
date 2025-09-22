import random
import string
from pymongo import MongoClient
from datetime import datetime, timedelta

# MongoDB Connection
client = MongoClient('mongodb://localhost:27017/')
db = client['faculty_feedback_db']
collection = db['form_responses']

# Base form_id from your sample
form_id = "b1b8a217-838c-4823"

# Subjects from your sample
subjects_template = [
    {
        "subject_name": "Computer Network (CO1245)",
        "faculty_name": "Ms. Rupali Atterde"
    },
    {
        "subject_name": "Cloud Computing (CO1585)",
        "faculty_name": "Ms. Madhuri Mehta"
    },
    {
        "subject_name": "Java Programin (CO1587)",
        "faculty_name": "Mr. Awadh Sing"
    },
    {
        "subject_name": "Python Programing (CO1687)",
        "faculty_name": "Ms. Glace Babu"
    },
    {
        "subject_name": "Operating System (CO1368)",
        "faculty_name": "Ms. Nidhi Parrmar"
    },
    {
        "subject_name": "Computer Graphics (CO1635)",
        "faculty_name": "Ms. Prachi Raol"
    }
]

# Function to generate random string for department feedback
def random_string(length=5):
    return ''.join(random.choices(string.ascii_lowercase, k=length))

# Function to generate a single response
def generate_response(enrollment_number):
    # Student Info
    student_name = f"Student {enrollment_number[-3:]}"
    email = f"student{enrollment_number[-3:]}@example.com"
    
    # Random submission time (within last 30 days)
    submitted_at = datetime.utcnow() - timedelta(days=random.randint(0, 30))
    
    # Generate subjects with random ratings
    subjects = []
    for subject in subjects_template:
        subject_data = {
            "subject_name": subject["subject_name"],
            "faculty_name": subject["faculty_name"],
            "syllabus_covered": str(random.randint(50, 100)),
            "ratings": {
                "punctuality": str(random.randint(1, 5)),
                "voice": str(random.randint(1, 5)),
                "aids": str(random.randint(1, 5)),
                "prep": str(random.randint(1, 5)),
                "plan": str(random.randint(1, 5)),
                "depth": str(random.randint(1, 5)),
                "reaction": str(random.randint(1, 5)),
                "behavior": str(random.randint(1, 5)),
                "pace": str(random.randint(1, 5)),
                "comm": str(random.randint(1, 5)),
                "motiv": str(random.randint(1, 5)),
                "expl": str(random.randint(1, 5)),
                "clarity": str(random.randint(1, 5)),
                "overall": str(random.randint(1, 5))
            },
            "lab_ratings": {
                "lab_expl": str(random.randint(1, 5)),
                "equip": str(random.randint(1, 5)),
                "lab_activ": str(random.randint(1, 5)),
                "safety": str(random.randint(1, 5))
            }
        }
        subjects.append(subject_data)

    # Department Feedback with random strings
    department_feedback = {
        "feedback_q1": random_string(),
        "improve_teaching": random_string(),
        "improve_department": random_string(),
        "strengths_department": random_string(),
        "weaknesses_department": random_string(),
        "strengths_university": random_string(),
        "weaknesses_university": random_string(),
        "suggestions_university": random_string()
    }

    # Full response
    response = {
        "form_id": form_id,
        "submitted_at": submitted_at,
        "student_info": {
            "email": email,
            "enrollment_number": enrollment_number,
            "student_name": student_name,
            "discipline": "D.E",
            "branch": "computer",
            "semester": "6"
        },
        "subjects": subjects,
        "department_feedback": department_feedback
    }
    return response

# Generate 60 responses
responses = []
for i in range(1, 61):
    enrollment_number = f"220101103{str(i).zfill(3)}"  # 220101103001 to 220101103060
    response = generate_response(enrollment_number)
    responses.append(response)

# Insert into MongoDB
collection.insert_many(responses)
print(f"Inserted {len(responses)} dummy responses into the database.")