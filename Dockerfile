# ==========================================
# AI DPI System - Dockerfile
# ==========================================

FROM node:22-bullseye

# Install Python
RUN apt-get update && \
    apt-get install -y python3 python3-pip && \
    rm -rf /var/lib/apt/lists/*

# Working directory
WORKDIR /app

# Copy project
COPY . .

# Install backend dependencies
WORKDIR /app/backend
RUN npm install

# Install Python dependencies
WORKDIR /app
RUN pip3 install --break-system-packages -r requirements.txt

# Expose backend port
EXPOSE 5000

# Start backend
WORKDIR /app/backend
CMD ["npm", "start"]