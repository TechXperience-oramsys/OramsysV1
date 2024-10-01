#!/bin/bash

# Log everything for debugging
exec > >(tee /var/log/install_dependencies.log) 2>&1

# Change to the frontend directory
echo "Navigating to frontend directory..."
cd /data/oramsys/frontend || { echo "Failed to navigate to frontend directory"; exit 1; }

# Install frontend dependencies
echo "Installing frontend dependencies..."
sudo npm install --force || { echo "Failed to install frontend dependenciess"; exit 1; }

echo "Deployment script executed successfully."
