'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const spawn = require('await-spawn');
// actual framework is broken as a module :(
// const playactor = require('playactor');

// Constants
const PORT = 5454;
const HOST = '0.0.0.0';

const DEFAULT_PS5_IP = '10.0.1.15';

// App
const app = express();
// https://stackoverflow.com/questions/10005939/how-do-i-consume-the-json-post-data-in-an-express-application
// parse application/json
app.use(bodyParser.json());
app.get('/', (req, res) => {
    res.send('Hello World');
});

const parseOutput = (commandLineOutput) => {
    return JSON.parse(commandLineOutput.stdout.toString());
}

const formatDeviceStatusResponse = (commandLineOutput) => {
    const parsedJSON = parseOutput(commandLineOutput);
    const { type, status, name, id } = parsedJSON;
    return {
        'device': type,
        'name': name,
        'status': status,
        'id': id
    };
}

const STANDBY_STATUS = 'STANDBY';

function PlayactorException(spawnException) {
    this.spawnException = spawnException;
    this.toString = function() {
        return `${this.spawnException.code} => ${this.spawnException.stderr}`;
    };
    this.code = this.spawnException.code;
}

// https://www.npmjs.com/package/await-spawn
const executePlayactorScript = async (playactor_args) => {
    // https://www.npmjs.com/package/await-spawn
    try {
        // playactor browse --timeout 10000
        const playactorOutput = await spawn('playactor', playactor_args);
        return formatDeviceStatusResponse(playactorOutput);
    } catch (e) {
        // console.error(`stdout: ${e.stdout.toString()}`);
        // console.error(`stderr: ${e.stderr.toString()}`);
        console.error(`code: ${e.code}`);
        if (e.code === 1) {
            return formatDeviceStatusResponse(e)
        }
        throw new PlayactorException(e);
    }
}

// get
app.get('/playactor/ps5/:ps5_ip', async(req, res) => {
    // cool tutorial
    // https://zellwk.com/blog/async-await-express/
    const { ps5_ip } = req.params;
    console.log(`starting with ip: ${ps5_ip}`);

    const playactor_args = ['check', '--ip', ps5_ip, '--timeout', '5000'];
    console.log(`playactor_args: ${playactor_args}`);
    try {
        const results = await executePlayactorScript(playactor_args);
        console.log(`got results ===> ${results}`);
        return res.json(results);
    } catch (e) {
        console.error(`returning error!`);
        return res.status(404).end();
    }
});

app.get('/playactor/ps5/:ps5_ip/wake', async(req, res) => {
    // cool tutorial
    // https://zellwk.com/blog/async-await-express/
    const { ps5_ip } = req.params;
    console.log(`starting with ip: ${ps5_ip}`);

    const playactor_args = ['wake', '--ip', ps5_ip, '--timeout', '5000'];
    console.log(`playactor_args: ${playactor_args}`);
    try {
        const results = await executePlayactorScript(playactor_args);
        console.log(`got results ===> ${results}`);
        return res.json(results);
    } catch (e) {
        console.error(`returning error!`);
        return res.status(404).end();
    }
});

app.get('/playactor/ps5/:ps5_ip/standby', async(req, res) => {
    // cool tutorial
    // https://zellwk.com/blog/async-await-express/
    const { ps5_ip } = req.params;
    console.log(`starting with ip: ${ps5_ip}`);

    const playactor_args = ['standby', '--ip', ps5_ip, '--timeout', '5000'];
    console.log(`playactor_args: ${playactor_args}`);
    try {
        const results = await executePlayactorScript(playactor_args);
        console.log(`got results ===> ${results}`);
        return res.json(results);
    } catch (e) {
        console.error(`returning error!`);
        return res.status(404).end();
    }
});

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);