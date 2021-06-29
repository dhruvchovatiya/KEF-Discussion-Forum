const router = require("express").Router();
const User = require("../models/User");


//Get all users
router.get('/', async (req,res) => {
    try {
        const users = await User.find()
        res.status(200).json(users)
    } catch (err) {
        res.status(500).json(err)
    }
})

router.get('/:id', async (req,res) => {
    try {
        const user = await User.findById(req.params.id)
        res.status(200).json(user)
    } catch (err) {
        res.status(500).json(err)
    }
})

module.exports = router;
