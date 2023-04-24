const QRQuestion = require("../models/qr_questions");

exports.createQRQuestion = async (req, res) => {
  try {
    const { product_id, question, input_text, checkbox, vendor_question, work_id, step_id, user_id, timestamp } = req.body;
    const newQRQuestion = await QRQuestion.create(product_id, question, input_text, checkbox, vendor_question, work_id, step_id, user_id, timestamp);
    res.status(201).send({ message: "QRQuestion created successfully", qr_question: newQRQuestion });
  } catch (error) {
    console.error("Error in createQRQuestion:", error);
    res.status(500).send({ message: "Error creating QRQuestion", error: error.message });
  }
};

exports.getQRQuestionsByProductId = async (req, res) => {
  try {
    const productId = req.params.product_id;
    const qr_questions = await QRQuestion.findByProductId(productId);
    res.status(200).send({ data: qr_questions });
  } catch (error) {
    res.status(500).send({ message: "Error retrieving QRQuestions by Product ID", error: error.message });
  }
};

exports.getQRQuestionsByWorkId = async (req, res) => {
  try {
    const workId = req.params.work_id;
    const qr_questions = await QRQuestion.findByWorkId(workId);
    res.status(200).send({ data: qr_questions });
  } catch (error) {
    res.status(500).send({ message: "Error retrieving QRQuestions by Work ID", error: error.message });
  }
};