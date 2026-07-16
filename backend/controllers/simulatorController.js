/*
==========================================================
Simulator Controller
==========================================================
*/

const { exec } = require("child_process");
const path = require("path");

const generateSQLAttack = (req, res) => {

    exec(
        "python -m simulator.run_simulator sql",
        {
            cwd: path.join(__dirname, "../..")
        },
        (error, stdout, stderr) => {

            if (error) {

                return res.status(500).json({

                    success: false,

                    message: stderr

                });

            }

            res.json({

                success: true,

                message: "SQL Injection Generated"

            });

        }
    );

};

module.exports = {

    generateSQLAttack

};