# Frontend Service for the AWS Deployment Lab

This is the frontend of the application, built with Next.js and React. It provides the user interface for authentication (via AWS Cognito) and for creating and viewing user pages.

This application is designed to be containerized with Docker and deployed behind an Nginx reverse proxy.

## Running Locally for Development

To run the frontend on your local machine for development purposes:

1.  Navigate to this directory (`/frontend`).
2.  Install the dependencies:
    ```bash
    npm install
    ```
3.  Run the development server:
    ```bash
    npm run dev
    ```

The application will be available at `http://localhost:3000`.

*Note: For a full production-like local environment, refer to the `docker-compose.yml` file in the root directory.*