import GalleryAccess from './../dbAccess/galleryAccess.js';
import { db } from "./../dataBase/connection.js";
import crypto from "crypto";


class GalleryService {
    async GetImages() {
        try {
            const response = await GalleryAccess.GetImages();
            return response;
          } catch (error) {
            console.log(error);
            return { error };
          }
    }

    async GetSingleImage(id) {
      try {
        const checkIfExist = await db("gallery_items")
          .select("id")
          .where("id", id);
        if (checkIfExist.length <= 0) return { error: { notExist: true } };
  
        const response = await GalleryAccess.GetSingleImage(id);
        return response;
      } catch (error) {
        console.log(error);
        return { error };
      }
    }

    async UploadImage(data, file) {
      try {
        const errors = {};
        const formData = {};
        if (data.title_pl) formData.title_pl = data.title_pl;
        if (data.title_en) formData.title_en = data.title_en;
        if (data.height) formData.height = data.height;
        if (data.width) formData.width = data.width;
        if (!file) errors.noFile = true;
  
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
        formData.src = path;
  
        const response = await GalleryAccess.UploadImage(formData);
        return response;
      } catch (error) {
        console.log(error);
        return { error };
      }
    }

    async UpdateImage(id, data, file) {
      try {
        const formData = {};
        const errors = {};
        const checkIfExist = await db("gallery_items")
          .select("id")
          .where("id", id);
        if (checkIfExist.length <= 0) return { error: { notExist: true } };

        if (Object.keys(errors).length) return { errors };
        
        console.log(data);
        if (data.title_pl || data.title_pl === "") formData.title_pl = data.title_pl;
        if (data.title_en || data.title_en === "") formData.title_en = data.title_en;
        if (data.height) formData.height = data.height;
        if (data.width) formData.width = data.width;
        if (data.id) formData.id = data.id;
  
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
          formData.src = path;
          const response = await GalleryAccess.UpdateImage(id, formData);
          return response;
        }
        const response = await GalleryAccess.UpdateImage(id, formData);
  
        return response;
      } catch (error) {
        console.log(error);
        return { error };
      }


    }

    async DeleteImage(id) {
      try {
        const checkIfExist = await db("gallery_items")
          .select("src")
          .where("id", id);
        if (checkIfExist.length <= 0) return { error: { notExist: true } };
        const path = checkIfExist[0].path;
        const response = await GalleryAccess.DeleteImage(id, path);
        return response;
      } catch (error) {
        console.log(error);
        return { error };
      }
    }
}

export default new GalleryService();
