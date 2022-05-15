registers = {
    'R0': '000',
    'R1': '001',
    'R2': '010',
    'R3': '011',
    'R4': '100',
    'R5': '101',
    'R6': '110',
    'R7': '111'
}

opcodes = {
    'add':  '000',
    'sub':  '000',
    'and':  '000',
    'or' :  '000', 
    'xor':  '000', 
    'xrr':  '000', 
    'lsl':  '000', 
    'beq':  '001', 
    'bne':  '010', 
    'addi': '011', 
    'ld' :  '100', 
    'str':  '101',
    'mov':  '110', 
    'j'  :  '111'
}


with (
    open("assembly.txt", "r") as asy, 
    open("machinecode.txt", "w") as mc
):
    line = asy.readline()
    while(line):
        writeline = ''
        inst = line.split()

        op = inst[0]
        writeline += opcodes[op]

        if op == 'add':
            writeline += registers[inst[1]]
            writeline += '000'
        elif op == 'sub':
            writeline += registers[inst[1]]
            writeline += '001'
        elif op == 'and':
            writeline += registers[inst[1]]
            writeline += '010'
        elif op == 'or':
            writeline += registers[inst[1]]
            writeline += '011'
        elif op == 'xor':
            writeline += registers[inst[1]]
            writeline += '100'
        elif op == 'xrr':
            writeline += registers[inst[1]]
            writeline += '101'
        elif op == 'lsl':
            writeline += registers[inst[1]]
            writeline += '110'
        elif op == 'lsr':
            writeline += registers[inst[1]]
            writeline += '111'
        elif op == 'beq':
            writeline += registers[inst[1]]
            writeline += bin(int(inst[2]))[2:]
        elif op == 'bne':
            writeline += registers[inst[1]]
            writeline += bin(int(inst[2]))[2:]
        elif op == 'addi':
            writeline += registers[inst[1]]
            writeline += bin(int(inst[2]))[2:]
        elif op == 'ld' or op == 'str' or 'op' == 'mov':
            writeline += registers[inst[1]]
            writeline += registers[inst[2]]
        elif op == 'j':
            writeline += bin(int(inst[1]))[2:]


        writeline += '\n'
        mc.write(writeline)
        line = asy.readline()