const express = require('express');

const questionController = require('../controllers/question.controller')


const router = express.Router();

router.get('/', questionController.index);
router.get('/question', questionController.question);
router.post('/create', questionController.save);
router.put('/update/:questionId', questionController.update);
router.delete('/destroy/:questionId', questionController.destroy);
router.post('/options/create', questionController.saveQuestionOption);
router.put('/options/update/:id', questionController.updateQuestionOption);
router.delete('/options/destroy/:id', questionController.destroyQuestionOption);
router.get('/show/:id', questionController.show);

 module.exports = router;