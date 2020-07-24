/**
 * Richard Calderan
 * 
 * Validade product before: express-validator
 */

const { body } = require('express-validator');

const validate = {
    userPOST:()=>{        
        return [
            body('_id').exists(),
            body('type').exists(),
            // password must be at least 5 chars long
            //body('password').isLength({ min: 5 })
        ]
    },
    userPut:()=>{
        
        return [
            body('description').isLength({ max: 500 })
            //body('password').isLength({ min: 5 })
        ]
    }
}


module.exports = validate;