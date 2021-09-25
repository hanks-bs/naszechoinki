import SeedlingsAccess from "../dbAccess/seedlingsAccess.js";


class SeedlingsService {
  async Get() {
    const response = await SeedlingsAccess.Get();
    return response;
  }

  async Upload() {
    return res.status(200).json(req.headers);
  }

  async SingleItem_Get(id) {
    const response = await SeedlingsAccess.SingleItem_Get(id);
    return response;
  }

  async Items_Get() {
    const response = await SeedlingsAccess.Items_Get();
    return response;
  }

  async Items_Upload(data, file) {
    const response = await SeedlingsAccess.Items_Get();
    return response;
  }

  async Items_Update() {
    return res.status(200).json(req.headers);
  }

  async Items_Delete() {
    return res.status(200).json(req.headers);
  }
}

export default new SeedlingsService();
