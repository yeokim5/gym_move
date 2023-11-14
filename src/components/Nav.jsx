import React from "react";
import { CgGym } from "react-icons/cg";
import { Form } from "react-router-dom";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

const NavContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
  background-color: #333;
  color: #fff;
  border-radius: 20px;
  a {
    text-decoration: none;
    color: #fff;
    display: flex;
    align-items: center;

    svg {
      font-size: 2rem;
      margin-right: 10px;
    }

    span {
      font-size: 1.5rem;
      font-weight: bold;
    }
  }

  form {
    button {
      background-color: #ff4040;
      color: #fff;
      border: none;
      padding: 10px 15px;
      font-size: 1rem;
      cursor: pointer;
      border-radius: 8px;

      &:hover {
        background-color: #ff0000;
      }
    }
  }
`;

const Nav = ({ userName }) => {
  return (
    <NavContainer>
      <NavLink to="/" aria-label="Go to home">
        <CgGym />
        <span>GYM Routine</span>
      </NavLink>
      {userName && (
        <Form
          method="post"
          action="logout"
          onSubmit={(event) => {
            if (!window.confirm("Delete user and all data?")) {
              event.preventDefault();
            }
          }}
        >
          <button type="submit">Delete User</button>
        </Form>
      )}
    </NavContainer>
  );
};

export default Nav;
