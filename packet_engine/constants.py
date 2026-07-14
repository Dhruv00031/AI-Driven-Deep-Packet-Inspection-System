"""
==========================================================
File Name : constants.py

Purpose :
Is file me project ke saare reusable constants rakhe gaye hain.

Hardcoded values ko multiple files me likhne ke bajay
unhe ek hi jagah define kiya gaya hai.

Benefits:
1. Easy Maintenance
2. Better Readability
3. Professional Coding Practice

Responsibilities :
• Project Information
• Packet Status
• Attack Types
• Severity Levels
• Protocol Names
• Payload Messages
• Console Formatting
• Packet ID Settings

Future Scope :
Backend, Frontend aur ML Model bhi isi file ke
constants ko use karenge.

==========================================================
"""

# ==========================================================
# PROJECT INFORMATION
# ==========================================================

PROJECT_NAME = "AI Driven Deep Packet Inspection System"

PROJECT_VERSION = "0.2"

PROJECT_AUTHOR = "AI-DPI Team"


# ==========================================================
# PACKET STATUS
# ==========================================================

# Packet completely safe hai
STATUS_SAFE = "SAFE"

# Packet me attack detect hua
STATUS_ATTACK = "ATTACK"


# ==========================================================
# NETWORK INTERFACE
# ==========================================================

# Default Network Interface
# Change to "Wi-Fi" if you switch to wireless network.
NETWORK_INTERFACE = "Wi-Fi"


# ==========================================================
# ATTACK TYPES
# ==========================================================

# Default attack
ATTACK_NONE = "None"

# SQL Injection
ATTACK_SQL = "SQL Injection"

# Cross Site Scripting
ATTACK_XSS = "Cross Site Scripting (XSS)"


# ==========================================================
# SEVERITY LEVELS
# ==========================================================

# Safe Traffic
SEVERITY_LOW = "LOW"

# Suspicious
SEVERITY_MEDIUM = "MEDIUM"

# Dangerous
SEVERITY_HIGH = "HIGH"

# Extremely Dangerous
SEVERITY_CRITICAL = "CRITICAL"


# ==========================================================
# PROTOCOLS
# ==========================================================

PROTOCOL_TCP = "TCP"

PROTOCOL_UDP = "UDP"

PROTOCOL_ICMP = "ICMP"

PROTOCOL_OTHER = "OTHER"


# ==========================================================
# PAYLOAD MESSAGES
# ==========================================================

# Payload hi nahi mila
NO_PAYLOAD = "<No Readable Payload>"

# HTTPS traffic
ENCRYPTED_PAYLOAD = "<Encrypted HTTPS Data>"

# Binary Data
BINARY_PAYLOAD = "<Binary Data>"


# ==========================================================
# UNKNOWN VALUES
# ==========================================================

UNKNOWN_IP = "Unknown"

UNKNOWN_PORT = "-"


# ==========================================================
# PACKET ID SETTINGS
# ==========================================================

# Packet Prefix
PACKET_PREFIX = "PKT"

# PKT-000001
PACKET_ID_DIGITS = 6


# ==========================================================
# CONSOLE DESIGN
# ==========================================================

DIVIDER = "=" * 80

SUB_DIVIDER = "-" * 80


# ==========================================================
# CONSOLE MESSAGES
# ==========================================================

START_MESSAGE = "Starting Packet Capture..."

LISTENING_MESSAGE = "Listening for packets..."

STOP_MESSAGE = "Press Ctrl + C to stop."

SAFE_MESSAGE = "No Threat Detected"

ATTACK_MESSAGE = "Potential Threat Detected"


# ==========================================================
# PACKET PREVIEW
# ==========================================================

# Console me payload ke kitne characters
# dikhane hain.

PAYLOAD_PREVIEW_LENGTH = 100


# ==========================================================
# DEFAULT VALUES
# ==========================================================

DEFAULT_MATCHED_PATTERN = None


# ==========================================================
# FUTURE SETTINGS
# ==========================================================

# Future me ML Model enable hoga.

AI_ENGINE_ENABLED = False

# MongoDB Integration

DATABASE_ENABLED = False

# REST API

API_ENABLED = False

# Frontend Dashboard

DASHBOARD_ENABLED = False





# Q1. Why create constants.py?

    # Hardcoded values ko avoid karne ke liye.
    # Agar future me koi value change karni ho
    # to sirf isi file me change karna padega.


# Q2. Why not directly write "SAFE" everywhere?

    # Agar 20 files me SAFE likha hoga
    # aur future me usko NO THREAT karna hua
    # to 20 files edit karni padengi.
    # Constants use karne se sirf ek jagah
    # change karna padta hai.


# Q3. Why separate Severity Levels?

    # Dashboard me colors assign karne ke liye.
        # LOW
        # MEDIUM
        # HIGH
        # CRITICAL
    # Analytics me bhi ye useful honge.


# Q4. Why Packet Prefix?

    # Professional IDS systems packet IDs
    # maintain karte hain.
    # Example
        # PKT-000001
        # PKT-000002


# Q5. Why Future Settings?

    # Future modules (AI, Database, Dashboard)
    # ko easily enable/disable kiya ja sakta hai.

