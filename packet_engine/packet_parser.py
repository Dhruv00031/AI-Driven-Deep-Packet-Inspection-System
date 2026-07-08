"""
==========================================================
File Name : packet_parser.py

Purpose :
Captured packet se useful information extract karna.

Ye file sirf packet ko read karegi aur
ek clean dictionary return karegi.

==========================================================
"""

# Required Scapy Layers import kar rahe hain
from scapy.layers.inet import IP, TCP, UDP
from scapy.packet import Raw


def parse_packet(packet):
    """
    Packet ko parse karega.

    Parameters
    ----------
    packet : Scapy Packet

    Returns
    -------
    Dictionary

    Agar packet useful nahi hua
    to None return karega.
    """

    # Dictionary banayi hai jisme
    # packet ki sari information store hogi.
    packet_data = {}

    # ---------------------------------------------------
    # Agar IP layer hi nahi hai
    # to packet inspect karna useful nahi.
    # ---------------------------------------------------
    if not packet.haslayer(IP):
        return None

    # ----------------------------
    # Source & Destination IP
    # ----------------------------

    packet_data["source_ip"] = packet[IP].src
    packet_data["destination_ip"] = packet[IP].dst

    # ----------------------------
    # Packet Length
    # ----------------------------

    packet_data["length"] = len(packet)

    # ---------------------------------------------------
    # Protocol detect kar rahe hain
    # ---------------------------------------------------

    if packet.haslayer(TCP):

        packet_data["protocol"] = "TCP"

        packet_data["source_port"] = packet[TCP].sport

        packet_data["destination_port"] = packet[TCP].dport

    elif packet.haslayer(UDP):

        packet_data["protocol"] = "UDP"

        packet_data["source_port"] = packet[UDP].sport

        packet_data["destination_port"] = packet[UDP].dport

    else:

        packet_data["protocol"] = "OTHER"

        packet_data["source_port"] = "-"

        packet_data["destination_port"] = "-"

    # ---------------------------------------------------
    # Payload Extraction
    # ---------------------------------------------------

    # Default payload empty rakha hai
    packet_data["payload"] = ""

    # Raw layer me actual application data hota hai.
    if packet.haslayer(Raw):

        try:

            # Bytes ko readable text me convert kar rahe hain.
            payload = packet[Raw].load.decode(errors="ignore")

            packet_data["payload"] = payload

        except Exception:

            # Agar decode fail ho jaye
            packet_data["payload"] = ""

    # ---------------------------------------------------
    # Final dictionary return kar rahe hain.
    # Isko DPI Engine, Database aur Dashboard use karenge.
    # ---------------------------------------------------

    return packet_data





# Q1. Why do we use haslayer()?

# Har packet me same protocol layers nahi hoti.
# Agar bina check kiye packet[IP] ya packet[TCP]
# access karenge to runtime error aa sakta hai.
# Isliye pehle haslayer() use karte hain.


# Q2. Why use len(packet)?

# Packet ka total size bytes me milta hai.
# Ye traffic analysis aur ML features
# ke liye useful hota hai.


# Q3. Why Raw layer?

# Actual application data (Payload)
# Raw layer me hota hai.
# Deep Packet Inspection isi data ko inspect karta hai.


# Q4. Why decode()?

# Network payload bytes format me hota hai.
# Hum usko readable text me convert karte hain
# taaki SQL Injection aur XSS patterns detect
# kiye ja saken.


# Q5. Why use a dictionary?

# Dictionary me sari packet information
# ek jagah store ho jati hai.
# Later isi dictionary ko
# • DPI Engine
# • MongoDB
# • REST API
# • Frontend
# directly use kar sakte hain.


# Q6. Why return instead of print?

# Professional software me modules
# generally data return karte hain.
# Sirf main.py decide karega ki
# data print karna hai,
# database me save karna hai
# ya frontend ko bhejna hai.