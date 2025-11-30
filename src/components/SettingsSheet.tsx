import { FC, useRef } from 'react';
import { ActionSheet, ActionSheetItem, ActionSheetDefaultIosCloseItem } from '@vkontakte/vkui';

interface SettingsSheetProps {
  open: boolean;
  onClose: () => void;
  sound: boolean;
  onToggleSound: () => void;
  difficulty: 'easy' | 'normal' | 'hard';
  onSetDifficulty: (d: 'easy' | 'normal' | 'hard') => void;
}

export const SettingsSheet: FC<SettingsSheetProps> = ({
  open, onClose, sound, onToggleSound, difficulty, onSetDifficulty
}) => {
  const toggleRef = useRef<HTMLDivElement>(null); // создаем реф

  if (!open) return null;

  return (
    <ActionSheet
      toggleRef={toggleRef} // передаем реф
      onClose={onClose}
      iosCloseItem={<ActionSheetDefaultIosCloseItem />}
    >
      <ActionSheetItem onClick={onToggleSound}>Звук: {sound ? 'вкл' : 'выкл'}</ActionSheetItem>
      <ActionSheetItem onClick={() => onSetDifficulty('easy')}>
        Сложность: лёгкая {difficulty === 'easy' ? '✓' : ''}
      </ActionSheetItem>
      <ActionSheetItem onClick={() => onSetDifficulty('normal')}>
        Сложность: нормальная {difficulty === 'normal' ? '✓' : ''}
      </ActionSheetItem>
      <ActionSheetItem onClick={() => onSetDifficulty('hard')}>
        Сложность: высокая {difficulty === 'hard' ? '✓' : ''}
      </ActionSheetItem>
    </ActionSheet>
  );
};