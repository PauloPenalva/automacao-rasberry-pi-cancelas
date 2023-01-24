const express = require('express');
const Gpio = require('onoff').Gpio;

const ABRE_1 = new Gpio(18, 'out');
const FECHA_1 = new Gpio(23, 'out');

const ABRE_2 = new Gpio(24, 'out');
const FECHA_2 = new Gpio(25, 'out');

const server = express();

const timer = ms => new Promise( res => setTimeout(res, ms));

const pulse = 3000;

ABRE_1.writeSync(1);
ABRE_2.writeSync(1);
FECHA_1.writeSync(1);
FECHA_2.writeSync(1);

server.get('/', (req, res) => {
    res.send('App running.')
});


server.get('/abre1', (req, res) => { 
    ABRE_1.writeSync(0);
    timer(pulse).then(() => ABRE_1.writeSync(1));
    res.send('OK');
});

server.get('/fecha1', (req, res) => { 
    FECHA_1.writeSync(0);
    timer(pulse).then(() => FECHA_1.writeSync(1));
    res.send('OK');
});

server.get('/abre2', (req, res) => { 
    ABRE_2.writeSync(0);
    timer(pulse).then(() => ABRE_2.writeSync(1));
    res.send('OK')
});

server.get('/fecha2', (req, res) => { 
    FECHA_2.writeSync(0);
    timer(pulse).then(() => FECHA_2.writeSync(1));
    res.send('OK')
});

server.listen(3000, () => console.log('Server running on port 3000.'));
