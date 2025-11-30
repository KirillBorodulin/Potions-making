// src/routes.ts
import {
  createHashRouter,
  createPanel,
  createRoot,
  createView,
  RoutesConfig,
} from '@vkontakte/vk-mini-apps-router';

export const DEFAULT_ROOT = 'root';
export const DEFAULT_VIEW = 'view';

export const PANELS = {
  GAME: 'game',
} as const;

// дефолтная панель для View
export const DEFAULT_VIEW_PANELS = {
  game: PANELS.GAME,
};

export const routes = RoutesConfig.create([
  createRoot(DEFAULT_ROOT, [
    createView(DEFAULT_VIEW, [
      createPanel(PANELS.GAME, '/', []),
    ]),
  ]),
]);

export const router = createHashRouter(routes.getRoutes());
