let user = require('../user/userData')
var emailRegex = /^[-!#$%&'*+\/0-9=?A-Z^_a-z{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/;

const list =(req, res)=>{
    res.json(getUser()) 
}

const addUser = (req, res) => {
    const userData = req.body
    const { isValid, message } = checkRequiredfeild(userData)
    if (!isValid) {
        res.status(400).json({ error: message });
    } else {
        const newUser = mapToUser(userData)
        newUser.id = getNewId(getUser())
        user.push(newUser)
        res.json(user)
    }
}
const updateUser = (req, res) => {
    const id = req.params.id
    const userData = req.body
    let existingUser = getUser().find(e => e.id === Number(id));
    if (existingUser) {
        Object.assign(existingUser, mapToUser(userData))
        res.json(user)
    } else {
        res.status(400).json({ error: "Can't find user" });
    }
}

const deleteUser = (req, res) => {
    const id = req.params.id
    let existingUser = getUser().find(e => e.id === Number(id));
    if (existingUser) {
        user =  user.filter(e => e.id !== Number(id))
        res.json(user)
    } else {
        res.status(400).json({ error: "Can't find user" });
    }
}

const mapToUser = (userData) => {
    let newUser = {};
    newUser.userName = userData.userName
    newUser.firstName = userData.firstName
    newUser.lastName = userData.lastName
    newUser.email = userData.email
    return newUser
}

const checkRequiredfeild = (userData) => {
    if (!userData.userName) {
        return { isValid: false, message: "missing userName!" }
    } else if (!userData.email) {
        isValid = false;
        message = "missing email! ";
        return { isValid: false, message: "missing email!" }
    }
    const validEmail = isEmailValid(userData.email)
    if (!validEmail) {
        return { isValid: false, message: 'email is invalid!' }
    }
    const emailExist = isEmailExist(userData.email)
    if (emailExist) {
        return { isValid: false, message: 'email already exist!' }
    }
    const userNameExist = isUserNameExist(userData.userName)
    if (userNameExist) {
        return { isValid: false, message: 'userName already exist!' }
    }

    return { isValid: true, message: "" }

}
const isEmailValid = (email) => {
    if (!email)
        return false;

    if (email.length > 254)
        return false;

    var valid = emailRegex.test(email);
    if (!valid)
        return false;

    // Further checking of some things regex can't handle
    var parts = email.split("@");
    if (parts[0].length > 64)
        return false;

    var domainParts = parts[1].split(".");
    if (domainParts.some(function (part) { return part.length > 63; }))
        return false;

    return true;
}
const isEmailExist = (email) => {
    const emailExist = user.filter(u => u.email === email)
    if (emailExist && emailExist.length > 0) {
        return true
    }
    return false
}
const isUserNameExist = (userName) => {
    const userNameExist = user.filter(u => u.userName === userName)
    if (userNameExist && userNameExist.length > 0) {
        return true
    }
    return false
}
const getNewId = (users) => {
    let max = Math.max(user.map(e => e.id))
    return max + 1
}
const getUser=()=>{
    return user
}
module.exports = {list, addUser, updateUser, deleteUser }