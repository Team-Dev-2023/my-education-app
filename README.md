# Education React App

**Education React App** is a dynamic web application designed to deliver a comprehensive educational experience. This project is dedicated to implementing specialized user flows for: administrators, lecturers, and students, offering a smooth single-page interface reminiscent of the user interaction found on prominent platforms like Udemy. The integration of complete GitHub version control ensures a cohesive and well-structured development journey.

## Technical Stack

The project is built using a variety of modern technologies and tools:

- User interface: React - Redux - Redux Saga - Ant Design - Material UI - Tailwind CSS - SwiperJs
- Api service: Nestjs - Mysql - Docker

## Features

- **Authentication**: Login and registration processes for each user flow.
- **Homepage**: A well-designed homepage that provides an overview of available courses and resources.
- **Category Page**: Browse courses by category / sub-categories / topics, facilitating easy navigation and discovery.
- **Search Results Page**: Instantly view search results as you type, enhancing efficiency and user experience.
- **Product Page**: Detailed pages for individual courses, with dynamic content populated from JSON data obtained via API calls.
- **Filtering Fields**: Advanced multi-filtering options allowing users to refine visible results on-the-fly.
- **Header with Search**: An interactive header with a real-time search component, ensuring quick access to desired content.
- **Create courses with lecturer role**: Entering lecturer user flow to create courses / update courses / delete courses.
- **Manage all users' data and courses' data**: Intergrate admin user flow to manage users (students and lecturers) and courses.

## Status

The Education React App is currently in active development. The project team is continuously working to refine and expand its features to offer a polished and effective educational platform.

## Developers

- Front-end: [Camhoccode](https://github.com/camhoccode) - [PhongHQ](https://github.com/Phong670)
- Backend: [striderbinhphan](https://github.com/striderbinhphan)

## How to Use

To run the Education React App, follow these steps:

1. Download and install [Docker](https://www.docker.com/)
2. Run the following commands in the root folder:
   ```bash
   docker-compose   -f docker-compose.prod.yml down
   docker-compose   -f docker-compose.prod.yml up -d
   ```
3. Open three separate terminal windows.
4. Navigate to each of the following folders in the project directory:
   - `api-service`
   - `lecturer`
   - `web-portal`
5. In each terminal window, run the following commands:
   ```bash
   yarn
   yarn start
   ```
