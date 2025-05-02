const express = require('express');
const {
  summaryController,
  paragraphController,
  chatbotController,
  jsconverterController,
  scifiImageController,
} = require('../controller/openaiController');

const router = express.Router();

router.post('/summary', summaryController);
router.post('/paragraph', paragraphController);
router.post('/chatbot', chatbotController);
router.post('/js-converter', jsconverterController);
router.post('/scifi-image', scifiImageController);

module.exports = router;