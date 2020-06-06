import * as React from 'react';
// import { Entity } from './Entity'
import styled from 'styled-components';
import { AssetContext } from './AssetProvider';
const _Sprite = styled.image `
  clip-path: polygon(
    ${props => props.clipLeft}px ${props => props.clipTop}px,
    ${props => props.clipLeft + props.clipWidth}px ${props => props.clipTop}px,
    ${props => props.clipLeft + props.clipWidth}px ${props => props.clipTop + props.clipHeight}px,
    ${props => props.clipLeft}px ${props => props.clipTop + props.clipHeight}px
  )
`;
export const Sprite = props => {
    const assets = React.useContext(AssetContext);
    const { x = 0, y = 0, width = 32, height = 32, url, frame = 0 } = props;
    const [assetUrl, setAssetUrl] = React.useState('');
    const [assetWidth, setAssetWidth] = React.useState(width);
    const [assetHeight, setAssetHeight] = React.useState(height);
    const [assetFrameMatrix, setAssetFrameMatrix] = React.useState([]);
    const [clipLeft, setClipLeft] = React.useState(0);
    const [clipTop, setClipTop] = React.useState(0);
    React.useEffect(() => {
        const asset = assets.find((asseta) => {
            return asseta.key === url;
        });
        if (asset && assetUrl !== asset.url) {
            setAssetWidth(asset.width);
            setAssetHeight(asset.height);
            const matrixies = [];
            for (let y = 0; y < Math.floor(asset.height / height); y++) {
                for (let x = 0; x < Math.floor(asset.width / width); x++) {
                    const matrix = {
                        x: x * width,
                        y: y * width
                    };
                    matrixies.push(matrix);
                }
            }
            setAssetFrameMatrix(matrixies);
            setAssetUrl(asset.url);
        }
    }, [url, assets]);
    React.useEffect(() => {
        const matrix = assetFrameMatrix[frame];
        if (matrix) {
            setClipLeft(assetFrameMatrix[frame].x);
            setClipTop(assetFrameMatrix[frame].y);
        }
    }, [assetFrameMatrix, frame]);
    return (React.createElement(_Sprite, { width: assetWidth, height: assetHeight, clipHeight: width, clipWidth: height, clipLeft: clipLeft, clipTop: clipTop, x: x - clipLeft, y: y - clipTop, xlinkHref: assetUrl }));
};
//# sourceMappingURL=Sprite.js.map