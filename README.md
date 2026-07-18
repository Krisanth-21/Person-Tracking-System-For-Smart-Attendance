# Person Tracking System for Smart Attendance

A comprehensive, real-time smart attendance system utilizing facial recognition and barcode scanning. This project consists of a React/TypeScript frontend and a Python (Flask) backend to provide seamless attendance tracking, student registration, and data reporting.

## 🌟 Features

- **Face Recognition**: Automatic attendance marking using real-time facial recognition via webcams.
- **Barcode/QR Scanner**: Alternative attendance marking system using barcodes.
- **Student Registration**: Web interface for registering new students and capturing their photos.
- **Real-time Processing**: Live camera feed with on-the-fly detection and processing.
- **Attendance Reports**: Downloadable attendance data as CSV files.
- **Modern UI**: A sleek frontend built with React, Tailwind CSS, and Framer Motion.

## 🛠️ Technology Stack

**Frontend:**
- React 18
- TypeScript
- Vite
- Tailwind CSS
- Framer Motion
- Lucide React (Icons)
- Supabase (Optional Integration)

**Backend:**
- Python
- Flask & Flask-CORS
- OpenCV (Image processing & camera capture)
- `face-recognition` & `dlib` (Facial recognition algorithms)
- `pyzbar` (Barcode reading)
- MySQL (Database management)

---

## 🚀 Setup Instructions

### 1. Prerequisites
- **Node.js** (v18+)
- **Python** (v3.8+)
- **MySQL** Server and Workbench
- A working webcam

### 2. Database Setup
1. Open MySQL Workbench.
2. Create a database (e.g., `krisanth` or as specified in your SQL file).
3. Run the SQL commands from `backend/sql_project.sql` to initialize the necessary tables.
4. Update the database connection credentials inside `backend/facialrecognition.py`:
   ```python
   mydb = mysql.connector.connect(
       host='localhost',
       user='root',
       passwd='YOUR_PASSWORD',
       port='3306',
       database='krisanth',
       auth_plugin='mysql_native_password'
   )
   ```

### 3. Backend Setup
1. Navigate to the `backend` directory:
   ```bash
   cd backend
   ```
2. (Optional but recommended) Create a virtual environment:
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows use: venv\Scripts\activate
   ```
3. Install the required Python packages:
   ```bash
   pip install -r requirements.txt
   ```
4. Setup face images:
   - Place student photos in the `backend/faces/` folder.
   - Use the format `RegisterNumber_Name.jpg` (e.g., `URK22CS5025_Krisanth M.jpg`).

### 4. Frontend Setup
1. Navigate to the root directory (or `src` depending on where you run it):
   ```bash
   npm install
   ```
2. Start the development server:
   ```bash
   npm run dev
   ```

---

## 🏃 Running the Application

1. **Start the Backend Server**:
   To run the main Face Recognition System:
   ```bash
   cd backend
   python facialrecognition.py
   ```
   *(For Barcode Scanner only, run `python barcodescanner.py`)*

2. **Start the Frontend App**:
   ```bash
   # In the root directory
   npm run dev
   ```
3. **Access the Application**:
   Open your browser and navigate to `http://localhost:5173` (or the port specified by Vite).

---

## 📂 Project Structure

```
.
├── backend/
│   ├── faces/                  # Directory for storing student photos
│   ├── templates/              # HTML templates (if running backend standalone)
│   ├── barcodescanner.py       # Standalone barcode scanner script
│   ├── facialrecognition.py    # Main Flask API & face recognition logic
│   ├── requirements.txt        # Python dependencies
│   └── sql_project.sql         # Database schema
├── src/                        # React Frontend Source Code
│   ├── components/             # Reusable UI components
│   ├── pages/                  # Application pages/routes
│   ├── contexts/               # React Contexts for state management
│   ├── hooks/                  # Custom React hooks
│   ├── utils/                  # Helper functions
│   ├── App.tsx                 # Main React component
│   └── main.tsx                # React entry point
├── package.json                # Node.js dependencies & scripts
├── tailwind.config.js          # Tailwind CSS configuration
├── vite.config.ts              # Vite configuration
└── README.md                   # This file
```

---

## 🐛 Troubleshooting

- **Camera not working**: Ensure no other application (like Zoom or another terminal) is currently using your webcam.
- **Database Connection Error**: Verify that MySQL is running on `localhost:3306` and your credentials match those in `facialrecognition.py`.
- **`dlib` Installation Issues**: Installing `dlib` on Windows might require C++ Build Tools. Ensure you have Visual Studio installed with the "Desktop development with C++" workload.
