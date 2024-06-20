'use strict';

const expect = require('chai').expect;
const ConvertHandler = require('../controllers/convertHandler.js');


module.exports = function (app) {
  app.get('/api/convert', (req, res) => {

    let convertHandler = new ConvertHandler();

    let string = req.query.input;

    try {

      const getNum = convertHandler.getNum(string);

      const getUnit = convertHandler.getUnit(string);

      const getReturnUnit = convertHandler.getReturnUnit(getUnit);

      const spellOutUnit = convertHandler.spellOutUnit(getUnit);
      const spellOutInitUnit = convertHandler.spellOutUnit(getReturnUnit);

      const convert = convertHandler.convert(getNum, getUnit);

      const getString = convertHandler.getString(getNum, spellOutUnit, convert, spellOutInitUnit);

      if ( getNum === 'Invalid Input' || getUnit === 'INVALID UNIT') {
        
        return res.status(200).send('invalid unit')
      } else {
        
        res.status(200).json({ initNum: getNum, initUnit: getUnit, returnNum: convert, returnUnit: getReturnUnit, string: getString });
        
      }
    }
    catch (error) {
      res.status(200).send('invalid unit')
    }

  })

};
