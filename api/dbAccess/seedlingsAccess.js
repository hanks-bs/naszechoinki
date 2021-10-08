import { db } from "../dataBase/connection.js";
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: "mail41.mydevil.net",
  port: 587,
  secure: false, //zmienić w produkcji na true
  auth: {
    user: "contactform@hanks.usermd.net",
    pass: "P6D9QMFRq82pLEf"
  },
});
class SeedlingsAccess {
  async Get() {
    try {
      const item = await db("seedlings").select("*");
      return item[0];
    } catch (error) {
      return console.log(error);
    }
  }

  async Upload() {
    return res.status(200).json(req.headers);
  }

  async SingleItem_Get(id) {
    try {
        const items = await db("seedlings_items").select("*").where('id', id);
        if(!items.length) return {error: true}
        return items;
      } catch (error) {
        return console.log(error);
      }
  }

  async Items_Get() {
    try {
      const items = await db("seedlings_items").select("*");
      if(!items.length) return {error: true}
      return items;
    } catch (error) {
      return console.log(error);
    }
  }

  async Items_Upload(data, path) {
    try {
      const errors = {}
      const plExist = await db('seedlings_items').select("*").where("title_pl", data.pl_name);
      const enExist = await db('seedlings_items').select("*").where("title_en", data.eng_name);
      if(plExist.length) errors.plExists = true;
      if(enExist.length) errors.enExists = true;
      if(Object.keys(errors).length) return {errors};
      const newItem = await db('seedlings_items')
        .insert({
            title_pl: data.pl_name,
            title_en: data.eng_name,
            age: data.age,
            price_pl: data.pl_price,
            price_en: data.eng_price,
            others_pl: data.pl_others,
            others_en: data.eng_others,
            image_link: path,
        });
       return true
    } catch (error) {
      return console.log(error);
    }
    return true;
  }

  async Items_Update(id, data, path) {
    const formData = {};
    if(data.pl_name) formData.title_pl = data.pl_name;
    if(data.eng_name) formData.title_en = data.eng_name;
    if(data.age) formData.age = data.age;
    if(data.pl_price) formData.price_pl = data.pl_price;
    if(data.eng_price) formData.price_en = data.eng_price;
    if(data.pl_others) formData.others_pl = data.pl_others;
    if(data.eng_others) formData.others_en = data.eng_others;
    if(path) formData.image_link = path;

    const _update = await db('seedlings_items').select("*").where('id', id);
    if(!_update.length) return {errors: {notExists: true}};
    const _updateItem = await db('seedlings_items').select("*").where('id', id).update(formData);
    return true;
  }

  async Items_Delete(id) {
    try {
      const _delete = await db('seedlings_items').del().where("id", id);
      return true;
    } catch (error) {
      return console.log(error);
    }
    
  }

  async Contact(data) {
    let message = ``;
    message += `<b>Imię</b>: ${data.firstname} <br>
    <b>Nazwisko</b>:${data.lastname} <br>
    <b>Email</b>:${data.email} <br>
    <b>Telefon</b>:${data.phone} <br>
    `;
    if(data.companyname) message += `<b>Nazwa firmy</b>: ${data.companyname} <br>`;
    if(data.nip) message += `<b>NIP</b>: ${data.nip} <br>`;
    message += `<b>Adres</b>: ${data.adress} <br>
    <b>Kod pocztowy</b>: ${data.postcode} <br>
    <b>Miejscowość</b>: ${data.city} <br>
    <b>Treść wiadomości</b>: ${data.message} <br>
    `
    const info = await transporter.sendMail({
      from: '"Formularz kontaktowy Sadzonki" <contactform@hanks.usermd.net>',
      to: "wpmasmix0@gmail.com",
      subject: "Zamówienie sadzonki",
      html: message,
    });



    return true
  }
}

export default new SeedlingsAccess();