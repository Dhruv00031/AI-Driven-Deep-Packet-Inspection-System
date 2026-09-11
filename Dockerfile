# ==========================================
# AI DPI System - Dockerfile
# ==========================================

FROM node:22-bullseye

# Install Python
RUN apt-get update && \
    apt-get install -y python3 python3-pip libpcap-dev && \
    rm -rf /var/lib/apt/lists/*

# Python output should not be buffered (so Node child_process gets stdout)
ENV PYTHONUNBUFFERED=1

# Create Working Directory
WORKDIR /app

# Copy Entire Project
COPY . .

# Install Node Dependencies
WORKDIR /app/backend
RUN npm install

# Install Python Dependencies
WORKDIR /app
RUN pip3 install --no-cache-dir --break-system-packages -r requirements.txt || \
    pip3 install --no-cache-dir -r requirements.txt

# Verify the simulator and its runtime dependencies are importable at build time
RUN python3 -c "import pymongo, dns, dotenv; import simulator.run_simulator; import packet_engine.dpi_engine"

# Expose Backend Port
EXPOSE 5000

# Go to Backend
WORKDIR /app/backend

# Start Backend
CMD ["npm", "start"]