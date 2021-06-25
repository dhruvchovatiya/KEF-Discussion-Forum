const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")
const dotenv = require("dotenv");

dotenv.config();


//REGISTER
router.post('/register', async (req, res) => {
    try {
        const salt = await bcrypt.genSalt(10)
        const hashedPass = await bcrypt.hash(req.body.password, salt)
        const newUser = new User({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            hash_pw: hashedPass
        })
        const user = await newUser.save()
        res.status(200).json(user)
    } catch (err) {
        //err code 11000 => already registered
        return res.status(500).json(err)
    }
})

//LOGIN
// router.get('/login', async (req,res) => {
//     const user = await User.findOne({email:req.body.email})
//     console.log(user)

//     try{
//     if(!user) {
//         return res.status(500).json('Invalid Username/Password')
//     }

//     if(await bcrypt.compare(req.body.hash_pw,user.hash_pw)) {
//         const token = jwt.sign(
//             {
//                 id: user._id,
//                 email: user.email
//             },
//             process.env.JWT_SECRET
//         )
//         console.log('yesss')
//         return res.status(200).json(token)
//     }}
//     catch(err) {
//         return res.status(502).json(err)

//     }


// })

router.post('/login', async (req, res) => {
    const user = await User.findOne({ email: req.body.email })
    console.log(user)

    if (!user) {
        return res.json({ status: 'error', error: 'Invalid Username/Password' })
    }

    //////////////////////req.body.password, send password, not hash_pw
    if (await bcrypt.compare(req.body.password, user.hash_pw)) {
        const token = jwt.sign(
            {
                id: user._id,
                email: user.email
            },
            process.env.JWT_SECRET
        )
        // console.log('yesss')
        // console.log(token)
        return res.json({ status: 'ok', data: token })
    }
    return res.json({ status: 'error', error: 'Invalid Username/PW' })

})

router.post('/change_pw', async (req,res) => {
    

    try {
        const jwtUser = jwt.verify(req.body.token,process.env.JWT_SECRET)
        let user = await User.findById(jwtUser.id)
        
        //-------check if user exists in db?
        console.log(user)
    
        const salt = await bcrypt.genSalt(10)
        user.hash_pw = await bcrypt.hash(req.body.password, salt)
    
        user.save()
    
        res.json(user)
    } catch (err) {
        res.json({status: 'error', error: 'Not authorized'})
    }
    
    


})

module.exports = router;
