import ContactAccess from "../dbAccess/homepageAccess.js";

class HomePageService {
  async Contact(data) {
    const errors = {};
    !data.firstname ? (errors.firstnameError = true) : null;
    !data.lastname ? (errors.lastnameError = true) : null;
    !data.email ? (errors.emailError = true) : null;
    !data.message ? (errors.messageError = true) : null;

    if (errors && Object.keys(errors).length !== 0) return errors;

    const response = await ContactAccess.Contact(data);

    return response;
  }
}

export default new HomePageService();
