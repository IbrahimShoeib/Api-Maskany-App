const express=require("express")
const router=express.Router()
const {User,updateValidation}=require("../model/user")
const bcrypt=require("bcrypt")
const { verifytokenAndAdmin,verifytokenAndAuthorization} = require("../middlewere/verifyToken");


//>>>>>>>>>>>>>>>>>>>>>>>>> START CODE<<<<<<<<<<<<<<<<<<<<<<<

router.route("/")
.get( async(req,res)=>{

    const users = await User.find()
    if(!users){
        res.status(400).json({message:"user is not found"})
    }
    res.status(200).json(users)
}
)
router.route("/:id")

.get( async(req,res)=>{

    const user =await User.findById(req.params.id)
      if(user){res.status(200).json(user)
    }})


.put(verifytokenAndAdmin,async(req,res)=>{

    if(!req.body.id == req.params.id){
        return res.status(201).json({message:`you are can't edit profile`})
    }


    const {error}=updateValidation(req.body)
        if(error){
            return res.status(400).json({
                message:error.message })
            }

                
    if(req.body.password){

        const salt=await bcrypt.genSalt(10);
          req.body.password=await bcrypt.hash(req.body.password ,salt);

          }

        let user = await User.findByIdAndUpdate(req.params.id,{
            $set:{
                email:req.body.email,
                userName:req.body.userName,
                password:req.body.password
            }},{new:true})
        res.status(200).json(user)
})
.delete(verifytokenAndAuthorization,async(req,res)=>{

    const user = await User.findByIdAndDelete(req.params.id)
    
    if(user){

        res.status(200).json({message:"user has been deleted"})

    }else{

        res.status(404).json({message:"user not found"})

    }
}
)


module.exports=router