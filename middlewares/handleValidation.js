const {validationResult} = require("express-validator")
const fs = require('fs')

const validate = async(req, res, next) => {
    const errors = validationResult(req)

    if(errors.isEmpty()) {
        return next()
    }

    const extratedErros = []

    errors.array().map((err) => extratedErros.push(err.msg))

    return res.status(422).json({      
       errors: extratedErros  
      
    })
}
module.exports = validate;