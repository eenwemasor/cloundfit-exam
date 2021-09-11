const models = require("../models");

const index = (req, res) => {
  res.send([]);
};

const save = (req, res) => {
  const { name } = req.body;
  const question = {
    name,
  };
  models.Category.create(question)
    .then((result) => {
      res.status(201).json({
        message: "category created successfully",
        data: result,
      });
    })
    .catch((error) => {
      res.status(500).json({
        message: "error creating category",
        error: error,
      });
    });
};


const update = (req, res) => {
  const categoryId = req.params.id;
  const { name } = req.body;
  const question = {
    name,
  };
  models.Category.update(question, {where: {id: categoryId}})
    .then((result) => {
      res.status(201).json({
        message: "category updated successfully",
        data: result,
      });
    })
    .catch((error) => {
      res.status(500).json({
        message: "error updating category",
        error: error,
      });
    });
};

const destroy = (req, res) => {
  const categoryId =req.params.id
  models.Category.destroy({where:{id:categoryId}})
    .then((result) => {
      res.status(201).json({
        message: "category deleted successfully",
        data: result,
      });
    })
    .catch((error) => {
      res.status(500).json({
        message: "error deleting category",
        error: error,
      });
    });
};

module.exports = {
  index,
  save,
  destroy,
  update,
};
