#!/bin/bash

# Retrieve API key from SSM Parameter Store
API_KEY=$(aws ssm get-parameter --name "WEATHER_API_KEY" --query "Parameter.Value" --region "your-region" --output text)

# Check if the API key was successfully retrieved
if [ -z "$API_KEY" ]; then
    echo "Error: Failed to retrieve API key from SSM Parameter Store."
    exit 1
fi

# Set environment variable
export API_KEY

# Update the system
sudo yum update -y

# Install Git
sudo yum install -y git

# Install Node.js and npm
# NodeSource repository is recommended for the latest versions
curl -sL https://rpm.nodesource.com/setup_16.x | sudo bash -
sudo yum install -y nodejs

# Clone the repository
git clone https://github.com/m5728/auto-scaling-node.git

# Change directory to the cloned repository
cd auto-scaling-node

# Install npm dependencies
sudo npm install

# Install types for React and ReactDOM, web-vitals, eslint
sudo npm install react@latest react-dom@latest web-vitals eslint

# Install react-scripts (if not installed globally)
sudo npm install -g react-scripts

# Run the build command for the client app with sudo
sudo npm run build-client

# Start the Node.js application
node app.js
