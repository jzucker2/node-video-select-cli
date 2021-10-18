#!/usr/bin/env node

const commander = require('commander');
const Denon = require('denon-client');

const DENON_IP = '10.0.1.101'
const VERSION = '0.2.0'

const program = new commander.Command();
program.version(VERSION);

program
  .option('-d, --debug', 'output extra debugging')
  .option('--ip', 'ip of Denon receiver', DENON_IP)
  .option('-c, --cancel-video-select-mode', 'Cancel video select mode')
  .option('-gvs, --get-video-select-mode', 'Get video select status')
  .option('-vs, --video-select-mode <type>', 'set video select mode');

program.parse(process.argv);


console.log(`ip: ${program.ip}`);
console.log(`cancel-video-select-mode: ${program.cancelVideoSelectMode}`);
console.log(`get-video-select-mode: ${program.getVideoSelectMode}`);
console.log(`video-select-mode: ${program.videoSelectMode}`);

/**
 * Denon is now an object containing DenonClient and Options.
 * Use the DenonClient to send requests. Use the Options to define the data.
 */
const denonClient = new Denon.DenonClient(program.ip);

let currentVideoSelectMode = 'test';

// Connecting
denonClient
  .connect()
  .then(() => {
    if (program.cancelVideoSelectMode) {
      console.log('Canceling video select');
      throw new Error('Not yet support cancel video select mode.');
      // return denonClient.cancelVideoSelectMode();
    }
    console.log('Retrieving video select mode setting.')
    return denonClient.getVideoSelectMode();
  })
  .then((result) => {
    console.log(`getVideoSelectMode ==> ${result}`);
    currentVideoSelectMode = result;
    if (program.videoSelectMode === currentVideoSelectMode) {
      console.log('We already have desired video select mode, exiting.');
      return denonClient.disconnect();
    }
    console.log(`setting video select mode to ${program.videoSelectMode}`);
    return denonClient.setVideoSelectMode(program.videoSelectMode)
  })
  .then((result) => {
    console.log(`result ==> ${result}`);
    return denonClient.disconnect();
  })
  .catch((error) => {
    // Oh noez.
    console.error(error);
    return denonClient.disconnect();
  });
