const FormModel = require("../models/formModel");

exports.add = async function (req, res) {
  try {
    const { name, email, age, phone, department } = req.body;
    if (!name) return res.status(400).send("name is required");
    if (!email) return res.status(400).send("email is required");
    if (!age) return res.status(400).send("age is required");
    if (!phone) return res.status(400).send("phone is required");
    if (!department) return res.status(400).send("department is required");
    const response = await FormModel.create({
      name,
      email,
      age,
      phone,
      department,
    });
    return res.status(200).send(response);
  } catch (err) {
    return res.status(500).send(err.message);
  }
};

exports.read = async function (req, res) {
  try {
    const data = await FormModel.find();
    if (!data) return res.status(400).send("No data found");
    return res.status(200).send(data);
  } catch (err) {
    return res.status(500).send(err.message);
  }
};

exports.edit = async function (req, res) {
  try {
    const id = req.params.id;
    if (!id) return res.status(400).send("id is required");
    const data = await FormModel.updateOne({ _id: id }, req.body, {
      new: true,
    });
    return res.status(200).send(data);
  } catch (err) {
    return res.status(500).send(err.message);
  }
};
exports.delete = async function (req, res) {
  try {
    const id = req.params.id;
    if (!id) return res.status(400).send("id is required");
    const data = await FormModel.findByIdAndDelete({ _id: id });
    return res.status(200).send(data);
  } catch (err) {
    return res.status(500).send(err.message);
  }
};
