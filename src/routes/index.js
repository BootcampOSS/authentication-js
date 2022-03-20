const router = require('express').Router();

const application = require('../../package');

/* GET home page. */
router.get('/', async (req, res) => {
  const { name, version, description } = application;
  return res.status(200).json({ name, version, description });
});

module.exports = router;
