/*
==========================================================
Simulator Controller
==========================================================
*/

const { exec } = require("child_process");
const path = require("path");

function runSimulator(type, successMessage, res) {

    console.log("Executing Python Simulator...");

    exec(

        `python3 -m simulator.run_simulator ${type}`,

        {

            cwd: path.join(__dirname, "../..")

        },

        (error, stdout, stderr) => {

            console.log("stdout:", stdout);
            console.log("stderr:", stderr);
            console.log("error:", error);
            
            if (error) {

                return res.status(500).json({

                    success: false,

                    message: stderr || stdout || error.message

                });

            }

            if (!stdout.includes("Packet Generated Successfully")) {

                return res.status(500).json({

                    success: false,

                    message: stdout

                });

            }

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