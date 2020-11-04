const bcrypt = require('bcryptjs')
const User = require('../models/Users');

module.exports.login = function (req, res) {
    res.status(200).json({
        email: req.body.email,
        password: req.body.password,
    });
};
module.exports.register = async function (req, res) {

    // authUser.save().then(() => {
    //     console.log("user Created")
    // });
    const condidate = await Auth.findOne({email: req.body.email})
    if (candidate){
        res.status(409).json({message:"Email is busy"})
    } else{
        const salt = bcrypt.genSaltSync(10);
        const password = req.body.password;
        const user = new User({
            email: req.body.email,
            password:bcrypt.hashSync(password, salt),
        });
try{
await user.save();
res.status(201).json({
    user,
    resultCode:0
})
}catch(e){
    res.status(408).json({
        err:e,
        resultCode:1
    })
}
    }
};