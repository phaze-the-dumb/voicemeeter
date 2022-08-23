const Strip = require('./strip.js');

class Input{ constructor(i){ this.i = i } };
class Output{ constructor(i){ this.i = i } };

class VoiceMeeter{
    constructor(py){
        this.resolve = null;

        this.raw = py;
        py.stdout.on('data', ( chunk ) => {
            let data = JSON.parse(chunk.toString());
            this.handleData(data);
        })
    
        py.stderr.on('data', ( chunk ) => {
            process.stderr.write(chunk);
        })

        this.outputs = [];
        this.inputs = [];

        for (let i = 0; i < 101; i++) {
            this.outputs.push(new Output(i));
            this.inputs.push(new Input(i));
        }
    }
    handleData(data){
        if(data.cmd === 'resolve'){
            this.resolve(data);
        }
    }

    setMute(strip, mute){
        if(mute === true)mute = 1;
        if(mute === false)mute = 0;

        if(strip instanceof Input){
            this.raw.stdin.write('mute input '+strip.i+' '+mute+'\n');
        } else if(strip instanceof Output){
            this.raw.stdin.write('mute output '+strip.i+' '+mute+'\n');
        } else{
            throw new Error('Not A Vaild Strip');
        }
    }
    setGain(strip, gain){
        if(strip instanceof Input){
            this.raw.stdin.write('gain input '+strip.i+' '+gain+'\n');
        } else if(strip instanceof Output){
            this.raw.stdin.write('gain output '+strip.i+' '+gain+'\n');
        } else{
            throw new Error('Not A Vaild Strip');
        }
    }
    setChannels(strip, a, b){
        if(strip instanceof Input){
            this.raw.stdin.write('channels input '+strip.i+' '+a+' '+b+'\n');
        } else if(strip instanceof Output){
            this.raw.stdin.write('channels output '+strip.i+' '+a+' '+b+'\n');
        } else{
            throw new Error('Not A Vaild Strip');
        }
    }

    get(strip){
        return new Promise((resolve, reject) => {
            this.resolve = (data) => {
                let s = new Strip(data.gain, data.mute, this, strip);
                resolve(s);
            };

            if(strip instanceof Input){
                this.raw.stdin.write('get input '+strip.i+'\n')
            } else if(strip instanceof Output){
                this.raw.stdin.write('get output '+strip.i+'\n')
            } else{
                throw new Error('Not A Vaild Strip');
            }
        })
    }
}

module.exports = VoiceMeeter;