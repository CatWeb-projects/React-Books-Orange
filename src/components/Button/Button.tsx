import React from 'react';

import './Button.scss';

interface Props {
  children: React.ReactNode;
  value?: string | number;
  onClick?: any;
  className?: string;
  type?: 'primary' | 'secondary' | 'transparent' | 'info';
  style?: { [key: string]: string },
  disabled?: boolean;
  generalType?: 'button' | 'submit';
  size?: 'small' | 'medium' | 'large' | 'onboard' | 'auto';
}

export function Button({
  children,
  onClick,
  className = '',
  type = 'primary',
  style = {},
  generalType = 'button',
  disabled,
  size = 'medium',
  ...props
}: Props) {
  function onClickHandler() {
    if (onClick !== undefined) {
      return onClick();
    }
    return false;
  }

  const btnType = `button-type-${type}`;
  const btnSize = `button-type-${size}`;
  return (
    <button
      className={`button ${btnType} ${btnSize} ${disabled ? 'disabled' : ''} ${className}`}
      onClick={onClickHandler}
      style={style}
      type={generalType ? 'submit' : 'button'}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
}
