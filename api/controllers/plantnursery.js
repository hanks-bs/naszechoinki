import PlantNurseryService from "./../services/plantnurseryService.js";


class PlantNursery {
    async GetItems(req, res) {
        try {
            const response = await PlantNurseryService.GetItems();
            return res.status(200).json(response);
          } catch (error) {
            console.log(error);
            return res.status(500).json("Something went wrong");
          }
    }

    async DeleteItem(req, res) {
        try {
          const { id } = req.params;
          const response = await PlantNurseryService.DeleteItem(id);
          if (response.error) return res.status(500).json(response.error);
          return res.status(200).json(response);
        } catch (error) {
          console.log(error);
          return res.status(500).json("Something went wrong");
        }
    }

    async AddItem(req, res) {
        try {
          const data = req.body;
          const file = req.file;
          const response = await PlantNurseryService.AddItem(data, file);
          if (response.error) return res.status(500).json(response.error);
          return res.status(200).json(response);
        } catch (error) {
          console.log(error);
          return res.status(500).json("Something went wrong");
        }
    }

    async SingleItem_Get(req, res) {
        try {
          const { id } = req.params;
          const response = await PlantNurseryService.SingleItem_Get(id);
          if (response.error) return res.status(500).json(response.error);
    
          return res.status(200).json(response);
        } catch (error) {
          console.log(error);
          return res.status(500).json("Something went wrong");
        }
    }

    async Items_Update(req, res) {
        try {
          const { id } = req.params;
          const data = req.body
          const file = req.file;
          console.log(data)
          if(!file && Object.keys(data) <= 0) return res.status(201).json({errors: {noData: true}})
          const response = await PlantNurseryService.Items_Update(id, data, file);
          if (response.error) return res.status(500).json(response.errors);
    
          return res.status(200).json(response);
        } catch (error) {
          console.log(error);
          return res.status(500).json("Something went wrong");
        }
    }

    async AddFile(req, res) {
      try {
        const data = req.body
        const file = req.file;
        console.log(data)
        if(!file && Object.keys(data) <= 0) return res.status(201).json({errors: {noData: true}})
        const response = await PlantNurseryService.AddFile(data, file);
        if (response.error) return res.status(500).json(response.errors);
  
        return res.status(200).json(response);
      } catch (error) {
        console.log(error);
        return res.status(500).json("Something went wrong");
      }
    }

    async RemoveFile(req, res) {
      try {
        const { id } = req.params;
        const response = await PlantNurseryService.RemoveFile(id);
        if (response.error) return res.status(500).json(response.error);
        return res.status(200).json(response);
      } catch (error) {
        console.log(error);
        return res.status(500).json("Something went wrong");
      }
    }
    
    async GetFiles(req, res) {
      try {
          const response = await PlantNurseryService.GetFiles();
          return res.status(200).json(response);
        } catch (error) {
          console.log(error);
          return res.status(500).json("Something went wrong");
        }
  }
}

export default new PlantNursery();