"""
==========================================================
File Name : responses.py

Purpose :
Is file me Rule Engine ke standard response
templates rakhe gaye hain.

Ye file sirf response dictionaries maintain karegi.

Detection logic yahan nahi hoga.

Benefits:
1. Cleaner DPI Engine
2. Reusable Responses
3. Easy Future Expansion

Responsibilities :
• SAFE Response
• SQL Injection Response
• XSS Response

Future Scope :
Future me isi file me

• Command Injection
• DDoS
• Port Scan
• Malware
• Brute Force

responses bhi add kiye jayenge.

==========================================================
"""

# ==========================================================
# Required Imports
# ==========================================================

from packet_engine.constants import (
    STATUS_SAFE,
    STATUS_ATTACK,
    ATTACK_NONE,
    ATTACK_SQL,
    ATTACK_XSS,
    SEVERITY_LOW,
    SEVERITY_HIGH,
    SEVERITY_CRITICAL,
    DEFAULT_MATCHED_PATTERN
)

# ==========================================================
# SAFE RESPONSE
# ==========================================================

SAFE_RESPONSE = {

    "status": STATUS_SAFE,

    "attack": ATTACK_NONE,

    "severity": SEVERITY_LOW,

    "matched_pattern": DEFAULT_MATCHED_PATTERN

}

# ==========================================================
# SQL INJECTION RESPONSE
# ==========================================================

SQL_RESPONSE = {

    "status": STATUS_ATTACK,

    "attack": ATTACK_SQL,

    "severity": SEVERITY_CRITICAL,

    "matched_pattern": DEFAULT_MATCHED_PATTERN

}

# ==========================================================
# CROSS SITE SCRIPTING RESPONSE
# ==========================================================

XSS_RESPONSE = {

    "status": STATUS_ATTACK,

    "attack": ATTACK_XSS,

    "severity": SEVERITY_HIGH,

    "matched_pattern": DEFAULT_MATCHED_PATTERN

}

# ==========================================================
# FUTURE RESPONSES
# ==========================================================

# Future Versions me yahan add honge

# COMMAND_INJECTION_RESPONSE

# DDOS_RESPONSE

# PORT_SCAN_RESPONSE

# MALWARE_RESPONSE

# BRUTE_FORCE_RESPONSE



# Q1. Why create responses.py?

    # Taaki response dictionaries
    # detection logic se alag rahen.
    # Isse code modular aur maintainable banta hai.


# Q2. Why not create dictionaries inside dpi_engine.py?

    # Har packet ke liye dictionary
    # dobara likhni padegi.
    # Reusable templates better hote hain.


# Q3. Why use .copy() later?

    # SAFE_RESPONSE ek global dictionary hai.
    # Agar directly usme changes karenge
    # to original response permanently modify ho jayega.
    # Isliye dpi_engine.py me
    # SAFE_RESPONSE.copy() use karenge.


# Q4. Why keep matched_pattern as None?

    # Jab attack detect hoga,
    # tab actual matched pattern
    # runtime par fill kiya jayega.


# Q5. Why separate response templates?

    # Detection ka kaam dpi_engine.py karega.
    # Response structure maintain karna
    # responses.py ki responsibility hai.

