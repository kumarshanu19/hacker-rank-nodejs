var recipes = require('../recipes.json');
var router = require('express').Router();


router.get('/shopping-list', async (req, res) => {
  const ids = req.query.ids
  if (ids === undefined || ids === null) {
    return res.status(400).json()
  }

  var matchIds = ids.split(',').map(Number);
  if (matchIds) {
    for (const i of matchIds) {
      if (isNaN(i) === true) {
        return res.status(404).send('NOT_FOUND')
      }
    }
  }

  var matchedIds = []
  for (let i = 0; i < matchIds.length; i++) {
    var idsData = recipes.find(x => x.id === matchIds[i])
    for (let i = 0; i < idsData?.ingredients.length; i++) {
      matchedIds.push(idsData?.ingredients[i])
    }
  }
  return res.status(200).json(matchedIds)
})
module.exports = router;

