// // script.js
// document.addEventListener('DOMContentLoaded', () => {
//     // User account setup
//     const userAccount = {
//         getUserInitial: () => {
//             // In a real application, this would come from your authentication system
//             const user = sessionStorage.getItem('currentUser') || 'User';
//             return user.charAt(0).toUpperCase();
//         },
        
//         updateUserDisplay: () => {
//             const userAccountElement = document.getElementById('userAccount');
//             userAccountElement.textContent = userAccount.getUserInitial();
//         }
//     };

//     // Initialize user display
//     userAccount.updateUserDisplay();

//     // New form functionality
//     const formsGrid = document.getElementById('formsGrid');
//     let formCount = 5; // Starting count based on existing forms

//     document.querySelector('.new-form-card').addEventListener('click', () => {
//         const newCard = document.createElement('div');
//         newCard.className = 'form-card';
//         newCard.innerHTML = `
//             <div class="form-title">FeedBack Form Sem ${formCount}</div>
//         `;
//         formsGrid.appendChild(newCard);
//         formCount++;
//     });

//     // Search functionality
//     const searchBar = document.querySelector('.search-bar');
//     searchBar.addEventListener('input', (e) => {
//         const searchTerm = e.target.value.toLowerCase();
//         const cards = document.querySelectorAll('.form-card');
        
//         cards.forEach(card => {
//             const title = card.querySelector('.form-title').textContent.toLowerCase();
//             if (title.includes(searchTerm) || card.classList.contains('new-form-card')) {
//                 card.style.display = 'flex';
//             } else {
//                 card.style.display = 'none';
//             }
//         });
//     });
    
//     const emptyState = document.getElementById('emptyState');
//     const createFirstForm = document.getElementById('createFirstForm');
//     const createNewForm = document.getElementById('createNewForm');

//     // Check if user has any forms (you'll need to implement this logic)
//     const hasExistingForms = localStorage.getItem('hasForms') === 'true';

//     // Show/hide appropriate views
//     if (!hasExistingForms) {
//         emptyState.classList.remove('hidden');
//         formsGrid.classList.add('hidden');
//     } else {
//         emptyState.classList.add('hidden');
//         formsGrid.classList.remove('hidden');
//     }

//     // Handle form creation
//     function createNewFormHandler() {
//         // Add your form creation logic here
//         localStorage.setItem('hasForms', 'true');
//         window.location.href = '/create-form.html'; // Redirect to form creator
//     }

//     createFirstForm.addEventListener('click', createNewFormHandler);
//     createNewForm.addEventListener('click', createNewFormHandler);

//     // View toggle functionality
//     const viewToggles = document.querySelectorAll('.view-toggle');
//     viewToggles.forEach(toggle => {
//         toggle.addEventListener('click', () => {
//             viewToggles.forEach(t => t.classList.remove('active'));
//             toggle.classList.add('active');
            
//             const view = toggle.dataset.view;
//             formsGrid.className = `forms-${view}`; // Switch between grid and list view
//         });
//     });

//     const newFormBox = document.querySelector('.new-form-box');
//     const newFormText = document.querySelector('.new-form-text');
//     const partitionTwo = document.querySelector('.partition-two');
//     const noFormsMessage = document.querySelector('.no-forms-message');

//     function handleFormCreation() {
//         // Create new form data
//         const formId = `form_${Date.now()}`;
//         const initialFormData = {
//             id: formId,
//             title: 'Untitled Form',
//             description: '',
//             lastModified: new Date().toISOString(),
//             questions: []
//         };

//         // Save to localStorage
//         localStorage.setItem(`form_${formId}`, JSON.stringify(initialFormData));
        
//         // Update forms list
//         const formsList = JSON.parse(localStorage.getItem('forms_list') || '[]');
//         formsList.push(initialFormData);
//         localStorage.setItem('forms_list', JSON.stringify(formsList));

//         // Handle UI updates before redirect
//         if (noFormsMessage) {
//             noFormsMessage.remove();
//         }

//         let formsContainer = document.querySelector('.forms-container');
//         if (!formsContainer) {
//             formsContainer = document.createElement('div');
//             formsContainer.className = 'forms-container';
//             partitionTwo.appendChild(formsContainer);
//         }

//         const formCard = createFormCard(initialFormData);
//         formsContainer.appendChild(formCard);

//         // Redirect to form creation page
//         window.location.href = `../Form_Creation/form.html?id=${formId}`;
//     }

//     // Add single click handler to both elements
//     [newFormBox, newFormText].forEach(element => {
//         element.style.cursor = 'pointer';
//         element.addEventListener('click', handleFormCreation);
//     });

//     // Load existing forms on page load
//     loadForms();
// });

// function createFormCard(formData) {
//     const card = document.createElement('div');
//     card.className = 'form-card';
//     card.dataset.formId = formData.id;
//     card.innerHTML = `
//         <div class="form-card-content">
//             <span class="material-icons form-icon">description</span>
//             <div class="form-details">
//                 <h3 class="form-title">${formData.title}</h3>
//                 <p class="form-date">Modified ${new Date(formData.lastModified).toLocaleDateString()}</p>
//             </div>
//         </div>
//     `;

//     card.addEventListener('click', () => {
//         window.location.href = `../Form_Creation/form.html?id=${formData.id}`;
//     });

//     return card;
// }

// function loadForms() {
//     const formsList = JSON.parse(localStorage.getItem('forms_list') || '[]');
    
//     if (formsList.length > 0) {
//         // Remove no forms message if exists
//         const noFormsMessage = document.querySelector('.no-forms-message');
//         if (noFormsMessage) {
//             noFormsMessage.style.display = 'none';
//         }

//         // Create forms container if doesn't exist
//         let formsContainer = document.querySelector('.forms-container');
//         if (!formsContainer) {
//             formsContainer = document.createElement('div');
//             formsContainer.className = 'forms-container';
//             partitionTwo.appendChild(formsContainer);
//         }

//         // Display forms
//         formsContainer.innerHTML = formsList.map(form => `
//             <div class="form-card" data-form-id="${form.id}">
//                 <div class="form-card-content">
//                     <span class="material-icons">description</span>
//                     <div class="form-details">
//                         <h3 class="form-title">${form.title}</h3>
//                         <p class="form-date">Modified ${new Date(form.lastModified).toLocaleDateString()}</p>
//                     </div>
//                 </div>
//             </div>
//         `).join('');

//         // Add click handlers to form cards
//         document.querySelectorAll('.form-card').forEach(card => {
//             card.addEventListener('click', () => {
//                 const formId = card.dataset.formId;
//                 window.location.href = `../Form_Creation/form.html?id=${formId}`;
//             });
//         });
//     }
// }

// document.addEventListener('DOMContentLoaded', function() {
//     const formsContainer = document.querySelector('.forms-container');
//     const noFormsMessage = document.querySelector('.no-forms-message');
//     const newFormBox = document.querySelector('.new-form-box');

//     function displaySavedForms() {
//         const savedForms = JSON.parse(localStorage.getItem('savedForms')) || [];
        
//         // Show/hide no forms message
//         noFormsMessage.style.display = savedForms.length === 0 ? 'flex' : 'none';
        
//         if (savedForms.length === 0) {
//             formsContainer.innerHTML = '';
//             return;
//         }

//         const formsHTML = savedForms.map((form, index) => `
//             <div class="form-card" data-form-id="${index}">
//                 <div class="form-card-content">
//                     <span class="material-icons form-icon">description</span>
//                     <div class="form-details">
//                         <h3 class="form-title">${form.title || 'Untitled Form'}</h3>
//                         <div class="form-meta">
//                             Modified ${new Date(form.lastModified).toLocaleDateString()}
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         `).join('');

//         formsContainer.innerHTML = formsHTML;
//     }

//     // Handle form card clicks
//     formsContainer.addEventListener('click', function(e) {
//         const formCard = e.target.closest('.form-card');
//         if (formCard) {
//             const formId = formCard.dataset.formId;
//             window.location.href = `Form/form.html?formId=${formId}`;
//         }
//     });

//     // Handle new form creation
//     newFormBox.addEventListener('click', function() {
//         window.location.href = 'Form/form.html';
//     });

//     // Initial display of forms
//     displaySavedForms();
// });

// document.addEventListener('DOMContentLoaded', function() {
//     // Get the new form box element
//     const newFormBox = document.querySelector('.new-form-box');
    
//     // Add click event listener to new form box
//     newFormBox.addEventListener('click', function() {
//         console.log('New form box clicked'); // Debug line
//         window.location.href = 'Form/form.html';
//     });
// });




















    // // Save form data (replace with backend call)
    // saveBtn.addEventListener('click', function () {
    //     const formData = {
    //         title: document.querySelector('.form-title').value,
    //         description: document.querySelector('.form-description').value,
    //         sections: []
    //     };

    //     document.querySelectorAll('.form-section').forEach(section => {
    //         const sectionData = {
    //             badge: section.querySelector('.section-badge').textContent,
    //             questions: []
    //         };
    //         section.querySelectorAll('.question-block').forEach(block => {
    //             const question = {
    //                 title: block.querySelector('.question-title').textContent,
    //                 input: block.querySelector('.preview-input-field').value
    //             };
    //             sectionData.questions.push(question);
    //         });
    //         formData.sections.push(sectionData);
    //     });

    //     console.log('Form Data to Save:', formData);
    //     alert('Form data logged to console. Add your backend save here.');
    // });











//      Navigation Buttons
//   <div class="form-navigation">
//         <button id="prevBtn" class="nav-button">Back</button>
//         <button id="nextBtn" class="nav-button">Next</button>
//     </div>






// <!-- <div class="col-md-6">
// <div class="card full-height">
//     <div class="card-body">
//         <div class="card-title">Total income & spend statistics</div>
//         <div class="row py-3">
//             <div class="col-md-4 d-flex flex-column justify-content-around">
//                 <div>
//                     <h6 class="fw-bold text-uppercase text-success op-8">Total Income</h6>
//                     <h3 class="fw-bold">$9.782</h3>
//                 </div>
//                 <div>
//                     <h6 class="fw-bold text-uppercase text-danger op-8">Total Spend</h6>
//                     <h3 class="fw-bold">$1,248</h3>
//                 </div>
//             </div>
//             <div class="col-md-8">
//                 <div id="chart-container">
//                     <canvas id="totalIncomeChart"></canvas>
//                 </div>
//             </div>
//         </div>
//     </div>
// </div>
// </div> -->


// <!--
// 									<li class="{% if 'ui-panels' in segment %} active {% endif %}">
// 										<a href="/ui-panels.html">
// 											<span class="sub-item">Panels</span>
// 										</a>
// 									</li>
// 									<li class="{% if 'ui-notifications' in segment %} active {% endif %}">
// 										<a href="/ui-notifications.html">
// 											<span class="sub-item">Notifications</span>
// 										</a>
// 									</li>
// 									<li class="{% if 'ui-sweetalert' in segment %} active {% endif %}">
// 										<a href="/ui-sweetalert.html">
// 											<span class="sub-item">Sweet Alert</span>
// 										</a>
// 									</li>
// 									<li class="{% if 'ui-fontawesome' in segment %} active {% endif %}">
// 										<a href="/ui-fontawesome.html">
// 											<span class="sub-item">Font Awesome Icons</span>
// 										</a>
// 									</li>
// 									<li class="{% if 'ui-simpleline' in segment %} active {% endif %}">
// 										<a href="/ui-simpleline.html">
// 											<span class="sub-item">Simple Line Icons</span>
// 										</a>
// 									</li>
// 									<li class="{% if 'ui-flaticons' in segment %} active {% endif %}">
// 										<a href="/ui-flaticons.html">
// 											<span class="sub-item">Flaticons</span>
// 										</a>
// 									</li>
// 									<li class="{% if 'ui-typography' in segment %} active {% endif %}">
// 										<a href="/ui-typography.html">
// 											<span class="sub-item">Typography</span>
// 										</a>
// 									</li>
// 									-->


// <!--
// 						<li class="nav-item {% if 'layout' in segment %} active {% endif %}">
// 							<a data-toggle="collapse" href="#sidebarLayouts">
// 								<i class="fas fa-th-list"></i>
// 								<p>Sidebar Layouts</p>
// 								<span class="caret"></span>
// 							</a>
// 							<div class="collapse" id="sidebarLayouts">
// 								<ul class="nav nav-collapse">
// 									<li>
// 										<a href="/layout-sidebar-style-1.html">
// 											<span class="sub-item">Sidebar Style 1</span>
// 										</a>
// 									</li>
// 									<li>
// 										<a href="/layout-overlay-sidebar.html">
// 											<span class="sub-item">Overlay Sidebar</span>
// 										</a>
// 									</li>
// 									<li>
// 										<a href="/layout-compact-sidebar.html">
// 											<span class="sub-item">Compact Sidebar</span>
// 										</a>
// 									</li>
// 									<li>
// 										<a href="/layout-static-sidebar.html">
// 											<span class="sub-item">Static Sidebar</span>
// 										</a>
// 									</li>
// 									<li>
// 										<a href="/layout-icon-menu.html">
// 											<span class="sub-item">Icon Menu</span>
// 										</a>
// 									</li>
// 								</ul>
// 							</div>
// 						</li>
// 						<li class="nav-item {% if 'form' in segment %} active {% endif %}">
// 							<a data-toggle="collapse" href="#forms">
// 								<i class="fas fa-pen-square"></i>
// 								<p>Forms</p>
// 								<span class="caret"></span>
// 							</a>
// 							<div class="collapse {% if 'forms' in segment %} show {% endif %}" id="forms">
// 								<ul class="nav nav-collapse">
// 									<li class="{% if 'forms' in segment %} active {% endif %}">
// 										<a href="/forms.html">
// 											<span class="sub-item">Basic Form</span>
// 										</a>
// 									</li>
// 								</ul>
// 							</div>
// 						</li>
// 						<li class="nav-item {% if 'tables' in segment %} active {% endif %}">
// 							<a data-toggle="collapse" href="#tables">
// 								<i class="fas fa-table"></i>
// 								<p>Tables</p>
// 								<span class="caret"></span>
// 							</a>
// 							<div class="collapse {% if 'tables-' in segment %} show {% endif %}" id="tables">
// 								<ul class="nav nav-collapse">
// 									<li class="{% if 'tables-simple' in segment %} active {% endif %}">
// 										<a href="/tables-simple.html">
// 											<span class="sub-item">Basic Table</span>
// 										</a>
// 									</li>
// 									<li class="{% if 'tables-data' in segment %} active {% endif %}">
// 										<a href="/tables-data.html">
// 											<span class="sub-item">Datatables</span>
// 										</a>
// 									</li>
// 								</ul>
// 							</div>
// 						</li>
// 						<li class="nav-item {% if 'maps' in segment %} active {% endif %}">
// 							<a data-toggle="collapse" href="#maps">
// 								<i class="fas fa-map-marker-alt"></i>
// 								<p>Maps</p>
// 								<span class="caret"></span>
// 							</a>
// 							<div class="collapse {% if 'maps-' in segment %} show {% endif %}" id="maps">
// 								<ul class="nav nav-collapse">
// 									<li class="{% if 'maps-jqvmap' in segment %} active {% endif %}">
// 										<a href="/maps-jqvmap.html">
// 											<span class="sub-item">JQVMap</span>
// 										</a>
// 									</li>
// 								</ul>
// 							</div>
// 						</li>
// 						<li class="nav-item {% if 'charts' in segment %} active {% endif %}">
// 							<a data-toggle="collapse" href="#charts">
// 								<i class="far fa-chart-bar"></i>
// 								<p>Charts</p>
// 								<span class="caret"></span>
// 							</a>
// 							<div class="collapse {% if 'charts' in segment %} show {% endif %}" id="charts">
// 								<ul class="nav nav-collapse">
// 									<li class="{% if 'charts.html' in segment %} active {% endif %}">
// 										<a href="/charts.html">
// 											<span class="sub-item">Chart Js</span>
// 										</a>
// 									</li>
// 									<li class="{% if 'charts-sparkline' in segment %} active {% endif %}">
// 										<a href="/charts-sparkline.html">
// 											<span class="sub-item">Sparkline</span>
// 										</a>
// 									</li>
// 								</ul>
// 							</div>
// 						</li>
// 						<li class="nav-item {% if 'widgets' in segment %} active {% endif %}">
// 							<a href="/widgets.html">
// 								<i class="fas fa-desktop"></i>
// 								<p>Widgets</p>
// 								<span class="badge badge-success">4</span>
// 							</a>
// 						</li>
// 						<li class="nav-item">
// 							<a data-toggle="collapse" href="#submenu">
// 								<i class="fas fa-bars"></i>
// 								<p>Menu Levels</p>
// 								<span class="caret"></span>
// 							</a>
// 							<div class="collapse" id="submenu">
// 								<ul class="nav nav-collapse">
// 									<li>
// 										<a data-toggle="collapse" href="#subnav1">
// 											<span class="sub-item">Level 1</span>
// 											<span class="caret"></span>
// 										</a>
// 										<div class="collapse" id="subnav1">
// 											<ul class="nav nav-collapse subnav">
// 												<li>
// 													<a href="#">
// 														<span class="sub-item">Level 2</span>
// 													</a>
// 												</li>
// 												<li>
// 													<a href="#">
// 														<span class="sub-item">Level 2</span>
// 													</a>
// 												</li>
// 											</ul>
// 										</div>
// 									</li>
// 									<li>
// 										<a data-toggle="collapse" href="#subnav2">
// 											<span class="sub-item">Level 1</span>
// 											<span class="caret"></span>
// 										</a>
// 										<div class="collapse" id="subnav2">
// 											<ul class="nav nav-collapse subnav">
// 												<li>
// 													<a href="#">
// 														<span class="sub-item">Level 2</span>
// 													</a>
// 												</li>
// 											</ul>
// 										</div>
// 									</li>
// 									<li>
// 										<a href="#">
// 											<span class="sub-item">Level 1</span>
// 										</a>
// 									</li>
// 								</ul>
// 							</div>
// 						</li>
// 						<li class="mx-4 mt-2">
//                             <a target="_blank"
//                                href="https://appseed.us/admin-dashboards/flask-dashboard-atlantis-dark-pro" 
//                                class="btn btn-danger btn-block">
//                                 <span class="btn-label mr-2"> <i class="fa fa-rocket"></i> </span>PRO Version</a> 
// 						</li>
// 						-->












// route . py

// from flask import Blueprint, render_template, request, redirect, url_for, jsonify
// from flask_login import login_required, current_user
// from pymongo import MongoClient
// import uuid
// from datetime import datetime

// # MongoDB Connection
// client = MongoClient('mongodb://localhost:27017/')
// db = client['faculty_feedback_db']

// feedback_bp = Blueprint('feedback_form', __name__)

// @feedback_bp.route('/dashboard')
// @login_required
// def form_dashboard():
//     user_forms = list(db.forms.find({'creator_id': current_user.id}).sort('modified_at', -1))
//     for form in user_forms:
//         if 'modified_at' in form and not isinstance(form['modified_at'], datetime):
//             form['modified_at'] = datetime.strptime(form['modified_at'], '%Y-%m-%dT%H:%M:%S.%f')
//     return render_template('feedback_form/form_dashboard.html', forms=user_forms)

// @feedback_bp.route("/new")
// @login_required
// def new_form():
//     form_id = str(uuid.uuid4())[:18]
//     return redirect(url_for('feedback_form.edit_form', form_id=form_id))

// @feedback_bp.route("/edit/<form_id>", methods=["GET", "POST"])
// @login_required
// def edit_form(form_id):
//     if request.method == "GET":
//         form = db.forms.find_one({'form_id': form_id, 'creator_id': current_user.id})
//         if form:
//             return render_template('feedback_form/edit_form.html', form=form)
//         else:
//             blank_form = {
//                 'form_id': form_id,
//                 'title': 'Untitled Form',
//                 'description': '',
//                 'subjects': []
//             }
//             return render_template('feedback_form/edit_form.html', form=blank_form)

//     if request.method == "POST":
//         if request.is_json:
//             data = request.get_json()
//             title = data.get('form_title', 'Untitled Form')
//             description = data.get('form_description', '')
//             subjects = data.get('subjects', [])
//         else:
//             title = request.form.get('title', 'Untitled Form')
//             description = request.form.get('description', '')
//             subjects = request.form.getlist('subjects[]')
        
//         now = datetime.utcnow()
//         form_data = {
//             'form_id': form_id,
//             'title': title,
//             'description': description,
//             'subjects': subjects,
//             'creator_id': current_user.id,
//             'modified_at': now
//         }

//         form = db.forms.find_one({'form_id': form_id, 'creator_id': current_user.id})
//         if form:
//             db.forms.update_one({'form_id': form_id}, {'$set': form_data})
//         else:
//             form_data['created_at'] = now
//             db.forms.insert_one(form_data)

//         return jsonify({"message": "Form saved successfully"})

// @feedback_bp.route("/view/<form_id>")
// def view_form(form_id):
//     form = db.forms.find_one({'form_id': form_id})
//     if form:
//         return render_template('feedback_form/view_form.html', form=form)
//     else:
//         return 'Form not found', 404

// @feedback_bp.route("/delete/<form_id>", methods=["POST"])
// @login_required
// def delete_form(form_id):
//     result = db.forms.delete_one({'form_id': form_id, 'creator_id': current_user.id})
//     if result.deleted_count:
//         return jsonify({"message": "Form deleted successfully"})
//     else:
//         return jsonify({"message": "Form not found or deletion failed"}), 404

// @feedback_bp.route("/submit/<form_id>", methods=["POST"])
// def submit_form(form_id):
//     form = db.forms.find_one({'form_id': form_id})
//     if not form:
//         return 'Form not found', 404

//     # Raw form data
//     raw_data = request.form.to_dict()

//     # Structured data
//     structured_data = {
//         'form_id': form_id,
//         'submitted_at': datetime.utcnow(),
//         'student_info': {},
//         'subjects': [],
//         'department_feedback': {}
//     }

//     # Student Info
//     student_fields = ['email', 'enrollment_number', 'student_name', 'discipline', 'branch', 'semester']
//     for field in student_fields:
//         structured_data['student_info'][field] = raw_data.get(field, '')

//     # Subjects
//     subject_count = len(form['subjects'])  # Form mein subjects ki count
//     for i in range(subject_count):
//         section_num = i + 2  # Section 2 se start hota hai subjects ka data
//         subject_data = {
//             'subject_name': form['subjects'][i]['subject_name'],
//             'faculty_name': form['subjects'][i]['faculty_name'],
//             'syllabus_covered': raw_data.get(f'syllabus_covered_{section_num}', ''),
//             'ratings': {
//                 'punctuality': raw_data.get(f'punctuality_{section_num}', ''),
//                 'voice': raw_data.get(f'voice_{section_num}', ''),
//                 'aids': raw_data.get(f'aids_{section_num}', ''),
//                 'prep': raw_data.get(f'prep_{section_num}', ''),
//                 'plan': raw_data.get(f'plan_{section_num}', ''),
//                 'depth': raw_data.get(f'depth_{section_num}', ''),
//                 'reaction': raw_data.get(f'reaction_{section_num}', ''),
//                 'behavior': raw_data.get(f'behavior_{section_num}', ''),
//                 'pace': raw_data.get(f'pace_{section_num}', ''),
//                 'comm': raw_data.get(f'comm_{section_num}', ''),
//                 'motiv': raw_data.get(f'motiv_{section_num}', ''),
//                 'expl': raw_data.get(f'expl_{section_num}', ''),
//                 'clarity': raw_data.get(f'clarity_{section_num}', ''),
//                 'overall': raw_data.get(f'overall_{section_num}', '')
//             },
//             'lab_ratings': {
//                 'lab_expl': raw_data.get(f'lab_expl_{section_num}', ''),
//                 'equip': raw_data.get(f'equip_{section_num}', ''),
//                 'lab_activ': raw_data.get(f'lab_activ_{section_num}', ''),
//                 'safety': raw_data.get(f'safety_{section_num}', '')
//             }
//         }
//         structured_data['subjects'].append(subject_data)

//     # Department Feedback
//     dept_fields = [
//         'feedback_q1', 'improve_teaching', 'improve_department', 
//         'strengths_department', 'weaknesses_department', 
//         'strengths_university', 'weaknesses_university', 'suggestions_university'
//     ]
//     for field in dept_fields:
//         structured_data['department_feedback'][field] = raw_data.get(field, '')

//     # Save to MongoDB
//     db.form_responses.insert_one(structured_data)
//     return redirect(url_for('feedback_form.submitted', form_id=form_id))

// @feedback_bp.route("/submitted/<form_id>")
// def submitted(form_id):
//     return render_template('feedback_form/form_submitted.html', form_id=form_id)



// @feedback_bp.route("/analysis/<form_id>")
// @login_required
// def form_analysis(form_id):
//     # Check if form exists and belongs to the creator
//     form = db.forms.find_one({'form_id': form_id, 'creator_id': current_user.id})
//     if not form:
//         return 'Form not found or unauthorized', 403

//     # Fetch all responses for this form
//     responses = list(db.form_responses.find({'form_id': form_id}))
//     total_responses = len(responses)

//     return render_template('analysis_form/responses_data.html', 
//                           form=form, 
//                           responses=responses, 
//                           total_responses=total_responses,
//                           segment='analysis')

// @feedback_bp.route("/analysis/<form_id>/<subject_name>")
// @login_required
// def subject_analysis(form_id, subject_name):
//     form = db.forms.find_one({'form_id': form_id, 'creator_id': current_user.id})
//     if not form:
//         return "Form not found or unauthorized", 403
    
//     subject = next((s for s in form['subjects'] if s['subject_name'] == subject_name), None)
//     if not subject:
//         return "Subject not found", 404
    
//     responses = list(db.form_responses.find({'form_id': form_id}))
//     total_responses = len(responses)
    
//     # Initialize data structures
//     ratings_categories = [
//         "punctuality", "voice", "aids", "prep", "plan", "depth", "reaction", 
//         "behavior", "pace", "comm", "motiv", "expl", "clarity", "overall"
//     ]
//     lab_ratings_categories = ["lab_expl", "equip", "lab_activ", "safety"]
//     all_categories = ratings_categories + lab_ratings_categories
    
//     ratings_count = {cat: {5: 0, 4: 0, 3: 0, 2: 0, 1: 0} for cat in all_categories}
//     syllabus_covered_total = 0
    
//     # Process responses
//     for response in responses:
//         for subj in response["subjects"]:
//             if subj["subject_name"] == subject_name:
//                 syllabus_covered_total += int(subj["syllabus_covered"])
//                 for cat in ratings_categories:
//                     rating = int(subj["ratings"][cat])
//                     ratings_count[cat][rating] += 1
//                 for cat in lab_ratings_categories:
//                     rating = int(subj["lab_ratings"][cat])
//                     ratings_count[cat][rating] += 1
    
//     # Calculate percentages
//     percentages = {}
//     for cat in all_categories:
//         percentages[cat] = {
//             "excellent": (ratings_count[cat][5] / total_responses) * 100 if total_responses > 0 else 0,
//             "very_good": (ratings_count[cat][4] / total_responses) * 100 if total_responses > 0 else 0,
//             "good": (ratings_count[cat][3] / total_responses) * 100 if total_responses > 0 else 0,
//             "average": (ratings_count[cat][2] / total_responses) * 100 if total_responses > 0 else 0,
//             "below_average": (ratings_count[cat][1] / total_responses) * 100 if total_responses > 0 else 0
//         }
    
//     # Average syllabus covered
//     avg_syllabus_covered = syllabus_covered_total / total_responses if total_responses > 0 else 0
    
//     # Chart data (based on 'overall' rating)
//     chart_data = [
//         ratings_count["overall"][5],  # Excellent
//         ratings_count["overall"][4],  # Very Good
//         ratings_count["overall"][3],  # Good
//         ratings_count["overall"][2],  # Average
//         ratings_count["overall"][1]   # Below Average
//     ]
    
//     # Average percentages for the last row
//     avg_percentages = {
//         "excellent": sum(percentages[cat]["excellent"] for cat in all_categories) / len(all_categories),
//         "very_good": sum(percentages[cat]["very_good"] for cat in all_categories) / len(all_categories),
//         "good": sum(percentages[cat]["good"] for cat in all_categories) / len(all_categories),
//         "average": sum(percentages[cat]["average"] for cat in all_categories) / len(all_categories),
//         "below_average": sum(percentages[cat]["below_average"] for cat in all_categories) / len(all_categories)
//     }

//     return render_template('analysis_form/subject_analysis.html', 
//                           form=form, 
//                           subject=subject, 
//                           responses=responses,
//                           total_responses=total_responses,
//                           percentages=percentages,
//                           avg_syllabus_covered=avg_syllabus_covered,
//                           chart_data=chart_data,
//                           avg_percentages=avg_percentages,
//                           segment='subject_analysis',
//                           subject_name=subject_name)






















// route.py

// # MongoDB Connection (optional, already in models, but kept for reference)
// client = MongoClient('mongodb://localhost:27017/')
// db = client['faculty_feedback_db']
// form_responses_collection = db["form_responses"]
// calculated_data_collection = db["calculated_data"]

// # Define all fields (optional, already in models, kept for reference)
// ratings_fields = [
//     "punctuality", "voice", "aids", "prep", "plan", "depth", "reaction",
//     "behavior", "pace", "comm", "motiv", "expl", "clarity", "overall"
// ]
// lab_ratings_fields = ["lab_expl", "equip", "lab_activ", "safety"]
// all_fields = ratings_fields + lab_ratings_fields