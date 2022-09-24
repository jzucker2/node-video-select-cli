# Denon

This is based on the original `RUFUS` root directory `README.md` that was 
edited here: https://github.com/jzucker2/RUFUS/pull/190

## Notes

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

## Assigned Inputs

For more info, see [AlbionAutomation](https://github.com/jzucker2/AlbionAutomation)

```
Receiver: 10.0.1.101
TCL Roku: 10.0.1.102
AppleTV: 10.0.1.103
Mac Mini: 10.0.1.104
PS4: 10.0.1.105
JohnCast: 10.0.1.106
Hue Bridge Living Room: 10.0.1.110
Hue Bridge Jordan's Room: 10.0.1.111
Kasa Dual Smart Outdoor Plug 10.0.1.50
```

## Specs

[Denon spec](http://assets.denon.com/documentmaster/de/avr3313ci_protocol_v02.pdf)

## Issues

The Denon client library expects a response and needs to have a timeout and a check for anything without a response.
