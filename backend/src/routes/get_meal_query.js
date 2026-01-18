import Router from "express";
import { contractizeQuery } from "../middleware/query_contract.js";
import { getMealQuery } from "../controller/meal_query.js";

const queryRouter=Router();

queryRouter.get("/meals",contractizeQuery,getMealQuery);

export {queryRouter};