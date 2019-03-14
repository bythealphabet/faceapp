const clarifai = require('clarifai')

const app = new Clarifai.App({
 apiKey: '21bd1d40130d4cab94aa43a7962db2d0'
});

const handleApiCall = (req, res)=>{
	app.models
	.predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
	.then(data => {
		res.json(data)
	})
	.catch(err => res.status(400).json('unable to work with data'))
}


const handleImage = (req, res, db)=>{
	const { id } = req.body

	const updateEntriesQuery = {
    text: 'UPDATE users SET entries = entries + 1 WHERE id = $1 RETURNING entries',
    values: [id] ,
  	};

	db.query(updateEntriesQuery)
	.then(data=>{
		res.json(data.rows[0].entries)
	})
	.catch(err =>{
		res.status(400).json('unable to get entries')
	})
}

module.exports = {
	handleImage: handleImage,
	handleApiCall: handleApiCall
}