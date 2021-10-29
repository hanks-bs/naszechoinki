import { db } from "./../dataBase/connection.js";
import * as fs from "fs";

class GalleryAccess {
  async GetImages() {
    try {
      const items = await db("gallery_items").select("*");
      return items;
    } catch (error) {
      console.log(error);
      return { error };
    }
  }

  async GetSingleImage(id) {
    try {
      const item = await db("gallery_items").select("*").where("id", id);
      return item[0];
      return;
    } catch (error) {
      console.log(error);
      return { error };
    }
  }

  async UploadImage(formData) {
    try {
      const AddItem = await db("gallery_items").insert(formData);
      return true;
    } catch (error) {
      console.log(error);
      return { error };
    }
  }

  async UpdateImage(id, data) {
    try {
      const _update = await db("gallery_items")
        .select("src")
        .where("id", id);
      if (!_update.length) return { errors: { notExists: true } };
      const path_unlink = _update[0].src;
      if(data.src)
      {
        fs.unlink(path_unlink, function (err) {
          if (err) return { error: err };
        });
      }
     
      const item = await db("gallery_items")
        .select("*")
        .where("id", id)
        .update(data);
      return true;
    } catch (error) {
      console.log(error);
      return { error };
    }
  }

  async DeleteImage(id, path) {
    try {
      fs.unlink(path, function (err) {
        if (err) return { error: err };
      });
      const deleteItem = await db("gallery_items").del().where("id", id);

      return true;
    } catch (error) {
      console.log(error);
      return { error };
    }
  }
}

export default new GalleryAccess();
