const { spawn } = require('child_process');
const VoiceMeeter = require('./libs/voiceMeeter.js');

let launch = ( kind = 'basic' ) => {
    let py = spawn('python3', [ 'main.py', kind ]);

    return new VoiceMeeter(py);
}

module.exports = { launch }