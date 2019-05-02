import React from "react";
import styled from "styled-components";

function Second() {
  return (
    <Wrapper>
      <span>Second</span>
      <section>
        <p>
          Morbi sodales at enim sed porttitor. Vestibulum vitae magna consequat,
          faucibus felis non, fermentum lorem. Vivamus viverra est justo.
          Suspendisse lacus nisi, ornare gravida lorem sit amet, iaculis
          vulputate elit. Vivamus non erat at nunc egestas sagittis eget ac
          urna. Proin ac iaculis ante. Proin tincidunt ipsum eu pharetra
          lobortis. Nam auctor fermentum turpis, facilisis iaculis odio
          hendrerit ac. Pellentesque habitant morbi tristique senectus et netus
          et malesuada fames ac turpis egestas. In hendrerit, dolor eu consequat
          porttitor, ante nibh sodales libero, a finibus nisl diam ac tellus.
        </p>
        <p>
          Nulla ornare a dui pellentesque imperdiet. Fusce nec dolor semper,
          aliquet risus eget, dignissim nisl. Vestibulum nec iaculis metus. Nam
          vitae volutpat dui, non ultricies eros. Aenean vitae leo laoreet,
          faucibus lorem a, sagittis libero. Nulla id dignissim augue. Quisque
          laoreet tristique purus, eu rutrum mi consequat ut.
        </p>
      </section>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  min-height: calc(100vh - 50px);
  background-color: #00bfff;
  padding: 20px;

  span {
    color: #fff;
    font-size: 40px;
  }

  section {
    color: #fff;
  }
`;

export default Second;
