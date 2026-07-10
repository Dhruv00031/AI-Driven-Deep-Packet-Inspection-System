"""
==========================================================
File Name : config.py

Purpose :
Is file me MongoDB se related
saari configuration rakhi jayegi.

Isse agar future me database
change karna ho to sirf isi file
ko modify karna padega.

Responsibilities :
• MongoDB Connection URL
• Database Name
• Collection Names

Future Scope :
Future me

• Atlas Connection
• Authentication
• Multiple Databases

==========================================================
"""

# ==========================================================
# MongoDB Connection URL
# ==========================================================

# Local MongoDB Server
# Compass bhi isi URL se connect hota hai.

MONGO_URI = "mongodb://localhost:27017"

# ==========================================================
# Database Name
# ==========================================================

# Agar database exist nahi karega
# to MongoDB automatically create kar dega.

DATABASE_NAME = "ai_dpi_database"

# ==========================================================
# Collection Names
# ==========================================================

# Saare captured packets
# isi collection me save honge.

PACKET_COLLECTION = "captured_packets"

# Future me attack packets
# alag collection me bhi save kar sakte hain.

THREAT_COLLECTION = "detected_threats"




# Q1. Why keep configuration separate?
#
# Taaki future me
# sirf configuration change karni pade.
#
# Code modify na karna pade.


# Q2. What is MONGO_URI?
#
# Ye MongoDB server ka address hai.
#
# Python isi address ke through
# database se connect hota hai.


# Q3. Why separate database and collection names?
#
# Hardcoding avoid hoti hai.
#
# Future me naam change karna easy hota hai.


# Q4. Why create THREAT_COLLECTION now?
#
# Future ready architecture.
#
# Baad me attack packets ko
# alag collection me store karenge.

# ==========================================================
# END OF FILE
# ==========================================================