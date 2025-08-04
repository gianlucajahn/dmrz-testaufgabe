import * as React from "react";
import css from "./FieldGroup.module.scss";
import TextElement from "../text/TextElement";
import classNames from "classnames";

export interface IFieldGroupProps {
  headline?: string;
  isReview?: boolean;
  children: any;
}

export default function FieldGroup(props: IFieldGroupProps) {
  return (
    <div className={css.fieldGroup}>
      {props.headline && (
        <div className={css.groupHead}>
          <TextElement isFat text={props.headline} />
        </div>
      )}

      <div
        className={classNames({
          [css.fieldGrid]: !props.isReview,
          [css.fieldList]: props.isReview,
        })}
      >
        {props.children}
      </div>
    </div>
  );
}
