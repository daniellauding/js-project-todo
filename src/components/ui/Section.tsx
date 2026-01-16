import styled, { css } from 'styled-components';

type SectionVariant = 'default' | 'form';

interface SectionProps {
  $variant?: SectionVariant;
}

const variants = {
  form: css`
    height: auto;
    padding: 32px 32px;
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
  `,
  default: css`
    height: 100dvh;
    padding: 70px 16px 80px;
    text-align: center;
  `,
};


export const Section = styled.section<SectionProps>`
  display: flex;
  flex-direction: column;
  width: 100%;
  ${({ $variant = 'default' }) => variants[$variant]}
`;
