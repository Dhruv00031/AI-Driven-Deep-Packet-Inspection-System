from scapy.all import IFACES

print("\nAvailable Interfaces:\n")

for iface in IFACES.values():
    print("=" * 60)
    print("Name       :", iface.name)
    print("Description:", iface.description)
    print("Index      :", iface.index)