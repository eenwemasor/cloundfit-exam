const models = require("../models");

const index = (req, res) => {
  models.Question.findAll()
    .then((result) => {
      res.status(200).json({
        data: result,
      });
    })
    .catch((error) => {
      res.status(500).json({
        error: error,
      });
    });
};

const save = (req, res) => {
  const { body, categoryId, options } = req.body;
  const question = {
    body,
    options,
    categoryId,
  };
  models.Question.create(question)
    .then(async (result) => {
      let savedOptions = [];
      if (options) {
        savedOptions = await saveQuestionOptions(result.id, options);
      }
      result.options = savedOptions;

      return result;
    })
    .then((result) => {
      res.status(201).json({
        message: "question created successfully",
        data: result,
      });
    })
    .catch((error) => {
      res.status(500).json({
        message: "error creating question",
        error: error,
      });
    });
};

const update = (req, res) => {
  let questionId = req.params.questionId;
  const { body, categoryId } = req.body;
  const question = {
    body,
    categoryId,
  };
  models.Question.update(question, { where: { id: questionId } })
    .then((status) => {
      res.status(201).json({
        message: "question updated successfully",
        data: question,
      });
    })
    .catch((error) => {
      res.status(500).json({
        message: "error updating question",
        error: error,
      });
    });
};

const destroy = (req, res) => {
  let questionId = req.params.questionId;

  models.Question.destroy({ where: { id: questionId } })
    .then(async () => {
      await destroyQuestionOptions(questionId);
      return true;
    })
    .then((status) => {
      res.status(201).json({
        message: "question deleted successfully",
      });
    })
    .catch((error) => {
      res.status(500).json({
        message: "error deleting question",
        error: error,
      });
    });
};

const saveQuestionOption = (req, res) => {
  const { questionId, value, isTheAnswer } = req.body;
  const option = {
    questionId,
    value,
    isTheAnswer,
  };
  models.QuestionOption.create(option)
    .then((result) => {
      res.status(201).json({
        message: "question option created successfully",
        data: result,
      });
    })
    .catch((error) => {
      res.status(500).json({
        message: "error creating question option",
        error: error,
      });
    });
};

const show = (req, res) => {
  const id = req.params.id;
  models.Question.findById(id)
    .then((result) => {
      res.status(200).json({
        data: result,
      });
    })
    .catch((error) => {
      res.status(500).json({
        error: error,
      });
    });
};

const saveQuestionOptions = async (questionID, options) => {
  const saveOptions = [];
  options.map(async (option) => {
    option.questionId = questionID;
    models.QuestionOption.create(option)
      .then((result) => {
        saveOptions.push(result);
      })
      .catch((error) => {
        console.log(error);
      });
  });

  return saveOptions;
};

const destroyQuestionOptions = async (questionId) => {
  await models.QuestionOption.destroy({ where: { questionId: questionId } });
};

// updates question option individually
const updateQuestionOption = (req, res) => {
  const id = req.params.id;
  const { value, isTheAnswer } = req.body;
  const option = {
    value,
    isTheAnswer,
  };
  models.QuestionOption.update(option, { where: { id: id } })
    .then((result) => {
      res.status(201).json({
        message: "question option updated successfully",
        data: result,
      });
    })
    .catch((error) => {
      res.status(500).json({
        message: "error updating question option",
        error: error,
      });
    });
};

// destroys the question option by id
const destroyQuestionOption = (req, res) => {
  const id = req.params.id;
  models.QuestionOption.destroy({ where: { id: id } })
    .then((status) => {
      res.status(201).json({
        message: "question option deleted successfully",
      });
    })
    .catch((error) => {
      res.status(500).json({
        message: "error deleting question option",
        error: error,
      });
    });
};

module.exports = {
  index,
  save,
  saveQuestionOption,
  updateQuestionOption,
  destroyQuestionOption,
  show,
  update,
  destroy,
};
