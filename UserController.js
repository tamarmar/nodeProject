
const UserModel = require("./UserModel.js");
const crypto = require('crypto');
const Hebcal = require('hebcal');
const axios = require('axios');

const UserController = {


    validation: async (user) => {
        if (user.id == null || user.name == null || user.email == null || user.phone == null) {
            return false;
        }

        if (user.email.search("@") == -1 || user.email.search(" ") != -1) {
            return false;
        }





        const api_key = "0cae7bfa98a0b8b78d72e808759ec1f6";
        console.log(user.phone + "  phone");
        const phone_number = user.phone;
        const url = `http://apilayer.net/api/validate?access_key=${api_key}&number=${phone_number}`;
        try {
            const response = await axios.get(url);
            const { valid, international_format } = response.data;
            console.log(response.data + "valid")
            if (valid) {
                console.log('Phone number is valid');
                return true;
            } else {
                console.log('Phone number is not valid');
                return false;
            }
        } catch (error) {
            console.log('Error validating phone number:', error);
            return false;
        }
    },
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
            console.log(await UserController.validation(addUser) + "  return")
            if (await UserController.validation(addUser)) {
                const user = await UserModel.users.find(u => addUser.email === u.email)
                if (user == null) {
                    UserModel.users.push(addUser)
                    console.log(addUser)
                    res.send(200).json(user)
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
            else {
                res.send("All fields must be filled in correctly")
            }
        }
        catch (error) {
            res.status(400).json({ message: error.message })
        }

    },
    updateUser: (req, res) => {
        if (UserController.validation(req.body)) {
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
        }
        else
            res.send("All fields must be filled in correctly")
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