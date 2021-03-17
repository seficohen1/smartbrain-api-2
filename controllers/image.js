const Clarifai = require('clarifai')


const app = new Clarifai.App({
 apiKey: '439164b768da489f9dfa78c04cd9e4d4'
});


const handleApi = (req, res) => {
  app.models
    .predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
    .then(data => {
      res.json(data)
    })
    .catch(err => res.status(400).json('unable to work with API'))

}




const handleImage = (req, res, db) => {

  const { id } = req.body;
  db.select('*').from('users').where('id', '=', id).increment('entries', 1)
  .returning('entries')
  .then(entries => {
    res.json(entries[0])
  })
  .catch(err => res.status(400).json('unable to load entries'))

}

module.exports = {
  handleImage: handleImage,
  handleApi: handleApi

}
