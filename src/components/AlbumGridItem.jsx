import React from 'react';
import styled from 'styled-components';

const AlbumGridItem = (props) => {
    const {className, name: albumName, image} = props;
    const imageUrl = image.find((obj) => obj.size === 'medium')['#text'];

    return (
        <div className={className}>
            <RoundedImageWrapper>
                <Image src={imageUrl}/>
            </RoundedImageWrapper>
            <AlbumGridName>{albumName}</AlbumGridName>
        </div>
    );
};

const AlbumGridName = styled.div`
    font-family: Helvetica;
    font-weight: 100;
    margin-left: 10px;
    float: left;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    width: calc(100% - 60px);
    line-height: 50px;
`;

const Image = styled.img`
    width: 100%;
`;

const RoundedImageWrapper = styled.div`
    border-radius: 50%;
    overflow: hidden;
    width: 50px;
    height: 50px;
    float: left;
`;

export default styled(AlbumGridItem)`
    width: calc(50% - 30px);
    margin: 5px;
    padding: 10px;
    height: 50px;
    background: #d5d5d5;
    float: left;
    border-radius: 4px;
`;