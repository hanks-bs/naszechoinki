import PricelistAccess from "./../dbAccess/PricelistAccess.js";
import { db } from "./../dataBase/connection.js";
import crypto from "crypto";

class PricelistService {
  async GetItems() {
    try {
      const response = await PricelistAccess.GetItems();
      return response;
    } catch (error) {
      console.log(error);
      return res.status(500).json("Something went wrong");
    }
  }

  async DeleteItem(id) {
    try {
      const checkIfExist = await db("pricelist_items")
        .select("id")
        .where("id", id);
      if (checkIfExist.length <= 0) return { error: { notExist: true } };

      const response = await PricelistAccess.DeleteItem(id);
      return response;
    } catch (error) {
      console.log(error);
      return { error };
    }
  }

  async AddItem(data, file) {
    try {
      const errors = {};
      if (!data.title_pl) errors.title_pl = true;
      if (!data.title_en) errors.title_en = true;
      if (!data.heights) errors.heights = true;
      if (!data.description_pl) errors.description_pl = true;
      if (!data.description_en) errors.description_en = true;
      if (!file) errors.noFile = true;

      if (Object.keys(errors).length) return { errors };

      const plExist = await db("pricelist_items")
        .select("*")
        .where("title_pl", data.title_pl);
      const enExist = await db("pricelist_items")
        .select("*")
        .where("title_en", data.title_en);
      if (plExist.length) errors.plExists = true;
      if (enExist.length) errors.enExists = true;
      if (Object.keys(errors).length) return { errors };

      const max_size = 5242880; // 5 mb
      const size = file.size;
      file.originalname =
        crypto.randomBytes(16).toString("hex") +
        `.${file.mimetype.split("/")[1]}`;
      const type = ["image/png", "image/jpeg", "image/jpg"];
      if (type.indexOf(file.mimetype) < 0) errors.type = true;
      if (size > max_size) errors.size = true;
      const path = `/uploads/images/${file.filename}`;

      const response = await PricelistAccess.AddItem(data, path);
      return response;
    } catch (error) {
      console.log(error);
      return { error };
    }
  }

  async SingleItem_Get(id, data) {
    try {
      const checkIfExist = await db("pricelist_items")
        .select("id")
        .where("id", id);
      if (checkIfExist.length <= 0) return { error: { notExist: true } };

      const response = await PricelistAccess.SingleItem_Get(id, data);
      return response;
    } catch (error) {
      console.log(error);
      return { error };
    }
  }

  async Items_Update(id, data, file) {
    try {
      const formData = {};
      const errors = {};
      const checkIfExist = await db("pricelist_items")
        .select("id")
        .where("id", id);
      if (checkIfExist.length <= 0) return { error: { notExist: true } };

      if (data.title_pl) {
        var plExists = await db("pricelist_items")
          .select("*")
          .where("title_pl", data.title_pl);
      }
      if (data.title_en) {
        var enExists = await db("pricelist_items")
          .select("*")
          .where("title_en", data.title_en);
      }

      if (plExists && plExists.length) errors.plExists = true;
      if (enExists && enExists.length) errors.enExists = true;

      if (Object.keys(errors).length) return { errors };

      if (data.title_pl) formData.title_pl = data.title_pl;
      if (data.title_en) formData.title_en = data.title_en;
      if (data.description_pl) formData.description_pl = data.description_pl;
      if (data.description_en) formData.description_en = data.description_en;
      if (data.heights) formData.heights = data.heights;
      if (data.additional_info_pl !== undefined) formData.additional_info_pl = data.additional_info_pl;
      if (data.additional_info_en !== undefined) formData.additional_info_en = data.additional_info_en;

      if (file) {
        const max_size = 5242880; // 5 mb
        const size = file.size;
        file.originalname =
          crypto.randomBytes(16).toString("hex") +
          `.${file.mimetype.split("/")[1]}`;
        const type = ["image/png", "image/jpeg", "image/jpg"];
        if (type.indexOf(file.mimetype) < 0) errors.Filetype = true;
        if (size > max_size) errors.Filesize = true;
        const path = `/uploads/images/${file.filename}`;
        formData.image_link = path;
        const response = await PricelistAccess.Items_Update(id, formData);
        return response;
      }
      const response = await PricelistAccess.Items_Update(id, formData);

      return response;
    } catch (error) {
      console.log(error);
      return { error };
    }
  }
}

export default new PricelistService();
