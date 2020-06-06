import * as React from 'react';
import { AssetProvider } from './AssetProvider';
export const FlatLand = props => {
    const { width = 480, height = 480, assets = [] } = props;
    return (React.createElement(AssetProvider, { assets: assets },
        React.createElement("svg", { width: width, height: height, viewBox: `0 0 ${width} ${height}` }, props.children)));
};
//# sourceMappingURL=Flatland.js.map