/**
* DHTML date validation script for dd/mm/yyyy. Courtesy of SmartWebby.com (http://www.smartwebby.com/dhtml/datevalidation.asp)
*/

// Declaring valid date character, minimum year and maximum year
var dtCh= '/';
var minYear=1900;
var maxYear=2100;
var errorEmail='';
var errorFecha='';

//R: var error=""; ya no hace falta
var errorDia='';
var errorMes='';
var errorYear='';
var errorFechaValida='';
var x=true;

function isInteger (s){
  var i;
  for (i = 0; i < s.length; i++){   
    // Check that current character is number.
    var c = s.charAt(i);
    if (((c < '0') || (c > '9'))) {
      return false;
    }
  }
  // All characters are numbers.
  return true;
}

function stripCharsInBag (s, bag){
  var i;
  var returnString = '';
  // Search through string's characters one by one.
  // If character is not in bag, append to returnString.
  for (i = 0; i < s.length; i++){   
    var c = s.charAt(i);
    if (bag.indexOf(c) === -1) {
      returnString += c;
    }
  }
  return returnString;
}

function daysInFebruary (year){
  // February has 29 days in any year evenly divisible by four,
  // EXCEPT for centurial years which are not also divisible by 400.
  return ((year % 4 === 0) && (year % 100 !== 0)) || (year % 400 === 0) ? 29 : 28;
}

function DaysArray(n) {
  for (var i = 1; i <= n; i++) {
    this[i] = 31;

    if (i === 4 || i === 6 || i === 9 || i === 11) {
      this[i] = 30;
    }
    if (i === 2) {
      this[i] = 29;
    }
  } 
  return this;
}

function isDate(dtStr){
  var daysInMonth = DaysArray(12);
  var pos1=dtStr.indexOf(dtCh);
  var pos2=dtStr.indexOf(dtCh,pos1+1);
  var strDay=dtStr.substring(0,pos1);
  var strMonth=dtStr.substring(pos1+1,pos2);
  var strYear=dtStr.substring(pos2+1);
  var strYr = strYear;
  if (strDay.charAt(0) === '0' && strDay.length > 1) {
    strDay = strDay.substring(1);
  }
  if (strMonth.charAt(0) === '0' && strMonth.length > 1) {
    strMonth = strMonth.substring(1);
  }
  for (var i = 1; i <= 3; i++) {
    if (strYr.charAt(0) === '0' && strYr.length > 1) {
      strYr=strYr.substring(1);
    }
  }
  
  var month=parseInt(strMonth);
  var day=parseInt(strDay);
  var year=parseInt(strYr);
  var hayerror=true;
  //inicializar variables de error por si hay corrección y reenvío
  errorDia='';
  errorMes='';
  errorYear='';
  errorFechaValida='';
  errorFecha='';
      
  if (pos1 === -1 || pos2 === -1) {
    errorFecha='El formato de fecha debe ser: dd/mm/aaaa';
    hayerror=false;
  }
  if (strDay.length < 1 || day < 1 || day > 31 || (month === 2 && day > daysInFebruary(year)) || day > daysInMonth[month]) {
    errorDia='Por favor introduzca un día válido';
    hayerror=false;
  }
  if (strMonth.length < 1 || month < 1 || month > 12) {
    errorMes='Por favor introduzca un mes válido';
    hayerror=false;
  }
  if (strYear.length !== 4 || year === 0 || year < minYear || year > maxYear) {
    errorYear='Por favor escriba un año entre ' + minYear + ' y ' + maxYear;
    hayerror=false;
  }
  /*devolver true o false*/
  if (hayerror === true) {
    return true;
  } else {
    return false;
  }
}

function validarEmail( email ) {
  var expr = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
  if (!expr.test(email)) {
    errorEmail='La dirección de correo ' + email + ' es incorrecta.';
    return false;
  } else {
    return true;
  }
}

function ValidateForm(){
  var dt = document.frmSample.fecha;
  //R: var email = document.frmSample.correo;
  //validarEmail( email.value );
  //isDate(dt.value);

  if (isDate(dt.value) === false) {
    dt.focus();
    return false;
  }
  /* R:
  if (validarEmail(email.value)==false){
    email.focus();
    return false;
  }
  */  
  //R: si se devuelve aquí también false, perdemos la información de si lo que ha fallado es la fecha o el email
  // lo llevo a validarTodo
      
  return true;
}

function validarTodo (){

  x = ValidateForm();
  //alert("voy a console.log y x= " + x);
  //console.log('X = ' + x);
      
  /*R: la función validar la anulo pq pongo el código en el lugar donde debe dar el error
  también elimino la variable error que se modifica dentro de esa función*/
  //validar();
      
  //El foco se pone cuando da el error, de la otra función se podría quitar.
  //Es aquí donde realmente se necesita. 
  if (document.frmSample.Nombre.value === '') {
    alert('Introduzca su nombre.');
    document.frmSample.Nombre.focus();
  } else if (document.frmSample.Apellidos.value === '') {
    alert('Introduzca sus apellidos.');
    document.frmSample.Apellidos.focus();
  } else if (x === false) {
  /*R: x es un cerrojo para saber si ha habido error en alguna parte de la fecha
    por tanto, este else acaba cuando va a empezar a comprobarse el email y la passwd
  */
  if (document.frmSample.fecha.value === '') {
    alert('Introduzca su fecha de nacimiento.');
    document.frmSample.fecha.focus();
  } else if (errorFecha !== '') {
    alert(errorFecha);
    document.frmSample.fecha.focus();
  } else if (errorDia !== '') {
    alert(errorDia);
    document.frmSample.fecha.focus();
  } else if (errorMes !== '') {
    alert(errorMes);
    document.frmSample.fecha.focus();
  } else if (errorYear !== '') {
    alert(errorYear);
    document.frmSample.fecha.focus();                }
  } else if (document.frmSample.correo.value === '') {
    alert('Introduzca su correo.');
    document.frmSample.correo.focus();
  } else if (validarEmail(document.frmSample.correo.value) === false) {
    alert(errorEmail);
    document.frmSample.correo.focus();
    //R: validarEmail(email.value)==false
    //R: alert(errorEmail);
    //R: document.frmSample.email.focus();
  } else if (document.frmSample.passwd.value === '') {
    alert('Introduzca su contraseña.');
    document.frmSample.passwd.focus();
  } else if (document.frmSample.passwd.value !== document.frmSample.passwd2.value) { 
    alert('La contraseña no coincide.'); 
    document.frmSample.passwd2.focus(); 
    //R: alert(error);
    //R: document.frmSample.passwd.focus();
  } else {
    alert('Todo está bien');
    document.frmSample.submit();
  }
}