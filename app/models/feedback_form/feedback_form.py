# app/models/feedback_form/feedback_form.py
from pymongo import MongoClient
from collections import defaultdict
from datetime import datetime

client = MongoClient('mongodb://localhost:27017/')
db = client['faculty_feedback_db']
form_responses_collection = db["form_responses"]
calculated_data_collection = db["calculated_data"]

# Define all fields
ratings_fields = [
    "punctuality", "voice", "aids", "prep", "plan", "depth", "reaction",
    "behavior", "pace", "comm", "motiv", "expl", "clarity", "overall"
]
lab_ratings_fields = ["lab_expl", "equip", "lab_activ", "safety"]
all_fields = ratings_fields + lab_ratings_fields

# Rating labels
rating_labels = {
    "5": "Excellent", "4": "Very Good", "3": "Good",
    "2": "Average", "1": "Below Average"
}

def calculate_field_percentages(subject_data, total_responses):
    field_summary = {}
    for field, ratings in subject_data.items():
        field_summary[field] = {}
        for rating in ["1", "2", "3", "4", "5"]:
            count = ratings.get(rating, 0)
            percentage = (count / total_responses) * 100 if total_responses > 0 else 0
            label = f"{rating}-{rating_labels[rating]}"
            field_summary[field][label] = {
                "students": count,
                "percentage": round(percentage, 2)
            }
    return field_summary

def calculate_averages(field_summary):
    averages = {"1": 0, "2": 0, "3": 0, "4": 0, "5": 0}  # Initialize with numeric keys
    for field in field_summary.keys():
        for rating in ["1", "2", "3", "4", "5"]:
            label = f"{rating}-{rating_labels[rating]}"
            averages[rating] += field_summary[field][label]["percentage"]
    
    # Normalize averages and convert to labeled keys
    for rating in ["1", "2", "3", "4", "5"]:
        averages[rating] /= len(all_fields)
        averages[rating] = round(averages[rating], 2)
        label = f"{rating}-{rating_labels[rating]}"
        averages[label] = averages.pop(rating)  # Replace numeric key with labeled key
    
    return averages

def update_calculated_data(form_id):
    responses = form_responses_collection.find({"form_id": form_id})
    total_responses = form_responses_collection.count_documents({"form_id": form_id})
    
    subject_data = defaultdict(lambda: defaultdict(lambda: defaultdict(int)))
    syllabus_covered_total = defaultdict(float)
    
    for response in responses:
        for subject in response.get("subjects", []):
            subject_name = subject["subject_name"]
            ratings = subject.get("ratings", {})
            lab_ratings = subject.get("lab_ratings", {})
            syllabus_covered_total[subject_name] += float(subject.get("syllabus_covered", 0) or 0)
            
            for field in ratings_fields:
                rating = ratings.get(field, "0")
                if rating in ["1", "2", "3", "4", "5"]:
                    subject_data[subject_name][field][rating] += 1
            
            for field in lab_ratings_fields:
                rating = lab_ratings.get(field, "0")
                if rating in ["1", "2", "3", "4", "5"]:
                    subject_data[subject_name][field][rating] += 1
    
    for subject_name, fields in subject_data.items():
        field_summary = calculate_field_percentages(fields, total_responses)
        averages = calculate_averages(field_summary)
        avg_syllabus_covered = (syllabus_covered_total[subject_name] / total_responses) if total_responses > 0 else 0
        
        chart_data = [fields["overall"].get(r, 0) for r in ["5", "4", "3", "2", "1"]]  # Bar chart data
        
        existing = calculated_data_collection.find_one({"form_id": form_id, "subject_name": subject_name})
        if existing:
            calculated_data_collection.update_one(
                {"_id": existing["_id"]},
                {"$set": {
                    "fields": field_summary,
                    "averages": averages,
                    "total_responses": total_responses,
                    "avg_syllabus_covered": round(avg_syllabus_covered, 2),
                    "chart_data": chart_data
                }}
            )
        else:
            calculated_data_collection.insert_one({
                "form_id": form_id,
                "subject_name": subject_name,
                "fields": field_summary,
                "averages": averages,
                "total_responses": total_responses,
                "avg_syllabus_covered": round(avg_syllabus_covered, 2),
                "chart_data": chart_data
            })

# Optional: Export functions for use in routes
__all__ = ['update_calculated_data']