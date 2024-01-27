const mongoose = require("mongoose")

async function connectionDatabase (){
    try {

        await mongoose.connect(process.env.MONGO_URI )
        console.log("Data base is connecting ")
    } catch (error) {

        console.log("nooooooooooo",error)

    }
}
module.exports = {
    connectionDatabase
}