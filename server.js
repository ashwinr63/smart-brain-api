const express = require('express');
const bodyParser = require('body-parser');


const app = express();

app.use(bodyParser.json());

const database = {
    users: [
        {
            id: '123',
            name: 'John',
            email: 'john@gmail.com',
            password: 'cookies',
            entries: 0,
            joined: new Date()
        },
        {
            id: '124',
            name: 'Sally',
            email: 'sally@gmail.com',
            password: 'bananas',
            entries: 0,
            joined: new Date()   
        }
    ]
}
app.get('/', (req, res)=> {
    res.json(database.users)
})

app.post('/signIn', (req, res) => {
    if(req.body.email === database.users[0].email && req.body.password === database.users[0].password) {
        res.json('Sucess')
    } else {
        res.json('Error Loggin In')
    }
})

app.post('/register', (req, res) => {
    const {email , name, password} = req.body;
    
    database.users.push({
        id: '125',
        name: name,
        email: email,
        password: password,
        entries: 0,
        joined: new Date()
    })
    res.json(database.users[database.users.length -1])
})

app.listen(3000, () => {
    console.log('App is Running on port 3000');
})


/* 

/ -> res = 'This is Working'
/signIn -> res = 'Sign In Page'
/register -> res = 'Register Page'
/profile/:userId -> res = 'User Profile Page'

*/