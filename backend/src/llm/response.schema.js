import { z } from "zod";

export const FoodMenuQuerySchema = z.object({
  day_offset: z.number().int(),
  time_offset: z.array(
    z.number().int().min(0).max(3)
  ).min(1)
});

export const IntentSchema = z.object({
  intent_type: z.enum([
    "food_menu",
    "announcements_notices",
    "contact_info",
    "rules_regulations",
    "no_information"
  ]),
  food_menu: z.object({
    query: z.array(FoodMenuQuerySchema).min(1)
  }).nullable()
}).refine(
  data =>
    data.intent_type === "food_menu"
      ? data.food_menu !== null
      : data.food_menu === null,
  {
    message: "food_menu must be present only when intent_type is food_menu"
  }
);
