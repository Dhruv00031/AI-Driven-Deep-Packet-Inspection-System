"""
File Name : packet_parser.py
Purpose   : Packet se useful information extract karna.
"""

from scapy.layers.inet import IP, TCP, UDP
from scapy.packet import Raw


def parse_packet(packet):

    """
    Ye function packet ko read karega aur
    sari useful information dictionary me return karega.
    """

    # Dictionary banayi hai jisme packet ki details store hongi
    packet_data = {}

    # Agar packet me IP layer nahi hai
    # to aage inspect karna zaruri nahi.
    if not packet.haslayer(IP):
        return None

    # Source aur Destination IP
    packet_data["source_ip"] = packet[IP].src
    packet_data["destination_ip"] = packet[IP].dst

    # Packet ki total length
    packet_data["length"] = len(packet)

    # Default payload empty rakha hai
    packet_data["payload"] = ""

    # Check kar rahe hain ki packet me Raw layer hai ya nahi
    if packet.haslayer(Raw):

        try:

            # Bytes ko readable text me convert kar rahe hain
            payload = packet[Raw].load.decode(errors="ignore")

            packet_data["payload"] = payload

        except Exception:

            # Agar decode nahi hua
            packet_data["payload"] = ""







# Q1. Why do we use haslayer()?
#   Because not every packet contains the same protocol layers. Checking first prevents runtime errors.

# Q2. Why use len(packet)?
#   It gives the total size of the packet in bytes, which is useful for traffic analysis and machine learning features.

# Q3. Why separate capture.py and packet_info.py?
#   Because of the Single Responsibility Principle (SRP). One module should perform one well-defined task. This makes the code easier to maintain, test, and extend.

# Q4. Why Raw layer?
#     Because actual application data (payload) is usually 
#     stored in the Raw layer. DPI inspects this data instead of
#     just the packet headers.

# Q5. Why decode?
#     Network payload is stored as bytes. 
#     We decode it into readable text so that attack signatures
#     such as SQL Injection or XSS can be matched.

# Q6. Why use a dictionary?
#     A dictionary groups all packet attributes together 
#     (IPs, ports, protocol, payload), making it easy to 
#     pass the data between modules and later convert it into JSON for APIs.