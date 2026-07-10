"""
==========================================================
File Name : models.py

Purpose :
Packet document ko standard format me convert karna.

Ye file sirf packet ka final database document banayegi.

Responsibilities :
• Packet Document Creation
• Standard Data Structure

Future Scope :

• Threat Model
• User Model
• Alert Model
• Report Model

==========================================================
"""

# ==========================================================
# Create Packet Document
# ==========================================================

def create_packet_document(packet_data, inspection_result):
    """
    Packet aur DPI result ko combine karke
    MongoDB document banata hai.
    """

    document = {

        "packet_id": packet_data["packet_id"],

        "timestamp": packet_data["timestamp"],

        "source_ip": packet_data["source_ip"],

        "destination_ip": packet_data["destination_ip"],

        "protocol": packet_data["protocol"],

        "source_port": packet_data["source_port"],

        "destination_port": packet_data["destination_port"],

        "packet_length": packet_data["length"],

        "payload": packet_data["payload"],

        "status": inspection_result["status"],

        "attack": inspection_result["attack"],

        "severity": inspection_result["severity"],

        "matched_pattern": inspection_result["matched_pattern"]

    }

    return document







# Q1. Why create models.py?

# Taaki database me insert hone wala
# har document same format follow kare.


# Q2. Why combine packet_data and inspection_result?

# Packet parser aur DPI engine
# alag modules hain.
# MongoDB me ek hi document save karna hota hai.


# Q3. Why return a dictionary?

# MongoDB directly Python dictionary
# ko BSON document me convert kar deta hai.


# Q4. Why keep this logic separate?

# Agar future me document structure
# change karna ho
# to sirf isi file ko modify karna padega.

# ==========================================================
# END OF FILE
# ==========================================================