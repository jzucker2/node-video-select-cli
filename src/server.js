'use strict';

const express = require('express');
const Denon = require('denon-client');

// Constants
const PORT = 3131;
const HOST = '0.0.0.0';

const DENON_IP = '10.0.1.101'

// App
const app = express();
app.use(express.json())
app.get('/', (req, res) => {
    res.send('Hello World');
});

// cancel
app.delete('/video-select/denon/:denon_ip', (req, res) => {
    const { denon_ip } = req.params;
    console.log(`starting with ip: ${denon_ip}`);
    const denonClient = new Denon.DenonClient(denon_ip);

    // Connecting
    denonClient
        .connect()
        .then(() => {
            console.log('Canceling video select');
            throw new Error('Not yet support cancel video select mode.');
            // return denonClient.cancelVideoSelectMode();
        })
        .then((result) => {
            console.log(`result ==> ${result}`);
            return denonClient.disconnect();
        })
        .then((result) => {
            console.log(`result ==> ${result}`);
            return denonClient.disconnect();
        })
        .catch((error) => {
            // Oh noez.
            console.error(error);
            return denonClient.disconnect();
        })
        .catch((error) => {
        // Oh noez.
        console.error(`trying to return: ${error}`);
        return res.status(404).end();
    });
});

// get
app.get('/video-select/denon/:denon_ip', (req, res) => {
    const { denon_ip } = req.params;
    console.log(`starting with ip: ${denon_ip}`);
    const denonClient = new Denon.DenonClient(denon_ip);

    let currentVideoSelectMode = 'test';

    // Connecting
    denonClient
        .connect()
        .then(() => {
            console.log(`get initial video select mode`);
            return denonClient.getVideoSelectMode();
        })
        .then((result) => {
            console.log(`getVideoSelectMode result ==> ${result}`);
            currentVideoSelectMode = result;
            return denonClient.disconnect();
        })
        .then((result) => {
            console.log(`result ==> ${result}`);

            return res.json({'video-select-mode': currentVideoSelectMode});
        })
        .catch((error) => {
            // Oh noez.
            console.error(error);
            return denonClient.disconnect();
        })
        .catch((error) => {
            // Oh noez.
            console.error(`trying to return: ${error}`);
            return res.status(404).end();
        });
});

// set
app.post('/video-select/denon/:denon_ip', (req, res) => {
    const { denon_ip } = req.params;
    console.log(`body: ${req.body}`);
    const { mode } = req.body;
    console.log(`starting with ip: ${denon_ip}`);
    const denonClient = new Denon.DenonClient(denon_ip);

    console.log(`desired mode ==> ${mode}`);

    let currentVideoSelectMode = 'test';

    // Connecting
    denonClient
        .connect()
        .then(() => {
            console.log(`get initial video select mode`);
            return denonClient.getVideoSelectMode();
        })
        .then((result) => {
            console.log(`getVideoSelectMode result ==> ${result}`);
            currentVideoSelectMode = result;
            if (mode === currentVideoSelectMode) {
                console.log('We already have desired video select mode, exiting.');
                return denonClient.disconnect();
            }
            console.log(`now actually setting video select mode to ${mode}`);
            return denonClient.setVideoSelectMode(mode);
        })
        .then((result) => {
            console.log(`final result ==> ${result}`);
            return denonClient.disconnect();
        })
        .then((result) => {
            console.log(`result ==> ${result}`);

            return res.json({'video-select-mode': currentVideoSelectMode});
        })
        .catch((error) => {
            // Oh noez.
            console.error(error);
            return denonClient.disconnect();
        })
        .catch((error) => {
            // Oh noez.
            console.error(`trying to return: ${error}`);
            return res.status(404).end();
        });
});

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);