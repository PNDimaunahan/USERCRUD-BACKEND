const fs = require('fs');
const path = require('path');

const logFile = path.join(__dirname, '../../logs/access.log');

// Ensure logs directory exists
const logDir = path.dirname(logFile);
if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir, { recursive: true });
}

const log = (message) => {
    const entry = `[${new Date().toISOString()}] ${message}\n`;
    try {
        fs.appendFileSync(logFile, entry, 'utf8');
    } catch (err) {
        console.error("Logging failed:", err);
    }
};

const loggerMiddleware = (req, res, next) => {
    const start = Date.now();

    res.on('finish', () => {
        const duration = Date.now() - start;
        const logMessage = `${req.method} ${req.originalUrl} ${res.statusCode} - ${duration}ms - IP: ${req.ip}`;
        log(logMessage);
    });

    next();
};

module.exports = { log, loggerMiddleware };
