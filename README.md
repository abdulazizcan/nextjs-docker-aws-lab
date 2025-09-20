# Next.js, Docker & AWS EC2 Deployment Lab

This project is a hands-on lab that demonstrates the step-by-step process of moving a modern web application from a local development environment to a live production environment. The goal is to containerize a Next.js application using Docker, configure Nginx as a Reverse Proxy, and deploy the entire system on an AWS EC2 server.

## 🚀 Technologies Used

* **Frontend:** Next.js, React, TypeScript, Tailwind CSS  
* **Testing:** Jest, React Testing Library, Cypress  
* **Containerization:** Docker, Docker Compose  
* **Infrastructure:** Nginx (Reverse Proxy)  
* **Cloud Provider:** AWS (EC2)

## 🏛️ Architecture

This project consists of two main containers managed via `docker-compose`:

1. **`nginx` Service:** Handles all incoming HTTP requests on port 80 and securely forwards them to the running Next.js application (Reverse Proxy).  
2. **`app` Service:** Runs the production build of the Next.js application on port 3000. This container is not directly exposed to the outside world; all communication is routed through Nginx.

## 💻 Running Locally

To run the project on your local machine, you only need Docker and Docker Compose installed.

```bash
# After cloning the project, run the following command from the root directory:
docker-compose up --build
