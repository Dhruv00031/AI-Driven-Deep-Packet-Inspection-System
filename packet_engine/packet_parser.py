"""
Module Name : Packet Information Extractor
Author      : Team AI-DPI
Purpose     : Extract useful information from captured packets.
"""

from scapy.all import sniff
from scapy.layers.inet import IP, TCP, UDP


packet_number = 0
# Ye ek global variable hai.
# Iska kaam hai:
# Kitne packets capture ho chuke hain, unka count rakhna.


# Scapy jab bhi koi naya packet capture karta hai, woh automatically is function ko call karta hai.
def process_packet(packet):
    """
    Process every captured packet.
    """

    # Function ke bahar jo packet_number hai,
    # usi variable ko use kar rahe hain.
    global packet_number
    packet_number += 1

    # Prints '=' 60 times for better visibility.
    print("=" * 60)
    print(f"Packet Number      : {packet_number}")

    # Check if packet contains IP layer
    if packet.haslayer(IP):

        source_ip = packet[IP].src
        destination_ip = packet[IP].dst

        print(f"Source IP          : {source_ip}")
        print(f"Destination IP     : {destination_ip}")

        # Check protocol
        if packet.haslayer(TCP):

            print("Protocol           : TCP")
            print(f"Source Port        : {packet[TCP].sport}")
            print(f"Destination Port   : {packet[TCP].dport}")

        elif packet.haslayer(UDP):

            print("Protocol           : UDP")
            print(f"Source Port        : {packet[UDP].sport}")
            print(f"Destination Port   : {packet[UDP].dport}")

        else:

            print("Protocol           : Other")

        print(f"Packet Length      : {len(packet)} Bytes")

    else:

        print("Non-IP Packet")

    print("=" * 60)
    print()


print("Starting Packet Information Extractor...")
print("Press Ctrl + C to stop.\n")

sniff(prn=process_packet, store=False) 







# Q1. Why do we use haslayer()?
# Because not every packet contains the same protocol layers. Checking first prevents runtime errors.

# Q2. Why use len(packet)?
# It gives the total size of the packet in bytes, which is useful for traffic analysis and machine learning features.

# Q3. Why separate capture.py and packet_info.py?
# Because of the Single Responsibility Principle (SRP). One module should perform one well-defined task. This makes the code easier to maintain, test, and extend.