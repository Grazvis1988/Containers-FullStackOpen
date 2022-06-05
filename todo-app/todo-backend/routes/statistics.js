const express = require('express');
const router = express.Router();
const redis = require('../redis')

router.get('/', async (req, res) => {
  const count = await redis.getAsync("added_todos")
  if (!count) {
    res.send({
      "added_todos": 0
    })
  } else {
    res.send({
      "added_todos": Number(count)
    })
  }
})

module.exports = router;
