import SeedlingsAccess from "../dbAccess/seedlingsAccess.js";
import Validator from "validatorjs";
import crypto from "crypto";
import { db } from "../dataBase/connection.js";

class SeedlingsService {
  async Get() {
    const response = await SeedlingsAccess.Get();
    return response;
  }

  async SingleItem_Get(id) {
    const response = await SeedlingsAccess.SingleItem_Get(id);
    return response;
  }

  async Items_Get() {
    const response = await SeedlingsAccess.Items_Get();
    return response;
  }

  async Items_Upload(data, file) {
    const {
      pl_name,
      eng_name,
      pl_others,
      eng_others,
      age,
      pl_price,
      eng_price,
      token,
    } = data;

    let errors = {};
    const max_size = 5242880; // 5 mb

    if (file) {
      const size = file.size;
      file.originalname =
        crypto.randomBytes(16).toString("hex") +
        `.${file.mimetype.split("/")[1]}`;
      const type = ["image/png", "image/jpeg", "image/jpg"];
      if (type.indexOf(file.mimetype) < 0) errors.type = true;
      if (size > max_size) errors.size = true;
    } else {
      errors.noFile = true;
    }

    const minLength = 3;
    const maxLength = 40;

    const validation = new Validator(
      {
        pl_name: pl_name,
        eng_name: eng_name,
        pl_others: pl_others,
        eng_others: eng_others,
        age: age,
        pl_price: pl_price,
        eng_price: eng_price,
        image: file,
      },
      {
        pl_name: `required|min:${minLength}|max:${maxLength}`,
        eng_name: `required|min:${minLength}|max:${maxLength}`,
        pl_others: `max:50`,
        eng_others: `max:50`,
        age: `required`,
        pl_price: `required`,
        eng_price: `required`,
        image: `required`,
      },
      {
        required: { string: "To pole jest wymagane" },
        min: { string: `Minimalna ilość znaków to: :min` },
        max: { string: `Maksymalna ilość znaków to: :max` },
      }
    );

    validation.checkAsync(undefined, () => {
      errors = Object.assign(errors, validation.errors.errors);
      return;
    });
    const path = `/uploads/images/${file.filename}`;
    if (validation.fails() || Object.keys(errors).length > 0) return {errors};
    const response = await SeedlingsAccess.Items_Upload(data, path);

    
    
    //Tutaj walidacja danych z formularza (data)

    return response;
  }

  async Items_Update(id, data, file) {
    const errors = {}
    if(data.pl_name) {var plExists = await db('seedlings_items').select("*").where("title_pl", data.pl_name);}
    if(data.eng_name) {var enExists = await db('seedlings_items').select("*").where("title_en", data.eng_name);}

    if(plExists && plExists.length) errors.plExists = true;
    if(enExists && enExists.length) errors.enExists = true;

    if(Object.keys(errors).length) return {errors};
      const max_size = 5242880; // 5 mb
    if (file) {
      const size = file.size;
      file.originalname =
        crypto.randomBytes(16).toString("hex") +
        `.${file.mimetype.split("/")[1]}`;
      const type = ["image/png", "image/jpeg", "image/jpg"];
      if (type.indexOf(file.mimetype) < 0) errors.type = true;
      if (size > max_size) errors.size = true;
      const path =  `/uploads/images/${file.filename}`;
      const response =  await SeedlingsAccess.Items_Update(id, data, path);
      return response;
    }
      const response =  await SeedlingsAccess.Items_Update(id, data);
      return response;
  }

  async Items_Delete(id) {
    const _exist = await db('seedlings_items').select("*").where("id", id);
    if(!_exist.length) return {errors: {NotExist: true}};
    const response = await SeedlingsAccess.Items_Delete(id);

    return response;
  }
  async Contact(data) {
    const errors = {};
    (!data.firstname) ? errors.firstnameError = true : null;
    (!data.lastname) ? errors.lastnameError = true : null;
    (!data.email) ? errors.emailError = true : null;
    (!data.phone) ? errors.phoneError = true : null;
    (!data.adress) ? errors.adressError = true : null;
    (!data.postcode) ? errors.postCodeError = true : null;
    (!data.city) ? errors.cityError = true : null;
    (!data.message) ? errors.messageError = true : null;

    if(errors && Object.keys(errors).length !== 0) return errors;

    const response = await SeedlingsAccess.Contact(data);

    return response;

  }
}

export default new SeedlingsService();
