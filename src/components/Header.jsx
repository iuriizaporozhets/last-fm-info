import React from 'react';
import {connect} from 'react-redux';
import styled from 'styled-components';
import {routerActions} from 'connected-react-router';
import {withRouter} from 'react-router-dom';

import Search from './Search';

const Header = (props) => {
    const {artists, className, onBack, location} = props;
    const isOnArtistsPage = location.pathname === '/artists';

    return (
        <div className={className}>
            { !isOnArtistsPage ?
                <BackButton onClick={onBack}>Back</BackButton> :
                null
            }
            <Search artists={ artists }/>
        </div>
    );
};

const mapStateToProps = (state, props) => {
    return {...props};
};

const mapDispatchToProps = (dispatch) => {
    return {
        onBack: () => dispatch(routerActions.goBack()),
    };
};

const HeaderContainer = connect(mapStateToProps, mapDispatchToProps)(withRouter(Header));

const BackButton = styled.div`
    width: 100px;
    height: 40px;
    line-height: 40px;
    border: 2px solid #e7e7e7;
    float: left;
    font-family: Helvetica;
    font-weight: 100;
    text-align: center;
    cursor: pointer;
    border-radius: 4px;
    margin: 4px 5px;
`;

export default styled(HeaderContainer)`
    width: 100%;
    height: 50px;
    background: #fff;
`;
