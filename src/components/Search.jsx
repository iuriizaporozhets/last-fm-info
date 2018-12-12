import React, {Component} from 'react'
import styled from 'styled-components';
import {isEmpty} from 'lodash';
import {connect} from 'react-redux';
import {routerActions} from 'connected-react-router';

const SEARCH_PLACEHOLDER = 'Search';

class Search extends Component {
    state = {
        query: '',
    };

    handleInputChange() {
        this.setState({
            query: this.search.value
        });
    };

    onItemSelect(name) {
        this.props.onItemSelect(name);
        this.setState({query: ''});
        this.search.value = '';
    }

    render() {
        const {artists, className} = this.props;
        const {query} = this.state;
        const filteredArtists = artists.filter((artist) => {
            const {name} = artist;
            return name.toLowerCase().match(query.toLowerCase());
        });
        const filteredArtistItems = filteredArtists.map((artist, index) => {
            const {name} = artist;
            return <ExpectedArtistItem onClick={() => this.onItemSelect(name)} key={ index }>{ name }</ExpectedArtistItem>;
        });

        return (
            <div className={className}>
                <StyledInput
                    placeholder={ SEARCH_PLACEHOLDER }
                    ref={input => this.search = input}
                    onChange={this.handleInputChange.bind(this)}
                />
                { !isEmpty(filteredArtistItems) && !isEmpty(query) ?
                    <ExpectedArtists>{ filteredArtistItems }</ExpectedArtists> :
                    null
                }
            </div>
        );
    }
}

const SearchContainer = connect(
    (state) => ({
        artists: state.artists.list
    }),
    (dispatch) => ({
        onItemSelect: (name) => dispatch(routerActions.push(`/artists/${name}`))
    })
)(Search);

const ExpectedArtists = styled.ul`
    list-style: none;
    margin: 0;
    padding: 0;
    position: relative;
    z-index: 999;
    width: 50%;
    border-radius: 4px;
`;

const ExpectedArtistItem = styled.li`
    background: #f8f8f8;
    width: 100%;
    height: 20px;
    cursor: pointer;
    padding: 5px;
    font-family: Helvetica;
    font-weight: 200;
    
    &:hover {
        background: #f0f0f0;
    }
`;

const StyledInput = styled.input`
    width: 50%;
    height: 100%;
    box-sizing: border-box;
    border: none;
    font-size: 20px;
    padding: 0 10px;
    outline: none;
    font-weight: 200;
`;

export default styled(SearchContainer)`
    width: 100%;
    height: 100%;
`;
