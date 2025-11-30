import { IngredientId, Order, Recipe } from './types';
import { RECIPES } from './resipes';

// Сравнение содержимого стакана и рецепта по частотам ингредиентов
export function isMatchRecipe(cup: IngredientId[], recipe: Recipe): boolean {
  const count = (arr: IngredientId[]) =>
    arr.reduce<Record<string, number>>((m, id) => {
      m[id] = (m[id] ?? 0) + 1;
      return m;
    }, {} as Record<string, number>);

  const a = count(cup);
  const b = count(recipe.ingredients);

  const keys = new Set([...Object.keys(a), ...Object.keys(b)]);
  for (const k of keys) {
    if ((a[k] ?? 0) !== (b[k] ?? 0)) return false;
  }
  return true;
}

export function randomRecipeId(): string {
  const idx = Math.floor(Math.random() * RECIPES.length);
  return RECIPES[idx].id;
}

// Время заказа по сложности
export function orderTimeByDifficulty(diff: 'easy' | 'normal' | 'hard'): number {
  if (diff === 'easy') return 75;
  if (diff === 'hard') return 40;
  return 55; // normal
}

export function newOrder(diff: 'easy' | 'normal' | 'hard'): Order {
  const r = randomRecipeId();
  const total = orderTimeByDifficulty(diff);
  return { recipeId: r, timeTotalSec: total, timeLeftSec: total };
}

// Красивое форматирование времени
export function fmtTime(sec: number): string {
  const s = Math.max(0, Math.floor(sec));
  const mm = String(Math.floor(s / 60)).padStart(2, '0');
  const ss = String(s % 60).padStart(2, '0');
  return `${mm}:${ss}`;
}

export function currency(n: number): string {
  return `${n} Ⓟ`;
}