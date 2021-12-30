const User = require('../models/user');
const bcrypt = require('bcryptjs');
const { generateJWT } = require('../helpers/jwt');

const newUser = async(req, res = response) => {

    const { email, password } = req.body;

    try {

        const existsEmail = await User.findOne({ email });
        if (existsEmail) {
            return res.status(400).json({
                ok: false,
                msg: 'The email exists'
            })
        }

        const user = new User(req.body)

        //password encrypt
        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync(password, salt);

        await user.save();

        //Generate JWT
        const token = await generateJWT(user.id);

        return res.json({
            ok: true,
            user,
            token
        })
    } catch (e) {
        console.log(e);
        return res.status(500).json({
            ok: false,
            msg: 'talk to the admin'
        })
    }


}

const login = async(req, res = response) => {

    try {
        const { email, password } = req.body;

        const userDB = await User.findOne({ email });
        //validate email
        if (!userDB) {
            return res.status(404).json({
                ok: false,
                msg: 'invalid email'
            });
        }

        //validate password
        const validPassword = bcrypt.compareSync(password, userDB.password);
        if (!validPassword) {
            return res.status(400).json({
                ok: false,
                msg: 'invalid password'
            });
        }

        const token = await generateJWT(userDB.id);

        return res.json({
            ok: true,
            user: userDB,
            token
        });

    } catch (e) {
        console.log(e);
        return res.status(500).json({
            ok: false,
            msg: 'talk to the admin'
        })
    }
}

const renewToken = async(req, res = response) => {

    const uid = req.uid;
    const token = await generateJWT(uid);
    const user = await User.findById(uid);

    return res.json({
        ok: true,
        user,
        token
    });

}

module.exports = {
    newUser,
    login,
    renewToken
}