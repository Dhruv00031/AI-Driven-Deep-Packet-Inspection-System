/*
==========================================================
Simulator Controller
==========================================================
*/

const { exec } = require("child_process");
const path = require("path");

// Working directory is /app in Docker (two levels up from /app/backend/controllers)
const PROJECT_ROOT = path.join(__dirname, "../..");

function runSimulator(type, successMessage, res) {

    console.log(`=== runSimulator(${type}) called ===`);
    console.log(`PROJECT_ROOT: ${PROJECT_ROOT}`);

    exec(

        `python3 -m simulator.run_simulator ${type}`,

        {

            cwd: PROJECT_ROOT,

            // 30-second timeout — prevents infinite hang on Render free tier
            timeout: 30000,

            // Capture up to 1MB of output
            maxBuffer: 1024 * 1024

        },

        (error, stdout, stderr) => {

            console.log("--- Python stdout ---");
            console.log(stdout);
            console.log("--- Python stderr ---");
            console.log(stderr);

            if (error) {

                // Distinguish timeout from other errors
                if (error.killed || error.code === "ETIMEDOUT" || error.signal === "SIGTERM") {

                    console.error("Python simulator timed out after 30s");

                    return res.status(500).json({

                        success: false,

                        message: "Simulator timed out. Check Render logs for Python errors."

                    });

                }

                console.error("Python simulator error:", error.message);

                return res.status(500).json({

                    success: false,

                    message: stderr || stdout || error.message

                });

            }

            if (!stdout.includes("Packet Generated Successfully")) {

                console.error("Python ran but did not print 'Packet Generated Successfully'");
                console.error("stdout was:", stdout);

                return res.status(500).json({

                    success: false,

                    message: stdout || "Simulator did not confirm packet generation."

                });

            }

            console.log(`=== ${type} simulation succeeded ===`);

            return res.json({

                success: true,

                message: successMessage

            });

        }

    );

}

const generateSQLAttack = (req, res) => {

    console.log("=== SQL Button Clicked ===");

    runSimulator(

        "sql",

        "SQL Injection Generated",

        res

    );

};

const generateXSSAttack = (req, res) => {

    console.log("=== XSS Button Clicked ===");

    runSimulator(

        "xss",

        "XSS Attack Generated",

        res

    );

};

module.exports = {

    generateSQLAttack,

    generateXSSAttack

};