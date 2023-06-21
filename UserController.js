const UserModel = require("./UserModel.js");
const crypto = require('crypto');
const Hebcal = require('hebcal');
const UserController = {

    getAllUsers: async (req, res) => {
        try {
            const user = await UserModel.users;
            res.status(200).json(user)
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },
    getUserById: async (req, res) => {
        try {
            const user = UserModel.users.find(user => req.params.id == user.id)
            res.json(user)
        } catch (error) {
            res.status(400).json({ message: error.message })
        }
    },
    addUser: async (req, res) => {
        try {
            const addUser = req.body;
            const uuid = crypto.randomUUID();
            console.log(uuid + "  uuid");
            addUser.id = uuid

            const hebDate = new Hebcal.HDate(new Date(req.body.date));
            const hebDateString = hebDate.toString('h');

            addUser.date = hebDateString
            const user = await UserModel.users.find(user => addUser.email == user.email)
            if (user == null) {
                UserModel.users.push(addUser)
                res.send(200)
                // .then(newUser => {
                //     res.send(newUser)
                // }).catch(err => {
                //     console.log(err)
                // })

            }
            else {
                res.send("User with that email already exists")
            }
        }
        catch (error) {
            res.status(400).json({ message: error.message })
        }

    },
    updateUser: (req, res) => {
        try {
            const updateUser = UserModel.users.find((user) => user.id == req.params.id)
            if (updateUser == null) {
                return res.send('This user not exist')
            }
            updateUser.name = req.body.name;
            updateUser.email = req.body.email;
            updateUser.phone = req.body.phone;
            res.status(200).json(updateUser)
        } catch (error) {
            res.status(400).json({ message: error.message })
        }
    },
    deleteUser: (req, res) => {
        const id = req.params.id;
        const index = UserModel.users.findIndex((user) => user.id == id)
        try {

            if (index == -1) {
                return res.send('This user not exist');
            }
            UserModel.users.splice(index, 1);
            res.status(200).json(UserModel.users[index])
        } catch (error) {
            res.status(400).json({ message: error.message })
        }
    },
}

module.exports = UserController;