const vmr = require('../index.js');

let vc = vmr.launch();

// Two Methods:
let main = async () => {
    // Method One
    let strip = await vc.get(vc.inputs[0]);     // vc.inputs[number] or vc.outputs[number]

    strip.setGain(-1.5);                        // Gain (FLOAT)
    strip.setMute(true);                        // Mute (True / False or 1 / 0)
    strip.setChannels(false, true);             // Channel A (True / False), Channel B (True / False)

    strip = await strip.update();               // Update the data in strip

    // Method Two
    vc.setGain(vc.inputs[1], -1.5);             // Gain (FLOAT)
    vc.setMute(vc.inputs[1], true);             // Mute (True / False or 1 / 0)
    vc.setChannels(vc.inputs[1], false, true);  // Channel A (True / False), Channel B (True / False)
}

main()