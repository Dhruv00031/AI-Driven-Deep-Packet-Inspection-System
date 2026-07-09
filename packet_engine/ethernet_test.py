from scapy.all import sniff

print("Listening on Ethernet...\n")
print("Generate some traffic (open Chrome, ping Google, etc.)\n")

sniff(
    iface="Ethernet",
    count=10,
    prn=lambda packet: print(packet.summary()),
    store=False
)

print("\nCapture Complete!")