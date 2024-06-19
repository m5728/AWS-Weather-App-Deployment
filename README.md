# Weather App Deployment on AWS

This project involves deploying a React application that retrieves current weather data based on latitude and longitude inputs. The backend is powered by an Express server that communicates with the OpenWeatherMap API to fetch the weather data. The app is deployed on AWS, leveraging EC2 instances in an Auto Scaling Group (ASG), an Application Load Balancer (ALB), and a CloudFront distribution with Web Application Firewall (WAF) for enhanced security and performance.

## AWS Deployment

The application is deployed on AWS using several key services to ensure high availability, scalability, and security:

EC2 Instances: The React app and Express server run on EC2 instances within an Auto Scaling Group to handle varying loads.
Application Load Balancer (ALB): Distributes incoming traffic across multiple instances for better performance and reliability.
CloudFront Distribution: Enhances performance and security by caching content and providing DDoS protection. Integrated with AWS WAF for additional security.
This setup leverages AWS best practices, ensuring your application is resilient, scalable, and secure.

## React Application

The React frontend provides a simple form where users can enter latitude and longitude coordinates to get the current weather.

Key Components:
State Management: The useState hook is used to manage the state for latitude, longitude, loading status, weather data, and error messages.
API Request: Axios is used to send a POST request to the backend with the entered coordinates and fetch the weather data.
User Interface: The form includes input fields for latitude and longitude, a submit button, and displays loading status, errors, and weather data.

## Express Backend

The backend server, built with Express, handles requests from the React frontend and interacts with the OpenWeatherMap API to fetch weather data based on the provided coordinates.

Key Features:
Static File Serving: Serves the static files from the React app build directory.
Weather Endpoint: An endpoint to handle POST requests, fetch weather data using Axios, and return the data to the frontend.
Error Handling: Proper error handling for failed API requests.
