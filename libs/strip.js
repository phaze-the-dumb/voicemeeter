class Strip{
    constructor(gain, mute, parent, strip){
        this.strip = strip;
        this.gain = parseFloat(gain);
        if(mute === 'True')
            this.mute = true;
        else
            this.mute = false;
        this.parent = parent;
    }
    setGain(gain){
        this.gain = gain;
        this.parent.setGain(this.strip, gain);
    }
    setMute(mute){
        this.mute = mute;
        this.parent.setMute(this.strip, mute);
    }
    setChannels(a, b){
        this.parent.setChannels(this.strip, a, b);
    }
    update(){
        return this.parent.get(this.strip)
    }
}

module.exports = Strip;