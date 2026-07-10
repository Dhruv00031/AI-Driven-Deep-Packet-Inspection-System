"""
==========================================================
File Name : mongodb.py

Purpose :
Python aur MongoDB ke beech connection establish karna.

Ye file sirf database operations handle karegi.

Responsibilities :
• MongoDB Connection
• Insert Packet
• Read Packets
• Delete Packets
• Database Helper Functions

Future Scope :

• Update Packet
• Search Packet
• Threat Storage
• Database Backup

==========================================================
"""

# ==========================================================
# Required Imports
# ==========================================================

from pymongo import MongoClient

from database.config import (
    MONGO_URI,
    DATABASE_NAME,
    PACKET_COLLECTION
)

# ==========================================================
# Connect to MongoDB
# ==========================================================

# MongoDB Server se connection establish kar rahe hain.
client = MongoClient(MONGO_URI)

# Required Database Select kar rahe hain.
database = client[DATABASE_NAME]

# Required Collection Select kar rahe hain.
packet_collection = database[PACKET_COLLECTION]

# ==========================================================
# Check Database Connection
# ==========================================================

def check_connection():
    """
    MongoDB connection verify karega.

    Returns
    -------
    True
        Connection successful

    False
        Connection failed
    """

    try:

        # MongoDB server ko ping bhej rahe hain.
        client.admin.command("ping")

        print("MongoDB Connected Successfully.")

        return True

    except Exception as error:

        print(f"MongoDB Connection Failed : {error}")

        return False


# ==========================================================
# Insert Packet
# ==========================================================

def insert_packet(packet_data):
    """
    Ek packet MongoDB me insert karega.
    """

    try:

        result = packet_collection.insert_one(packet_data)

        return result.inserted_id

    except Exception as error:

        print(f"Packet Insert Failed : {error}")

        return None


# ==========================================================
# Get All Packets
# ==========================================================

def get_all_packets():
    """
    Database ke saare packets return karega.
    """

    try:

        return list(packet_collection.find())

    except Exception as error:

        print(f"Read Failed : {error}")

        return []


# ==========================================================
# Delete All Packets
# ==========================================================

def delete_all_packets():
    """
    Collection ke saare packets delete karega.
    """

    try:

        result = packet_collection.delete_many({})

        return result.deleted_count

    except Exception as error:

        print(f"Delete Failed : {error}")

        return 0






# Q1. Why create mongodb.py separately?

# Taaki database ka sara code
# ek hi file me rahe.
# Baaki modules ko MongoDB ke
# implementation ka pata na ho.


# Q2. What is MongoClient()?

# Ye Python aur MongoDB ke
# beech connection establish karta hai.


# Q3. Why use client[DATABASE_NAME]?

# Required database select karne ke liye.


# Q4. Why use packet_collection?

# Taaki baar baar collection
# select na karni pade.


# Q5. Why use try-except?

# Agar database temporarily
# unavailable ho jaye
# to project crash na kare.


# Q6. Why return inserted_id?

# MongoDB har document ko
# unique ObjectId deta hai.
# Future me isi ID se
# packet retrieve/update karenge.


# ==========================================================
# END OF FILE
# ==========================================================