# Import the sniff() function from Scapy.
# This function captures packets.
from scapy.all import sniff

# Every time a packet arrives,
# Scapy sends it here.
def process_packet(packet):
    print(packet.summary())
    # summary() gives a one-line description.

print("Listening for packets...")
# Only informs the user.
print("Press Ctrl + C to stop.\n")


# This is the heart of today's program.
# When a packet arrives,
# call this function.
sniff(prn=process_packet, store=False)






# Q1. Why did you use Scapy?
# Scapy is a Python library that allows us to capture, inspect, create, and manipulate network packets. We use it because it is simple, open-source, and ideal for educational as well as security-related projects.

# Q2. What does sniff() do?
# Captures packets from the selected network interface in real time.

# Q3. Why store=False?
# To avoid storing every captured packet in memory, reducing memory usage during continuous monitoring.

# Q4. What is prn?
# prn specifies the callback function that is executed whenever a new packet is captured.

# Q5. Why did we create process_packet()?
# To separate packet-processing logic from packet-capturing logic, making the code modular and easier to maintain.