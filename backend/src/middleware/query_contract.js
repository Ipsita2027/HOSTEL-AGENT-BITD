import { callLLM } from "../llm/llm.call.js";
import {IntentSchema} from "../llm/response.schema.js";
import {extractJSON} from "../llm/extract_intent.js"

export const contractizeQuery=async (req,res,next)=>{
    //here, the intent type will be verified and extracted ans sent to the controller
    const {prompt}=req.query;
    const llmContract=await callLLM(prompt);
    const jsonIntent=extractJSON(llmContract);
    const validated=IntentSchema.parse(jsonIntent);
    if (validated){
        req.queryInJSON=validated;
        next();
    }
    else{
        res.status(400).send("Sorry I could not understand you. If you could be a little more explicit it would really help!!");
    }

}