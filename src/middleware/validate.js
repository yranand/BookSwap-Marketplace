module.exports = (schema) => async (req, res, next) => {
  try {
    await schema.validateAsync({ body: req.body, params: req.params, query: req.query }, { abortEarly: false });
    next();
  } catch (err) {
    res.status(400).json({ message: 'Validation error', details: err.details?.map(d => d.message) });
  }
};
