import { FC } from 'react';
import { Button, Div, Caption } from '@vkontakte/vkui';
import { INGREDIENTS } from '../game/resipes';
import { IngredientId } from '../game/types';

interface DispenserRowProps {
  onDispense: (id: IngredientId) => void;
}

export const DispenserRow: FC<DispenserRowProps> = ({ onDispense }) => {
  return (
    <Div className="box pad12">
      <div className="dispensers">
        {INGREDIENTS.map((ing: typeof INGREDIENTS[number]) => (
          <div key={ing.id} className="box center pad8" style={{ flexDirection: 'column', gap: 8 }}>
            <Caption>{ing.title}</Caption>
            <Button size="m" onClick={() => onDispense(ing.id as IngredientId)}>+</Button>
          </div>
        ))}
      </div>
    </Div>
  );
};