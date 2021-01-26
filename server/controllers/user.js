const bcrypt = require('bcryptjs')

module.exports = {
    register: async (req, res) => {
        console.log(req.body)
        const db = req.app.get('db')
        const { email, username, password, preferred } = req.body
        const [existingUser] = await db.users.find_user([username])

        if (existingUser) {
            return res.status(409).send('Username is taken')
        }
        try {
            const salt = bcrypt.genSaltSync(10)
            const hash = bcrypt.hashSync(password, salt)
            const [newUser] = await db.users.create_user([email, username, hash, preferred])
            req.session.user = newUser

            res.status(200).send(newUser)
        } catch (err) {
            console.log(err)
        }
    },
    login: async (req, res) => {
        const db = req.app.get('db')
        const { username, password } = req.body
        const [existingUser] = await db.users.find_user([username])

        if (!existingUser) {
            return res.status(404).send('User does not exist')
        }

        const isAuthenticated = bcrypt.compareSync(password, existingUser.password)
        if (!isAuthenticated) {
            return res.status(403).send('Incorrect username or password')
        }
        delete existingUser.password
        delete existingUser.email
        req.session.user = existingUser
        res.status(200).send(existingUser)
    },
    getUser: (req, res) => {
        if (req.session.user) {
            res.status(200).send(req.session.user)
        } else {
            res.status(404).send('No session found')
        }
    },
    logout: (req, res) => {
        req.session.destroy()
        res.sendStatus(200)
    }
}