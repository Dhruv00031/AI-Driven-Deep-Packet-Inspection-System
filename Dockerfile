# Base Image
FROM node:22-bullseye

# Install Python
RUN apt-get update && \
    apt-get install -y python3 python3-pip && \
    rm -rf /var/lib/apt/lists/*

# Working Directory
WORKDIR /app

# Copy Entire Project
COPY . .

# Install Node Dependencies
RUN cd backend && npm install

# Install Python Dependencies
RUN pip3 install --break-system-packages -r requirements.txt

# Expose Backend Port
EXPOSE 5000

# Start Backend
CMD ["npm", "start", "--prefix", "backend"]