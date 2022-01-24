// Dom element
const resultEl = document.getElementById('result');
const lengthEl = document.getElementById('length');
const uppercaseEl = document.getElementById('uppercase');
const lowercaseEl = document.getElementById('lowercase');
const numbersEl = document.getElementById('numbers');
const symbolsEl = document.getElementById('symbols');
const generateEl = document.getElementById('generate');
const clipboardEl = document.getElementById('clipboard');

const randomFunc = {
  upper: getRandomUpper,
  lower: getRandomLower,
  number: getRandomNumber,
  symbol: getRandomSymbol
};

// Generate event listen
generateEl.addEventListener('click', () => {
  const length = +lengthEl.value;
  const hasUpper = uppercaseEl.checked;
  const hasLower = lowercaseEl.checked;
  const hasNumber = numbersEl.checked;
  const hasSymbol = symbolsEl.checked;
  
  resultEl.innerText = generatedPassword(hasUpper, hasLower, hasNumber, hasSymbol, length);
});

// copy password to clipboard
clipboardEl.addEventListener('click', () => {
  const textarea = document.createElement('textarea');
  const password = resultEl.innerText;

  if(!password) {
    return;
  }

  textarea.value = password;
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand('copy');
  textarea.remove();
  alert('Password copied to clipboard');
})

// Genreate password function
function generatedPassword(lower, upper, number, symbol, length) {
  // initializer password variable
  // filter out unchecked types
  // Loop over length, call generator function for each type
  // add final pw to the pw variable and return it

  let generatedPassword = '';

  const typesCount = lower + upper + number + symbol;
  //console.log('typesCount: ', typesCount);

  const typesArr = [{lower}, {upper}, {number}, {symbol}].filter(item => Object.values(item)[0]);
  //console.log('typesArr: ', typesArr);

  if(typesCount == 0) {
    return '';
  }

  for(let i = 0; i < length; i += typesCount){
    typesArr.forEach(type => {
      const funcName = Object.keys(type)[0];
      //console.log('funcName: ', funcName);

      generatedPassword += randomFunc[funcName]();
    });
  }

  const finalPassword = (generatedPassword.slice(0, length));
  return finalPassword;
}

// generate functions - https://net-comber.com/charset.html

function getRandomUpper(){
  return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
}

function getRandomLower(){
  return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
}

function getRandomNumber(){
  return String.fromCharCode(Math.floor(Math.random() * 10) + 48);
}

function getRandomSymbol(){
  const symbols = '!@#$%^&*(){}[]=<>/,.';
  return symbols[Math.floor(Math.random() * symbols.length)];
}