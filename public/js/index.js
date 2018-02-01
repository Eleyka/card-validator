/* Imagenes segun el tipo de numero de tarjeta */
const visaImg = 'assets/images/visa.png';
const mastercardImg = 'assets/images/mastercard.png';

/* Variables de validación */
const number = /^([0-9])*$/;
let validate = false;

/* Función que valida el número de tarjeta */
const validateNumberCard = (num, input, images) => {
  if (num && number.test(num) && num.length === 16) {
    let sum = 0;
    let arrayCard = num.split('');
    let arrayReverse = arrayCard.reverse();

    arrayReverse.forEach((element, i) => {
      if (i % 2 !== 0) {
        let elementSelection = parseInt(arrayReverse[i]) * 2;
        if (elementSelection >= 10) {
          let digitInitial = parseInt(elementSelection / 10);
          let digitFinal = elementSelection % 10;
          let elementFinal = digitInitial + digitFinal;
          arrayReverse[i] = elementFinal;
        } else {
          let otherElement = parseInt(arrayReverse[i]) * 2;
          arrayReverse[i] = otherElement;
        }
      }
    });

    arrayReverse.forEach((element, index) => {
      sum += parseInt(arrayReverse[index]);
    });

    if (sum > 0 && sum % 10 === 0) {
      validate = true;
      input.addClass('success');
      input.removeClass('error');
      if (num.match(/^4\d{3}-?\d{4}-?\d{4}-?\d{4}$/)) {
        images.attr('src', visaImg);
      }
      if (num.match(/^5[1-5]\d{2}-?\d{4}-?\d{4}-?\d{4}$/)) {
        images.attr('src', mastercardImg);
      }
    } else {
      validate = false;
      input.addClass('error');
      input.removeClass('success');
      images.attr('src', '');
    }
  } else {
    validate = false;
    input.addClass('error');
    input.removeClass('success');
    images.attr('src', '');
  }
};

/* Función para validar el nombre */
const validateName = (name, input)  =>{
  /* Usaremos una expresion regular para validar que escriba bien su nombre */
  var PATERNNAME = /^([a-z ñáéíóú]{2,60})$/i;

  if (PATERNNAME.test(name)) {
    validate = true;
    input.addClass('success');
    input.removeClass('error');
  } else {
    validate = false;
    input.addClass('error');
    input.removeClass('success');
    images.attr('src', '');
  }
};

/* Función para permitir sólo números, retroceso y enter */
const onlyNumber = (evt) => {
  /* Asignamos el valor de la tecla a keynum */
  if (window.event) { 
    keynum = evt.keyCode; // IE
  } else {
    keynum = evt.which; // FF
  }

  /* comprobamos si se encuentra en el rango numérico */
  if ((keynum > 47 && keynum < 58) || keynum === 8 || keynum === 13) {
    return true;
  } else {
    return false;
  }
};

/* Función para verificar que la fecha escrita sea correcta según el formato YYYYMMDD */
const validateDate = (date, input, sentence) => {
  let message = '';

  /* Si la fecha está completa comenzamos la validación */
  if (date.length == 4) {
    validate = true;
    input.addClass('success');
    input.removeClass('error');

    /* Extraemos el mes */
    let month = parseInt(date.substr(0, 2)); 

    /* Extraemos en año */
    let year = parseInt(date.substr(2, 2)); 

    /* Si las partes de la fecha concuerdan con las que digitamos, es correcta */
    if ((year <= 99) && (month > 0 && month <= 12)) {
      message = 'Fecha correcta';
    } else {
      message = 'Fecha incorrecta';
    }
  } else {
    validate = false;
    input.addClass('error');
    input.removeClass('success');
  }
  sentence.html(message);
};

/* Función para validar que el codigo de seguridad solo tenga tres digitos */

const validateCode = (cvv, input) => {
  if (number.test(cvv) && cvv.length === 3) {
    validate = true;
    input.addClass('success');
    input.removeClass('error');
  } else {
    validate = false;
    input.addClass('error');
    input.removeClass('success');
  }
};