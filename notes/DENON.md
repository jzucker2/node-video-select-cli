# Denon

This is based on the original `RUFUS` root directory `README.md` that was 
edited here: https://github.com/jzucker2/RUFUS/pull/190

## Notes

### Assigned Inputs

Receiver mapping:
Main Zone: Living Room
Zone 2: Dining Room
Zone 3: Kitchen

Inputs:
CBL/SAT: APPLE TV
Blu-ray: PS4
Game: Wii U
DVD: JohnCast
CD: VINYL

TV:
All inputs: inputHDMI4

## Specs

[Denon spec](http://assets.denon.com/documentmaster/de/avr3313ci_protocol_v02.pdf)

## Issues

The Denon client library expects a response and needs to have a timeout and a check for anything without a response.
