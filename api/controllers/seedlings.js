import SeedlingsService from "./../services/seedlingsService.js";

class Seedlings {
  async Get(req, res) {
    const response = await SeedlingsService.Get();
    return res.status(200).json(response);
  }

  async Upload(req, res) {
    console.log(req);
    const data = req.body.data;
    return res.status(200).json(req.headers);
  }

  async SingleItem_Get(req, res) {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) return res.sendStatus(404);
      const response = await SeedlingsService.SingleItem_Get(id);
      if (response.error) return res.sendStatus(404);
      return res.status(200).json(response);
    } catch (error) {
      return res.sendStatus(404);
    }
  }

  async Items_Get(req, res) {
    try {
      const response = await SeedlingsService.Items_Get();
      return res.status(200).json(response);
    } catch (error) {
      console.log(error);
      return res.sendStatus(403);
    }
  }

  async Items_Upload(req, res) {
    try {
       
        const data =  req.body;
        const file = req.file;
        const response = await SeedlingsService.Items_Upload(data, file);
        return res.status(200).json(response);
      } catch (error) {
        console.log(error);
        return res.sendStatus(404);
      }
  }

  async Items_Update(req, res) {
    try {
    const data =  req.body;
    const file = req.file;
    if(!file && Object.keys(data) <= 0) return res.status(201).json({errors: {noData: true}})

    const id = req.params.id;
    const response = await SeedlingsService.Items_Update(id, data, file);
    return res.status(200).json(response);
    } catch (error) {
      console.log(error);
      return res.sendStatus(404);
    }
    
  }

  async Items_Delete(req, res) {
    try {
      const id = req.params.id;
      const response = await SeedlingsService.Items_Delete(id);
      if(response.error && Object.keys(response.error).length !== 0) return res.status(404).json({error: response.error});

      return res.status(200).json(true);
    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }
  }
  async Contact(req, res) {
    try {
      const data = req.body;
      const response = await SeedlingsService.Contact(data);
      if(response.errors && Object.keys(response.errors).length !== 0) return res.status(500).json({errors: response.errors});

      return res.status(200).json(response);
    } catch (error) {
      console.log(error);
      return res.sendStatus(500);
    }
  }

  
}

export default new Seedlings();
