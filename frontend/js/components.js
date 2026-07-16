/*
==========================================================
File Name : components.js

Purpose :

Reusable Components Loader

Responsibilities :

• Load Sidebar
• Load Navbar
• Highlight Active Page

Future Scope :

• Footer
• Breadcrumb
• Theme Switcher

==========================================================
*/


// ==========================================================
// Load Sidebar
// ==========================================================

async function loadSidebar() {

    const sidebar = document.getElementById("sidebar");

    if (!sidebar) {

        return;

    }

    const response = await fetch("components/sidebar.html");

    sidebar.innerHTML = await response.text();

}


// ==========================================================
// Load Navbar
// ==========================================================

async function loadNavbar() {

    const navbar = document.getElementById("navbar");

    if (!navbar) {

        return;

    }

    const response = await fetch("components/navbar.html");

    navbar.innerHTML = await response.text();

}


// ==========================================================
// Highlight Current Page
// ==========================================================

function highlightActivePage() {

    const currentPage = window.location.pathname.split("/").pop();

    const links = document.querySelectorAll(".sidebar a");

    links.forEach(link => {

        const parent = link.parentElement;

        parent.classList.remove("active");

        if (link.getAttribute("href") === currentPage) {

            parent.classList.add("active");

        }

    });

}


// ==========================================================
// Load Components
// ==========================================================

async function loadComponents() {

    await loadSidebar();

    await loadNavbar();

    highlightActivePage();

}


loadComponents();