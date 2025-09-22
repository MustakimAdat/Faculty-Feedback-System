# models/form.py

from pymongo import MongoClient

# Initialize MongoDB connection (adjust the URL and db name as needed)
client = MongoClient('mongodb://localhost:27017/')
db = client['faculty_feedback_db']

class Form:
    @staticmethod
    def create(form_data):
        """
        Inserts a new form document into the forms collection.
        :param form_data: Dictionary containing form details.
        :return: InsertOneResult object.
        """
        result = db.forms.insert_one(form_data)
        return result

    @staticmethod
    def update(form_id, form_data):
        """
        Updates an existing form document identified by form_id.
        :param form_id: The unique ID of the form.
        :param form_data: Dictionary containing updated form details.
        :return: UpdateResult object.
        """
        result = db.forms.update_one({'form_id': form_id}, {'$set': form_data})
        return result

    @staticmethod
    def find_by_id(form_id):
        """
        Finds a form document by its form_id.
        :param form_id: The unique ID of the form.
        :return: Form document if found, else None.
        """
        form = db.forms.find_one({'form_id': form_id})
        return form

    @staticmethod
    def find_by_creator(creator_id):
        """
        Retrieves all forms created by a specific user.
        :param creator_id: The user's ID.
        :return: List of form documents.
        """
        forms = list(db.forms.find({'creator_id': creator_id}))
        return forms
