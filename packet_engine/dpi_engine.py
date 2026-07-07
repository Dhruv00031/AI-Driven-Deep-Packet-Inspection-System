"""
File Name : dpi_engine.py
Purpose   : Payload ko inspect karna aur attack detect karna.
"""

# Rules import kar rahe hain
from packet_engine.rules import SQL_PATTERNS, XSS_PATTERNS


def inspect_payload(payload):
    """
    Payload inspect karega.

    Input:
        payload (String)

    Output:
        SAFE
        SQL Injection Detected
        XSS Attack Detected
    """

    # Agar payload empty hai
    # to inspect karne ka koi matlab nahi.
    if not payload:
        return "SAFE"

    # Uppercase aur lowercase dono ko same treat karenge.
    # Payload <ScRiPt> direct comparison me match nahi karega,
    # isliye payload ko lowercase me convert kar rahe hain taaki wo <script> ke saath match kare.
    payload = payload.lower()

    # ===============================
    # SQL Injection Check
    # ===============================

    for pattern in SQL_PATTERNS:

        # Comparison easy ho jaye
        pattern = pattern.lower()

        # Agar pattern mil gaya
        if pattern in payload:

            return "SQL Injection Detected"

    # ===============================
    # XSS Check
    # ===============================

    for pattern in XSS_PATTERNS:

        pattern = pattern.lower()

        if pattern in payload:

            return "XSS Attack Detected"

    # Agar kuch nahi mila
    return "SAFE"





# Q1. Why use a Rule Engine first instead of AI?
#     Rule Engine deterministic hota hai. 
#     Known attacks ko instantly detect karta hai.
#     AI unknown patterns detect karne me help karta hai. 
#     Dono ka combination production systems me use hota hai.


# Q2. Why convert payload to lowercase?
#     Case sensitivity remove karne ke liye,
#     taaki <SCRIPT> aur <script> dono detect ho saken.


# Q3. Why keep patterns in rules.py?
#     Taaki naye attack signatures add karna easy ho
#     aur detection logic (dpi_engine.py) ko modify na karna pade.
#     Isse code modular aur maintainable rehta hai.