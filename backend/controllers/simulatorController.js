/*
==========================================================
Simulator Controller
==========================================================
*/

const { execFile } = require("child_process");
const path = require("path");

const PROJECT_ROOT = path.resolve(__dirname, "../..");
const PYTHON_BIN = process.env.PYTHON_BIN || "python3";

function runSimulator(type, successMessage, res) {
    if (!['sql', 'xss'].includes(type)) {
        return res.status(400).json({
            success: false,
            message: "Invalid simulator type"
        });
    }

    console.log(`[Simulator] Starting ${type} simulation`);
    console.log(`[Simulator] cwd=${PROJECT_ROOT}, python=${PYTHON_BIN}`);

    // execFile avoids shell parsing and executes Python directly. The child
    // inherits Render's environment, including MONGO_URI.
    execFile(
        PYTHON_BIN,
        ["-m", "simulator.run_simulator", type],
        {
            cwd: PROJECT_ROOT,
            env: process.env,
            timeout: 25000,
            maxBuffer: 1024 * 1024
        },
        (error, stdout, stderr) => {
            const out = (stdout || "").trim();
            const err = (stderr || "").trim();

            if (out) console.log(`[Simulator:${type}] stdout:\n${out}`);
            if (err) console.error(`[Simulator:${type}] stderr:\n${err}`);

            if (error) {
                console.error(`[Simulator:${type}] process error:`, {
                    code: error.code,
                    signal: error.signal,
                    killed: error.killed,
                    message: error.message
                });

                if (error.killed || error.code === "ETIMEDOUT") {
                    return res.status(504).json({
                        success: false,
                        message: "Attack simulator timed out before completion."
                    });
                }

                return res.status(500).json({
                    success: false,
                    message: err || out || "Attack simulator failed. Check server logs."
                });
            }

            // run_simulator.py exits 0 only after DPI inspection and MongoDB
            // insertion succeed. Keep the marker check as an extra safeguard.
            if (!out.includes("Packet Generated Successfully")) {
                console.error(`[Simulator:${type}] Python exited without success marker`);
                return res.status(500).json({
                    success: false,
                    message: out || "Simulator completed without confirming packet generation."
                });
            }

            return res.status(200).json({
                success: true,
                message: successMessage
            });
        }
    );
}

const generateSQLAttack = (req, res) => {
    runSimulator("sql", "SQL Injection Generated", res);
};

const generateXSSAttack = (req, res) => {
    runSimulator("xss", "XSS Attack Generated", res);
};

module.exports = {
    generateSQLAttack,
    generateXSSAttack
};
