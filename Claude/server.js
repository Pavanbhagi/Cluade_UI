import express from "express";
import cors from "cors";
import { GoogleGenerativeAI } from "@google/generative-ai";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static("public"));

app.post("/chat", async (req, res) => {

try{

const { message, apiKey } = req.body;

if(!apiKey){
return res.send("Please paste your Gemini API key.");
}

const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
model: "gemini-1.5-flash"
});

const result = await model.generateContent(message);

const response = result.response.text();

res.send(response);

}catch(error){

console.error(error);
res.send("Error generating response");

}

});

app.listen(3000, ()=>{
console.log("Server running at http://localhost:3000");
});