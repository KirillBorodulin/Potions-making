import { FC } from 'react';
import { Button, Div, Title, Caption } from '@vkontakte/vkui';
import { currency, fmtTime } from '../game/utils';

interface HUDProps {
  daySeconds: number;
  money: number;
  onToggleSettings: () => void;
  onHint: () => void;
  onWash: () => void;
}

export const HUD: FC<HUDProps> = ({ daySeconds, money, onToggleSettings, onHint, onWash }) => {
  return (
    <div className="hud-strip">
      <Div className="box center" style={{ flexDirection: 'column' }}>
        <Caption level="1">время</Caption>
        <Title level="3">{fmtTime(daySeconds)}</Title>
      </Div>

      <Div className="box center" style={{ flexDirection: 'column' }}>
        <Caption level="1">деньги</Caption>
        <Title level="3">{currency(money)}</Title>
      </Div>

      <Div className="box center" style={{ gap: 8 }}>
        <Button size="m" mode="secondary" onClick={onWash}>ДОП: Быстрая мойка</Button>
        <Button size="m" mode="secondary" onClick={onHint}>ДОП: Подсказка</Button>
      </Div>

      <Div className="box center">
        <Button size="m" mode="primary" onClick={onToggleSettings}>развернуть настройки</Button>
      </Div>
    </div>
  );
};