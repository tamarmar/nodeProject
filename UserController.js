const UserModel = require("./UserModel.js");

const UserController = {

    getAllUsers: async (req, res) => {
        try {
            const  user = await UserModel.find();
            res.status(200).json(user)
        } catch (error) {
            res.status(400).json({message: error.message});
        }
    },
    getUserById: async(req, res) => {
        try {
            const user = UserModel.findById(req.params.id)
            res.json(user)
        } catch (error) {
            res.status(400).json({message: error.message})
        }
    },
    addUser: async(req, res) => {
        const addUser = new UserModel(req.body)
        const user = await UserModel.findOne({ password:addUser.password })
        if(user == null){ 
            addUser.save()
            .then(newUser => {
                res.send(newUser)
            }).catch(err => {
                console.log(err)
            })
        }
        else{
            res.send("User with that password already exists")
        }
       
    },
    updateUser: async(req, res) => {
        const {password} = req.params;
        try {
           const updateUser = await UserModel.findOne({password:password})
           if(updateUser == null){
            return res.send('This user not exist')
           }
            const user = await UserModel.findByIdAndUpdate(updateUser._id, req.body, {new:true});
            res.status(200).json(user)
        } catch (error) {
            res.status(400).json({message: error.message})
        }
    },
    deleteUser: async (req, res) => {
        const {password}= req.params;
        try {
            const deleteUser = await UserModel.findOne({password:password})
            if(deleteUser == null){
                return res.send('This user not exist');
            }
            const links = deleteUser.links || [];
            for (const link of links){
                console.log(link);
                await LinkModel.findByIdAndDelete(link)
            }
            const user = await UserModel.findByIdAndDelete(deleteUser._id);
            res.status(200).json(deleteUser)
        } catch (error) {
            res.status(400).json({message: error.message})
        }
    },
}

module.exports = UserController;