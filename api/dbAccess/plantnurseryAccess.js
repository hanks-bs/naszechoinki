import { db } from "./../dataBase/connection.js";
import * as fs from "fs";

class PlantNurseryAccess {
  async GetItems() {
    try {
      const items = await db("plant_nursery_items").select("*");
      return items;
    } catch (error) {
      console.log(error);
      return { error };
    }
  }

  async DeleteItem(id, path) {
    try {
      const deleteItem = await db("plant_nursery_items").del().where("id", id);
      fs.unlink(path, function(err){
        if(err) return {error: err};
      });
      return true;
    } catch (error) {
      console.log(error);
      return { error };
    }
  }

  async AddItem(data, path) {
    try {
      const AddItem = await db("plant_nursery_items").insert({
        title_pl: data.title_pl,
        title_en: data.title_en,
        description_pl: data.description_pl,
        description_en: data.description_en,
        image_link: path,
      });
      return true;
    } catch (error) {
      console.log(error);
      return { error };
    }
  }

  async SingleItem_Get(id) {
    try {
      const item = await db("plant_nursery_items").select("*").where("id", id);
      return item[0];
      return;
    } catch (error) {
      console.log(error);
      return { error };
    }
  }

  async Items_Update(id, data) {
    try {
      const _update = await db("plant_nursery_items").select("image_link").where("id", id);
      if (!_update.length) return { errors: { notExists: true } };
      const path_unlink = _update[0].image_link;
      if(data.image_link)
      {
        fs.unlink(path_unlink, function (err) {
          if (err) return { error: err };
        });
      }
     
      const item = await db("plant_nursery_items")
        .select("*")
        .where("id", id)
        .update(data);

      return true;
    } catch (error) {
      console.log(error);
      return { error };
    }
  }

  async AddFile(data, path) {
    try {
      const AddItem = await db("files_download").insert({
        title_pl: data.title_pl,
        title_en: data.title_en,
        src: path,
      });
      return true;
    } catch (error) {
      console.log(error);
      return { error };
    }
  }

  async RemoveFile(id, path) {
    try {
      const deleteItem = await db("files_download").del().where("id", id);
      fs.unlink("./public" + path, function (err) {
        if (err) return { error: err };
      });
      return true;
    } catch (error) {
      console.log(error);
      return { error };
    }
  }

  async GetFiles() {
    try {
      const items = await db("files_download").select("*");
      return items;
    } catch (error) {
      console.log(error);
      return { error };
    }
  }
}

export default new PlantNurseryAccess();
