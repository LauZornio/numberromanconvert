const form = document.getElementById('form');
const convertButton = document.getElementById('convert-btn');
const output = document.getElementById('output');

//converitore in Romano, num è un numero intero
const convertToRoman = num => {
  //array di riferimento per i numeri romani, dal più alto al più basso
  const ref = [
    ['M', 1000],
    ['CM', 900],
    ['D', 500],
    ['CD', 400],
    ['C', 100],
    ['XC', 90],
    ['L', 50],
    ['XL', 40],
    ['X', 10],
    ['IX', 9],
    ['V', 5],
    ['IV', 4],
    ['I', 1]
  ];

  //array vuoto per accumulare i numeri romani man mano che vengono determinati
  const res = [];

  //ciclo per ogni elemento coppia simbolo-valore, quindi arr è l'array contenente numero romano e corrispondente valore
  //all'interno c'è il while che dice:
    //gira fino a quando il numero è maggiore o uguale al numero corrispondente al valore dell'array
    //arr[1] --> corrisponde al numero intero
      //il while dice: metti nell'array vuoto il valore corrispondente all'indice 0 (ovvero numero romano) e poi sottra a num il valore dell'array in numero intero
        //esempio:
        //num=55 --> entra nel while in L, 50
  ref.forEach(function (arr) {
    while (num >= arr[1]) {
      res.push(arr[0]);
      num -= arr[1];
    }
  });

  return res.join(''); //crea una stringa tutto attaccato
};

//verifica dei dati
const isValid = (str, int) => {
  let errText = '';

  //se il numero non è valito o se contiene la e e un punto /g rappresenta il flag globale di ricercare tutte le corrispondenze nella stringa
  //quindi controlla che sia un numero
  if (!str || str.match(/[e.]/g)) {
    errText = 'Inserisci un valore valido, ovvero un numero intero.';

    //controlla anche se il numero inserito è inferiore a 1
  } else if (int < 1) {
    errText = 'Inserisci un numero superiore o uguale a 1.';

    //controlla anche se il numero è superiore a 3999
  } else if (int > 3999) {
    errText = 'Inserisci un numero inferiore o uguale a 3999.';
  } else {
    // Non ci sono errori di validazione
    return true;
  }

  // Fatti i controlli, output testo e anche la classe alert
  output.innerText = errText;
  output.classList.add('alert');

  return false;
};

//funzione per azzerrare output per visualizzare successivamente il nuovo risultato
const clearOutput = () => {
  output.innerText = '';
  output.classList.remove('alert');
};

//serve a far si che non ci sia il ricaricamento della pagina (perche il form invia i dati), in quessto modo si arresta il caricamento della pagina e si avvia la funzione dei controlli del dato.
form.addEventListener('submit', e => {
  e.preventDefault();
  updateUI();
});

//al click del bottone
convertButton.addEventListener('click', () => {
  updateUI();
});

//verifiche e output
const updateUI = () => {
  const numStr = document.getElementById('number').value;
  const int = parseInt(numStr, 10); //trasforma una stringa in un numero decimale (10)

  output.classList.remove('hidden'); //viene rimossa la classe hidden dall'elemento DOM

  clearOutput(); //funzione per ripulire l'output

  //richiamo di una funzione Arrow che verifica la validità dei valori
  //se la funzione ritorna true, vuol dire che esce dalla funzione in stato true senza errori ed entra nell'if sottostante, se invece presenta errore di validazione --> è false ed esce l'errore della funzione isValid
  //if entra se la funzione isValid è true (quindi non presenta errori) e nel testo esce l'output della funzione convertToRoman
  if (isValid(numStr, int)) {
    output.innerText = convertToRoman(int);
  }
};