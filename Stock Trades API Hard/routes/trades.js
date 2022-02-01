const express = require('express');
const router = express.Router();
const controller = require('../controllers/trades')

/* GET home page. */

router.post('/',  controller.createTrades);
router.get('/',  controller.getTrades);
router.get('/:id',  controller.getTradesById);
router.put('/:id',  controller.NotAllowed);
router.patch('/:id',  controller.NotAllowed);
router.delete('/:id',  controller.NotAllowed);



module.exports = router;
