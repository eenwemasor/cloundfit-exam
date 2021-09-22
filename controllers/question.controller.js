const models = require("../models");
const Validator = require("fastest-validator");

const QuestionsSchema = {
  body: { type: "string", optional: false, maxLength: "1000" },
  options: { type: "array", optional: true },
  CategoryId: { type: "number", optional: false },
};

const index = (req, res) => {
  models.Category.findAll({
    include: [{ model: models.Question }],
  })
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

const question = (req, res) => {
  models.Question.findAll({
    include: "options",
  })
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
  const { body, CategoryId, options } = req.body;
  const question = {
    body,
    options,
    CategoryId,
  };

  const v = new Validator();
  const vRes = v.validate(question, QuestionsSchema);

  if (vRes !== true) {
    res.status(400).json({
      message: "invalid data",
      error: vRes,
    });
  }

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
  let QuestionId = req.params.questionId;
  const { body, CategoryId } = req.body;
  const question = {
    body,
    CategoryId,
  };

  const v = new Validator();
  const vRes = v.validate(question, QuestionsSchema);

  if (vRes !== true) {
    res.status(400).json({
      message: "invalid data",
      error: vRes,
    });
  }

  models.Question.update(question, { where: { id: QuestionId } })
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
  let QuestionId = req.params.questionId;
  models.Question.destroy({ where: { id: QuestionId } })
    .then(async () => {
      await destroyQuestionOptions(QuestionId);
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
  const { QuestionId, value, isTheAnswer } = req.body;
  const option = {
    QuestionId,
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

const saveQuestionOptions = async (QuestionID, options) => {
  const saveOptions = [];
  options.map(async (option) => {
    option.QuestionId = QuestionID;
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

const destroyQuestionOptions = async (QuestionId) => {
  await models.QuestionOption.destroy({ where: { questionId: QuestionId } });
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
  question,
  save,
  saveQuestionOption,
  updateQuestionOption,
  destroyQuestionOption,
  show,
  update,
  destroy,
};
