import {menuModel} from "../models/menu_model_schema.js";
export const getMeals=async (meal_times)=>{
    let pairs=[]
    meal_times.forEach((meal)=>{
        pairs.push({day:meal[0],time:meal[1]});
    });
    // console.log(pairs);
    try{
        const meals=await menuModel.find({
        $or:pairs,
    }).select("-_id").lean();
    return meals;
    }
    catch(e){
        throw new Error("Could not find the requested information");
    }
}