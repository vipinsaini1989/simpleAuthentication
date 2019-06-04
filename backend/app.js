const express = require('express')
const path = require('path');
const bodyParser = require("body-parser");
const app = express()
app.use(bodyParser.urlencoded({
    extended: true
}));
const port = 3000

const home = path.join(__dirname, '../frontend/home/index.html');
let validUser = {
    status: false,
    name: ""
}

const localDB = [{
    name: "test user",
    password: "Qwerty1"
}]

app.get('/', (req, res) => {
    if (validUser.status) {
        res.redirect(`home/?name=${validUser.name}`)
    } else {
        res.redirect("login");
    }
});

app.post('/auth/login', (req, res) => {
    let existingUser = req.body;
    localDB.forEach(user => {
        if (user.name === existingUser.name && user.password === existingUser.password) {
            validUser.status = true;
            validUser.name = existingUser.name;
            return;
        }
    });

    if (validUser.status) {
        res.send({
            status: 200,
            name: existingUser.name
        });
    } else {
        res.send({
            status: 401,
            message: "username or password is incorrect"
        });
    }
})

app.post('/auth/signup', (req, res) => {
    let newUser = req.body;
    if (newUser.password !== newUser.confirmPassword) {
        res.status(405).send({
            status: 405,
            message: "Password and confirm password didnot match"
        })
    } else {
        localDB.push({
            name: newUser.name,
            password: newUser.password
        });
        res.status(200).send({
            status: 200,
            message: "New user is created"
        })
    }
})

app.post('/auth/logout', (req, res) => {
    validUser.status = false;
    validUser.name = "";
    res.send({
        status: 200,
        message: "Successfully logout"
    })
})

app.get('/home', (req, res) => {
    if (validUser.status) {
        res.sendFile(home);
    } else {
        res.redirect("../login");
    }
})

app.use('/login', express.static(path.join(__dirname, '../frontend/login')));
app.use('/signup', express.static(path.join(__dirname, '../frontend/signup')));


app.listen(port, () => console.log(`Example app listening on port ${port}!`))