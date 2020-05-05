require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const app = express();

var urlencodedParser = bodyParser.json({ extended: false })
app.get('/', (req, res) => {
    res.send('user availaible..')
})

const dummyUser = []

const employeeDetails = [{"id":"1","employee_name":"Tiger Nixon","employee_salary":"320800","employee_age":"61","profile_image":""},{"id":"2","employee_name":"Garrett Winters","employee_salary":"170750","employee_age":"63","profile_image":""},{"id":"3","employee_name":"Ashton Cox","employee_salary":"86000","employee_age":"66","profile_image":""},{"id":"4","employee_name":"Cedric Kelly","employee_salary":"433060","employee_age":"22","profile_image":""},{"id":"5","employee_name":"Airi Satou","employee_salary":"162700","employee_age":"33","profile_image":""},{"id":"6","employee_name":"Brielle Williamson","employee_salary":"372000","employee_age":"61","profile_image":""},{"id":"7","employee_name":"Herrod Chandler","employee_salary":"137500","employee_age":"59","profile_image":""},{"id":"8","employee_name":"Rhona Davidson","employee_salary":"327900","employee_age":"55","profile_image":""},{"id":"9","employee_name":"Colleen Hurst","employee_salary":"205500","employee_age":"39","profile_image":""},{"id":"10","employee_name":"Sonya Frost","employee_salary":"103600","employee_age":"23","profile_image":""}]

app.get('/api/getemployeedetails', authenticateUser, (req, res) =>{
    res.json(employeeDetails)
})


app.post('/api/login', urlencodedParser, async (req, res) => {
    const { email, password} =  req.body;
    console.log(email +"  "+ password);
   
    const userCheck = dummyUser.find(user => user.username === email )
    if(userCheck == null  )  res.sendStatus(401);
    try {
        if (await bcrypt.compare(password, userCheck.password)) {
            const user = { email}
            const access_token = jwt.sign({user}, process.env.Token_SECRET_KEY, {expiresIn:'2m'})
            res.json({access_token})
        }else{
            res.sendStatus(403);
        }
    }catch{
        res.sendStatus(403);
    }
})

app.post('/api/registration', urlencodedParser, async (req, res) => {
    const { email, password} =  req.body;
   
     const userExist = dummyUser.find(user => user.username === email )

  if(userExist == null){
      const hashedPassword = await bcrypt.hash(password, 10);
      dummyUser.push({
        id: Date.now().toString(),
        username: email,
        password: hashedPassword
    })

    res.json({msg: 'user Registered'})

  }else{
    res.sendStatus(409);
  }
    
   
})

function authenticateUser(req, res, next){
    const headers = req.headers['authorization'];
    const token = headers.split(' ')[1];

    if(token === null) return res.sendStatus(401);

    jwt.verify(token, process.env.Token_SECRET_KEY, (err, user) => {
        if(err) return res.sendStatus(403);

        req.user = user;
        next();
    })
}

app.listen(5000, () => console.log('server running.....'))