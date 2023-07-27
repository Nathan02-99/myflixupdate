const router = require("express").Router()
const verify = require("../routes/verifyToken")
const logout = require('./logout');


router.get ('/',verify, (req,res) => {
    res.json({
        post: {
            title: 'My first app',
            description: 'favorite movies '
        }
    })
})

router.post('/logout', verify, logout, (req, res) => {
    
    res.status(200).send('Logout successful');
  });

module.exports = router;