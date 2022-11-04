describe('convert a string to bit array', () => {
    it.each([
        ["A", "01000001"],
        ["B", "01000010"],
        ["C", "01000011"],
        ["D", "01000100"],
        ["E", "01000101"],
        ["F", "01000110"],
        ["G", "01000111"],
        ["H", "01001000"],
        ["I", "01001001"],
        ["J", "01001010"],
        ["AB", "0100000101000010"],
    ])('should converted %s to expected %s', (word, bitArray) => {
        const result = encodeString(word);

        expect(result).toEqual(bitArray.split(''))
    })
});

describe('convert a bit array to bit string', () => {
    it.each([
        ["01000001", "A" ],
        ["01000010", "B" ],
        ["01000011", "C" ],
        ["01000100", "D" ],
        ["01000101", "E" ],
        ["01000110", "F" ],
        ["01000111", "G" ],
        ["01001000", "H" ],
        ["01001001", "I" ],
        ["01001010", "J" ],
        ["0100000101000010", "AB" ],
    ])('should converted %s to expected %s', (bitArray, word) => {
        const result = decodeToString(bitArray);

        expect(result).toEqual(word)
    })
});

function encodeString(word) {
    return word.split('').map(letter=>letter.charCodeAt(0).toString(2).padStart(8, '0')).join('').split('');
}

function decodeToString(bitArray){
    const arrByOctet = bitArray.match(/(\d{8})/g);
    return String.fromCharCode(...arrByOctet.map(b=>parseInt(b, 2)));
}
