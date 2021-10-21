import { db } from "./../dataBase/connection.js";
import * as fs from 'fs';

class PricelistAccess {
  async GetItems() {
    try {
      const items = await db("pricelist_items").select("*");
      return items;
    } catch (error) {
      console.log(error);
      return {error};
    }
  }
  async DeleteItem(id, path) {
    try {
      const deleteItem = await db("pricelist_items").del().where("id", id);
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
      const AddItem = await db("pricelist_items").insert({
        title_pl: data.title_pl,
        title_en: data.title_en,
        heights: data.heights,
        description_pl: data.description_pl,
        description_en: data.description_en,
        additional_info_pl: data.additional_info_pl,
        additional_info_en: data.additional_info_en,
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
      const item = await db("pricelist_items").select("*").where("id", id);
      return item[0];
    return 
    } catch (error) {
      console.log(error);
      return { error };
    }
    
  }

  async Items_Update(id, data, path) {
    try {
      const path_toDel = await db("pricelist_items").select("image_link").where("id", id);
      const item = await db("pricelist_items").select("*").where("id", id).update(data);
      fs.unlink(path_toDel[0].image_link, function(err){
        if(err) return {error: err};
      });
      return true;
    } catch (error) {
      console.log(error);
      return { error };
    }
    
  }
}

export default new PricelistAccess();
