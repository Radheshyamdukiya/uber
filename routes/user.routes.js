const express=require('express');
const router=express.Router();
const {body}=require('express-validator');
const usercontroller=require('../controllers/user.controller');


router.post('/register',[

    body('fullname').notEmpty().withMessage('Fullname is required').isLength({min:3}).withMessage('Fullname must be at least 3 characters long'),
    body('email').notEmpty().withMessage('Email is required').isEmail().withMessage('Invalid email format'),    
    body('password').notEmpty().withMessage('Password is required').isLength({min:6}).withMessage('Password must be at least 6 characters long'),
    body('password').isStrongPassword().withMessage('Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'),
 
],
usercontroller.register); 

module.exports=router;