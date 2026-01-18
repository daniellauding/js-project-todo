import styled, { css } from 'styled-components';

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'add';
type ButtonSize = 'sm' | 'md' | 'lg' | 'icon';

interface ButtonProps {
  $variant?: ButtonVariant;
  $size?: ButtonSize;
}

const sizes = {
  icon: css`
    padding: 0.5rem;
    font-size: 1rem;
  `,
  sm: css`
    padding: 0.5rem 1rem;
    font-size: 0.875rem;
  `,
  md: css`
    padding: 0.75rem 1.5rem;
    font-size: 1rem;
  `,
  lg: css`
    padding: 1rem 2rem;
    font-size: 1.125rem;
  `,
};

const variants = {
  primary: css`
    background-color: var(--btn-bg);
    color: var(--btn-text);
  `,
  secondary: css`
    background-color: transparent;
    color: var(--text-color);
    border: 1px solid var(--text-color);
  `,
  ghost: css`
    background-color: transparent;
    color: var(--text-color);
  `,
  add: css`
    background-color: var(--btn-bg);
    color: var(--btn-text);
    width: 56px;
    height: 56px;
    padding: 0;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  `,
};

export const Button = styled.button<ButtonProps>`
  cursor: pointer;
  border-radius: 4px;
  border: none;
  transition: opacity 0.2s;

  ${({ $size = 'md' }) => sizes[$size]}
  ${({ $variant = 'primary' }) => variants[$variant]}

  &:hover {
    opacity: 0.8;
  }

  &:focus-visible {
    outline: 2px solid var(--btn-bg);
    outline-offset: 2px;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;
