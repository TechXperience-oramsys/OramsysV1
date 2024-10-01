#!/bin/bash

# Change to the backend directory
echo "Navigating to backend directory..."
cd /data/oramsys/backend || { echo "Failed to navigate to backend directory"; exit 1; }

# Install backend dependencies
echo "Installing backend dependencies..."
sudo npm install --force || { echo "Failed to install backend dependencies"; exit 1; }

# Log everything for debugging
exec > >(tee /var/log/install_dependencies.log) 2>&1

# Change to the frontend directory
echo "Navigating to frontend directory..."
cd /data/oramsys/frontend || { echo "Failed to navigate to frontend directory"; exit 1; }

# Install frontend dependencies
echo "Installing frontend dependencies..."
sudo npm install --force || { echo "Failed to install frontend dependenciess"; exit 1; }

echo "Deployment script executed successfully."
