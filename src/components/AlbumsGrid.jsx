import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import styled from 'styled-components';
import Select from 'react-select';

import {fetchArtistAlbums} from '../store/artists/artists.thunk';
import AlbumGridItem from './AlbumGridItem';

const SORTING_OPTIONS = [
    {value: 10, label: 'Top 10 Albums'},
    {value: 15, label: 'Top 15 Albums'},
    {value: 20, label: 'Top 20 Albums'}
];

class AlbumsGrid extends Component {
    constructor() {
        super();
        this.state = {sortingOption: SORTING_OPTIONS[0]}; // setting default sorting count to 10
    }

    componentDidMount() {
        const {match} = this.props;
        const {name} = match.params;
        this.props.fetchArtistAlbums(name);
    }

    onFilterChange(sortingOption) {
        this.setState({sortingOption});
    }

    getFilteredAlbums() {
        const {sortingOption} = this.state;
        const { albums } = this.props;

        return albums.slice(0, sortingOption.value);
    }

    render() {
        const {className} = this.props;
        const { sortingOption } = this.state;
        const requestedAlbums = this.getFilteredAlbums();
        const albumGridItems = requestedAlbums.map((album, index) => <AlbumGridItem {...album} key={index} />);

        return (
            <div className={className}>
                <SectionLabel>Albums</SectionLabel>
                <SortingSelect
                    value={sortingOption}
                    onChange={this.onFilterChange.bind(this)}
                    options={ SORTING_OPTIONS }
                />
                <AlbumsListWrapper>
                    { albumGridItems }
                </AlbumsListWrapper>
            </div>
        );
    }
}

export const AlbumsGridContainer = connect(
    (state, props) => ({
        albums: state.artists.albums.topalbums.album, ...props
    }),
    (dispatch) => ({
        fetchArtistAlbums: (name) => dispatch(fetchArtistAlbums(name)),
    })
)(withRouter(AlbumsGrid));

export default styled(AlbumsGridContainer)`
  
`;

const AlbumsListWrapper = styled.div`
    overflow: hidden;
    width: 100%;
    padding: 10px;
    box-sizing: border-box;
`;

const SortingSelect = styled(Select)`
    top: 5px;
    width: 25%;
    float: right;
    font-family: Helvetica;
    cursor: pointer;
    padding-right: 10px;
`;

const SectionLabel = styled.div`
    font-family: Helvetica;
    padding: 10px;
    font-size: 22px;
    font-weight: 100;
    width: 50%;
    float: left;
    box-sizing: border-box;
`;