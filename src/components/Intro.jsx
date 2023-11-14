import React from "react";
import styled from "styled-components";
import { Form } from "react-router-dom";
import "../css/Test.css";

const IntroContainer = styled.div`
  text-align: center;
  margin: 50px auto;
`;

const Title = styled.p`
  font-size: 18px;
  margin-bottom: 10px;
`;

const StyledForm = styled(Form)`
  display: flex;
  flex-direction: column;
  max-width: 50%;
  margin: 0 auto;
`;

const StyledInput = styled.input`
  padding: 15px; /* Increase padding for a larger input */
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  height: 70px; /* Increase height for a larger input */
  width: 100%;
  box-sizing: border-box;
  font-size: 30px; /* Increase font size for a larger input */
`;

const StyledButton = styled.button`
  background-color: #4caf50;
  color: white;
  padding: 12px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  width: 100%;
  box-sizing: border-box;

  &:hover {
    background-color: #45a049;
  }
`;

const Intro = () => {
  return (
    <IntroContainer>
      <Title>Your name</Title>
      <StyledForm method="post">
        <StyledInput
          type="text"
          name="userName"
          required
          placeholder="What is your name?"
          autoComplete="given-name"
        />
        <input type="hidden" name="_action" value="newUser" />
        <button className="button-28" type="submit">
          <span>Create Account</span>
        </button>
      </StyledForm>
    </IntroContainer>
  );
};

export default Intro;
