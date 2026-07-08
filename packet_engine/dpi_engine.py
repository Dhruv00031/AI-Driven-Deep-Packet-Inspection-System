"""
==========================================================
File Name : dpi_engine.py

Purpose :
Packet ke payload ko inspect karna aur
known attacks detect karna.

Abhi hum Rule-Based Detection use kar rahe hain.

Future me isi file me
Machine Learning Model bhi integrate hoga.

==========================================================
"""

# Attack patterns import kar rahe hain
from packet_engine.rules import SQL_PATTERNS, XSS_PATTERNS


def inspect_payload(payload):
    """
    Payload inspect karega.

    Parameters
    ----------
    payload : String

    Returns
    -------
    Dictionary

    Example
    -------
    {
        "status": "SAFE",
        "attack": "None"
    }

    ya

    {
        "status": "ATTACK",
        "attack": "SQL Injection"
    }
    """

    # -------------------------------------------------
    # Agar payload empty hai
    # to inspect karne ka koi matlab nahi.
    # -------------------------------------------------

    if not payload:

        return {
            "status": "SAFE",
            "attack": "None"
        }

    # -------------------------------------------------
    # Uppercase aur lowercase dono ko same treat karenge.
    # Isse detection accurate hogi.
    # -------------------------------------------------

    payload = payload.lower()

    # =================================================
    # SQL Injection Detection
    # =================================================

    for pattern in SQL_PATTERNS:

        # Pattern ko bhi lowercase bana rahe hain
        pattern = pattern.lower()

        # Agar payload me pattern mil gaya
        if pattern in payload:

            return {
                "status": "ATTACK",
                "attack": "SQL Injection"
            }

    # =================================================
    # XSS Detection
    # =================================================

    for pattern in XSS_PATTERNS:

        pattern = pattern.lower()

        if pattern in payload:

            return {
                "status": "ATTACK",
                "attack": "Cross Site Scripting (XSS)"
            }

    # =================================================
    # Agar koi attack detect nahi hua
    # =================================================

    return {
        "status": "SAFE",
        "attack": "None"
    }




# Q1. Why use Rule-Based Detection first instead of AI?

# Rule Engine deterministic hota hai.
# Known attacks ko instantly detect karta hai.
# AI unknown attacks detect karne me help karta hai.
# Real IDS systems dono techniques ka combination use karte hain.


# Q2. Why convert payload to lowercase?

# Taaki case sensitivity remove ho jaye.
# Example:
# <SCRIPT>
# aur
# <script>
# dono detect ho saken.


# Q3. Why keep patterns inside rules.py?

# Taaki naye attack signatures add karna easy ho.
# Detection logic ko modify nahi karna pade.
# Isse code modular aur maintainable rehta hai.


# Q4. Why return a dictionary instead of a string?

# Future me hume sirf SAFE ya ATTACK nahi chahiye hoga.
# Hume attack ka type bhi chahiye hoga.
# Example:
# Status
# Attack Name
# Severity
# Timestamp
# Isliye dictionary return karna better approach hai.


# Q5. Why inspect only payload?

# Deep Packet Inspection ka main objective
# packet ke actual data ko inspect karna hota hai.
# Header sirf routing information deta hai.
# Attack signatures mostly payload me hoti hain.