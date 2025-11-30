import { FC } from 'react';
import { Button, Caption, Div } from '@vkontakte/vkui';
import { IngredientId } from '../game/types';
import { INGREDIENT_LABEL } from '../game/resipes';

interface MixingCupProps {
  cup: IngredientId[];
  onMix: () => void;
  onServe: () => void;
  onClear: () => void;
}

export const MixingCup: FC<MixingCupProps> = ({ cup, onMix, onServe, onClear }) => {
  return (
    <Div className="box pad12">
      <Caption level="1">стакан для смешивания</Caption>
      <div style={{ paddingTop: 8, display: 'flex', flexWrap: 'wrap', gap: 6 }}>
        {cup.length === 0 ? (
          <Caption className="small-note">пусто</Caption>
        ) : (
          cup.map((id, i) => (
            <div key={`${id}-${i}`} className="box pad8">
              <Caption>{INGREDIENT_LABEL[id]}</Caption>
            </div>
          ))
        )}
      </div>
      <div style={{ display: 'flex', gap: 8, paddingTop: 12 }}>
        <Button size="m" mode="secondary" onClick={onMix}>Смешать</Button>
        <Button size="m" mode="primary" onClick={onServe}>Подать</Button>
        <Button size="m" mode="outline" onClick={onClear}>Выкинуть</Button>
      </div>
    </Div>
  );
};