/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import styled from 'styled-components';

export const HomeCss = styled.div`
  div {
    background: #00ff2a;
  }
`;

export default function Home() {
  return (
    <HomeCss>
      <div className=" w-[500px] h-[500px]">test</div>
    </HomeCss>
  );
}
