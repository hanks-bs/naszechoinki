import GalleryService from "./../services/galleryService.js";



class Gallery {
    async GetImages(req, res) {
        try {
            const response = await GalleryService.GetImages();
            return res.status(200).json(response);
          } catch (error) {
            console.log(error);
            return res.status(500).json("Something went wrong");
          }
    }
    
    async GetSingleImage(req, res) {
        try {
            const { id } = req.params;
            const response = await GalleryService.GetSingleImage(id);
            if (response.error) return res.status(500).json(response.error);
      
            return res.status(200).json(response);
          } catch (error) {
            console.log(error);
            return res.status(500).json("Something went wrong");
          }
    }

    async UploadImage(req, res) {
        try {
            const data = req.body;
            const file = req.file;
            if(!file) return res.status(500).json({noData: true})
            const response = await GalleryService.UploadImage(data, file);
            if (response.error) return res.status(500).json(response.error);
            return res.status(200).json(response);
          } catch (error) {
            console.log(error);
            return res.status(500).json("Something went wrong");
          }
    }

    async UpdateImage(req, res) {
      try {
        const { id } = req.params;
        const data = req.body
        const file = req.file;
        if(!file && Object.keys(data) <= 0) return res.status(201).json({errors: {noData: true}})
        const response = await GalleryService.UpdateImage(id, data, file);
        if (response.error) return res.status(500).json(response.errors);
  
        return res.status(200).json(response);
      } catch (error) {
        console.log(error);
        return res.status(500).json("Something went wrong");
      }
    }

    async DeleteImage(req, res) {
      try {
        const { id } = req.params;
        const response = await GalleryService.DeleteImage(id);
        if (response.error) return res.status(500).json(response.error);
        return res.status(200).json(response);
      } catch (error) {
        console.log(error);
        return res.status(500).json("Something went wrong");
      }
    }
}

export default new Gallery();
