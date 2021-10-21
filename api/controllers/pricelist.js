import PricelistService from "./../services/pricelistService.js";

class Pricelist {
  async GetItems(req, res) {
    try {
      const response = await PricelistService.GetItems();
      return res.status(200).json(response);
    } catch (error) {
      console.log(error);
      return res.status(500).json("Something went wrong");
    }
  }

  async DeleteItem(req, res) {
    try {
      const { id } = req.params;
      const response = await PricelistService.DeleteItem(id);
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
      const response = await PricelistService.AddItem(data, file);
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
      const response = await PricelistService.SingleItem_Get(id);
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
        if(!file && Object.keys(data) <= 0) return res.status(201).json({errors: {noData: true}})
        const response = await PricelistService.Items_Update(id, data, file);
        if (response.error) return res.status(500).json(response.errors);
  
        return res.status(200).json(response);
      } catch (error) {
        console.log(error);
        return res.status(500).json("Something went wrong");
      }
  }
}

export default new Pricelist();
