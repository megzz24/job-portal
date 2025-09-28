# CareerConnect - React & Django

This is a full-featured career connection platform where job seekers can create profiles and find jobs, and companies can post job listings and manage applicants. Built with a React frontend (using Vite) and a Django REST Framework backend.

## ✨ Features

* **Dual User Roles**: Separate registration and dashboards for **Job Seekers** and **Company Representatives**.
* **Company Profiles**: Companies can register their organization, post multiple job listings, and manage them.
* **Job Seeker Profiles**: Job seekers can build detailed profiles, upload existing resumes, and showcase their skills, experience, and education.
* **Advanced Job Search**: Powerful search functionality with filters for location, skills, salary, experience level, and job type.
* **Direct Application System**: Users can apply for jobs directly through the portal. Company representatives can view and manage applicants for their posts.
* **Secure Authentication**: Uses JSON Web Tokens (JWT) for secure and stateless user authentication.

## 🛠️ Tech Stack

* **Backend**: Python, Django, Django REST Framework
* **Frontend**: React, Vite, JavaScript
* **Database**: MySQL
* **Authentication**: Simple JWT

---

## 🚀 Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

* Python 3.10+
* Node.js and npm
* MySQL Server

### Backend Setup (Django)

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/megzz24/job-portal.git
    cd <project-folder>/backend
    ```

2.  **Create and activate a virtual environment:**
    ```bash
    # For macOS/Linux
    python3 -m venv venv
    source venv/bin/activate

    # For Windows
    python -m venv venv
    venv\Scripts\activate
    ```

3.  **Install dependencies:**
    ```bash
    pip install -r requirements.txt
    ```

4.  **Set up environment variables:**
    * Copy the example file: `cp .env.example .env`
    * Open the new `.env` file and fill in your local database credentials.
    * To generate a new `SECRET_KEY`, enter:
        ```python
        python -c "from django.core.management.utils import get_random_secret_key; print(get_random_secret_key())"
        ```
    * Copy the output into your `.env` file.
    * Make sure DEBUG=True for development.

5.  **Run database migrations:**
    ```bash
    python manage.py migrate
    ```

6.  **Run the development server:**
    ```bash
    python manage.py runserver
    ```
    The Django API will be available at `http://127.0.0.1:8000`.

### Frontend Setup (React + Vite)

1.  **Navigate to the frontend directory:**
    ```bash
    cd <project-folder>/frontend
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Set up environment variables:**
    * Copy the example file: `cp .env.example .env`
    * Confirm the `VITE_API_BASE_URL` is correct for your setup.

4.  **Start the development server:**
    ```bash
    npm run dev
    ```
    The React application will open at the URL provided in the terminal (usually `http://localhost:5173`).

---
## Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1.  **Create your Feature Branch:** (`git checkout -b feature/AmazingFeature`)
2.  **Commit your Changes:** (`git commit -m 'Add some AmazingFeature'`)
3.  **Push to the Branch:** (`git push origin feature/AmazingFeature`)
4.  **Open a Pull Request** against the `main` branch for review.

---

## 📄 License

This project is licensed under the MIT License.
