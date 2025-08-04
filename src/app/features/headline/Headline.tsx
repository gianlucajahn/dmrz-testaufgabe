import * as React from 'react';
import css from './Headline.module.scss'

export interface IHeadlineProps {
    headline: string;
    subline: string;
}

export default function Headline (props: IHeadlineProps) {
  return (
    <div>
      <h1 className={css.headline}>{props.headline}</h1>
      <h3 className={css.subline}>{props.subline}</h3>
    </div>
  );
}
