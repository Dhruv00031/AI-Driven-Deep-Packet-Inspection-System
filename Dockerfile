# ==========================================
# AI DPI System - Dockerfile
# ==========================================

FROM node:22-bullseye

# Install Python
RUN apt-get update && \
    apt-get install -y python3 python3-pip && \
    rm -rf /var/lib/apt/lists/*

# Create Working Directory
WORKDIR /app

# Copy Entire Project
COPY . .

# Install Node Dependencies
WORKDIR /app/backend
RUN npm install

# Install Python Dependencies
WORKDIR /app
RUN pip3 install --no-cache-dir -r requirements.txt

# Expose Backend Port
EXPOSE 5000

# Go to Backend
WORKDIR /app/backend

# Start Backend
CMD ["npm", "start"]