# Fipsar Project: Setup and Running Instructions


## Prerequisites

- **Node.js** (Ensure you have Node.js installed)
- **Yarn** 
- **MySQL** (Ensure MySQL is installed and running locally)

## Step 1: Clone the Repository

```bash
git clone <repository-url>

cd fipsar-api
```

## Step 2: Install Dependencies

```bash
yarn install
```

## Step 3: Configure Environment Variables

Create a `.env` file in the root of the backend folder and add the following:

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=guruprasad
DB_NAME=fipsar
PORT=5000
```

## Step 4: Set Up the Database

1. Start your MySQL server.
2. Create a database named `fipsar`.

```sql
CREATE DATABASE fipsar;
```

3. Create the `files` table for storing uploaded file details.

```sql
USE fipsar;

CREATE TABLE files (
    id INT AUTO_INCREMENT PRIMARY KEY,
    file_path VARCHAR(255) NOT NULL,
    file_url VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Starting MySQL with Command Line

To start MySQL from the command line and use the `fipsar` database:

```bash
mysql -u root -p
```

Enter your MySQL password when prompted. Then switch to the `fipsar` database:

```sql
USE fipsar;
```

## Step 5: Create Uploads Directory

Ensure the `uploads` directory exists in the backend folder. If not, it will be created automatically when the server starts.

## Step 6: Start the Server

```bash
# Start the server
yarn start
```

The server will run on `http://localhost:5000`.

## Step 7: Test File Upload API

The API for file upload is available at:

```
POST /api/files/upload
```

### cURL Command

```bash
curl -X POST -F "file=@<file-path>" http://localhost:5000/api/files/upload
```


## File Access

Uploaded files can be accessed at:

```
http://localhost:5000/uploads/<file-name>
```

## How the Backend Code Works

### File Upload Logic

1. **Multer for File Uploads**:
   - The backend uses `multer` to handle file uploads.
   - Files are stored in the `uploads` directory with a unique filename generated using the current timestamp.

2. **Database Storage**:
   - When a file is uploaded, its path and URL are saved in the MySQL database.
   - The `saveFile` function in `fileModel` handles the database insertion.

3. **API Endpoint**:
   - The `/api/files/upload` route in `fileRoutes` handles the `POST` request for file uploads.
   - It uses Multer to process the file and responds with the file URL on success.

###  Flow:
   - A file is uploaded via a `POST` request.
   - Multer saves the file to the `uploads` directory.
   - The file path and URL are inserted into the database.
   - The server responds with a success message and the file URL.



### Output:
Chceking in Postman

![image](https://github.com/user-attachments/assets/d729b80d-d436-4dd4-bdad-815bb61d50f0)
Selecting Files 
![image](https://github.com/user-attachments/assets/9082b1e5-99fd-493e-aa7f-b945986ceb3a)

API Call Via UI
![image](https://github.com/user-attachments/assets/112ba942-f491-48d6-b821-2907f7a85692)
File will be added into DB 
![image](https://github.com/user-attachments/assets/66d81ff7-49fc-4f28-b517-df0055f5c06d)





