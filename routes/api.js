'use strict';

const expect = require('chai').expect;
const ConvertHandler = require('../controllers/convertHandler.js');


module.exports = function (app) {
  app.get('/api/convert', (req, res) => {
    const invalidNum = 'INVALID NUMBER';
    const invalidUnit = 'INVALID UNIT';

    let convertHandler = new ConvertHandler();

    let string = req.query.input;

      const getNum = convertHandler.getNum(string);
      const getUnit = convertHandler.getUnit(string);

      if (getNum === 'INVALID NUMBER' && getUnit === 'INVALID UNIT') {

         res.status(200).send('invalid number and unit')
       
      } else if (getNum === 'INVALID NUMBER') {

        return res.status(200).send('invalid number')

      } else if (getUnit === 'INVALID UNIT') {

        return res.status(200).send('invalid unit')

      } else {
        const getReturnUnit = convertHandler.getReturnUnit(getUnit);
        const spellOutUnit = convertHandler.spellOutUnit(getUnit);
        const spellOutInitUnit = convertHandler.spellOutUnit(getReturnUnit);
        const convert = convertHandler.convert(getNum, getUnit);
        const getString = convertHandler.getString(getNum, spellOutUnit, convert, spellOutInitUnit);

       return res.status(200).json({
          initNum: getNum,
          initUnit: getUnit,
          returnNum: convert,
          returnUnit: getReturnUnit,
          string: getString
        });

      }

  })

};
