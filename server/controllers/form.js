const Form = require("../models/form");
const FormSubstep = require("../models/form_substep");
const { FIXED_STEPS } = require("../utils/fixedsteps");
const Product = require('../models/product');
const Vendor = require('../models/vendor');

exports.createForm = async (req, res) => {
  try {
    const { product_id, vendor_id, steps } = req.body;

    const newForm = await Form.create(product_id, vendor_id);

    for (const fixedStep of FIXED_STEPS) {
      const step = steps.find(step => step.name === fixedStep.name);
      if (step) {
        for (const substep of step.substeps) {
          await FormSubstep.create(
            newForm.id,
            fixedStep.name,
            substep.name,
            substep.technical_drawing_numbering,
            substep.tools,
            substep.description,
            substep.actual_dimension,
            substep.lower_tolerance,
            substep.upper_tolerance,
            substep.example_visual_url,
            substep.status,
            substep.type
          );
        }
      } else {
        throw new Error(`Unable to find a matching step for fixed step: ${fixedStep.name}`);
      }
    }
    res.status(201).send({ message: "Form successfully created", form: newForm });
  } catch (error) {
    res.status(500).send({ message: "Error creating form", error: error.message });
  }
};


exports.getFormTable = async (req, res) => {
  try {
    const forms = await Form.getAll();
    res.status(200).send({ data: forms });
  } catch (error) {
    res.status(500).send({ message: "Error retrieving forms", error: error.message });
  }
};

exports.getForm = async (req, res) => {
  try {
    const formId = req.params.id;
    const form = await Form.findById(formId);

    if (!form) {
      res.status(404).send({ message: "Form not found" });
      return;
    }
    const product = await Product.findById(form.product_id);
    const vendor = await Vendor.findById(form.vendor_id);
    res.status(200).send({
      form: {
        ...form,
        product_name: product.name, 
        vendor_name: vendor.name, 
      },
    });
  } catch (error) {
    res.status(500).send({ message: 'Error retrieving form', error: error.message });
  }
};

exports.updateMultipleSubsteps = async (req, res) => {
  try {
    const substeps = req.body.substeps;
    
    for (const substep of substeps) {
      const {
        id,
        step_name,
        name,
        technical_drawing_numbering,
        tools,
        description,
        actual_dimension,
        lower_tolerance,
        upper_tolerance,
        example_visual_url,
        status,
        type,
      } = substep;

      await FormSubstep.update(
        id,
        step_name,
        name,
        technical_drawing_numbering,
        tools,
        description,
        actual_dimension,
        lower_tolerance,
        upper_tolerance,
        example_visual_url,
        status,
        type
      );
    }

    res.status(200).json({ message: "Substeps updated successfully" });
  } catch (error) {
    res.status(500).json({ error });
  }
};

exports.deleteFormSubstep = async (req, res) => {
  try {
    const { form_substep_id } = req.body;

    await FormSubstep.delete(form_substep_id);

    res.status(200).send({
      status: "success",
      message: "Form alt adımı başarıyla silindi.",
    });
  } catch (err) {
    console.error(err);
    res.status(500).send({
      status: "error",
      message: "Form alt adımı silinirken bir hata oluştu.",
    });
  }
};

exports.getAllForm = async (req, res) => {
  try {
    const formId = req.params.id;
    const form = await Form.findById(formId);

    if (!form) {
      res.status(404).send({ message: "Form not found" });
      return;
    }
    const product = await Product.findById(form.product_id);
    const vendor = await Vendor.findById(form.vendor_id);

    const formSubsteps = await FormSubstep.findAllByFormId(formId);
    const stepsWithSubsteps = FIXED_STEPS.map((fixedStep) => {
      return {
        ...fixedStep,
        substeps: formSubsteps.filter((substep) => substep.step_name === fixedStep.name),
      };
    });

    res.status(200).send({
      id: form.id,
      product_id: form.product_id,
      vendor_id: form.vendor_id,
      product_name: product.name,
      vendor_name: vendor.name,
      steps: stepsWithSubsteps,
    });
  } catch (error) {
    res.status(500).send({ message: 'Error retrieving form', error: error.message });
  }
};