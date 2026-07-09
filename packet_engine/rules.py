"""
==========================================================
File Name : rules.py

Purpose :
Is file me Rule-Based Detection ke liye
saare attack signatures store kiye gaye hain.

Ye file sirf signatures maintain karti hai.

Detection ka kaam dpi_engine.py karega.

Benefits:
1. Easy Maintenance
2. Easy Expansion
3. Cleaner Code
4. Better Software Architecture

Responsibilities :
• SQL Injection Signatures
• Cross Site Scripting Signatures

Future Scope :
Future me isi file me

• Command Injection
• Path Traversal
• LDAP Injection
• XXE
• RCE
• SSRF
• CSRF

ke signatures add honge.

==========================================================
"""

# ==========================================================
# SQL INJECTION PATTERNS
# ==========================================================

# Agar payload me inme se koi bhi pattern milta hai
# to possible SQL Injection attack ho sakta hai.

SQL_PATTERNS = [

    "' OR 1=1",

    "' OR '1'='1",

    "\" OR \"1\"=\"1",

    "' OR TRUE --",

    "'--",

    "\"--",

    ";--",

    "UNION SELECT",

    "DROP TABLE",

    "DELETE FROM",

    "INSERT INTO",

    "UPDATE",

    "SELECT * FROM",

    "EXEC(",

    "EXECUTE",

    "xp_cmdshell",

    "information_schema",

    "sleep(",

    "benchmark(",

    "load_file(",

    "outfile",

    "waitfor delay"

]

# ==========================================================
# CROSS SITE SCRIPTING (XSS)
# ==========================================================

# Browser me malicious JavaScript
# execute karne ki koshish ko detect karenge.

XSS_PATTERNS = [

    "<script>",

    "</script>",

    "alert(",

    "javascript:",

    "document.cookie",

    "document.write",

    "onerror=",

    "onload=",

    "onclick=",

    "onmouseover=",

    "<iframe>",

    "</iframe>",

    "<img",

    "<svg",

    "<body",

    "<embed",

    "<object",

    "<link",

    "<meta",

    "<video",

    "<audio"

]

# ==========================================================
# FUTURE SIGNATURES
# ==========================================================

# Future Versions ke liye placeholders

COMMAND_INJECTION_PATTERNS = []

PATH_TRAVERSAL_PATTERNS = []

LDAP_INJECTION_PATTERNS = []

XXE_PATTERNS = []

RCE_PATTERNS = []

SSRF_PATTERNS = []

CSRF_PATTERNS = []





# Q1. Why store signatures in a separate file?

    # Taaki naye signatures add karna easy ho.
    # Detection logic ko modify na karna pade.


# Q2. Why use Lists?

    # Loop ke through easily
    # har pattern compare kar sakte hain.


# Q3. Why separate SQL and XSS?

    # Dono attacks alag nature ke hote hain.
    # Future me severity,
    # AI Model aur Analytics bhi
    # alag handle karenge.


# Q4. Why are future attack lists empty?

    # Architecture ko future ready
    # banane ke liye.
    # Jab naye modules banenge,
    # sirf patterns add karne honge.


# Q5. Why not write detection code here?

    # Single Responsibility Principle.
    # rules.py ka kaam sirf
    # signatures maintain karna hai.
    # Detection dpi_engine.py karega.


# Q6. What is a Signature?

    # Signature ek predefined pattern hota hai
    # jo kisi known attack ko represent karta hai.
    # DPI Engine payload me isi signature
    # ko search karta hai.

