"""
==========================================================
File Name : attacks.py

Purpose :

Generate simulated attack packets.

Responsibilities :

• SQL Injection
• XSS
• Command Injection
• Port Scan
• DNS Tunneling

==========================================================
"""

import random

import uuid


# ==========================================================
# SQL Injection Packet
# ==========================================================

def generate_sql_injection():

    packet = {

        "packet_id": f"SIM-{uuid.uuid4().hex[:8].upper()}",

        "source_ip": f"192.168.1.{random.randint(2,200)}",

        "destination_ip": "192.168.1.10",

        "protocol": "TCP",

        "payload": "id=1' OR '1'='1 --",
    }

    return packet
    

# ==========================================================
# Cross Site Scripting Packet
# ==========================================================

def generate_xss():

    packet = {

        "source_ip": f"192.168.1.{random.randint(2,200)}",

        "destination_ip": "192.168.1.20",

        "protocol": "TCP",

        "payload": "<script>alert('XSS')</script>"

    }

    return packet