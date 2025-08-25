from flask import Flask, render_template, request, redirect, url_for, send_from_directory
import os

from werkzeug.utils import secure_filename
import csv


app = Flask(__name__)
app.config['UPLOAD_FOLDER'] = 'static/uploads'
os.makedirs(os.path.join(app.root_path, app.config['UPLOAD_FOLDER']), exist_ok=True)



# Home route
@app.route('/')
def index():
    # Try to render index.html if it exists, else show a simple message
    try:
        return render_template('index.html')
    except Exception:
        return '<h2>Welcome to PMC Flask App</h2><p>No index.html found in templates.</p>'

# Faculty Form 1 route (GET: show form, POST: process form)
@app.route('/faculty-form1', methods=['GET', 'POST'])
def faculty_form1():
    if request.method == 'POST':
        # Get form fields
        department = request.form.get('department')
        portfolioName = request.form.get('portfolioName')
        portfolioMemberName = request.form.get('portfolioMemberName')
        month = request.form.get('month')
        weekNo = request.form.get('weekNo')
        weekStartDate = request.form.get('weekStartDate')
        weekEndDate = request.form.get('weekEndDate')
        # File and status fields
        file_fields = ['file1', 'file2', 'file3', 'file4']
        status_fields = ['status1', 'status2', 'status3', 'status4']
        desc_fields = ['desc1', 'desc2', 'desc3', 'desc4']
        file_urls = []
        for f in file_fields:
            file = request.files.get(f)
            if file and file.filename:
                filename = secure_filename(file.filename)
                save_path = os.path.join(app.root_path, app.config['UPLOAD_FOLDER'], filename)
                file.save(save_path)
                file_urls.append(url_for('static', filename=f'uploads/{filename}'))
            else:
                file_urls.append('')
        # Save to CSV (or database)
        row = [department, portfolioName, portfolioMemberName, month, weekNo, weekStartDate, weekEndDate]
        for i in range(4):
            row.extend([request.form.get(status_fields[i]), request.form.get(desc_fields[i]), file_urls[i]])
        csv_path = os.path.join(app.root_path, 'faculty_form1_submissions.csv')
        with open(csv_path, 'a', newline='', encoding='utf-8') as f:
            writer = csv.writer(f)
            writer.writerow(row)
        return render_template('faculty-form1-success.html')
    return render_template('faculty-form1.html')


# Route for serving static files (uploads, docs, etc.)
@app.route('/static/<path:filename>')
def static_files(filename):
    return send_from_directory(os.path.join(app.root_path, 'static'), filename)

# Add routes for other HTML pages (GET only)
@app.route('/<page>')
def render_page(page):
    allowed = [
        'index.html','form2-db.html','login.html','form1-db.html','form3-db.html','form4-db.html','form5-db.html','form6-db.html','form7-db.html','form8-db.html',
        'faculty.html','faculty-form1.html','faculty-details.html','faculty-add.html','faculty-list.html', 'faculty-form2.html', 'faculty-form3.html',
        'faculty-form4.html', 'faculty-form5.html', 'faculty-form6.html', 'faculty-form7.html', 'faculty-form8.html',
        'hod.html', 'hod-role.html', 'hod-workdone.html', 'iqac.html', 'iqac-workdone.html', 'management.html',
        'notification.html', 'principal.html', 'principle-page.html', 'add-hod.html', 'animation.html'
    ]
    if not page.endswith('.html'):
        page += '.html'
    if page in allowed:
        return render_template(page)
    return 'Page not found', 404

if __name__ == '__main__':
    app.run(debug=True)
