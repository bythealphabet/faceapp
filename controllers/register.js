 const handleRegister = (req, res, pool, bcrypt)=>{
		(async () => {
		const {email, name, password} = req.body
		if(!email || !name || !password){
			return res.status(400).json('incorrect form submission')
		}
		const hash = bcrypt.hashSync(password)
	  	const client = await pool.connect()
		  try {
		    await client.query('BEGIN')

		    const insertLogin = {
		      text: 'INSERT INTO login(email, hash) VALUES($1, $2) RETURNING id',
		      values: [email, hash],
		    }
		    const {rows} = await client.query(insertLogin)

		    const insertUser = {
		      text: 'INSERT INTO users(id, name, email, joined) VALUES ($1, $2, $3, $4) RETURNING *',
		      values: [rows[0].id, name, email, new Date()],
		    }
		    const userData = await client.query(insertUser)
			await res.json(userData.rows[0])

			console.log(userData.rows[0])
		    await client.query('COMMIT')
		  } catch (e) {
		    await client.query('ROLLBACK')
		    throw e
		  } finally {
		    client.release()
		  }
		})().catch(e => console.error(e.stack))
	}

module.exports = {
	handleRegister: handleRegister
}