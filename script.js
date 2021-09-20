// ES5 - deklaráció után meghívott priváte blokk

(function(teszt){
    var pont = Math.random() * 10;
    console.log(pont > 5);
    console.log(teszt);
})('hello');

// Closure-ök

/* 
    Closure összefoglaló: Egy belső függvény mindig képes hozzáférni az őt tartalmazó függvény paramétereihez és változóihoz, 
    még azután is, hogy a külső függvény befejezte a futását.
*/

function nyugdij(ev) {

    var szoveg = 'Nyugdíjazásig hátralévő évek száma: ';

    return function(szuletesiEv) {
        var aktualisEv = new Date().getFullYear();
        var kor = aktualisEv - szuletesiEv;
        console.log(szoveg + (ev - kor));
    };
}

var nyugdijazasUSA = nyugdij(66);
nyugdijazasUSA(1978);

nyugdij(65)(1973);

/////////////////////

function leptet() {
    var szamlalo = 0;
    return function() {
        szamlalo++;
        console.log(szamlalo);
    };
}

var hozzaad = leptet();

hozzaad();
hozzaad();
hozzaad();

///////////////////////

var leptet2 = (
    function () {
        var szamlalo = 0;
        return function() {
            szamlalo++;
            console.log(szamlalo);
        };
    }
)();

leptet2();
leptet2();
leptet2();

// apply, bind, call

var odon = {
    nev: 'Ödön',
    kor: 45,
    foglalkozas: 'csillagász',
    udvozles: function(stilus, napszak) {
        if (stilus === 'hivatalos') {
            console.log('Üdvözlöm, jó ' + napszak + ' kívánok! ' + this.nev + ' vagyok.');
        } else if (stilus === 'baráti') {
            console.log('Szia, jó ' + napszak + '!');
        }
    }
};

odon.udvozles('hivatalos', 'hajnalt');
odon.udvozles('barati', 'estét');

var bela = {
    nev: 'Béla',
    kor: 62,
    foglalkozas: 'portás'
};

// call
odon.udvozles.call(bela, 'baráti', 'estét');    // methodus kölcsönzés

// apply
odon.udvozles.apply(bela, ['baráti', 'reggelt']); 

// bind
var odonBarati = odon.udvozles.bind(odon, 'baráti');
odonBarati('napot');
odonBarati('estét');

var belaHivatalos = odon.udvozles.bind(bela, 'hivatalos');
var belaHivatalosReggeli = odon.udvozles.bind(bela, 'hivatalos', 'reggelt');

belaHivatalos('estét');
belaHivatalosReggeli();

//////////////////////////
var evek = [1954, 1990, 1963, 2000, 2010];

function tombMuvelet(tomb, fv) {
    var eredmeny = [];

    for (let i = 0; i < tomb.length; i++) {
        eredmeny.push(fv(tomb[i]));
    }

    return eredmeny;
}

function korSzamitas(elem) {
    return new Date().getFullYear() - elem;
}

function felnott(korhatar, elem) {
    return elem >= korhatar;
}

var korok = tombMuvelet(evek, korSzamitas);
console.log(evek);
console.log(korok);

var felnottKorJapanban = tombMuvelet(korok, felnott.bind(this, 20));

console.log(felnottKorJapanban);

//////////////////////////
// String-ek ES6-ban

const vezeteknev = 'Teszt';
let keresztnev = 'Elek';
const szuletesiEv = 1973;

function korSzamitas(ev) {
    return new Date().getFullYear() - ev;
}

// ES6
console.log(`${vezeteknev} ${keresztnev}, született ${szuletesiEv} évben. Most ${korSzamitas(szuletesiEv)} éves.`);

const nev = `${vezeteknev} ${keresztnev}`;

console.log(nev.startsWith('t'));
console.log(nev.endsWith('ek'));
console.log(nev.includes('szt E'));
console.log(vezeteknev.repeat(3));
console.log(`${vezeteknev} `.repeat(3));