"""
==========================================================
Attack Simulator

Purpose :

Generate simulated packets
and send them to DPI Engine.

==========================================================
"""

from simulator.attacks import generate_sql_injection

from packet_engine.dpi_engine import inspect_packet

from database.mongodb import insert_packet

from simulator.attacks import (

    generate_sql_injection,

    generate_xss

)


def simulate_attack(choice):

    if choice == 1:

        packet = generate_sql_injection()

    elif choice == 2:

        packet = generate_xss()

    else:

        print("Invalid Choice.")

        return None

    # DPI Detection

    result = inspect_packet(packet)

    packet.update(result)

    insert_packet(packet)

    return packet