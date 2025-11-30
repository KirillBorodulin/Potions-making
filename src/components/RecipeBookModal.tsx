import { FC } from 'react';
import { ModalRoot, ModalCard, Caption, Spacing, Title } from '@vkontakte/vkui';
import { RECIPES, INGREDIENT_LABEL } from '../game/resipes';
import { Recipe } from '../game/types';

interface RecipeBookModalProps {
  active: boolean;
  onClose: () => void;
}

export const RecipeBookModal: FC<RecipeBookModalProps> = ({ active, onClose }) => {
  return (
    <ModalRoot activeModal={active ? 'book' : null} onClose={onClose}>
      <ModalCard id="book" onClose={onClose}>
        <Title level="3" style={{ padding: 8 }}>Книга рецептов</Title>
        {RECIPES.map((r: Recipe) => (
          <div key={r.id} style={{ padding: 8, borderRadius: 8, border: '1px solid var(--vkui--color_separator_primary)', marginBottom: 8 }}>
            <Caption level="1"><b>{r.name}</b> — цена продажи: {r.price} Ⓟ</Caption>
            <Spacing size={8} />
            <Caption level="1">Ингредиенты:</Caption>
            <ul style={{ marginTop: 4, marginBottom: 0 }}>
              {r.ingredients.map((ing, i) => (
                <li key={`${r.id}-${i}`}>
                  <Caption level="1">{INGREDIENT_LABEL[ing]}</Caption>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </ModalCard>
    </ModalRoot>
  );
};