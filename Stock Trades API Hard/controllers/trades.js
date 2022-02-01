const Model = require('../models/trades');
var parse = require('url-parse');
const url = require('url');

module.exports = {

  createTrades: async (req, res, next) => {
    try {
      const data = req.body;
      if (typeof req.body == undefined && req.body == null) return res.status(400).send();

      if (!(data.shares >= 1 && data.shares <= 100)) return res.status(400).send();
      if (!(data.type === 'buy' || data.type === 'sell')) return res.status(400).send();

      let tradeCount = 0;
      const listCount = await Model.countDocuments({});

      tradeCount = listCount
      const newData = {
        id: tradeCount + 1,
        type: req.body.type,
        user_id: req.body.user_id,
        symbol: req.body.symbol,
        shares: req.body.shares,
        price: req.body.price,
        timestamp: req.body.timestamp
      }
      const trade = new Model(newData)
      const savedModel = await trade.save()
      if (savedModel) {
        res.status(201).send(newData);
      } else {
        res.status(400).send();
      }
    } catch (error) {
      res.status(500).json({ success: false, msg: error });

    }
  },
  getTrades: async (req, res, next) => {
    try {
      let query = req.query ? { ...req.query } : {};
      let list = [];
      list = await Model.find(query, { __v: 0, _id: 0 });
      if (list) {
        res.status(200).send(list);
      } else {
        res.status(400).send(list);

      }
    } catch (error) {
      res.status(500).send();
    }
  },
  getTradesById: async (req, res) => {
    const id = req.params.id
    var list = {}
    list = await Model.findOne({
      id
    })
      .select('-_id -__v')
    if (list) {
      res.status(200).send(list)
    } else {
      res.status(404).send('ID not found')
    }
  },
  NotAllowed: (req, res) => {
    res.status(405).send();
  }


}