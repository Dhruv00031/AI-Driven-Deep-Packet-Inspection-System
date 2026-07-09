"""
==========================================================
File Name : utils.py

Purpose :
Project ke reusable helper functions.

Ye file sirf helper functions provide karegi.

Benefits:
1. Code Reusability
2. Cleaner Modules
3. Better Readability
4. Professional Architecture

Responsibilities :
• Packet ID Generation
• Timestamp Generation
• Payload Formatting
• Payload Preview
• Helper Functions

Future Scope :
Future me

• Logging
• File Export
• Report Generation
• Hash Generation
• Encoding Utilities

isi file me add honge.

==========================================================
"""

# ==========================================================
# Required Imports
# ==========================================================

from datetime import datetime

from packet_engine.constants import (
    PACKET_PREFIX,
    PACKET_ID_DIGITS,
    PAYLOAD_PREVIEW_LENGTH,
    NO_PAYLOAD,
    ENCRYPTED_PAYLOAD
)

# ==========================================================
# Global Packet Counter
# ==========================================================

# Har packet ko unique ID dene ke liye.
packet_counter = 0


# ==========================================================
# Generate Packet ID
# ==========================================================

def generate_packet_id():
    """
    Professional Packet ID generate karega.

    Example

    PKT-000001
    PKT-000002
    """

    global packet_counter

    packet_counter += 1

    return (
        f"{PACKET_PREFIX}-"
        f"{packet_counter:0{PACKET_ID_DIGITS}}"
    )


# ==========================================================
# Generate Timestamp
# ==========================================================

def generate_timestamp():
    """
    Current Date aur Time return karega.
    """

    return datetime.now().strftime("%d-%m-%Y %H:%M:%S")


# ==========================================================
# Check Payload Readability
# ==========================================================

def is_payload_readable(payload):
    """
    Check karega payload readable hai ya nahi.
    """

    if not payload:

        return False

    readable_characters = sum(

        character.isprintable()

        for character in payload

    )

    readability = readable_characters / len(payload)

    return readability >= 0.80


# ==========================================================
# Generate Payload Preview
# ==========================================================

def generate_payload_preview(payload):
    """
    Console ke liye payload preview banayega.
    """

    # Payload empty hai
    if not payload:

        return NO_PAYLOAD

    payload = payload.strip()

    # Spaces hi spaces hain
    if payload == "":

        return NO_PAYLOAD

    # Readable payload
    if is_payload_readable(payload):

        return payload[:PAYLOAD_PREVIEW_LENGTH]

    # Encrypted ya Binary
    return ENCRYPTED_PAYLOAD


# ==========================================================
# Format Bytes
# ==========================================================

def format_packet_size(size):
    """
    Packet Size readable format me return karega.
    """

    return f"{size} Bytes"


# ==========================================================
# Future Logging Helper
# ==========================================================

def log_message(message):
    """
    Future Logging System.

    Abhi sirf print karega.

    Future me
    File Logging aur Database Logging
    isi function se hogi.
    """

    print(message)


# Q1. Why create utils.py?

    # Taaki helper functions
    # alag file me rahen.
    # Isse code duplicate nahi hota.


# Q2. Why packet_counter global hai?

    # Har packet ko unique ID dene ke liye.
    # Agar local variable hota
    # to har baar 1 se start hota.


# Q3. Why separate payload preview function?

    # Console formatting ka logic
    # parser me nahi hona chahiye.
    # Parser sirf packet read karega.


# Q4. Why is_payload_readable() alag function hai?

    # Reusability.
    # Future me Dashboard,
    # APIs aur Reports bhi
    # isi function ko use karenge.


# Q5. Why log_message() if it only prints?

    # Future me jab logging system banega
    # to sirf isi function ko modify karna hoga.
    # Baaki project me koi changes nahi karne padenge.

