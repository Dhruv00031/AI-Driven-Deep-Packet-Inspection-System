"""
Attack Detection Rules
"""

SQL_PATTERNS = [

    "' OR 1=1",

    "UNION SELECT",

    "DROP TABLE",

    "INSERT INTO",

    "DELETE FROM"

]

XSS_PATTERNS = [

    "<script>",

    "alert(",

    "onerror=",

    "javascript:",

    "document.cookie"

]