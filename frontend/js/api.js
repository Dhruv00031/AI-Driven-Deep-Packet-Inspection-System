/*
==========================================================
File Name : api.js

Purpose :

Backend APIs ko call karna.

Ye file sirf backend
communication ke liye bani hai.

Responsibilities :

• Fetch Dashboard Data
• Fetch Packets
• Fetch Threats

Future Scope :

• Login API
• Delete APIs
• Search APIs

==========================================================
*/


// ==========================================================
// Backend Base URL
// ==========================================================

/*
Backend localhost par
Express Server run kar raha hai.
*/

const BASE_URL = "http://localhost:5000/api";


// ==========================================================
// Dashboard API
// ==========================================================

async function getDashboardData(){

    try{

        const response = await fetch(

            `${BASE_URL}/dashboard`

        );

        const data = await response.json();

        return data;

    }

    catch(error){

        console.error(

            "Dashboard API Error :",

            error

        );

        return null;

    }

}


// ==========================================================
// Packets API
// ==========================================================

async function getPackets(){

    try{

        const response = await fetch(

            `${BASE_URL}/packets`

        );

        const data = await response.json();

        return data;

    }

    catch(error){

        console.error(

            "Packets API Error :",

            error

        );

        return null;

    }

}


// ==========================================================
// Threat API
// ==========================================================

async function getThreats(){

    try{

        const response = await fetch(

            `${BASE_URL}/threats`

        );

        const data = await response.json();

        return data;

    }

    catch(error){

        console.error(

            "Threat API Error :",

            error

        );

        return null;

    }

}







/*

Q1 Why create api.js separately?

Saari API calls
ek hi jagah rahengi.

Code reusable banega.


Q2 Why BASE_URL?

Agar server ka address
change hua

to sirf ek line
change karni padegi.


Q3 Why async await?

Network request
complete hone ka
wait karta hai.


Q4 Why use try catch?

Network error aaye

to website crash
na kare.


Q5 Why return null?

Calling function
easily check kar sake
API successful thi ya nahi.

*/