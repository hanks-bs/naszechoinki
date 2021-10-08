import PlantNurseryAccess from './../dbAccess/plantnurseryAccess.js';
import { db } from "./../dataBase/connection.js";
import crypto from "crypto";

class PlantNurseryService {
    async GetItems() {
        try {
            const response = await PlantNurseryAccess.GetItems();
            return response;
          } catch (error) {
            console.log(error);
            return res.status(500).json("Something went wrong");
          }
    }

    async DeleteItem(id) {
        try {
          const checkIfExist = await db("plant_nursery_items")
            .select("id")
            .where("id", id);
          if (checkIfExist.length <= 0) return { error: { notExist: true } };
    
          const response = await PlantNurseryAccess.DeleteItem(id);
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
          if (!data.description_pl) errors.description_pl = true;
          if (!data.description_en) errors.description_en = true;
          if (!file) errors.noFile = true;
    
          if (Object.keys(errors).length) return { errors };
    
          const plExist = await db("plant_nursery_items")
            .select("*")
            .where("title_pl", data.title_pl);
          const enExist = await db("plant_nursery_items")
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
    
          const response = await PlantNurseryAccess.AddItem(data, path);
          return response;
        } catch (error) {
          console.log(error);
          return { error };
        }
    }

    async SingleItem_Get(id, data) {
        try {
          const checkIfExist = await db("plant_nursery_items")
            .select("id")
            .where("id", id);
          if (checkIfExist.length <= 0) return { error: { notExist: true } };
    
          const response = await PlantNurseryAccess.SingleItem_Get(id, data);
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
          const checkIfExist = await db("plant_nursery_items")
            .select("id")
            .where("id", id);
          if (checkIfExist.length <= 0) return { error: { notExist: true } };
    
          if (data.title_pl) {
            var plExists = await db("plant_nursery_items")
              .select("*")
              .where("title_pl", data.title_pl);
          }
          if (data.title_en) {
            var enExists = await db("plant_nursery_items")
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
            const response = await PlantNurseryAccess.Items_Update(id, formData);
            return response;
          }
          const response = await PlantNurseryAccess.Items_Update(id, formData);
    
          return response;
        } catch (error) {
          console.log(error);
          return { error };
        }
    }

    async AddFile(data, file) {
      try {
        const errors = {};
        if (!data.title_pl) errors.title_pl = true;
        if (!data.title_en) errors.title_en = true;
        if (!file) errors.noFile = true;
  
        if (Object.keys(errors).length) return { errors };
  
        const plExist = await db("files_download")
          .select("*")
          .where("title_pl", data.title_pl);
        const enExist = await db("files_download")
          .select("*")
          .where("title_en", data.title_en);
        if (plExist.length) errors.plExists = true;
        if (enExist.length) errors.enExists = true;
        if (Object.keys(errors).length) return { errors };
  
        const max_size = 10485760; // 10 mb
        const size = file.size;
        file.originalname =
          crypto.randomBytes(16).toString("hex") +
          `.${file.mimetype.split("/")[1]}`;
        const type = ["application/pdf", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", "application/vnd.ms-excel"];
        if (type.indexOf(file.mimetype) < 0) errors.type = true;
        if (size > max_size) errors.size = true;
        const path = `/uploads/download_files/${file.filename}`;
  
        const response = await PlantNurseryAccess.AddFile(data, path);
        return response;
      } catch (error) {
        console.log(error);
        return { error };
      }
    }

    async RemoveFile(id) {
      try {
        const checkIfExist = await db("files_download")
          .select("path")
          .where("id", id);
        if (checkIfExist.length <= 0) return { error: { notExist: true } };
        const path = checkIfExist[0].path;
        const response = await PlantNurseryAccess.RemoveFile(id, path);
        return response;
      } catch (error) {
        console.log(error);
        return { error };
      }
    }

    async GetFiles() {
      try {
          const response = await PlantNurseryAccess.GetFiles();
          return response;
        } catch (error) {
          console.log(error);
          return res.status(500).json("Something went wrong");
        }
    }
}

export default new PlantNurseryService();