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
      return res.sendStatus(404);
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
    return res.status(200).json(req.headers);
  }

  async Items_Delete(req, res) {
    return res.status(200).json(req.headers);
  }
}

export default new Seedlings();
