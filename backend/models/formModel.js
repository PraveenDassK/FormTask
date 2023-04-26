const mongoose = require("mongoose");
const formSchema = mongoose.Schema(
  {
    name: { type: "string", required: true },
    email: { type: "string", required: true },
    age: { type: "number", required: true },
    phone: { type: "number", required: true },
    department: { type: "string", required: true },
  },
  { timeStamps: true }
);

const FormModel = mongoose.model("Form", formSchema);

module.exports = FormModel;
