function ConvertHandler() {

  this.getNum = function (input) {

    if (input === "kg" || input === "lbs" || input === "gal" || input === "mi" || input === "km" || input === "l") {

      return 1;
    } if (/\//g.test(input)) {

      if (/\d.*\/\d.*(?=\/\d.*)/g.test(input)) {

        return 'Invalid Input';
      } else {

        let split = input.split('/');
        let parse = split.map((a) => parseFloat(a))
        let calced = parse[0] / parse[1];

        return calced
      }

    } else if (/\/[^\/]*\//g.test(input)) {

      return 'Invalid Input';
    } else {

      let result = input.split('').filter((a) => a < 'A').join('');
      return parseInt(result);
    }
  };

  this.getUnit = function (input) {
    let result = input.split('').filter((a) => a >= 'A').join('').toLowerCase();;

    if (result === "kg" || result === "lbs" || result === "gal" || result === "mi" || result === "km" || result === "l") {
      return result.toLowerCase();
    } else {

      return 'INVALID UNIT';
    }
  };

  this.getReturnUnit = function (initUnit) {
    let result;
    switch (initUnit) {
      case "gal":
        result = "l";
        break;
      case "l":
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

  this.spellOutUnit = function (unit) {
    let result;

    switch (unit) {
      case "gal":
        result = "Galons";
        break;
      case "l":
        result = "Litres";
        break;
      case "km":
        result = "Kilometers";
        break;
      case "mi":
        result = "Miles";
        break;
      case "lbs":
        result = "Pounds";
        break;
      case "kg":
        result = "Kilograms";
        break;
    }

    return result;
  };

  this.convert = function (initNum, initUnit) {

    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;

    let result;

    switch (initUnit) {
      case "gal":
        result = initNum * galToL;
        break;
      case "l":
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

  this.getString = function (initNum, initUnit, returnNum, returnUnit) {
    let result = new Function(`return ${initNum}`)() + " " + initUnit + " converts to " + returnNum + " " + returnUnit;

    return result;
  };

}

module.exports = ConvertHandler;
