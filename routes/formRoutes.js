const express = require('express');
const { createForm, getForms, getFormById, submitFeedback, incrementViewCount, updateForm, deleteForm } = require('../controllers/formController');

const router = express.Router();

router.route('/')
    .post(createForm)
    .get(getForms);

router.route('/:id')
    .get(getFormById)
    .put(updateForm)
    .delete(deleteForm);

router.route('/:id/submit')
    .post(submitFeedback);

router.route('/:id/view')
    .post(incrementViewCount);

module.exports = router;
