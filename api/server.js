import express, {json} from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import userRoutes from './routes/users.js';
import randomString from 'randomstring';
import cookieParser from 'cookie-parser';
import dotenv from "dotenv";

dotenv.config();

const port = process.env.PORT || 3000;

const app = express();

//middleware//
// parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
// adding Helmet to enhance your API's security
app.use(helmet());


const corsOptions = {
    exposedHeaders: ['Authorization', "Set-cookie"],
    credentials: true, 
    origin: true
  };
app.use(cors(corsOptions));

// adding morgan to log HTTP requests
app.use(morgan('combined'));

app.use(json());

//ROUTES//
//  Connect all our routes to our application
app.use('/', [userRoutes]);


app.listen(port, () => {
    
    console.log('listening on on port ' + port);
})