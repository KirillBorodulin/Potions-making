import { FC } from 'react';
import { Div, Title, Caption, Progress } from '@vkontakte/vkui';
import { Order } from '../game/types';
import { RECIPE_BY_ID } from '../game/resipes';
import { fmtTime } from '../game/utils';

interface OrderPanelProps {
  order: Order | null;
}

export const OrderPanel: FC<OrderPanelProps> = ({ order }) => {
  if (!order) {
    return (
      <Div className="box order-box center">
        <Caption>заказов нет</Caption>
      </Div>
    );
  }
  const r = RECIPE_BY_ID[order.recipeId];
  const p = Math.max(0, Math.min(100, 100 * (order.timeLeftSec / order.timeTotalSec)));
  return (
    <Div className="box order-box">
      <Title level="3">заказ</Title>
      <Caption level="1">Нужно зелье: <b>{r.name}</b></Caption>
      <Caption level="1">Осталось времени: {fmtTime(order.timeLeftSec)}</Caption>
      <div style={{ paddingTop: 8 }}>
        <Progress value={p} />
      </div>
    </Div>
  );
};