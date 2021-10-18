const process = require('process');

module.exports = {
    DENON_IP_ADDRESS: process.env.DENON_IP_ADDRESS || "10.0.1.101",
    HOST: process.env.HOST || "0.0.0.0",
    PORT: process.env.PORT || 3131,
};
