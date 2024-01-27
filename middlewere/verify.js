const jwt = require("jsonwebtoken")


function verifytoken(req,res,next){

    const token =req.headers.token

    if(token){
    try {
        const decoded = jwt.verify(token,process.env.JWT_SECRET_KEY)
            req.user=decoded;
            next()
        
    } catch (error) {
        res.status(400).json({message:"invalid token"})
        
    }
        
    }else{
        res.status(400).json({message:" token no provied "})
    }

}


function verifyTokenAndAutoraition(req,res,next){

    verifytoken(req,res,()=>{

        if(req.user.id == req.params.id||req.user.isAdmin){

            res.status(200).json({message:"invalid token "})
           
             next()

        }else{

            res.status(400).json({message:"you are not allowed"})
        }
     }
)
}

function verifyTokenAndAdmin(req,res,next){

    verifytoken(req,res,()=>{

        if(req.user.isAdmin){

            res.status(200).json({message:"you are admin"})

                next()

        }else(

            res.status(400).json({message:"you aren't admin"})

        )
    })
}



