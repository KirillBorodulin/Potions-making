import { Ingredient, IngredientId, Recipe } from './types';

// Все доступные ингредиенты (дозаторы)
export const INGREDIENTS: Ingredient[] = [
  { id: 'red_herb',    title: 'Красная трава' },
  { id: 'blue_berries', title: 'Синие ягоды' },
  { id: 'troll_tooth',  title: 'Зуб тролля' },
  { id: 'ice_crystal',  title: 'Ледяной кристалл' },
  { id: 'fairy_dust',   title: 'Пыльца феи' },
];

// Рецепты (редактируйте под баланс)
export const RECIPES: Recipe[] = [
  {
    id: 'healing_minor',
    name: 'Целебное малое',
    price: 8,
    ingredients: ['red_herb', 'blue_berries'],
  },
  {
    id: 'healing_major',
    name: 'Целебное большое',
    price: 16,
    ingredients: ['red_herb', 'red_herb', 'blue_berries'],
  },
  {
    id: 'frost_protection',
    name: 'Защита от холода',
    price: 14,
    ingredients: ['ice_crystal', 'blue_berries', 'fairy_dust'],
  },
  {
    id: 'berserk',
    name: 'Берсерк',
    price: 18,
    ingredients: ['troll_tooth', 'red_herb', 'fairy_dust'],
  },
  {
    id: 'invisibility',
    name: 'Невидимость',
    price: 25,
    ingredients: ['fairy_dust', 'ice_crystal', 'blue_berries', 'troll_tooth'],
  },
  {
    id: 'jam',
    name: 'Пива',
    price: 8,
    ingredients: ['blue_berries', 'blue_berries','blue_berries'],
  },
];

// Быстрые мапы
export const INGREDIENT_LABEL: Record<IngredientId, string> =
  Object.fromEntries(INGREDIENTS.map(i => [i.id, i.title])) as Record<IngredientId, string>;

export const RECIPE_BY_ID: Record<string, Recipe> =
  Object.fromEntries(RECIPES.map(r => [r.id, r]));