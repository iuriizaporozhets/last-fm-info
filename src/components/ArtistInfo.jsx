import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {routerActions} from 'connected-react-router';
import styled from 'styled-components';
import {isEmpty} from 'lodash';
import {artistsActions} from '../store/artists/artists.actions';
import {fetchArtistInfo} from '../store/artists/artists.thunk';

export class ArtistInfo extends Component {
    componentDidMount() {
        const {match} = this.props;
        const {name} = match.params;
        this.props.fetchArtistInfo(name);
    }

    componentWillUnmount() {
        this.props.clearInfo();
    }

    render() {
        if (isEmpty(this.props.artist)) {
            return null;
        }
        const {className, onAlbumsRequest, artist} = this.props;
        const {image, name, bio} = artist;
        const {summary} = bio;
        const imageUrl = image.find((obj) => obj.size === 'mega')['#text'];

        return (
            <div className={className}>
                <RoundedImageWrapper>
                    <Image src={imageUrl}/>
                </RoundedImageWrapper>
                <ArtistName>{ name }</ArtistName>
                <AlbumsLoadButton onClick={() => {
                    onAlbumsRequest(name)
                }}>Albums</AlbumsLoadButton>
                <ArtistBio dangerouslySetInnerHTML={{__html: summary}}></ArtistBio>
            </div>
        );
    }
}
// dangerouslySetInnerHTML is used here to render the link element which points to last.fm service

export const ArtistInfoContainer = connect(
    (state, props) => ({
        artist: state.artists.info.artist, ...props
    }),
    (dispatch) => ({
        fetchArtistInfo: (name) => dispatch(fetchArtistInfo(name)),
        clearInfo: () => dispatch(artistsActions.setArtistInfo({})),
        onAlbumsRequest: (name) => dispatch(routerActions.push(`/artists/${name}/albums`))
    })
)(withRouter(ArtistInfo));

const AlbumsLoadButton = styled.div`
    width: 100px;
    height: 40px;
    line-height: 40px;
    border: 2px solid #e7e7e7;
    float: left;
    font-family: Helvetica;
    font-weight: 100;
    text-align: center;
    cursor: pointer;
    margin: 10px 0 0 10px;
    border-radius: 4px;
    
    &:hover {
        background: #e1e1e1;
    }
`;

const ArtistBio = styled.div`
    float: left;
    margin-top: 10px;
    font-family: Helvetica;
    font-weight: 100;
`;

const ArtistName = styled.div`
    font-family: Helvetica;
    font-weight: 200;
    font-size: 32px;
    width: calc(100% - 210px);
    float: left;
    margin-left: 10px;
`;

const Image = styled.img`
    width: 100%;
    height: auto;
    padding: 0 10px 10px 0;
`;

const RoundedImageWrapper = styled.div`
    border-radius: 50%;
    width: 200px;
    height: 200px;
    overflow: hidden;
    float: left;
`;

export default styled(ArtistInfoContainer)`
    overflow: hidden;
    padding: 10px;
    margin: 0 10px;
    background: #f1f1f1;
    border-radius: 4px;
`