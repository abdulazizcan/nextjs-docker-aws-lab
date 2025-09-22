# Full-Stack AWS Deployment Lab: Containerized Frontend & Serverless Backend

This is a hands-on lab project demonstrating a modern, full-stack web application architecture on AWS. The project features a containerized Next.js frontend served via Nginx on EC2, and a completely serverless backend powered by API Gateway, Lambda, and DynamoDB.

The goal is to showcase the entire lifecycle: from local development and containerization to a secure, scalable, and professional cloud deployment with user authentication.

## 🚀 Core Technologies

* **Frontend:** Next.js, React, TypeScript, Tailwind CSS, AWS Amplify (for Cognito)
* **Backend (Serverless):** AWS Lambda, API Gateway, DynamoDB, Serverless Framework
* **Infrastructure & Deployment:** Docker, Docker Compose, Nginx, AWS EC2, Route 53, ECR, IAM
* **Testing:** Jest, React Testing Library, Cypress
* **Authentication:** AWS Cognito

## 🏛️ Architecture

This project follows a decoupled architecture:

1.  **Frontend Service:**
    * A Next.js application running inside a Docker container on an **AWS EC2** instance.
    * An **Nginx** container sits in front as a reverse proxy, handling SSL termination and serving traffic.
    * The application artifact (Docker Image) is stored in **AWS ECR**.
    * The live site is accessible via a custom domain managed by **AWS Route 53** with a **Let's Encrypt SSL** certificate.

2.  **Backend Service:**
    * A serverless API built with the **Serverless Framework**.
    * **API Gateway** provides the public HTTP endpoints.
    * **AWS Lambda** functions (Node.js/TypeScript) contain the business logic.
    * **DynamoDB** is used as the persistent, NoSQL database.
    * **AWS Cognito** manages all user authentication (sign-up, sign-in).

## 💻 Getting Started

This project is structured as a monorepo with `frontend` and `backend` directories. Please refer to the `README.md` file inside each directory for specific setup and deployment instructions.