// src/App.tsx
import { useState, useEffect, ReactNode } from 'react';
import bridge, { UserInfo } from '@vkontakte/vk-bridge';
import {
  View,
  SplitLayout,
  SplitCol,
  ScreenSpinner,
  ModalRoot,
  ModalPage,
  ModalPageHeader,
  Group,
  Button,
  Cell,
  Header,
  Div,
  Counter,
} from '@vkontakte/vkui';
import { useActiveVkuiLocation } from '@vkontakte/vk-mini-apps-router';


import { Background } from './components/Background';



import { Game } from './panels';
import { DEFAULT_VIEW_PANELS } from './routes';

export const App = () => {
  const { panel: activePanel = DEFAULT_VIEW_PANELS.game } = useActiveVkuiLocation();
  const [fetchedUser, setUser] = useState<UserInfo | undefined>();
  const [popout, setPopout] = useState<ReactNode | null>(<ScreenSpinner />);

  // ---------- МАГАЗИН / ГЛОБАЛЬНАЯ ВАЛЮТА ----------
  const [gold, setGold] = useState<number>(100); // стартовая валюта
  const [ingredients, setIngredients] = useState<Record<string, number>>({
    herb: 0,
    mushroom: 0,
    crystal: 0,
  });

  const [activeModal, setActiveModal] = useState<string | null>(null);

  const shopItems = [
    { id: 'herb', title: 'Трава', price: 5 },
    { id: 'mushroom', title: 'Гриб', price: 8 },
    { id: 'crystal', title: 'Кристалл', price: 15 },
  ];

  const buyItem = (id: string, price: number, qty: number) => {
    const total = price * qty;
    if (gold < total) return;

    setGold((prev) => prev - total);
    setIngredients((prev) => ({ ...prev, [id]: prev[id] + qty }));
  };


  const modal = (
    <ModalRoot activeModal={activeModal} onClose={() => setActiveModal(null)}>
      <ModalPage id="shop" onClose={() => setActiveModal(null)}>
        <ModalPageHeader>Магазин ингредиентов</ModalPageHeader>

        <Group>
          <Header>Ваше золото: {gold}</Header>

          {shopItems.map((item) => (
            <ShopItem key={item.id} item={item} onBuy={buyItem} />
          ))}
        </Group>
      </ModalPage>
    </ModalRoot>
  );

  useEffect(() => {
    async function fetchData() {
      const user = await bridge.send('VKWebAppGetUserInfo');
      setUser(user);
      setPopout(null);
    }
    fetchData();
  }, []);

  return (
    <SplitLayout popout={popout} modal={modal}>
      <Background />
      <SplitCol className="app-stage" style={{ position: 'relative', zIndex: 1 }}>
        <View activePanel={activePanel}>
          <Game
            id="game"
            fetchedUser={fetchedUser}
            gold={gold}
            ingredients={ingredients}
            openShop={() => setActiveModal('shop')}
            setGold={setGold}
          />
        </View>
      </SplitCol>
    </SplitLayout>
  );


};

// ---------------------- Компонент товара ----------------------

interface ShopItemProps {
  item: { id: string; title: string; price: number };
  onBuy: (id: string, price: number, qty: number) => void;
}

const ShopItem = ({ item, onBuy }: ShopItemProps) => {
  const [qty, setQty] = useState<number>(1);

  return (
    <Group>
      <Cell
        subtitle={`Цена: ${item.price} золота`}
        after={<Counter>{qty}</Counter>}
      >
        {item.title}
      </Cell>

      <Div style={{ display: 'flex', gap: 8 }}>
        <Button
          size="m"
          mode="secondary"
          onClick={() => setQty((prev) => Math.max(1, prev - 1))}
        >
          -
        </Button>

        <Button
          size="m"
          mode="secondary"
          onClick={() => setQty((prev) => prev + 1)}
        >
          +
        </Button>

        <Button
          size="m"
          onClick={() => onBuy(item.id, item.price, qty)}
        >
          Купить за {item.price * qty}
        </Button>
      </Div>
    </Group>
  );

};
