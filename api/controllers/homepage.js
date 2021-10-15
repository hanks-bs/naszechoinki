import HomePageService from "./../services/homepageService.js";


class HomePage {
    async Contact (req, res) {
        try {
            const data = req.body;
            const response = await HomePageService.Contact(data);
            if(response.errors && Object.keys(response.errors).length !== 0) return res.status(500).json({errors: response.errors});
      
            return res.status(200).json(response);
          } catch (error) {
            console.log(error);
            return res.sendStatus(500);
          }
    }
}

export default new HomePage();
