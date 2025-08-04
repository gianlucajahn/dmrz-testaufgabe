'use client'

import * as React from "react";
import css from "./MaskSelector.module.scss";
import TextElement from "../../text/TextElement";
import classNames from "classnames";
import { Mask, useFormData } from "@/app/context/FormDataContext";

export interface IMaskSelectorProps {
  mask: Mask;
  isSelected: boolean;
  isLast?: boolean;
  isDisabled?: boolean;
}

export default function MaskSelector(props: IMaskSelectorProps) {
  const { currentMask, setCurrentMask } = useFormData();

  return (
    <div
      className={classNames(css.maskSelector, {
        [css.isSelected]: props.isSelected,
        [css.isLast]: props.isLast,
        [css.isDisabled]: props.isDisabled,
      })}
      onClick={() => {props.isDisabled ? null : setCurrentMask(props.mask)} }
    >
      <TextElement text={props.mask} isSelected={props.isSelected} />
    </div>
  );
}
