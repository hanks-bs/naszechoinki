import { db } from "../dataBase/connection.js";

class SeedlingsAccess {
  async Get() {
    try {
      const item = await db("seedlings").select("*");
      console.log(item[0])
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

  async Items_Upload() {
    return res.status(200).json(req.headers);
  }

  async Items_Update() {
    return res.status(200).json(req.headers);
  }

  async Items_Delete() {
    return res.status(200).json(req.headers);
  }
}

export default new SeedlingsAccess();
