"""
File Name : rules.py
Purpose   : Yaha hum attack signatures store karenge.
Author    : AI-DPI Team
"""

# ==========================
# SQL Injection Patterns
# ==========================

# Agar payload me inme se koi keyword mila,
# to possible SQL Injection attack ho sakta hai.

SQL_PATTERNS = [

    "' OR 1=1",

    "' OR '1'='1",

    "UNION SELECT",

    "DROP TABLE",

    "DELETE FROM",

    "INSERT INTO",

    "UPDATE SET",

    "--",

    ";--"

]

# ==========================
# XSS Patterns
# ==========================

# Agar payload me ye tags mile,
# to XSS attack ka chance hai.

XSS_PATTERNS = [

    "<script>",

    "</script>",

    "alert(",

    "javascript:",

    "onerror=",

    "document.cookie",

    "<iframe>",

    "<img"

]