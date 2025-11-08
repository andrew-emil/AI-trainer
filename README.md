# 🌐 Fr3on fit

![Docker](https://img.shields.io/badge/Docker-Ready-blue?logo=docker)
![Node.js](https://img.shields.io/badge/Node.js-LTS-brightgreen?logo=node.js)
![PHP](https://img.shields.io/badge/PHP-8.2+-purple?logo=php)
![.NET](https://img.shields.io/badge/.NET-8.0+-blueviolet?logo=dotnet)
![Flutter](https://img.shields.io/badge/Flutter-Latest-02569B?logo=flutter)
![React](https://img.shields.io/badge/React-Admin%20Dashboard-61DAFB?logo=react)
![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)

A modern, distributed application built using a **polyglot microservices architecture**.  
This project combines the strengths of **Laravel**, **NestJS**, **.NET**, and other frameworks to create a robust and scalable system.

---

## 🌟 Project Overview
This repository hosts a collection of services and clients organized into three major components:

- **Core Services** → Business logic APIs built with multiple frameworks.  
- **AI Models** → Dedicated services for ML, recommendations, and analysis.  
- **Frontend Clients** → Mobile app (Flutter) and Admin Dashboard (React).  

---

## 🚀 Getting Started

### 1️⃣ Prerequisites
Make sure you have the following installed before starting:

| Tool                  | Version         | Purpose                                        |
|-----------------------|-----------------|------------------------------------------------|
| Docker & Docker Compose | Latest        | Run all services consistently                  |
| Node.js               | LTS (e.g. v20) | For NestJS services & React frontend           |
| PHP                   | 8.2+           | For Laravel services                           |
| .NET SDK              | 8.0+           | For .NET services                              |
| Flutter SDK           | Latest         | For mobile app development                     |

---

### 2️⃣ Local Setup (Recommended)

Run the entire backend with Docker Compose:

```bash
# Build images
docker-compose build

# Start all services
docker-compose up -d

# Check container status
docker-compose ps

👉 **Database Seeding**  
Follow the **framework-specific migration & seeding instructions** (e.g., Laravel or .NET containers).  

---

## 3️⃣ Framework-Specific Local Development

Run individual services locally while connecting to others running in Docker:

| Framework     | Folder                         | Local Run Command         |
|---------------|-------------------------------|----------------------------|
| .NET          | `services/dotnet/service-a`   | `dotnet run`              |
| Laravel       | `services/laravel/service-c`  | `php artisan serve`       |
| NestJS        | `services/nestjs/service-e`   | `npm run start:dev`       |
| AI Models     | `ai-models/model-service-a`   | `python src/app.py`       |

---

## 🗺️ Folder Structure

/services → Core business logic microservices (Laravel, NestJS, .NET)
/ai-models → ML & inference services (Python, TensorFlow/PyTorch)
/frontend → Client applications (Flutter, React)
/devops → Deployment, CI/CD, infra configs (Docker, K8s)
/docs → Architecture diagrams, API specifications


---

## 💻 Service Directory & Ownership

| Service              | Framework | Port | Owner/Team     | Key Functionality                        |
|----------------------|-----------|------|----------------|------------------------------------------|
| UserManagement       | .NET      | 8081 | [Team/Lead]    | Authentication, User Profiles             |
| OrderProcessing      | Laravel   | 8082 | [Team/Lead]    | Order lifecycle, Cart management          |
| NotificationService  | NestJS    | 8083 | [Team/Lead]    | Email, SMS, Push notifications            |
| RecommendationEngine | AI Model  | 8084 | [Team/Lead]    | Personalized content/product suggestions  |

---

## 🔗 Documentation & Endpoints

| Resource                | Path                                   | Description                                |
|--------------------------|----------------------------------------|--------------------------------------------|
| Architecture Diagram     | `docs/architecture.md`                | Visual overview of service interactions    |
| API Specs                | `docs/api-specs/swagger.json`         | Consolidated OpenAPI/Swagger specification |
| Mobile App Setup         | `frontend/mobile/README.md`           | Flutter-specific setup instructions        |
| Admin Dashboard Setup    | `frontend/admin-dashboard/README.md`  | React-specific setup instructions          |

---

### 📌 Contribution Workflow

1. Follow the **Conventional Commits** standard for commit messages.  

2. Push your branch:  
   ```bash```
   git push origin feature/your-feature-name

3. Open a Pull Request to the main branch.

✅ **All Pull Requests must include:**
- 📖 Updated documentation  
- 🧪 Passing unit & integration tests  

💬 For support or questions, please contact the **lead architect** or post in the **#dev-support Slack channel**.
>>>>>>> 61220c3ee8a05f1353b798d1bb289fb9b9f7af89
