const User = require('../models/users')

// signIn User
const signIn = (req,res) => {
  if(!req.body.username || !req.body.password){
    return res.status(404).send({
      message: "Invalid Username or Password!"
    })
  }else{
    username = req.body.username
    password = req.body.password
    User.findOne({ username: username })
    .then((user) => {
      if(user.password === password){
        return res.status(200).send({message: 'User Found', user: user})
      }else{
        return res.status(400).send({message: 'Incorrect Password'})
      }
    })
    .catch((err) => {
      return res.status(404).send({message: err})
    });
  }
}

// signUp User
const signUp = (req,res) => {
  if(!req.body.username || !req.body.password){
    return res.status(404).send({message: 'Required username or password'})
  }else{
    username = req.body.username
    password = req.body.password
    const user = new User({username: username, password: password})
    user.save()
    .then((savedUser)=>{
      return res.status(200).send({message: "User Created", user: savedUser })
    }).catch(err => {
        console.log(err)
        return res.status(400).send({message: err})
    })
  }
}

const helloWorld = (req,res) => {
  const link = "https://github.com/lanchiagrawal111/node_sleep_app/blob/main/README.md";
  res.send(`<p>This is an API. Read the documentation <a href="${link}" style="color: blue;">here</a>.</p>`);
}


module.exports = {
  signIn,
  signUp,
  helloWorld
}