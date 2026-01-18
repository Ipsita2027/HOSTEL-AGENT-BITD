import {fetchFoodMenu} from "../services/get_meal_service.js"


export const getMealQuery=async (req,res)=>{
    //The result will be a list of meal documents according to the query
    //The middleware will act as the validation layer for the json contract
    //filled by llm from user's intent in the query
    try{
        const userQuery=req.queryInJSON;
        if (userQuery.intent_type==="no_information"){
            throw new Error("That is not a question we can answer. Sorry for the incovenience");

        }
        if (userQuery.intent_type!=="food_menu"){
            throw new Error("Currently only menu queries are supported. Very soon we might extend it to rules,contact info and announcements");

        }
        // console.log("isArray:", Array.isArray(userQuery.food_menu.query));
        const results=await fetchFoodMenu(userQuery.food_menu.query);
        res.status(200).json({type:"list",content:results});
        
    }
    catch(e){
        res.status(400).json({type:"text",content:e.message});
    }

}