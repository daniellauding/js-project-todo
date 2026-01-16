import styled, { css } from 'styled-components';

type InputVariant = 'default' | 'ghost';

interface InputProps {
  $variant?: InputVariant;
}

const variants = {
  default: css``,
  ghost: css`
    border-color: transparent;
    border-bottom-color: var(--text-color);
    border-radius: 0;
    padding-left: 0;
    padding-right: 0;
    height: auto;

    &:focus {
      border-color: transparent;
      border-bottom-color: var(--btn-bg);
      box-shadow: none;
    }
  `,
};

export const Input = styled.input<InputProps>`
  background-color: var(--bg-color);
  color: var(--text-color);
  border: 1px solid var(--text-color);
  padding: 0.75rem 1rem;
  font-size: 1rem;
  border-radius: 4px;
  outline: none;
  transition: border-color 0.2s;
  width: 100%;

  &::placeholder {
    color: var(--text-color);
    opacity: 0.5;
  }

  &:focus {
    border-color: var(--btn-bg);
    box-shadow: 0 0 0 2px rgba(0, 0, 0, 0.1);
  }

  ${({ $variant = 'default' }) => variants[$variant]}
`;
