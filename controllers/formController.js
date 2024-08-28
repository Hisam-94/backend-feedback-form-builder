const Form = require('../models/formModel');

// @desc    Create new feedback form
// @route   POST /api/forms
// @access  Public
const createForm = async (req, res) => {
    try {
        const { title, fields, logic } = req.body;
        const newForm = new Form({
            title,
            fields,
            logic,
        });
        const savedForm = await newForm.save();
        res.status(201).json(savedForm);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get all feedback forms
// @route   GET /api/forms
// @access  Public
const getForms = async (req, res) => {
    try {
        const forms = await Form.find();
        res.status(200).json(forms);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get single form details
// @route   GET /api/forms/:id
// @access  Public
const getFormById = async (req, res) => {
    try {
        const form = await Form.findById(req.params.id);
        if (!form) {
            return res.status(404).json({ message: 'Form not found' });
        }
        res.status(200).json(form);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateForm = async (req, res) => {
  try {
      const form = await Form.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!form) {
          return res.status(404).json({ message: 'Form not found' });
      }
      res.status(200).json(form);
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
};

const deleteForm = async (req, res) => {
  try {
      const form = await Form.findByIdAndDelete(req.params.id);
      if (!form) {
          return res.status(404).json({ message: 'Form not found' });
      }
      res.status(200).json({ message: 'Form deleted successfully' });
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
};



// @desc    Submit feedback for a form
// @route   POST /api/forms/:id/submit
// @access  Public
const submitFeedback = async (req, res) => {
    try {
        const form = await Form.findById(req.params.id);
        if (!form) {
            return res.status(404).json({ message: 'Form not found' });
        }
        form.submissions += 1;
        await form.save();
        res.status(200).json({ message: 'Feedback submitted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Increment form view count
// @route   POST /api/forms/:id/view
// @access  Public
const incrementViewCount = async (req, res) => {
    try {
        const form = await Form.findById(req.params.id);
        if (!form) {
            return res.status(404).json({ message: 'Form not found' });
        }
        form.views += 1;
        await form.save();
        res.status(200).json({ message: 'View count incremented' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    createForm,
    getForms,
    getFormById,
    updateForm,
    deleteForm,
    submitFeedback,
    incrementViewCount,
};
