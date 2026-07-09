"""
==========================================================
File Name : main.py

Purpose :
Ye project ka Main Controller hai.

Ye file project ke saare modules ko connect karti hai.

Responsibilities :
1. Packet Capture Start Karna
2. Packet Parse Karna
3. DPI Detection Karna
4. Console Output Dikhana

Future Scope :
Future me

• MongoDB
• REST API
• Dashboard
• Machine Learning

isi file ke through integrate honge.

==========================================================
"""

# ==========================================================
# Required Imports
# ==========================================================

# Packet Capture
from packet_engine.capture import start_capture

# Packet Parser
from packet_engine.packet_parser import parse_packet

# DPI Engine
from packet_engine.dpi_engine import inspect_packet

# Helper Functions
from packet_engine.utils import (
    generate_packet_id,
    generate_payload_preview,
    format_packet_size
)

# Project Constants
from packet_engine.constants import (
    DIVIDER,
    SUB_DIVIDER,
    PROJECT_NAME,
    PROJECT_VERSION
)

# ==========================================================
# Display Packet
# ==========================================================

def display_packet(packet_data, inspection_result):
    """
    Packet ko professional format me
    console par print karega.
    """

    print()

    print(DIVIDER)

    print(f"Packet ID            : {generate_packet_id()}")

    print(f"Timestamp            : {packet_data['timestamp']}")

    print(SUB_DIVIDER)

    print(f"Source IP            : {packet_data['source_ip']}")

    print(f"Destination IP       : {packet_data['destination_ip']}")

    print(f"Protocol             : {packet_data['protocol']}")

    print(f"Source Port          : {packet_data['source_port']}")

    print(f"Destination Port     : {packet_data['destination_port']}")

    print(f"Packet Length        : {format_packet_size(packet_data['length'])}")

    print(
        f"Payload Preview      : "
        f"{generate_payload_preview(packet_data['payload'])}"
    )

    print(SUB_DIVIDER)

    print(f"Status               : {inspection_result['status']}")

    print(f"Attack Type          : {inspection_result['attack']}")

    print(f"Severity             : {inspection_result['severity']}")

    print(
        f"Matched Pattern      : "
        f"{inspection_result['matched_pattern']}"
    )

    print(DIVIDER)


# ==========================================================
# Process Packet
# ==========================================================

def process_packet(packet):
    """
    Har packet ke liye
    automatically execute hoga.
    """

    # Packet Parse
    packet_data = parse_packet(packet)

    # Agar packet useful nahi hai
    if packet_data is None:

        return

    # DPI Detection
    inspection_result = inspect_packet(packet_data)

    # Console Output
    display_packet(packet_data, inspection_result)


# ==========================================================
# Main Function
# ==========================================================

def main():
    """
    Project Start Karega.
    """

    print()

    print(DIVIDER)

    print(PROJECT_NAME)

    print(f"Version : {PROJECT_VERSION}")

    print(DIVIDER)

    # Packet Capture Start
    start_capture(process_packet)


# ==========================================================
# Program Entry Point
# ==========================================================

if __name__ == "__main__":

    main()





# Q1. Why create main.py?

    # Ye project ka Controller hai.
    # Saare modules isi file se connect hote hain.


# Q2. Why separate display_packet()?

    # Printing aur processing
    # dono alag responsibilities hain.
    # Isse code readable banta hai.


# Q3. Why process_packet()?

    # Har packet capture hone ke baad
    # isi function ko callback ke through
    # automatically call kiya jata hai.


# Q4. Why use helper functions?

    # Packet ID
    # Payload Preview
    # Packet Size Formatting
    # alag file me rakhne se
    # code reusable ho jata hai.


# Q5. Why call inspect_packet() instead of inspect_payload()?

    # Future me sirf payload nahi,
    # complete packet analyse hoga.
    # Isliye architecture future ready banaya gaya hai.

