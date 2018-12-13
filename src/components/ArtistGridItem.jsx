import React from 'react';
import styled from 'styled-components';

const ArtistGridItem = (props) => {
    const {className, image, onArtistSelect, name} = props;
    const imageUrl = image.find((obj) => obj.size === 'large')['#text'];

    return (
        <div className={ className } onClick={onArtistSelect}>
            <Image src={ imageUrl }/>
            <ArtistName>{ name }</ArtistName>
        </div>
    );
};

const Image = styled.img`
    position: absolute;
    width: 100%;
`;

const ArtistName = styled.div`
    position: absolute;
    height: 36px;
    width: 100%;
    background: #fff;
    bottom: 0;
    left: 0;
    padding: 10px;
    font-weight: 200;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    box-sizing: border-box;
`;

export default styled(ArtistGridItem)`
    font-family: Helvetica;
    flex: 0 0 150px;
    border-radius: 4px;
    height: 150px;
    overflow: hidden;
    margin: 10px;
    position: relative;
    cursor: pointer;
    background: #ddd;
`;