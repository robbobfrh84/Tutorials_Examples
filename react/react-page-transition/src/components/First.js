import React from "react";
import styled from "styled-components";

function First() {
  return (
    <Wrapper>
      <span>First</span>
      <section>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </p>
        <p>
          Fusce imperdiet suscipit posuere. Aliquam sed consectetur eros.
          Praesent nec malesuada est. Quisque vel turpis viverra, condimentum
          mauris at, imperdiet ex. Duis vitae velit vestibulum, bibendum justo
          vitae, pellentesque velit. Morbi quis posuere ante. Nulla consequat
          condimentum dolor, sed ullamcorper mi condimentum et. Sed vitae
          efficitur metus. Donec vitae bibendum metus. Maecenas ultrices
          hendrerit enim a porttitor. Mauris vitae ante vel metus fermentum
          lacinia. In non placerat metus, vitae laoreet felis. Cras aliquet erat
          ut placerat molestie. Ut tristique orci a leo tempus condimentum.
        </p>
      </section>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  min-height: calc(100vh - 50px);
  background-color: #00d38a;
  padding: 20px;

  span {
    color: #fff;
    font-size: 40px;
  }

  section {
    color: #fff;
  }
`;

export default First;
