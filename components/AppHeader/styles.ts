import styled from "styled-components";

/**
 * Example to show that styled-components can work with SSR
 * See also: .babelrc in project root
 */
const HorizontalContainer = styled.div`
  align-items: center;
  display: flex;
  min-height: 56px;
  position: relative;
`;

export { HorizontalContainer };
