const { body } = require("express-validator");

const userCreateValidations = () => {
   return [
           body("name")
           .isString().withMessage("O nome é obrigatório.")
           .isLength({min: 3}).withMessage("O nome precisa ter no mínimo 3 caracteres."),
           body("email")
           .isString().withMessage("O campo email é obrigatório.")
           .isEmail().withMessage("Insira um email válido."),
           body("password")
           .isString().withMessage("O campos senha é obrigatório.")
           .isLength({min: 5}).withMessage("A senha precisa ter no mínimo 5 caracteres."),
            body("confirmpassword")
            .isString().withMessage("A confirmação da senha é obrigatório.")
            .custom((value, {req}) => {
                if(value != req.body.password){
                    throw new Error("As senhas não são iguais.");
                }
                return true;
            })
        ];
}

module.exports = {
    userCreateValidations,
};