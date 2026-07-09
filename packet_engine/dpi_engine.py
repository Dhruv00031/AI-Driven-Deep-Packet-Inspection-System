"""
==========================================================
File Name : dpi_engine.py

Purpose :
Packet ke payload ko inspect karna aur
known attacks detect karna.

Ye file sirf detection ka kaam karegi.

Responsibilities :
• Rule-Based Detection
• Attack Identification
• Response Generation

Future Scope :
Future me

• Machine Learning Detection
• Anomaly Detection
• Threat Intelligence
• Hybrid Detection

isi file me add honge.

==========================================================
"""

# ==========================================================
# Required Imports
# ==========================================================

# Attack Signatures
from packet_engine.rules import (
    SQL_PATTERNS,
    XSS_PATTERNS
)

# Response Templates
from packet_engine.responses import (
    SAFE_RESPONSE,
    SQL_RESPONSE,
    XSS_RESPONSE
)

# ==========================================================
# Payload Inspection
# ==========================================================

def inspect_payload(payload):
    """
    Payload ko inspect karega.

    Parameters
    ----------
    payload : str

    Returns
    -------
    Dictionary
    """

    # ------------------------------------------------------
    # Empty Payload
    # ------------------------------------------------------

    if not payload:

        return SAFE_RESPONSE.copy()

    # Uppercase aur lowercase
    # dono same treat honge.

    payload = payload.lower()

    # ======================================================
    # SQL Injection Detection
    # ======================================================

    for pattern in SQL_PATTERNS:

        if pattern.lower() in payload:

            response = SQL_RESPONSE.copy()

            response["matched_pattern"] = pattern

            return response

    # ======================================================
    # XSS Detection
    # ======================================================

    for pattern in XSS_PATTERNS:

        if pattern.lower() in payload:

            response = XSS_RESPONSE.copy()

            response["matched_pattern"] = pattern

            return response

    # ======================================================
    # Safe Packet
    # ======================================================

    return SAFE_RESPONSE.copy()


# ==========================================================
# Complete Packet Inspection
# ==========================================================

def inspect_packet(packet_data):
    """
    Complete packet inspect karega.

    Abhi sirf payload inspect ho raha hai.

    Future me

    Source IP

    Destination IP

    Ports

    Packet Length

    Time

    Protocol

    sab analyse honge.
    """

    payload = packet_data.get("payload", "")

    return inspect_payload(payload)





# Q1. Why Rule-Based Detection first?

    # Rule Engine known attacks ko
    # instantly detect karta hai.
    # AI unknown attacks detect karega.
    # Production IDS me dono ka
    # combination use hota hai.


# Q2. Why convert payload to lowercase?

    # Taaki
    # <SCRIPT>
    # aur
    # <script>
    # dono detect ho saken.


# Q3. Why use response.copy() ?

    # SAFE_RESPONSE global dictionary hai.
    # Agar directly modify karenge
    # to original dictionary permanently
    # change ho jayegi.
    # copy() ek nayi dictionary banata hai.


# Q4. Why inspect_packet() if only payload is used?

    # Future me poora packet analyse hoga.
    # Abhi architecture future ready bana rahe hain.


# Q5. Why keep signatures outside this file?

    # Detection aur signatures
    # alag responsibilities hain.
    # Isse maintainability improve hoti hai.


# Q6. Why return Dictionary?

    # Future me Dashboard,
    # MongoDB aur APIs
    # isi response ko directly use karenge.

