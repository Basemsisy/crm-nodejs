const contactController = require("./controller");

const {
  addNewContact,
  getAllContacts,
  getContactById,
  updateContact,
  deleteContact,
} = contactController;

const crmRouter = (app) => {
  app
    .route("/contact")

    // get all contacts
    .get(getAllContacts)

    // create a new contact
    .post(addNewContact);

  app
    .route("/contact/:contactId")

    // get contact by id
    .get(getContactById)

    // update contact
    .put(updateContact)

    // delete contact
    .delete(deleteContact);
};

module.exports = crmRouter;
