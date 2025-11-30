import { FC } from 'react';
import { Caption, Div, Title } from '@vkontakte/vkui';

interface DialogBoxProps {
  lines: string[];
  header?: string;
}
export const DialogBox: FC<DialogBoxProps> = ({ lines, header = 'диалоговое окно (от режима)' }) => {
  return (
    <Div className="box dialog-box">
      <Title level="3">{header}</Title>
      {lines.map((t, i) => (
        <Div key={i} style={{ paddingTop: 6, paddingBottom: 6 }}>
          <Caption level="1">{t}</Caption>
        </Div>
      ))}
    </Div>
  );
};