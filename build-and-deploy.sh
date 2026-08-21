#!/bin/bash

# Exit on any error
set -e

echo "Starting Build Process for FraudGuard..."

echo "========================================="
echo "1. Building React Frontend"
echo "========================================="
cd frontend
npm install
npm run build
cd ..

echo "========================================="
echo "2. Packaging Spring Boot Backend"
echo "========================================="
cd CloudBackend
# This will build the .jar file containing both the backend and the static frontend
mvn clean package -DskipTests
cd ..

echo "========================================="
echo "BUILD COMPLETE!"
echo "========================================="
echo "Your deployable JAR file is located at:"
echo "CloudBackend/target/CloudBackend-0.0.1-SNAPSHOT.jar"
echo ""
echo "Upload this .jar file to your AWS Elastic Beanstalk Java environment."
