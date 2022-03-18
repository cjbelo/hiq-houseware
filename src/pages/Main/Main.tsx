import { FC } from "react";
import styled from "@emotion/styled";
import { AppBar } from "../../components/AppBar";
import logo from "../../media/logo.jpeg";

const Wrapper = styled.div`
  height: 100vh;
  background-image: url("${logo}");
  background-position: center center;
  background-repeat: no-repeat;
`;

export const Main: FC = () => {
  return (
    <Wrapper>
      <AppBar />
    </Wrapper>
  );
};
