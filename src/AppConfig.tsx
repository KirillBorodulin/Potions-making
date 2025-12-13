import vkBridge, { parseURLSearchParamsForGetLaunchParams } from '@vkontakte/vk-bridge';
import { useAdaptivity, useAppearance, useInsets } from '@vkontakte/vk-bridge-react';
import { AdaptivityProvider, ConfigProvider, AppRoot } from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';
import './styles/theme.css';
import './styles/phone-landscape.css';
import { useMemo } from 'react';




import { transformVKBridgeAdaptivity } from './utils/transformVKBridgeAdaptivity';
import { RouterProvider } from '@vkontakte/vk-mini-apps-router';
import { router } from './routes';
import { App } from './App';

export const AppConfig = () => {
  const vkBridgeAppearance = useAppearance() || undefined;
  const vkBridgeInsets = useInsets() || undefined;
  const adaptivity = transformVKBridgeAdaptivity(useAdaptivity());
  const { vk_platform } = parseURLSearchParamsForGetLaunchParams(window.location.search);

  const isMobile = useMemo(() => {
  return vk_platform !== 'desktop_web';
  }, [vk_platform]);

  return (
  <ConfigProvider
    colorScheme="dark"
    platform={vk_platform === 'desktop_web' ? 'vkcom' : undefined}
    isWebView={vkBridge.isWebView()}
    hasCustomPanelHeaderAfter={true}
  >
    <AdaptivityProvider {...adaptivity}>
      <AppRoot mode="full" safeAreaInsets={vkBridgeInsets}>
        <div className={isMobile ? 'phone-landscape' : undefined}>
          <RouterProvider router={router}>
            <App />
         </RouterProvider>
        </div>  
      </AppRoot>
    </AdaptivityProvider>
  </ConfigProvider>
);


};