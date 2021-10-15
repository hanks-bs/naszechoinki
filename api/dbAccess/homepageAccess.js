import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "mail41.mydevil.net",
  port: 587,
  secure: false, //zmienić w produkcji na true
  auth: {
    user: "contactform@hanks.usermd.net",
    pass: "P6D9QMFRq82pLEf",
  },
});

class ContactAccess {
  async Contact(data) {
    try {
      let message = ``;
      message += `<b>Imię</b>: ${data.firstname} <br>
        <b>Nazwisko</b>:${data.lastname} <br>
        <b>Email</b>:${data.email} <br>`;
      message += `<b>Treść wiadomości</b>: ${data.message} <br>`;
      const info = await transporter.sendMail({
        from: '"Formularz kontaktowy Strona Główna" <contactform@hanks.usermd.net>',
        to: "wpmasmix0@gmail.com",
        subject: "Kontakt",
        html: message,
      });
      return true;
    } catch (error) {
      console.log(error);
      return error;
    }
  }
}
export default new ContactAccess();
