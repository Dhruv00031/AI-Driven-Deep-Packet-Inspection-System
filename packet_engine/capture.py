"""
==========================================================
File Name : capture.py

Purpose :
Scapy ki help se real-time network packets capture karna.

Ye file sirf packet capture karegi.

Packet ko parse ya inspect karna iska kaam nahi hai.

Responsibilities :
• Real-Time Packet Capture
• Callback Function ko Packet bhejna

Future Scope :
Future me

• Interface Selection
• Packet Filters
• Capture Statistics

isi file me add honge.

==========================================================
"""

# ==========================================================
# Required Imports
# ==========================================================

# Scapy ki sniff() function import kar rahe hain.
# Ye real-time packets capture karti hai.


from scapy.all import sniff

# Project constants import kar rahe hain.
from packet_engine.constants import (
    PROJECT_NAME,
    PROJECT_VERSION,
    DIVIDER,
    START_MESSAGE,
    LISTENING_MESSAGE,
    STOP_MESSAGE,
    NETWORK_INTERFACE
)


# ==========================================================
# Start Packet Capture
# ==========================================================

def start_capture(callback):
    """
    Real-time packet capture start karega.

    Parameters
    ----------
    callback : function

    Har baar jab naya packet capture hoga,
    Scapy automatically callback function ko call karegi.

    Example

    Packet
        │
        ▼
    callback(packet)
    """

    # ======================================================
    # Project Information
    # ======================================================

    print()

    print(DIVIDER)

    print(PROJECT_NAME)

    print(f"Version : {PROJECT_VERSION}")

    print(DIVIDER)

    print(START_MESSAGE)

    print(LISTENING_MESSAGE)

    print(STOP_MESSAGE)

    print(DIVIDER)

    print()

    # ======================================================
    # Packet Capture Start
    # ======================================================

    sniff(
        iface=NETWORK_INTERFACE,
        prn=callback,
        store=False
    )





# Q1. Why did you use Scapy?

    # Scapy ek Python networking library hai.
    # Iski help se hum packets capture,
    # inspect aur manipulate kar sakte hain.
    # Cyber Security projects me
    # ye bahut popular library hai.


# Q2. What does sniff() do?

    # Network Interface se
    # real-time packets capture karti hai.


# Q3. Why use store=False?

    # Agar store=True rakhenge
    # to har packet memory me save hota rahega.
    # Continuous monitoring me
    # memory bahut consume hogi.
    # Isliye store=False use kiya hai.


# Q4. What is prn?

    # prn callback function hota hai.
    # Har packet capture hone ke baad
    # Scapy automatically isi function ko call karti hai.


# Q5. Why create start_capture()?

    # Taaki packet capturing ki responsibility
    # sirf isi file me rahe.
    # Main.py sirf project control karega.
    # Ye Single Responsibility Principle follow karta hai.


# Q6. Why pass callback instead of processing here?

    # Capture.py ko sirf packets capture karne hain.
    # Packet ke saath kya karna hai
    # ye decision main.py lega.
    # Isse code modular aur reusable banta hai.

