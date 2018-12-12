import React from 'react';
import styled from 'styled-components';

import Search from './Search';

const Header = (props) => {
    const { artists, className } = props;
    return (
        <div className={className}>
            <SearchStyled artists={ artists } />
        </div>
    );
};

const SearchStyled = styled(Search)`
    width: 50%;
`;

export default styled(Header)`
    width: 100%;
    height: 50px;
    background: #fff;
`