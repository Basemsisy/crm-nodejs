const {
  addNewContact,
  getAllContacts,
  getContactById,
  updateContact,
  deleteContact,
} = require("./controller");

const { login, register, loginRequired } = require("../user/controller");

const crmRouter = (app) => {
  app
    .route("/contact")

    // get all contacts
    .get(loginRequired, getAllContacts)

    // create a new contact
    .post(loginRequired, addNewContact);

  app
    .route("/contact/:contactId")

    // get contact by id
    .get(loginRequired, getContactById)

    // update contact
    .put(loginRequired, updateContact)

    // delete contact
    .delete(loginRequired, deleteContact);

  app.route("/signin").post(login);

  app.route("/signup").post(register);
};

module.exports = crmRouter;
