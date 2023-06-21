const UserModel = require("./UserModel.js");
// const opencage = require('opencage-api-client').default({key: '893969b4bda14166ace731df5d964730'});
const { geocode } = require('opencage-api-client');
const opencage = { geocode };

const UserController = {

    validation: (user) => {
        if(user.id==null||user.name==null||user.email==null||user.phone==null)
            return false;
        if(email.search("@")==-1||email.search(" ")!=-1)
            return falsee

        opencage.geocode({q: user.phone})
            .then(data => {
               return true;
            })
            .catch(error => {
                console.log("phone")
                return false;
            });
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
        const addUser = req.body;
        
        const user = await UserModel.users.find(user => req.body.id == user.id)
        if(this.validation(user)){
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
                res.send("User with that id already exists")
            }
        }
        else{
            res.send("All fields must be filled in correctly")
        }

    },
    updateUser: (req, res) => {
        if(this.validation(req.body)){
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