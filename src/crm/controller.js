const mongoose = require("mongoose");
const ContactSchema = require("./model");

const Contact = mongoose.model("Contact", ContactSchema);

const addNewContact = (req, res) => {
  let newContact = new Contact(req.body);
  newContact.save((err, contact) => {
    if (err) {
      res.send(err);
    }
    res.json(contact);
  });
};

const getAllContacts = (req, res) => {
  Contact.find({}, (err, contact) => {
    if (err) {
      res.send(err);
    }
    res.json({
      count: contact.length,
      data: contact,
    });
  });
};

const getContactById = (req, res) => {
  Contact.findById(req.params.contactId, (err, contact) => {
    if (err) {
      res.send(err);
    }
    res.send(contact);
  });
};

const updateContact = (req, res) => {
  Contact.findByIdAndUpdate(
    { _id: req.params.contactId },
    req.body,
    { new: true },
    (err, contact) => {
      if (err) {
        res.send(err);
      }
      res.send(contact);
    }
  );
};

const deleteContact = (req, res) => {
  Contact.remove({ _id: req.params.contactId }, (err, contact) => {
    if (err) {
      res.send(err);
    }
    res.send({ message: "the contact has been successfully deleted" });
  });
};

module.exports = {
  addNewContact,
  getAllContacts,
  getContactById,
  updateContact,
  deleteContact,
};
