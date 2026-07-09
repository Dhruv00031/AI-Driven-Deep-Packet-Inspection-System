"""
==========================================================
File Name : packet_parser.py

Purpose :
Captured packet se useful information extract karna.

Ye file sirf packet ko read karegi aur
ek clean dictionary return karegi.

Packet ko detect ya print karna
iska kaam nahi hai.

Responsibilities :
• Packet Parsing
• IP Extraction
• Port Extraction
• Protocol Detection
• Payload Extraction

Future Scope :
Future me

• MAC Address
• TCP Flags
• TTL
• Window Size
• Sequence Number

bhi isi file se extract honge.

==========================================================
"""

# ==========================================================
# Required Imports
# ==========================================================

# IP, TCP aur UDP Layers
from scapy.layers.inet import IP, TCP, UDP

# Raw Payload Layer
from scapy.packet import Raw

# Project Constants
from packet_engine.constants import (
    PROTOCOL_TCP,
    PROTOCOL_UDP,
    PROTOCOL_OTHER,
    UNKNOWN_IP,
    UNKNOWN_PORT
)

# Helper Functions
from packet_engine.utils import generate_timestamp


# ==========================================================
# Parse Packet
# ==========================================================

def parse_packet(packet):
    """
    Raw Scapy Packet ko parse karega.

    Parameters
    ----------
    packet : Scapy Packet

    Returns
    -------
    Dictionary

    Agar packet useful nahi hua
    to None return karega.
    """

    # ======================================================
    # IP Layer Check
    # ======================================================

    # Agar packet me IP Layer hi nahi hai
    # to usko ignore kar denge.
    if not packet.haslayer(IP):

        return None

    # ======================================================
    # Empty Dictionary
    # ======================================================

    packet_data = {}

    # ======================================================
    # Packet Timestamp
    # ======================================================

    packet_data["timestamp"] = generate_timestamp()

    # ======================================================
    # Source & Destination IP
    # ======================================================

    packet_data["source_ip"] = packet[IP].src

    packet_data["destination_ip"] = packet[IP].dst

    # Safety Check

    if not packet_data["source_ip"]:

        packet_data["source_ip"] = UNKNOWN_IP

    if not packet_data["destination_ip"]:

        packet_data["destination_ip"] = UNKNOWN_IP

    # ======================================================
    # Packet Length
    # ======================================================

    packet_data["length"] = len(packet)

    # ======================================================
    # Protocol Detection
    # ======================================================

    if packet.haslayer(TCP):

        packet_data["protocol"] = PROTOCOL_TCP

        packet_data["source_port"] = packet[TCP].sport

        packet_data["destination_port"] = packet[TCP].dport

    elif packet.haslayer(UDP):

        packet_data["protocol"] = PROTOCOL_UDP

        packet_data["source_port"] = packet[UDP].sport

        packet_data["destination_port"] = packet[UDP].dport

    else:

        packet_data["protocol"] = PROTOCOL_OTHER

        packet_data["source_port"] = UNKNOWN_PORT

        packet_data["destination_port"] = UNKNOWN_PORT

    # ======================================================
    # Payload Extraction
    # ======================================================

    # Default Payload

    packet_data["payload"] = ""

    # Agar Raw Layer hai
    if packet.haslayer(Raw):

        try:

            # Bytes ko String me convert kar rahe hain.

            packet_data["payload"] = (

                packet[Raw]

                .load

                .decode(

                    "utf-8",

                    errors="ignore"

                )

            )

        except Exception:

            # Decode fail ho gaya.

            packet_data["payload"] = ""

    # ======================================================
    # Final Dictionary
    # ======================================================

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


# Q7. Why payload_preview?
    
    # Actual payload bahut bada ya encrypted ho sakta hai.
    # Isliye console me sirf readable preview
    # show karte hain.
    # Original payload future analysis ke liye
    # dictionary me preserve rehta hai.


# Q8. Why timestamp?

    # Har packet kis time receive hua
    # uska record rakhna zaruri hota hai.
    # Later Dashboard, MongoDB aur Analytics
    # isi timestamp ka use karenge.


# Q9. Why keep payload empty by default?

    # Har packet me Raw Layer nahi hoti.
    # Isliye empty string initialize karte hain.


# Q10. Why is parser independent?

    # Parser ko nahi pata
    # Packet SAFE hai
    # ya ATTACK.
    # Detection ka kaam
    # dpi_engine.py karega.