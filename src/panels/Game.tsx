// src/panels/Game.tsx
import React, { FC, useEffect, useState, Dispatch, SetStateAction } from 'react';
import {
  Panel,
  PanelHeader,
  Div,
  Avatar,
  Title,
  Caption,
  Button,
  NavIdProps,
} from '@vkontakte/vkui';
import { UserInfo } from '@vkontakte/vk-bridge';

import { HUD } from '../components/HUD';
import { DialogBox } from '../components/DialogBox';
import { DispenserRow } from '../components/DispenserRow';
import { MixingCup } from '../components/MixingCup';
import { OrderPanel } from '../components/OrderPanel';
import { RecipeBookModal } from '../components/RecipeBookModal';
import { SettingsSheet } from '../components/SettingsSheet';

import { IngredientId, Order } from '../game/types';
import { INGREDIENT_LABEL, RECIPE_BY_ID } from '../game/resipes';
import { newOrder, orderTimeByDifficulty, isMatchRecipe } from '../game/utils';

import '../styles/game.css';

export interface GameProps extends NavIdProps {
  fetchedUser?: UserInfo;
  gold: number;
  ingredients: Record<string, number>;
  openShop: () => void;
  setGold: Dispatch<SetStateAction<number>>;
}

export const Game: FC<GameProps> = ({
  id,
  fetchedUser,
  gold,
  ingredients,
  openShop,
  setGold,
}) => {
  const [daySeconds, setDaySeconds] = useState<number>(0);
  const [sound, setSound] = useState<boolean>(true);
  const [difficulty, setDifficulty] = useState<'easy' | 'normal' | 'hard'>('normal');

  const [cup, setCup] = useState<IngredientId[]>([]);
  const [order, setOrder] = useState<Order | null>(() => newOrder('normal'));

  const [dialogLines, setDialogLines] = useState<string[]>([
    'Добро пожаловать в лавку зелий!',
    'Собирайте напитки по заказам и зарабатывайте деньги.',
  ]);

  const [settingsOpen, setSettingsOpen] = useState<boolean>(false);
  const [bookOpen, setBookOpen] = useState<boolean>(false);

  const pushDialog = (line: string) => {
    setDialogLines((prev) => {
      const next = [...prev, line];
      return next.length > 4 ? next.slice(next.length - 4) : next;
    });
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setDaySeconds((prev) => prev + 1);

      setOrder((prev) => {
        if (!prev) return prev;

        const nextLeft = prev.timeLeftSec - 1;

        if (nextLeft <= 0) {
          const recipeName = RECIPE_BY_ID[prev.recipeId].name;
          pushDialog(`Клиент ушёл, не дождавшись зелья "${recipeName}".`);

          const nextOrder = newOrder(difficulty);
          const nextRecipeName = RECIPE_BY_ID[nextOrder.recipeId].name;
          pushDialog(`Новый клиент: просит зелье "${nextRecipeName}".`);

          return nextOrder;
        }

        return { ...prev, timeLeftSec: nextLeft };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [difficulty]);

  const handleDispense = (id: IngredientId) => setCup((prev) => [...prev, id]);

  const handleMix = () => {
    if (cup.length === 0) {
      pushDialog('В стакане пока ничего нет, смешивать нечего.');
      return;
    }
    pushDialog('Вы энергично смешали ингредиенты в стакане.');
  };

  const handleClear = () => {
    if (cup.length === 0) {
      pushDialog('Стакан уже пуст.');
      return;
    }
    setCup([]);
    pushDialog('Вы вылили содержимое и быстро ополоснули стакан.');
  };

  const handleServe = () => {
    if (!order) {
      pushDialog('Сейчас нет активных заказов.');
      return;
    }

    const recipe = RECIPE_BY_ID[order.recipeId];

    if (cup.length === 0) {
      pushDialog('Нужно что-то налить в стакан, прежде чем подавать.');
      return;
    }

    if (isMatchRecipe(cup, recipe)) {
      setGold((prev) => prev + recipe.price);
      pushDialog(`Клиент доволен! Зелье "${recipe.name}" продано за ${recipe.price} Ⓟ.`);
      setCup([]);

      const nextOrder = newOrder(difficulty);
      pushDialog(`Следующий клиент хочет "${RECIPE_BY_ID[nextOrder.recipeId].name}".`);
      setOrder(nextOrder);
    } else {
      pushDialog(`Клиент недоволен — рецепт "${recipe.name}" другой. Попробуйте ещё раз.`);
      setCup([]);
    }
  };

  return (
    <Panel id={id} disableBackground>
      <PanelHeader>Лавка зелий</PanelHeader>

      <Div style={{ paddingTop: 8, paddingBottom: 16 }}>
        <div className="game-root">

          <HUD
            daySeconds={daySeconds}
            money={gold}
            onToggleSettings={() => setSettingsOpen(true)}
            onHint={() => {
              if (!order) return pushDialog('Подсказка: заказов пока нет.');
              const r = RECIPE_BY_ID[order.recipeId];
              const list = r.ingredients.map((id) => INGREDIENT_LABEL[id]).join(', ');
              pushDialog(`Подсказка: для "${r.name}" нужны ${list}.`);
            }}
            onWash={() => { setCup([]); pushDialog('Вы быстро помыли стакан.'); }}
          />

          <div className="left-col">
            <DialogBox lines={dialogLines} />

            <div className="character-order-row">
              <Div className="box transparent-box character-box">
                <Title level="3">персонаж</Title>

                {fetchedUser ? (
                  <div className="character-content">
                    {fetchedUser.photo_200 && <Avatar src={fetchedUser.photo_200} size={56} />}
                    <div>
                      <Caption level="1">{fetchedUser.first_name} {fetchedUser.last_name}</Caption>
                      {fetchedUser.city?.title && (
                        <Caption level="1" className="small-note">{fetchedUser.city.title}</Caption>
                      )}
                    </div>
                  </div>
                ) : (
                  <Caption level="1" className="small-note" style={{ marginTop: 8 }}>
                    Здесь появится ваш герой.
                  </Caption>
                )}
              </Div>

              <OrderPanel order={order} />
            </div>
          </div>

          <div className="right-col">
            <Div className="box transparent-box pad12">
              <div style={{ display: 'flex', gap: 8, alignItems: 'stretch' }}>
                <div className="box transparent-box center pad8" style={{ flex: '0 0 80px', flexDirection: 'column' }}>
                  <Caption level="1">ДОП</Caption>
                  <Caption className="small-note">быстрая мойка</Caption>
                </div>

                <div className="box transparent-box center pad8" style={{ flex: '0 0 80px', flexDirection: 'column' }}>
                  <Caption level="1">ДОП</Caption>
                  <Caption className="small-note">подсказка</Caption>
                </div>

                <div className="box transparent-box center pad8" style={{ flex: '0 0 80px', flexDirection: 'column' }}>
                  <Caption level="1">ДОП</Caption>
                  <Caption className="small-note">бонусы</Caption>
                </div>

                <div style={{ flex: 1, display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
                  <Button size="m" mode="primary" onClick={openShop}>Магазин</Button>
                </div>
              </div>
            </Div>

            <Div className="box transparent-box pad12">
              <Title level="3">полка для чего-нибудь</Title>
              <Caption level="1" className="small-note" style={{ marginTop: 4 }}>
                здесь можно показать купленные предметы или декор
              </Caption>
            </Div>

            <Div className="box transparent-box pad12">
              <Title level="3">запасы ингредиентов</Title>
              <div style={{ marginTop: 6 }}>
                <Caption level="1">Трава: {ingredients.herb}</Caption>
                <Caption level="1">Грибы: {ingredients.mushroom}</Caption>
                <Caption level="1">Кристаллы: {ingredients.crystal}</Caption>
              </div>
            </Div>

            <DispenserRow onDispense={handleDispense} />
          </div>

          <div className="bottom-left-bar">
            <Div className="box transparent-box center pad12">
              <Button size="m" stretched onClick={() => setBookOpen(true)}>Книга рецептов (предмет)</Button>
            </Div>
          </div>

          <div className="bottom-right">
            <MixingCup cup={cup} onMix={handleMix} onServe={handleServe} onClear={handleClear} />
          </div>
        </div>
      </Div>

      <RecipeBookModal active={bookOpen} onClose={() => setBookOpen(false)} />
      <SettingsSheet open={settingsOpen} onClose={() => setSettingsOpen(false)} sound={sound} onToggleSound={() => setSound(s => !s)} difficulty={difficulty} onSetDifficulty={() => {}} />
    </Panel>
  );
};

export default Game;
