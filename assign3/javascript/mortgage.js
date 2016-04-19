   //********************************************************************************//
    //* Name : Brooks Patola                                                                    *//
    //* zenit login : int222_161                                                     *//
    //********************************************************************************//
    //********************************************************************************//
    //*   Do not modify any statements in detailPaymentCalculation function          *//
    //********************************************************************************//

	function detailPaymentCalculation(mortAmount,mortDownPayment,mortRate,mortAmortization) {

    //********************************************************************************//
    //*   This function calculates the monthly payment based on the following:       *//
    //*                                                                              *//
    //*               M = P [ i(1 + i)n ] / [ (1 +  i)n - 1]                         *//
    //*                                                                              *//
    //*   Note: This function also updates the payment amount on the form            *//
    //********************************************************************************//
     var paymentError = "";
     var v = mortAmount * 1;
     var d = mortDownPayment * 1;
     var i = mortRate * 1;
     var y = mortAmortization * 1;
     var a = v - d;
         i = i/100/12;
         n = y * 12;
     var f = Math.pow((1+i),n);

     var p = (a * ((i*f)/(f-1))).toFixed(2);

     if (p=="NaN" || p=="Infinity") {
         document.forms[0].payment.value = "";
     }
     else {
           document.forms[0].payment.value = p;
     }

} // End of detailPaymentCalculation function


function calculatePayment() {   

    //********************************************************************************//
    //*   You will need to call the functions that validate the following:           *//
    //********************************************************************************//
    //*        (1)              (2)              (3)             (4)                 *//
    //********************************************************************************//
    //*   Property value  -  Down payment  -  Interest rate -  Amortization          *//
    //********************************************************************************//
    //*   If there are no errors, then call                                          *//
    //*                                                                              *//
    //*      detailPaymentCalculation(...., ......, ......, ......);                 *//
    //*                                                                              *//
    //*   and make sure to pass the four values in the order shown above.            *//
    //*                                                                              *//
    //********************************************************************************//
    //*   If there are errors, present the client the following message in the       *//
    //*   reserved area on the form:                                                 *//
    //*                                                                              *//
    //*   Please complete the form first and then click on Calculate Monthly Payment *//
    //*                                                                              *//
    //********************************************************************************//

	 valPropValue(errMessages);
	 valDownPay(errMessages);
	 valIntRate(errMessages);
	 valAmortization(errMessages);
	
	if (errMessages === ""){
		detailPaymentCalculation(document.mortgage.propValue.value, document.mortgage.downPay.value, document.mortgage.intRate.value, document.mortgage.amortization.value);
	}
	else {
		return errMessages;
	}
	return errMessages;
} // End of calculatePayment function



function formValidation() {

    //***************************************************************************************//
    //*                                                                                     *//
    //* This function calls the different functions to validate all required fields         *//
    //*                                                                                     *//
    //* Once you have called and validated all field, determine if any error(s)             *//
    //*  have been encountered                                                              *//
    //*                                                                                     *//
    //* If any of the required fields are in error:                                         *//
    //*                                                                                     *//
    //*    present the client with a list of all the errors in reserved area                *//
    //*         on the form and                                                             *//
    //*          don't submit the form to the CGI program in order to allow the             *//
    //*          client to correct the fields in error                                      *//
    //*                                                                                     *//
    //*    Error messages should be meaningful and reflect the exact error condition.       *//
    //*                                                                                     *//
    //*    Make sure to return false                                                        *//
    //*                                                                                     *//
    //* Otherwise (if there are no errors)                                                  *//
    //*                                                                                     *//
    //*    Recalculate the monthly payment by calling                                       *//
    //*      detailPaymentCalculation(mortAmount,mortDownPayment,mortRate,mortAmortization) *//
    //*                                                                                     *//
    //*    Change the 1st. character in the field                                           *//
	//*     called client to upper case                                                     *//
    //*                                                                                     *//
    //*    Change the initial value in the field called jsActive from N to Y                *//
    //*                                                                                     *//
    //*    Make sure to return true in order for the form to be submitted to the CGI        *//
    //*                                                                                     *//
    //***************************************************************************************//

	var errMessages = ""; // Initialize for each time the function is called
	errMessages = valIncome(errMessages); // call field validation functions once implemented
	errMessages =  valLocation(errMessages);
	errMessages = valClient(errMessages);
	errMessages = valMortYear(errMessages);
	errMessages = valIntRate(errMessages);
	errMessages = valMortMonth(errMessages);
	errMessages = valAmortization(errMessages);
	errMessages = validateUserId(errMessages);
    errMessages = valType(errMessages);
	 errMessages = valPropValue(errMessages);
	errMessages =  valDownPay(errMessages);
	
	if (errMessages !== ""){          // if true - there is at least one error
	
	document.getElementById('error').innerHTML = errMessages;	
return false;                 //return false so form cannot be submitted
}
else {
	detailPaymentCalculation(document.mortgage.propValue.value, document.mortgage.downPay.value, document.mortgage.intRate.value, document.mortgage.amortization.value);
	document.getElementById("jsActive").value = "Y";	
	             // No errors - return to browser and submit form
	  var clientName = document.getElementById("client");
      var name = clientName.value;
      name = name[0].toUpperCase() + name.substr(1);
      clientName.value = name;				 
}	
	
	return true;
} // End of completeFormValidation
	 

//validating the income from the drop down menu

function valIncome(errMessages){
	if (document.mortgage.income.selectedIndex <1)
	{
		errMessages += "<li>Income must be selected</li>";
	}	
	return errMessages;
}// end of function


//validating the location from the drop down menu

function valLocation(errMessages){
	if (document.mortgage.propLocation.selectedIndex <1)
	{
		errMessages += "<li>Location must be selected</li>";
	}
	return errMessages;	
} //end of function


//validating client ID field

function valClient(errMessages){
	
  var clientName = document.mortgage.client.value;
  clientName = clientName.trim();
  var clientLength = clientName.length;


  if (clientLength === 0) {
    errMessages += "<li>Please enter a Client Name. </li><br>";
  } else if (clientName.charAt(0) == "\'" || clientName.charAt(clientName.length - 1) == "\'") {
    errMessages += "<li>Client name cannot star or end with an apostrophe.</li>";


  } else {
    if (clientLength < 3) {
      errMessages += "<li>Please enter a minimum of 3 alphanumeric characters</li>";
    } else {
      clientName = clientName.toUpperCase(); //converts to Upper case so its easier to check 

      var countNonAlpha = 0;
      var hyphen = -1;
      var apostrophe = -1;

      for (var i = 0; i < clientLength; i++) {

        if (!(((clientName.charCodeAt(i) > 64) && (clientName.charCodeAt(i) < 91) || (clientName.charCodeAt(i) === 39)))) { // A=65  .....  Z=90 - upper case range

          countNonAlpha++;
          break;

        }

      } // End of the for loop
      if (countNonAlpha) {

        errMessages += "<li>Please enter valid charecters from [A-Z]-[a-z]</li>";

      }
    }


  }
  return errMessages;
}//end of function




//validate prop location
function  valPropLocation(errMessages){
	
	if (document.mortgage.propLocation.length < 1){
		errMessages += "<li>Must select a property location</li>";
	}
	return errMessages;
} //end of function



//validating Mortgage Year input
function valMortYear(errMessages){
	
   var value = document.mortgage.mortYear.value;
   value = value.trim();
   var valLength = value.length;
  if (valLength === 0) {
   errMessages += "<li>Mortgage year can't be left empty</li>";
   	return errMessages;
  }

  var num = parseInt(value);
  
   if (isNaN(num)) {
    errMessages += "<li>Mortgage year must be numeric</li>" ;
		return errMessages;
  }

  var year = (new Date()).getFullYear();

  if (!(num === year || num === year + 1)) {
    errMessages += "<li>Mortgage year must be equal to current year or 1 year more</li>";
		return errMessages;
	}
return errMessages;
}//end of function


//validate Int Rate
function valIntRate(errMessages){
	
var rate = document.getElementById("intRate").value;
if (rate.length === 0) {
    errMessages += "<li>Interest rate needs a value</li>";
}
if (!(rate >= 3 && rate <= 16)) {
    errMessages += "<li>Rate must be between 3 and 16 inclusive</li>";
}
if (isNaN(rate)) {
    errMessages += "<li>Rate must be  a number</li>";
}
return errMessages;
}// end of function


//validate mortgage month input

function valMortMonth(errMessages){
	var month = document.getElementById("mortMonth").value;
	month = month.trim();
	var monthLength = month.length;
  if (monthLength === 0) {
    errMessages += "<li>Mortgage month needs input</li>";
	return errMessages;
  }

  var monthValue = parseInt(month);

  if (isNaN(monthValue)) {
    errMessages += "<li>Mortgage month must be numeric</li>";
	return errMessages;
  }

  var month = (new Date()).getMonth() + 1;

  if (monthValue < 1 || monthValue> 12) {
    errMessages += "<li>Mortgage month must be between 1 to 12</li>" ;
	return errMessages;
  }

  if (!(monthValue === month || monthValue === month + 1)) {
    errMessages += "<li>Month must be equal to current month or 1 more</li>";
  }
return errMessages;
}


//validate Amortization

function valAmortization(errMessages){

  var am = document.getElementById("amortization").value;
  if (am.length === 0) {
    errMessages += "<li>Amortization can't be empty</li>" ;
return errMessages;
  }

  var amNum = parseInt(am);

  if (isNaN(amNum)) {
    errMessages += "<li>Amortization must be numeric</li>";
	return errMessages;
  }

  if (amNum < 5 || amNum > 20) {
    errMessages += "<li>Amortization must be between 5 - 20 inclusive</li>" ;
	return errMessages;
  }

 return errMessages;
} //end of function

function validateUserId(errMessages) {
  var value = document.getElementById("userId").value;
  if (value.length != 10) {
    errMessages += "<li>User ID all 10 positions must be present</li>";
    
    return errMessages;
  }
  if (value[4] != "-") {
    errMessages +="<li>User ID Position 5 must be a hyphen (-)</li>" ;
  
    return errMessages;
  }
  for (var i = 0; i < 4; i++) {
    if (isNaN(value[i]))  {
      errMessages += "<li>User id Position " + i + " must be a number</li>" ;
      
     return errMessages;
    }
  }
  for (i = 5; i < 10; i++) {
    if (isNaN(value[i]))  {
      errMessages += "<li>User id Position " + i + " must be a number</li>" ;
    }
  }
  var lowsum = 0;
  for (i = 0; i < 4; i++) {
    lowsum += parseInt(value[i]);
  }
  if (lowsum <= 0) {
    errMessages += "<li>User id sum of the first 4 numbers must be greater than 0</li>" ;
    
    return errMessages;
  }
  var highsum = 0;
  for (i = 5; i < 10; i++) {
    highsum += parseInt(value[i]);
  }
  if (highsum <= 0) {
    errMessages += "<li>User id sum of the last 5 numbers must be greater than 0</li>"  ;
    
    return errMessages;
  }
  if (highsum != (lowsum * 2) + 2) {
    errMessages += "<li>User ID sum of the last 5 numbers must be the double plus 2 of of the first 4 numbers</li>" ;
    
    return errMessages;
  }
  return errMessages;
} // end of function / check for 2 apostrophes after


//validate that user selected a radio button 

function valType(errMessages){
 var type = document.getElementsByName("propDetails");
  var checked = false;
  for (var jj = 0; jj < type.length; jj++) {
    if (type[jj].checked) {
      checked = true;
      break;
    }
  }
  if (!checked) {
    errMessages += "<li>Property Type must be selected</li>" ;
  }
return errMessages;
} // end of function




//validate prop value field

function valPropValue(errMessages){
    var propValLength = document.mortgage.propValue.value.length;
     
    var propValue = document.mortgage.propValue.value;
   
    var downPayAdd = document.mortgage.downPay.value + 65000;
   
    if (!propValLength) {
        errMessages += "<li>Property Value is a required field</li>";
        return errMessages;
    }
         var test = parseInt(propValue);

  if (isNaN(propValue)) {
    errMessages += "<li>Value must be numeric</li>";
	return errMessages;
  }
        
        else if (propValue < downPayAdd){
            errMessages += "<li>Property Value must be at least 65,000 greater than the down payment</li>";
            return errMessages;
           
        }
        return errMessages;

}// end of function
           
//validate down pay
 
function valDownPay(errMessages){
   
    var downPayLength = document.mortgage.downPay.value.length;
   
    var downPay = document.mortgage.downPay.value;
   
    var propValueTest = document.mortgage.propValue.value * 0.2;
   
    if (!downPayLength) {
       errMessages += "<li>Down payment is a required field</li>";
        return errMessages;
    }
        else if (typeof downPay === 'number') {
            var r = (downPay % 1);
            if(r !== 0){
          errMessages += "<li>Down payment must be a positive whole number</li>";
            return errMessages;
            }
        }
        else if (downPay < propValueTest){
          errMessages +="<li>Down payment must be 20% of the property value</li>";
            return errMessages;
           
        }
 
        return errMessages;
}// end of JavaScript 




