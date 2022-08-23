import voicemeeter
import sys

# Can be 'basic', 'banana' or 'potato'
kind = sys.argv[1]

# Ensure that Voicemeeter is launched
voicemeeter.launch(kind)

vmr = voicemeeter.remote(kind)
vmr.login()

class JSONDict:
    def __init__(self, key, val):
        self.key = key
        self.val = val

class JSON:
    def __init__(self):
        self.vals = []
    def addVal(self, key, val):
        self.vals.append(JSONDict(key, val))
    def toString(self):
        text = '{'

        for i in range(len(self.vals)):
            if(i == len(self.vals) - 1):
                text += '"'+self.vals[i].key+'":"'+self.vals[i].val+'"}'
            else:
                text += '"'+self.vals[i].key+'":"'+self.vals[i].val+'",'

        return text

while True:
    cmd = input('')
    cmd = cmd.split(' ')

    if cmd[0] == 'gain':
        if cmd[1] == 'input':
            vmr.inputs[int(cmd[2])].gain = float(cmd[3])
        elif cmd[1] == 'output':
            vmr.outputs[int(cmd[2])].gain = float(cmd[3])
    
    elif cmd[0] == 'mute':
        if cmd[1] == 'input':
            vmr.inputs[int(cmd[2])].mute = int(cmd[3])
        elif cmd[1] == 'output':
            vmr.outputs[int(cmd[2])].mute = int(cmd[3])

    elif cmd[0] == 'channels':
        if cmd[1] == 'input':
            if cmd[3] == 'true':
                vmr.inputs[int(cmd[2])].A1 = True
            else:
                vmr.inputs[int(cmd[2])].A1 = False

            if cmd[4] == 'true':
                vmr.inputs[int(cmd[2])].B1 = True
            else:
                vmr.inputs[int(cmd[2])].B1 = False
                
        elif cmd[1] == 'output':
            if cmd[3] == 'true':
                vmr.outputs[int(cmd[2])].A1 = True
            else:
                vmr.outputs[int(cmd[2])].A1 = False

            if cmd[4] == 'true':
                vmr.outputs[int(cmd[2])].B1 = True
            else:
                vmr.outputs[int(cmd[2])].B1 = False

    elif cmd[0] == 'get':
        if cmd[1] == 'input':
            obj = JSON()

            obj.addVal('cmd', 'resolve')
            obj.addVal('gain', str(vmr.inputs[int(cmd[2])].gain))
            obj.addVal('mute', str(vmr.inputs[int(cmd[2])].mute))

            print(obj.toString())
        elif cmd[1] == 'output':
            obj = JSON()

            obj.addVal('cmd', 'resolve')
            obj.addVal('gain', str(vmr.outputs[int(cmd[2])].gain))
            obj.addVal('mute', str(vmr.outputs[int(cmd[2])].mute))

            print(obj.toString())
