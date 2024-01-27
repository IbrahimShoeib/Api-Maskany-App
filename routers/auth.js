const express =require("express");
const router=express.Router();
const bcrypt =require("bcrypt")
const { User,registerValidation,loginValidation} = require("../model/user")

//>>>>>>>>>>>>>>>>>>>  <<<<<<<<<<<<<<<<<<<<<




/**
 * @desc register new User
 * @route /api/auth/register
 * @method post
 * @access public
 */
router.post(("/register"),async( req , res )=> {

    const {error} = registerValidation(req.body)
    if(error){
        res.status(400).json({message:error.mesage})
    }

    let user = await User.findOne({email:req.body.email})

    if(user){
        res.status(404).json({message: " user is already registered"})
    }else{

        const salt =await bcrypt.genSalt(10)
        req.body.password =await bcrypt.hash(req.body.password , salt)

        user = new User({
            email:req.body.email,
            userName:req.body.userName,
            password:req.body.password,
            isAdmin:req.body.isAdmin||false,
        })

        const token = user.generateToken()

        user.token = [token]

        user = await user.save()


    const{password,...other} = user._doc

    res.status(200).json({...other,token});

    }


}
)


/**
 * @desc login  User
 * @route /api/auth/login
 * @method post
 * @access public
 */

router.post("/login",async(req,res) => {

   const {error}=loginValidation(req.body)

   if(error){

     res.status(400).json({message:error.message})



}

   const user = await User.findOne({email:req.body.email})

   if(!user){

     res.status(404).json({message:"user is not found"})

   }

    const isPassword = await bcrypt.compare(req.body.password , user.password)

       if(!isPassword){

         req.status(400).json({message:"invalid password "})

       }else{

            const token = user.generateToken()
            const {password,...other} = user._doc

            user.token.push(token)
            user.save()

                
                res.status(200).json({token,...other})

       }

})

module.exports = router