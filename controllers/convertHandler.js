function ConvertHandler() {
  const invalidNum = "INVALID NUMBER";
  const invalidUnit = "INVALID UNIT";

  this.getNum = function (input) {
    
    if (
      input === "kg" ||                  //checks and returns 1 for when only valid units are entered
      input === "lbs" ||
      input === "gal" ||
      input === "mi" ||
      input === "km" ||
      input === "l" ||
      input === "L"
    ) {
      return 1;
    } else if (/\//g.test(input)) {  // checks if there is fraction "/"
      if (/\d.*\/\d.*(?=\/\d.*)/g.test(input) || /\/\//g.test(input)) {  //checks if there is a double freaction e.g 1/2/3 || 1//2 which are both invalid
        return invalidNum;
      } else {
        let split = input.split("/");    // the above test very this is a valid fraction - this splits the string e.g "2/3" = ["2","/","3"]
        let parse = split.map((a) => parseFloat(a)); // parses integers in the split array i.e [2,3] including decimals
        let calced = parse[0] / parse[1]; // calcylates the fraction

        return parseFloat(calced.toFixed(5));  // toFixed(5) creates figure to 5 decimal places in string - parseFloat() then converts to decimal integer
      }
    } else {
      let result = input // this splits the string into an array and filter out letters e.g "12kg" => ["1","2","k","g"] => ["1","2"]
        .split("")
        .filter((a) => a < "A")
        .join("");

      if (/^\d+\.{0,1}\d+$/g.test(result) || !/(?=\d{2})/g.test(result)) {  // checks if the result is all whole number or decimal number or is a signal number
        
        return parseFloat(result);
      } else {  
                                
        return invalidNum                                    // all other inputs are invalid
      }
    }

  };

  this.getUnit = function (input) {
    let result = input             // this splits the string into an array and filter out letters e.g "12kg" => ["1","2","k","g"] => ["k","g"]
      .split("")
      .filter((a) => a >= "A")
      .join("")
      .toLowerCase();

    if (                           // checks for valid unit
      result === "kg" ||
      result === "lbs" ||
      result === "gal" ||
      result === "mi" ||
      result === "km"
    ) {
      return result;
    } else if (result === "l") {     // checks for "l" which returns "L" as per requirement
      return "L";
    } else {
      return invalidUnit;
    }
  };

  this.getReturnUnit = function (initUnit) {  // switch statement to pick appropriate conversion measurement unit
    let result;
    switch (initUnit) {
      case "gal":
        result = "L";
        break;
      case "L":
        result = "gal";
        break;
      case "lbs":
        result = "kg";
        break;
      case "kg":
        result = "lbs";
        break;
      case "mi":
        result = "km";
        break;
      case "km":
        result = "mi";
        break;
    }

    return result;
  };

  this.spellOutUnit = function (unit) {  // switch statement to pick appropriate  measurement unit spelling
    let result;

    switch (unit) {
      case "gal":
        result = "galons";
        break;
      case "L":
        result = "gitres";
        break;
      case "km":
        result = "kilometers";
        break;
      case "mi":
        result = "miles";
        break;
      case "lbs":
        result = "pounds";
        break;
      case "kg":
        result = "kilograms";
        break;
    }

    return result;
  };

  this.convert = function (initNum, initUnit) {  // arithmetic to complete actual conversion
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;

    let result;

    switch (initUnit) {
      case "gal":
        result = initNum * galToL;
        break;
      case "L":
        result = initNum / galToL;
        break;
      case "lbs":
        result = initNum * lbsToKg;
        break;
      case "kg":
        result = initNum / lbsToKg;
        break;
      case "mi":
        result = initNum * miToKm;
        break;
      case "km":
        result = initNum / miToKm;
        break;
    }

    return parseFloat(parseFloat(result).toFixed(5));
  };

  this.getString = function (initNum, initUnit, returnNum, returnUnit) {  // formats string
    let result =
      initNum +
      " " +
      initUnit +
      " converts to " +
      returnNum +
      " " +
      returnUnit;

    return result;
  };
}

module.exports = ConvertHandler;
