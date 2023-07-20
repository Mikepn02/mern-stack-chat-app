import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv'
import multer  from 'multer';
import helmet from 'helmet';
import morgan from 'morgan';
import path from 'path';
import {fileURLToPath} from 'url';


/* cofigurations */

const __filename = fileURLToPath(import.meta.url);
const __dirname =  path.dirname(__filename);
dotenv.config();

const app = express();

app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginEmbedderPolicy()); 
// control the embedding of the current document across different origins.
app.use(morgan("common"));
app.use(bodyParser.json({limit: "30mb",extended:true}));
app.use(cors());
// allow or restrict access to the application from different origins.
app.use('/assets',express.static(path.join(__dirname,'public/assets')));

const strorage = multer.diskStorage({
    destination : function (req,file,cb) {
        cb(null,file.originalname)
    }
})

// handling file uploads using multer

const PORT = process.env.PORT || 6001;
mongoose.connect("mongodb://127.0.0.1:27017/chat-app" , {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    app.listen(PORT , () => {
        console.log(`Server is running on the ${PORT}`);
    })
})
.catch((error) => {
    console.log(`${error} did not connect`)
})