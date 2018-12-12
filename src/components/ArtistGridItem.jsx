import React from 'react';
import styled from 'styled-components';

const ArtistGridItem = (props) => {
    const {className, image, onArtistSelect} = props;
    const imageUrl = image.find((obj) => obj.size === 'large')['#text'];

    return (
        <div className={ className } onClick={onArtistSelect}>
            <Image src={ imageUrl }/>
            <ArtistName>{ props.name }</ArtistName>
        </div>
    );
};

const Image = styled.img`
    position: absolute;
    width: 100%;
`;

const ArtistName = styled.div`
    position: absolute;
    height: 16px;
    width: 100%;
    background: #fff;
    bottom: 0;
    left: 0;
    font-family: Helvetica;
    padding: 10px;
    font-weight: 200;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`;

export default styled(ArtistGridItem)`
    flex: 0 0 150px;
    border-radius: 4px;
    height: 150px;
    overflow: hidden;
    margin: 10px;
    position: relative;
    cursor: pointer;
    background: #ddd;
`;