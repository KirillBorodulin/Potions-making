export type IngredientId =
  | 'red_herb'
  | 'blue_berries'
  | 'troll_tooth'
  | 'ice_crystal'
  | 'fairy_dust';

export interface Ingredient {
  id: IngredientId;
  title: string;
}

export interface Recipe {
  id: string;
  name: string;
  price: number;             // сколько денег получаем
  ingredients: IngredientId[]; // порядок неважен (сравниваем как множества/счётчики)
}

export interface Order {
  recipeId: string;
  timeTotalSec: number;
  timeLeftSec: number;
}

export interface GameState {
  money: number;
  daySeconds: number; // время «рабочего дня»
  sound: boolean;
  difficulty: 'easy' | 'normal' | 'hard';
}