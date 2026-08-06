/*
==========================================================
Notification System
==========================================================
*/

// Toast Container
const notificationContainer =
    document.getElementById("notificationContainer");

// Notification Center
const notificationBell =
    document.getElementById("notificationBell");

const notificationDropdown =
    document.getElementById("notificationDropdown");

const notificationBadge =
    document.getElementById("notificationBadge");

const notificationList =
    document.getElementById("notificationList");

const clearNotifications =
    document.getElementById("clearNotifications");

let notifications = [];

let unreadCount = 0;


// ==========================================================
// Toast Notification
// ==========================================================

function showThreatNotification(packet){

    const notification =
        document.createElement("div");

    notification.className =
        "threat-notification";

    notification.innerHTML = `

        <strong>⚠ ${packet.attack}</strong>

        <br>

        Source : ${packet.source_ip}

        <br>

        Severity : ${packet.severity}

    `;

    notificationContainer.appendChild(notification);

    setTimeout(() => {

        notification.remove();

    },5000);

}


// ==========================================================
// Add Notification
// ==========================================================

function addNotification(packet){

    notifications.unshift(packet);

    unreadCount++;

    notificationBadge.textContent = unreadCount;

    renderNotifications();

}


// ==========================================================
// Render Notifications
// ==========================================================

function renderNotifications(){

    notificationList.innerHTML = "";

    if(notifications.length===0){

        notificationList.innerHTML =

        "<p class='text-muted'>No Notifications</p>";

        return;

    }

    notifications.slice(0,5).forEach(packet=>{

        const div=document.createElement("div");

        div.className="notification-item";

        div.innerHTML=`

            <strong>${packet.attack}</strong>

            <br>

            ${packet.source_ip}

            <br>

            <small>${packet.severity}</small>

        `;

        notificationList.appendChild(div);

    });

}


// ==========================================================
// Bell Click
// ==========================================================

if (notificationBell) {

    notificationBell.addEventListener("click", () => {

        if (notificationDropdown.style.display === "block") {

            notificationDropdown.style.display = "none";

        }

        else {

            notificationDropdown.style.display = "block";

        }

    });

}


// ==========================================================
// Clear Notifications
// ==========================================================

if (clearNotifications) {

    clearNotifications.addEventListener("click", () => {

        notifications = [];

        unreadCount = 0;

        notificationBadge.textContent = 0;

        renderNotifications();

        notificationDropdown.style.display = "none";

    });

}