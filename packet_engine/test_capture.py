from scapy.all import IFACES

for iface in IFACES.values():
    print(f"Name: {iface.name}")
    print(f"Description: {iface.description}")
    print(f"Index: {iface.index}")
    print("-" * 50)

    sniff(
        iface="TP-LINK 100Mbps USB Network Adapter",
        prn=lambda p: print(p.summary()),
        store=False
    )