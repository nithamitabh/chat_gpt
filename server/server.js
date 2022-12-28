import express from "express";
import * as dotenv from 'dotenv';
import cors from 'cors';
import { Configuration, OpenAIApi } from 'openai'
dotenv.config();
const configuration = new Configuration({apiKey: process.env.OPEN_API_KEY,
})
const app = express();
// allow to call cross origin requests from front end
app.use(cors());
// to pass json from frontend to backend
app.use(express.json());
// get route allow to get data from frontend
app.get('/',async (req,res) => {
    res.status(200).send({
        message: 'Hii from Amitabh',
    })
});
// it allow to access frontend body/payload
app.post('/', async (req,res) => {
    try {
        const prompt = req.body.prompt;
        const response = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: `${prompt}`,
            temperature: 0.1,
            max_tokens: 2500,
            top_p: 1,
            frequency_penalty: 0.5,
            presence_penalty: 0,
        });
        res.status(200).send({
            bot : response.data.choice[0].text
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({error});
    }

});
app.listen (5000, () => console.log('Server is running on port http://localhost:5000'));
