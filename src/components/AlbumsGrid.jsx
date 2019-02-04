import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import styled from 'styled-components';
import Select from 'react-select';

import {artistsActions} from '../store/artists/artists.actions';
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
        const {albums} = this.props;

        return albums.slice(0, sortingOption.value);
    }

    render() {
        const {className} = this.props;
        const {sortingOption} = this.state;
        const requestedAlbums = this.getFilteredAlbums();
        const albumGridItems = requestedAlbums.map((album, index) => <AlbumGridItem {...album} key={index}/>);

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

const mapStateToProps = (state, props) => {
    return {
        albums: state.artists.albums.topalbums.album, ...props
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchArtistAlbums: (name) => dispatch(artistsActions.fetchArtistAlbums(name))
    };
};

export const AlbumsGridContainer = connect(mapStateToProps, mapDispatchToProps)(withRouter(AlbumsGrid));

export default styled(AlbumsGridContainer)`
   float: left;
   width: 100%;
   height: 100%;
   background: #f1f1f1;
   font-family: Helvetica;
`;

const AlbumsListWrapper = styled.div`
    overflow: hidden;
    width: 100%;
    padding: 10px;
    padding-top: 0;
    box-sizing: border-box;
`;

const SortingSelect = styled(Select)`
    top: 6px;
    width: 200px;
    float: right;
    cursor: pointer;
    padding-right: 15px;
`;

const SectionLabel = styled.div`
    padding: 10px;
    padding-left: 15px;
    font-size: 22px;
    font-weight: 100;
    width: 50%;
    float: left;
    box-sizing: border-box;
`;