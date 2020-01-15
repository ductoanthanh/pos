const Variant = require("../models/variant");
const Food = require("../models/food");
const { normalizeErrors } = require("../helpers/mongoose");

exports.createVariant = (req, res) => {
  const { title, addOnPrice, itemID } = req.body;

  const variant = new Variant({ title, addOnPrice, itemID });

  Variant.create(variant, (err, newVariant) => {
    if (err) {
      return res.status(422).send({ errors: normalizeErrors(err.errors) });
    }
    Food.findById(itemID)
      .populate("variants")
      .exec((err, foundFood) => {
        if (err) {
          console.log(err);
        }

        foundFood.variants.push(newVariant._id);
        foundFood.save();
      });
    return res.json(newVariant);
  });
};
