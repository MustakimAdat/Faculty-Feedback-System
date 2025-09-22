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

## 📁 Project structure (example)

```
faculty-feedback-system/
├─ app.py                 # Flask application entrypoint
├─ config.py              # Configuration (DB URI, secret keys)
├─ requirements.txt       # Python dependencies
├─ /templates/            # HTML templates (Jinja2)
│   ├─ base.html
│   ├─ login.html
│   ├─ student_dashboard.html
│   ├─ faculty_dashboard.html
│   └─ admin_dashboard.html
├─ /static/
│   ├─ /css/
│   ├─ /js/
│   └─ /images/
├─ /migrations/           # DB migrations (optional)
└─ README.md
```

> Note: adjust the tree above to match your repository before publishing.

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

## 🔒 Environment variables (suggested)

Put secrets into `config.py` or a `.env` file and never commit them:

```
SECRET_KEY=your_random_secret
DATABASE_URI=mysql+pymysql://user:pass@localhost/faculty_feedback_db
ADMIN_EMAIL=admin@college.edu
```

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
![Student Dashboard](/screenshots/02_student_dashboard.png)
![Feedback Form](/screenshots/03_feedback_form.png)
![Faculty Dashboard](/screenshots/04_faculty_dashboard.png)
![Admin Dashboard](/screenshots/05_admin_dashboard.png)
![Reports](/screenshots/06_reports.png)
```

**Recommendation:** export screenshots at 1200×700 (or similar landscape size) for a crisp GitHub preview. Name files with a leading two-digit index so ordering stays consistent (e.g., `01_login.png`).

---

## 🔍 API endpoints (common / example)

> Update these to match your actual routes from `app.py`.

* `GET /` — Home / landing page
* `GET /login` / `POST /login` — Authentication
* `GET /student/dashboard` — Student dashboard
* `GET /faculty/dashboard` — Faculty dashboard
* `GET /admin/dashboard` — Admin dashboard
* `POST /feedback` — Submit feedback
* `GET /feedback/<id>` — View specific feedback

---

## ✅ Tips for making the repo resume-ready

* Add a short project summary at the top of your GitHub repo (first 1–2 lines of README) — recruiters will read this.
* Include 4–6 screenshots to demonstrate UI and core flows.
* Add `LICENSE` (MIT) and `CONTRIBUTING.md` if you want to show open-source practices.
* Tag the repo with relevant topics: `flask`, `feedback-system`, `education`, `mysql`.
* Add a short `How I built it` or `Challenges & learnings` section to highlight your role (useful for interviews).

---

## 🔮 Future enhancements (resume/portfolio bullets)

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
