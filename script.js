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

////////////////////////////
// Nyíl függvények

const evek6 = [1954, 1990, 1963, 2000, 2010];

// ES5

var korokES5 = evek6.map(function(elem) {
    return new Date().getFullYear() - elem;
});

console.log(korokES5);

// ES6

let korokES6 = evek6.map(elem => new Date().getFullYear() - elem);

console.log(korokES6);

korokES6 = evek6.map((elem, index) => `Kor ${index}: ${new Date().getFullYear() - elem}.`);

console.log(korokES6);

korokES6 = evek6.map((elem, index) => { 
    const aktEv = new Date().getFullYear();
    const kor = aktEv - elem;
    return `Kor ${index}: ${kor}.`;
});


console.log(korokES6);

/////////////////////////
// Nyíl függvények 2

var dobozES5 = {
    szin: 'zöld',
    pozicio: 1,
    kattintsRam: function() {
        var objektum = this;
        document.querySelector('.zold').addEventListener('click', function() {
            var szoveg = 'Én vagyok az ' + objektum.pozicio + '. doboz, és a színem ' + objektum.szin + '.';
            alert(szoveg);
        });
    }
};

//dobozES5.kattintsRam();

var dobozES6 = {
    szin: 'zöld',
    pozicio: 1,
    kattintsRam: function() {
        document.querySelector('.zold').addEventListener('click', () => {
            var szoveg = 'Én vagyok az ' + this.pozicio + '. doboz, és a színem ' + this.szin + '.';
            alert(szoveg);
        });
    }
};

//dobozES6.kattintsRam();

/*
var dobozES62= {
    szin: 'zöld',
    pozicio: 1,
    kattintsRam: () => {
        document.querySelector('.zold').addEventListener('click', () => {
            var szoveg = 'Én vagyok az ' + this.pozicio + '. doboz, és a színem ' + this.szin + '.';
            alert(szoveg);
        });
    }
};

dobozES62.kattintsRam();
*/

function Szemely(nev) {
    this.nev = nev;
}

//ES5
Szemely.prototype.barataimES5 = function(haverok) {
    var obj = this;
    var tomb = haverok.map(function(elem){
        return obj.nev + ' barátja ' + elem + '.'
    });

    console.log(tomb);
}

var haverok = ['Jóska', 'Pista', 'Ödön'];
new Szemely('Géza').barataimES5(haverok);

//ES6

Szemely.prototype.barataimES6 = function(haverok) {
    
    const tomb = haverok.map(elem =>        
        `${this.nev} barátja ${elem}.`
    );

    console.log(tomb);
}

new Szemely('Géza').barataimES6(haverok);

//////////////////////////////////
// Destruktúrálás

// ES5
var odon = ['Ödön', 50];
var nev3es5 = odon[0];
var kor3es5 = odon[1];

console.log(nev3es5);
console.log(kor3es5);

// ES6
const [nev2es6, kor2es6] = ['Ödön', 50];

console.log(nev2es6);
console.log(kor2es6);

const obj = {
    keresztNev2: 'Ödön',
    vezetekNev2: 'Bödön'
};

const {keresztNev2, vezetekNev2} = obj;

console.log(keresztNev2);
console.log(vezetekNev2);

const {keresztNev2: x, vezetekNev2: y} = obj;

console.log(x);
console.log(y);

function korEsNyugdij(szuletesiEv) {
    let nyugdijKorhatar = 65;
    const kor = new Date().getFullYear() - szuletesiEv;

    return [kor, nyugdijKorhatar - kor];
}

const [kor33, nyugdij33] = korEsNyugdij(1973);
console.log(kor33);
console.log(nyugdij33);

//////////////////////////////
// TÖMBÖK

const dobozok = document.querySelectorAll('.doboz');

//ES5
var dobozokTombES5 = Array.prototype.slice.call(dobozok);

/*
dobozokTombES5.forEach(function(aktualis) {
    aktualis.style.backgroundColor = 'orangered';
});
*/

//ES6

const dobozokTombES6 = Array.from(dobozok);
dobozokTombES6.forEach(aktualis => aktualis.style.backgroundColor = 'dodgerblue');

//ES5
/*
for(var i=0; i<dobozokTombES5.length; i++) {
    if (dobozokTombES5[i].className === 'doboz kek') {
        continue;
    }

    dobozokTombES5[i].textContent = 'Kék lettem!';
}
*/

//ES6
for (const aktualis of dobozokTombES6) {
    if (aktualis.className.includes('kek')) {
        continue;
    }

    aktualis.textContent = 'Kék lettem!';
}

//ES5
var korok = [2, 10, 20, 17, 14];

var felnottek = korok.map(function(aktualis) {
    return aktualis >= 18
});

console.log(felnottek);

console.log(felnottek.indexOf(true));

//ES6
console.log(korok.findIndex(aktualis => aktualis >= 18));
console.log(korok.find(aktualis => aktualis >= 18));

////////////////////////////
// Spread operátor

function szamok(a, b, c, d) {
    return a + b + c + d;
}

var osszeg = szamok(1, 2, 3, 4);
console.log(osszeg);

// ES5
var szamokTomb = [1, 2, 3, 4];
var osszeg2 = szamok.apply(null, szamokTomb);

console.log(osszeg2);

// ES6
const osszeg3 = szamok(...szamokTomb);
console.log(osszeg3);

const t2 = [5, 6, 7, 8, 9, 10];

const t3 = [...szamokTomb, ...t2];
console.log(t3);

const cimsor = document.querySelector('h1');

const htmlElemek = [cimsor, ...dobozok];

Array.from(htmlElemek).forEach(aktualisElem => aktualisElem.style.color = 'purple');

////////////////////////////
// Rest paraméterek

// ES5

function parosVagyParatlanES5(teszt) {
    var argumentumokTomb = Array.prototype.slice.call(arguments, 1);

    argumentumokTomb.forEach(function(aktualisElem) {
        if (aktualisElem % 2 === 0) {
            console.log('páros');
        }
        else {
            console.log('páratlan');
        }
    });
}

//parosVagyParatlanES5('teszt', 1, 2, 3, 100, 5, 20);

// ES6
function parosVagyParatlanES6(teszt, ...szamok) {

    szamok.forEach(aktualisElem => {
        if (aktualisElem % 2 === 0) {
            console.log('páros');
        }
        else {
            console.log('páratlan');
        }
    });
}

parosVagyParatlanES6('teszt', 1, 2, 3, 100, 5, 20);

//////////////////////////////
// Default paraméterek

// ES5

/*
function AdamsFamily(keresztNev, szuletesiEv, csaladiNev) {
    csaladiNev === undefined ? csaladiNev = 'Adams' : csaladiNev = csaladiNev;
    this.keresztNev = keresztNev;
    this.szuletesiEv = szuletesiEv;
    this.csaladiNev = csaladiNev;
}

var fester = new AdamsFamily('Fester', 1940);
var mortisha = new AdamsFamily('Mortisha', 1965);
var kuzin = new AdamsFamily('Kuzin', 1800, 'HogyisHivják')
*/

// ES6

function AdamsFamily(keresztNev, szuletesiEv, csaladiNev = 'Adams') {
    this.keresztNev = keresztNev;
    this.szuletesiEv = szuletesiEv;
    this.csaladiNev = csaladiNev;
}

var fester = new AdamsFamily('Fester', 1940);
var mortisha = new AdamsFamily('Mortisha', 1965);
var kuzin = new AdamsFamily('Kuzin', 1800, 'HogyisHivják')

/////////////////////////////////
// Map

const kerdes = new Map();

kerdes.set('kerdes', 'Hogy hívják a de miééért reklámban szereplő kisfiút?');
kerdes.set(1, 'Ödön');
kerdes.set(2, 'Ábel');
kerdes.set(3, 'Miklóska');
kerdes.set(4, 'Nándi');

kerdes.set('helyes', 2);

kerdes.set(true, 'helyes válasz');
kerdes.set(false, 'nem talált');

console.log(kerdes.get('kerdes'));
console.log(kerdes.size);

if (kerdes.has(4)) {
    //kerdes.delete(4);
}
//kerdes.clear();

/*
kerdes.forEach(
    (kulcs, ertek) => console.log(`Kulcs: ${kulcs}, érték: ${ertek}`)
);
*/

/*
for (let [kulcs, ertek] of kerdes.entries()) {
    if (typeof(kulcs) === 'number') {
        console.log(`Kulcs: ${kulcs}, érték: ${ertek}`);
    }


}
*/

//const valasz = parseInt(prompt('Add meg a helyes választ!'));

//console.log(kerdes.get(valasz === kerdes.get('helyes')));

/////////////////////////////////
// Osztályok

// ES5

var SzemelyES5 = function(nev, szuletesiEv, foglalkozas) {
    this.nev = nev;
    this.szuletesiEv = szuletesiEv;
    this.foglalkozas = foglalkozas;
}

SzemelyES5.prototype.korSzamitas = function() {
    var kor = new Date().getFullYear() - this.szuletesiEv;
    console.log(kor);
}

var odon = new SzemelyES5('Ödön', 1810, 'kisértet');

// ES6

class SzemelyES6 {
    constructor (nev, szuletesiEv, foglalkozas) {
        this.nev = nev;
        this.szuletesiEv = szuletesiEv;
        this.foglalkozas = foglalkozas;
    }

    korSzamitas() {
        let kor = new Date().getFullYear() - this.szuletesiEv;
        console.log(kor);
    }

    static udvozlet() {
        console.log('hello');
    }
}

const nandi = new SzemelyES6('Nándi', 1960, 'pék');
SzemelyES6.udvozlet();

////////////////////////////////
// Alosztályok - öröklés

// ES5
var SzemelyES52 = function(nev, szuletesiEv, foglalkozas) {
    this.nev = nev;
    this.szuletesiEv = szuletesiEv;
    this.foglalkozas = foglalkozas;
}

SzemelyES52.prototype.korSzamitas = function() {
    var kor = new Date().getFullYear() - this.szuletesiEv;
    console.log(kor);
}

var KatonaES5 = function(nev, szuletesiEv, foglalkozas, rendfokozat, osztag) {
    SzemelyES52.call(this, nev, szuletesiEv, foglalkozas);
    this.rendfokozat = rendfokozat;
    this.osztag = osztag;
}

KatonaES5.prototype = Object.create(SzemelyES52.prototype);

KatonaES5.prototype.rangSzerzes = function(rang) {
    this.rendfokozat = rang;
    console.log(this.rendfokozat);
}

var odonKatona = new KatonaES5('Ödön', 1970, 'pék', 'közlegény', 'harcosok');
odonKatona.korSzamitas();
odonKatona.rangSzerzes('tiszthelyettes');

// ES6
class SzemelyES62 {
    constructor (nev, szuletesiEv, foglalkozas) {
        this.nev = nev;
        this.szuletesiEv = szuletesiEv;
        this.foglalkozas = foglalkozas;
    }

    korSzamitas() {
        let kor = new Date().getFullYear() - this.szuletesiEv;
        console.log(kor);
    }
}

class KatonaES6 extends SzemelyES52 {
    constructor(nev, szuletesiEv, foglalkozas, rendFokozat, osztag) {
        super(nev, szuletesiEv, foglalkozas);
        this.rendFokozat = rendFokozat;
        this.osztag = osztag;
    }

    rangSzerzes(rang) {
        this.rendfokozat = rang;
        console.log(this.rendfokozat);
    }
}

const nandiKatona = new KatonaES6('Nándi', 1960, 'tanár', 'tiszt', 'harcosok');
nandiKatona.rangSzerzes('Százados');
nandiKatona.korSzamitas();