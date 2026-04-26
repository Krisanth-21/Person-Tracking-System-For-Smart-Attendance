create database krisanth;
use krisanth;

-- Students table for storing student information
CREATE TABLE students (
    id INT AUTO_INCREMENT PRIMARY KEY,
    register_number VARCHAR(20) UNIQUE NOT NULL,
    full_name VARCHAR(100) NOT NULL,
    email VARCHAR(100),
    phone VARCHAR(15),
    department VARCHAR(50),
    photo_path VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Attendance table
create table Mark_Potrunga_Mam(
    id INT AUTO_INCREMENT PRIMARY KEY,
    Register_Number VARCHAR(11),
    barcode VARCHAR(11),
    Name VARCHAR(50),
    Face_Time datetime,
    Barcode_Time datetime,
    Status VARCHAR(6),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- truncate Mark_Potrunga_Mam;

use Krisanth;
select * from Mark_Potrunga_Mam;

UPDATE Mark_Potrunga_Mam
SET Status = CASE
    WHEN HOUR(Face_Time) = HOUR(Barcode_Time) AND barcode = Register_Number THEN 'True'
    ELSE 'False'
END;

select * from Mark_Potrunga_Mam;

SELECT 
    t1.Register_Number,
    t1.Name,
    SUM(TIMESTAMPDIFF(MINUTE, t1.Face_Time, t2.Face_Time)) AS Total_Minutes_Attended
FROM Mark_Potrunga_Mam t1
JOIN Mark_Potrunga_Mam t2
    ON t1.Register_Number = t2.Register_Number
    AND t1.Face_Time < t2.Face_Time
    AND t1.Status = 'True'
    AND t2.Status = 'True'
GROUP BY t1.Register_Number, t1.Name;

select Register_Number, Name, Face_Time, Barcode_Time, Status from Mark_Potrunga_Mam;

ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY '1234';

use krisanth;
-- drop table Mark_Potrunga_Mam;