# Smart Attendance System

A comprehensive attendance system using facial recognition and barcode scanning.

## Setup Instructions

### 1. Database Setup
1. Install MySQL and MySQL Workbench
2. Run the SQL commands from `sql_project.sql` to create the database and table
3. Make sure MySQL is running on localhost:3306

### 2. Python Environment Setup
```bash
# Install required packages
pip install -r requirements.txt
```

### 3. Face Images Setup
1. Place student photos in the `faces/` folder
2. Name format: `RegisterNumber_Name.jpg` (e.g., `URK22CS5025_Krisanth M.jpg`)

### 4. Running the Application

#### For Face Recognition System:
```bash
python facialrecognition.py
```

#### For Barcode Scanner Only:
```bash
python barcodescanner.py
```

### 5. Access the Application
- Open your browser and go to `http://localhost:5000`
- Use the web interface to:
  - Register new students
  - Start face recognition attendance
  - Use barcode scanner
  - Download attendance reports

## Features

- **Face Recognition**: Automatic attendance marking using facial recognition
- **Barcode Scanner**: QR/Barcode based attendance system
- **Student Registration**: Web interface for registering new students
- **Attendance Reports**: Download attendance data as CSV
- **Real-time Processing**: Live camera feed with real-time detection

## File Structure

```
backend/
├── facialrecognition.py    # Main face recognition app
├── barcodescanner.py       # Barcode scanner app
├── requirements.txt        # Python dependencies
├── sql_project.sql         # Database setup
├── attendance_list.csv     # Sample attendance data
├── faces/                  # Student photos folder
├── templates/              # HTML templates
│   ├── index.html
│   ├── register.html
│   ├── start_webcam.html
│   └── barcode.html
└── README.md              # This file
```

## Database Configuration

Update the database connection in `facialrecognition.py`:
```python
mydb = mysql.connector.connect(
    host='localhost',
    user='root',
    passwd='1234',  # Change this to your MySQL password
    port='3306',
    database='krisanth',
    auth_plugin='mysql_native_password'
)
```

## Troubleshooting

1. **Camera not working**: Make sure no other application is using the camera
2. **Database connection error**: Verify MySQL is running and credentials are correct
3. **Face recognition not working**: Ensure proper lighting and clear face visibility
4. **Missing dependencies**: Run `pip install -r requirements.txt` again