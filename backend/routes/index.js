const express = require('express');
const router = express.Router();

router.get('/test',(req,res) => {
  res.status(200).send({
    message: "First testing route point for test"
  })
})

module.exports = router;