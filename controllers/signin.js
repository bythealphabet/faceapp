const handleSignin = (req, res, db, bcrypt)=>{
  const {email, password} = req.body

  if(!email || !password){
    return res.status(400).json('incorrect form submission')
  }
  
  const loginDataQuery = {
    text: 'SELECT email, hash FROM login WHERE email = $1',
    values: [email],
  };

  const getUserQuery = {
    text: 'SELECT * FROM users WHERE email = $1',
    values: [email],
  };

  db.query(loginDataQuery)
    .then(data =>{
      const isValid = bcrypt.compareSync(password, data.rows[0].hash)
      if (isValid) {
       return db.query(getUserQuery)
              .then(user=>{
                res.json(user.rows[0])
              })
              .catch(err => res.status(400).json('unable to get user'))
      }else{
        res.status(400).json('wrong password or username')
      }
    })
    .catch(err => res.status(400).json('wrong credentials'))
}

module.exports = {
	handleSignin: handleSignin
}