const joi = require('@hapi/joi')

const registerValidation = (data) =>{
    const schema = joi.object({
        firstname:joi.string().min(3).required(),
        secondname:joi.string().min(3).required(),
        username:joi.string().min(3).required(),
        email: joi.string().min(6).required().email(),
        password: joi.string().min(8).required()
    })

    return schema.validate(data);
}

const loginValidation = (data) =>{
    const schema = joi.object({
        email: joi.string().min(6).required().email(),
        password: joi.string().min(8).required()
    })

    return schema.validate(data);
}

const logoutValidation = (data) => {
    const schema = joi.object({
      
      authToken: joi.string().required(),
    });
  
    return schema.validate(data);
  };

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
module.exports.logoutValidation = logoutValidation;
