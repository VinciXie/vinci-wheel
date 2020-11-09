import React, { useState } from "react";
import { Input, Spin } from "tezign-ui";
import classNames from "classnames";
import { InputProps } from "tezign-ui/lib/input";

const inputId = "id-column-add-input";

interface Props extends InputProps {
  cancel: () => void;
  confirm: (value: string) => void;
  className?: string;
  style?: React.CSSProperties;
}

export default function CancelableInput(props: Props) {
  const { cancel, confirm, className, maxLength = 8, style, ...restProps } = props;
  const [addLoading, setAddLoading] = useState(false);

  return (
    <Input
      id={inputId}
      size="small"
      maxLength={maxLength}
      className={classNames("position-relative", className)}
      style={{ zIndex: 99, ...style }}
      autoFocus
      {...restProps}
      onPressEnter={e => {
        const target = e.currentTarget;
        const value = target.value;
        console.log("value", value);
        if (value === "") {
          cancel();
        } else {
          confirm(value);
          setAddLoading(true);
        }
      }}
      onBlur={cancel}
      onKeyDown={e => {
        if (e.keyCode === 27) {
          console.log("e.keyCode", e.keyCode);
          cancel();
        }
      }}
    />
  );
}
