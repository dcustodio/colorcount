const readline = require('readline');
const fs = require('fs');
const _ = require('lodash');

const rl = readline.createInterface({
    input: fs.createReadStream('brandcolors.txt')
});

let colors = [];

rl.on('line', function (line) {

    const hex = line.split(':')[1].replace(/\s*/, '');

    const hexInColorArray = _.find(colors, function (o) {
        return o.color == hex;
    });

    if (hexInColorArray) {

        hexInColorArray.times++;

    } else {

        colors.push({
            'color': hex,
            'times': 1
        });
    }
});

rl.on('close', function () {

    console.log('close:', colors.length);

    colors = _.orderBy(colors, ['times'], ['asc']);

    const outstream = fs.createWriteStream("colors.csv");

    outstream.once('open', function (fd) {

        colors.forEach(function (element) {

            console.log(`${element.color} - ${element.times}`);
            outstream.write(`${element.color.replace(';','')} , ${element.times}\r\n`);
        }, this);

        outstream.end();
    });
});