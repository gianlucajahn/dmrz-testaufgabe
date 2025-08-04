import * as React from 'react';
import css from './SwitchButton.module.scss'
import { Mask, useFormData } from '@/app/context/FormDataContext';

export interface ISwitchButtonProps {
    to: Mask;
    disabled?: boolean;
}

export default function SwitchButton (props: ISwitchButtonProps) {
    const { setCurrentMask } = useFormData();

  return (
    <div className={`${css.switch} ${props.disabled && css.disabled}`} onClick={() => setCurrentMask(props.to)}>
      Angaben ändern
    </div>
  );
}
