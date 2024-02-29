import React from 'react';
import SVG from 'react-inlinesvg';

interface Props {
  className?: string;
  type?: string;
  size?: string;
  onClick?: () => void;
  disabled?: boolean;
  active?: boolean;
  [key: string]: any;
}

export function Icon({
  className = '',
  type,
  size = 'small',
  onClick,
  disabled,
  active,
  ...props
}: Props) {
  const defaultProps = {
    className: `zh-icon icon-size-${size} zh-icon-${type}  ${
      active ? ' active' : ''
    }${disabled ? ' disabled' : ''} ${className}`,
    width: '20px',
    height: '20px',
    fill: 'var(--books-white)',
    onClick,
  };
  switch (type) {
    default:
      return <SVG src={`/svg/${type}.svg`} {...defaultProps} {...props} />;
  }
}
