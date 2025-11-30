import { createRoot } from 'react-dom/client'

import vkBridge from '@vkontakte/vk-bridge';
import { AppConfig } from './AppConfig';
import './styles/orientation.css';
import './components/Background.css';
import './global.css';




vkBridge.send('VKWebAppInit');

createRoot(document.getElementById('root') as HTMLElement).render(<AppConfig />);

if (import.meta.env.MODE === 'development') {
  import('./eruda');
}