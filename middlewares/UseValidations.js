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
            body("confirmPassword")
            .isString().withMessage("A confirmação da senha é obrigatório.")
            .custom((value, {req}) => {
                if(value != req.body.password){
                    throw new Error("As senhas não são iguais.");
                }
                return true;
            })
        ];
}
const loginValidation = () => {
    return [
      body("email")
        .isString()
        .withMessage("O e-mail é obrigatório.")
        .isEmail()
        .withMessage("Insira um e-mail válido"),
      body("password").isString().withMessage("A senha é obrigatória."),
    ];
  };

  const userUpdateValidation = () => {
    return [
      body("name")
      .optional()
      .isLength({min:3}).withMessage("O nome precisa ter pelo menos 3 caracteres."),
      body("password")
      .optional()
      .isLength({min:5})
      .withMessage("A senha precisa ter pelo menos 5 caracteres.")
      
    ]
  }

module.exports = {
    userCreateValidations,
    loginValidation,
    userUpdateValidation,
};