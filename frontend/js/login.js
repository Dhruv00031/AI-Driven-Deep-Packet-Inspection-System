/*
==========================================================
File Name : login.js

Purpose :

Login page ka JavaScript.

Responsibilities :

• Login Form Handle Karna
• Basic Validation
• Dashboard Redirect

Future Scope :

• JWT Authentication
• Role Based Login
• Remember Me

==========================================================
*/

// ==========================================================
// Get Required Elements
// ==========================================================

// Login Form
const loginForm = document.getElementById("loginForm");

// Username Input
const usernameInput = document.getElementById("username");

// Password Input
const passwordInput = document.getElementById("password");

// ==========================================================
// Login Event
// ==========================================================

loginForm.addEventListener("submit", function (event) {

    // Form ka default reload stop karna
    event.preventDefault();

    // User ki values lena
    const username = usernameInput.value.trim();
    const password = passwordInput.value.trim();

    // ======================================================
    // Validation
    // ======================================================

    // Username empty hai?
    if (username === "") {

        alert("Please enter username.");

        usernameInput.focus();

        return;

    }

    // Password empty hai?
    if (password === "") {

        alert("Please enter password.");

        passwordInput.focus();

        return;

    }

    // ======================================================
    // Temporary Login
    // ======================================================

    /*
    Abhi authentication backend se nahi hogi.

    Sirf dashboard open kar rahe hain.

    Later:

    Login API call hogi

    ↓

    JWT Token milega

    ↓

    Dashboard open hoga
    */

    window.location.href = "dashboard.html";

});






// Q1. Why use preventDefault()?
//
// Form submit hone par
// page reload ho jata hai.
//
// Hum reload nahi chahte.


// Q2. Why use trim()?
//
// Beginning aur ending ke
// extra spaces remove ho jati hain.


// Q3. Why use focus()?
//
// User ko automatically
// galat input field par le jane ke liye.


// Q4. Why validate on frontend?
//
// Taaki unnecessary
// backend requests na bhejni pade.


// Q5. Is this secure?
//
// Nahi.
//
// Ye sirf temporary login hai.
//
// Actual authentication
// backend API se hogi.