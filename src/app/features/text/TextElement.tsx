import * as React from "react";
import css from "./TextElement.module.scss";
import classNames from "classnames";

export interface ITextElementProps {
  text: string;
  isSelected?: boolean;
  isFat?: boolean;
}

export default function TextElement(props: ITextElementProps) {
  return (
    <div>
      <p
        className={classNames(css.text, {
          [css.selectedText]: props.isSelected,
          [css.isFat]: props.isFat,
        })}
      >
        {props.text}
      </p>
    </div>
  );
}
