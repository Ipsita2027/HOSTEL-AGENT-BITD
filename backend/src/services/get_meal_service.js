import {getMeals} from "../dao/get_meals_data.js";

export const fetchFoodMenu=async (query)=>{
    //parse the query to extract the exact meal, time offsets and date offsets
    const days=["Sun","Mon","Tue","Wed","Thu","Fri","Sat"]
    const today=new Date();
    const date=new Date(today);
    let meal_times=[];
    query.forEach((meal)=>{
        const offset=meal.day_offset;
        date.setDate(today.getDate()+offset);
        const day=days[date.getDay()];
        meal.time_offset.forEach((time)=>{
            meal_times.push([day,time]);
        });
    });
    console.log(meal_times);
    return await getMeals(meal_times);

}