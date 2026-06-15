import Link from 'next/link';
import React from 'react';

type ButtonVariant = 'blue' | 'line' | 'dim';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  href?: string;
  onClick?: (e: React.FormEvent) => void;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
  external?: boolean;
}

export default function Button({
  variant = 'blue',
  size = 'md',
  href,
  onClick,
  disabled,
  type = 'button',
  className = '',
  style,
  children,
  external,
}: ButtonProps) {
  const classes = `btn btn-${variant} btn-${size} ${className}`;

  if (href) {
    if (external) {
      return (
        <a href={href} target="_blank" rel="noopener noreferrer" className={classes} style={style}>
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={classes} style={style}>
        {children}
      </Link>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={classes}
      style={style}
    >
      {children}
    </button>
  );
}
