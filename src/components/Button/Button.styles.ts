import styled from "styled-components";
import { ButtonVariant } from "../../@types/types";

interface ButtonContainerProps {
  variant: ButtonVariant;
}

export const ButtonContainer = styled.button<ButtonContainerProps>`
  width: 100px;
  height: 40px;

  border-radius: 4px;
  border: 0;
  margin: 8px;
  color: ${(props) => props.theme.white};
  background-color: ${(props) => props.theme["green-500"]};
`;
