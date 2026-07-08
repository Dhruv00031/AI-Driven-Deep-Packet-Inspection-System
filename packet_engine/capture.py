"""
==========================================================
File Name : capture.py

Purpose :
Packet capture karna using Scapy.
Ye file sirf packet capture karegi.
Packet ke saath kya karna hai,
wo decision main.py lega.

==========================================================
"""

# Scapy ki sniff() function import kar rahe hain.
# Ye real-time packets capture karti hai.
from scapy.all import sniff


def start_capture(callback):
    """
    Packet capturing start karega.

    Parameters
    ----------
    callback : function

    Har baar jab naya packet capture hoga,
    Scapy isi callback function ko call karega.

    Example
    -------
    Packet
        ↓
    callback(packet)
    """

    print("==============================================")
    print(" AI Driven Deep Packet Inspection System ")
    print("==============================================")
    print("Listening for packets...")
    print("Press Ctrl + C to stop.\n")

    # Packet memory me store nahi honge.
    # Har packet directly callback function me chala jayega.
    sniff(
        prn=callback,
        store=False
    )


# Q1. Why did you use Scapy?

    # Scapy ek Python networking library hai.
    # Iski help se hum packets capture, inspect,
    # create aur manipulate kar sakte hain.
    # Network Security projects ke liye ye bahut useful library hai.


# Q2. What does sniff() do?

    # Ye selected network interface se
    # real-time packets capture karti hai.


# Q3. Why store=False?

    # Agar store=True rakhenge to
    # saare packets RAM me save hote rahenge.
    # Continuous monitoring me memory waste hogi.
    # Isliye hum store=False use karte hain.


# Q4. What is prn?

    # prn ek callback function hota hai.
    # Har packet capture hone ke baad
    # Scapy automatically isi function ko call karti hai.


# Q5. Why did we create start_capture()?

    # Taaki packet capturing ki responsibility
    # isi file ke paas rahe
    # Main.py sirf control karega,
    # capture.py sirf packets capture karegi.
    # Ye Single Responsibility Principle (SRP)
    # ko follow karta hai.