import intentPrompt from "./intent_prompt.js";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config("./.env");
// The client gets the API key from the environment variable `GEMINI_API_KEY`.
const ai = new GoogleGenAI({});


export const callLLM=async (userQuery)=>{
    // console.log(userQuery);
    const result = await ai.models.generateContent({
      model:"gemini-2.5-flash",
      contents:`${intentPrompt}\nQuery:${userQuery}`
    });
  // console.log(result.text);
  return result.text.toString();
  
}

// export const callLLMToFormat=async (input)=>{
//   console.log(input);
//   const formattedString=await ai.models.generateContent({
//     model:"gemini-2.5-flash",
//     contents:`${formatPrompt(JSON.stringify(input))}`
//   });
//   console.log(formattedString.text);
//   return formattedString.text;

// }

// callLLMToFormat("hello")