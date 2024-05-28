import styled from "styled-components";

export const StyledStartScreen = styled.div`
  height: 100vh;
  width: 100vw;
  overflow: hidden;
  outline: none;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const StyleStartScreenWrapper = styled.div`
  position: relative;

  background-color: rgba(0, 122, 199, 0.5);
  padding-left: 80px;
  padding-right: 80px;
  padding-top: 70px;
  padding-bottom: 120px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 28px;
`;

type PropsBlock = {
  top?: number;
  left?: number;
  bottom?: number;
  right?: number;
  rotate: number;
};
