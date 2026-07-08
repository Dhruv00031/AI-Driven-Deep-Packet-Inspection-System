"""
==========================================================
File Name : main.py

Purpose :
Ye project ka Main Controller hai.

Is file ka kaam hai:

1. Packet Capture Start karna
2. Packet Parse karna
3. Payload Inspect karna
4. Result Display karna

Author : AI-DPI Team
==========================================================
"""

# Packet Capture Module
from packet_engine.capture import start_capture

# Packet Parser Module
from packet_engine.packet_parser import parse_packet

# DPI Engine
from packet_engine.dpi_engine import inspect_payload


# ==========================================================
# Packet Counter
# ==========================================================

# Kitne packets process hue uska count
packet_number = 0


def process_packet(packet):
    """
    Har packet ke liye ye function automatically execute hoga.
    """

    global packet_number

    # Packet Number increase kar rahe hain
    packet_number += 1

    # -----------------------------------------
    # Packet ko parse karte hain
    # -----------------------------------------

    packet_data = parse_packet(packet)

    # Agar packet useful nahi hai
    # to usko ignore kar do.
    if packet_data is None:
        return

    # -----------------------------------------
    # Payload inspect karte hain
    # -----------------------------------------

    inspection_result = inspect_payload(
        packet_data["payload"]
    )

    # -----------------------------------------
    # Output Display
    # -----------------------------------------

    print("\n")
    print("=" * 70)

    print(f"Packet Number        : {packet_number}")

    print("-" * 70)

    print(f"Source IP            : {packet_data['source_ip']}")

    print(f"Destination IP       : {packet_data['destination_ip']}")

    print(f"Protocol             : {packet_data['protocol']}")

    print(f"Source Port          : {packet_data['source_port']}")

    print(f"Destination Port     : {packet_data['destination_port']}")

    print(f"Packet Length        : {packet_data['length']} Bytes")

    # Payload bahut bada ho sakta hai.
    # Isliye sirf pehle 100 characters dikha rahe hain.
    payload_preview = packet_data["payload"][:100]

    if payload_preview == "":
        payload_preview = "<No Readable Payload>"

    print(f"Payload Preview      : {payload_preview}")

    print("-" * 70)

    print(f"Status               : {inspection_result['status']}")

    print(f"Attack Type          : {inspection_result['attack']}")

    print("=" * 70)


# ==========================================================
# Project Start
# ==========================================================

print("\n")
print("=" * 70)
print("      AI Driven Deep Packet Inspection System")
print("=" * 70)
print("Listening for packets...")
print("Press Ctrl + C to stop.\n")

# Packet Capture Start
start_capture(process_packet)