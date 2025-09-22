# Faculty Feedback System

> A web-based application to collect, manage, and analyze student feedback for faculty members. Built with Flask, HTML, CSS, and JavaScript. Ideal for colleges and training institutes — lightweight, responsive and easy to deploy.

---

## 🧾 Short description

Faculty Feedback System lets students submit feedback for faculty members through a simple interface. Administrators and faculty can view, filter, and export feedback; generate basic reports; and manage users.

This README is resume-ready: use the project title, short description, tech stack, and screenshots in your portfolio or CV.

---

## ⭐ Key features

* Student feedback submission with optional anonymity
* Role-based access: Student, Faculty, Admin
* Admin dashboard for managing users and viewing aggregated feedback
* Faculty dashboard to view feedback for their courses
* Feedback report generation (table view; export option can be added)
* Responsive frontend (works on mobile & desktop)

---

## 🛠 Tech stack

* **Backend:** Python, Flask
* **Frontend:** HTML, CSS, JavaScript
* **Database:** MySQL (can be swapped with SQLite during development)
* **Extras/Tools:** Git, virtualenv, pip

---

## 📁 Project structure

```
├── app
│   ├── blueprint
│   │   ├── admin
│   │   │   └── __pycache__
│   │   ├── auth
│   │   │   └── __pycache__
│   │   └── feedback_form
│   │       └── __pycache__
│   ├── models
│   │   ├── admin
│   │   ├── feedback_form
│   │   │   └── __pycache__
│   │   └── users
│   │       └── __pycache__
│   ├── static
│   │   ├── assets
│   │   ├── css
│   │   ├── fonts
│   │   │   ├── flaticon
│   │   │   ├── fontawesome
│   │   │   ├── simple-line-icons
│   │   │   └── summernote
│   │   └── js
│   │       ├── core
│   │       └── plugin
│   │           ├── bootstrap-notify
│   │           ├── chart-circle
│   │           ├── chart.js
│   │           ├── datatables
│   │           ├── jquery-scrollbar
│   │           ├── jquery-ui-1.12.1.custom
│   │           ├── jquery-ui-touch-punch
│   │           ├── jquery.sparkline
│   │           ├── jqvmap
│   │           │   └── maps
│   │           │       └── continents
│   │           ├── sweetalert
│   │           └── webfont
│   ├── templates
│   │   ├── admin
│   │   ├── analysis_form
│   │   ├── auth
│   │   ├── feedback_form
│   │   ├── includes
│   │   └── layouts
│   └── __pycache__
└── dummydata
```

---

## ⚙️ Installation (dev environment)

1. Clone the repository

```bash
git clone https://github.com/your-username/faculty-feedback-system.git
cd faculty-feedback-system
```

2. Create and activate a Python virtual environment

```bash
python -m venv venv
# Linux / macOS
source venv/bin/activate
# Windows (PowerShell)
venv\Scripts\Activate.ps1
```

3. Install dependencies

```bash
pip install -r requirements.txt
```

4. Configuration

* Copy `config.example.py` to `config.py` (or create a `.env`) and set:

  * `SECRET_KEY`
  * `DATABASE_URI` (MySQL connection string) — example: `mysql+pymysql://user:password@localhost/faculty_feedback_db`

Optional: For quick local testing you can use SQLite by setting `DATABASE_URI = 'sqlite:///dev.db'`.

5. Initialize the database

```bash
# If using Flask-Migrate (recommended)
flask db init
flask db migrate -m "init"
flask db upgrade

# Or run the provided SQL (if you have schema.sql)
mysql -u root -p faculty_feedback_db < schema.sql
```

6. Run the app

```bash
python app.py
# or if using Flask CLI
flask run
```

Open [http://127.0.0.1:5000](http://127.0.0.1:5000) in your browser.

---

## 🧩 Usage (roles & flows)

**Student**

* Register / Login
* Select faculty/course
* Submit feedback (ratings + comments)

**Faculty**

* Login
* View feedback for courses
* Filter by semester, course, or date range

**Admin**

* Manage users (create/edit/delete)
* View aggregated feedback and basic statistics

---

## 📸 Screenshots (placeholders)

Add your screenshots to a folder `screenshots/` and reference them here. Example markdown to add images:

```markdown
![Login](/screenshots/01_login.png)
![Feedback Form](/screenshots/03_feedback_form.png)
![Faculty Dashboard](/screenshots/04_faculty_dashboard.png)
![Admin Dashboard](/screenshots/05_admin_dashboard.png)
![Reports](/screenshots/06_reports.png)
```

**Recommendation:** export screenshots at 1200×700 (or similar landscape size) for a crisp GitHub preview.

---

## 🔮 Future enhancements

* Add chart-based analytics (Chart.js or Plotly) for visual feedback insights.
* Export reports to CSV / PDF.
* Add email notifications for low ratings.
* Role-based permissions with OAuth/SAML integration (for campus SSO).

---

## 📄 License

This project is licensed under the MIT License. See `LICENSE` for details.

---

## 👨‍💻 Author

**Mustakim Adat**
GitHub: `github.com/MustakimAdat`
Email: mustakim.adat.00@gmail.com (mailto:mustakim.adat.00@gmail.com)

---

> If you want, I can also generate a short 2–3 line project tagline for your resume (one-liner) and a 3–4 bullet list that you can paste directly into your CV under the Projects section.
