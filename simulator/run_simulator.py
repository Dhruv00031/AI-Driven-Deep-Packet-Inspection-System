"""
==========================================================
Run Attack Simulator

Purpose :

Run simulator using command-line arguments.

Examples :

python -m simulator.run_simulator sql

python -m simulator.run_simulator xss

==========================================================
"""

import sys

from simulator.attack_simulator import simulate_attack


# ==========================================================
# Main
# ==========================================================

def main():

    # No argument passed
    if len(sys.argv) < 2:

        print("Usage : python -m simulator.run_simulator [sql|xss]")

        return

    attack = sys.argv[1].lower()

    if attack == "sql":

        choice = 1

    elif attack == "xss":

        choice = 2

    else:

        print("Invalid Attack Type")

        return

    packet = simulate_attack(choice)

    if packet:

        print("Packet Generated Successfully")

        print(packet)


if __name__ == "__main__":

    main()