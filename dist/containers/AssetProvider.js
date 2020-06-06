import * as React from 'react';
export const AssetContext = React.createContext([]);
export const AssetProvider = props => {
    const { assets = [] } = props;
    const [assetsLib, setAssetLib] = React.useState([]);
    React.useEffect(() => {
        const assetLoaders = assets.map((asset) => {
            return fetch(asset)
                .then((response) => {
                return response.blob();
            })
                .then((blob) => {
                const url = URL.createObjectURL(blob);
                const img = document.createElement('img');
                img.src = url;
                return new Promise((resolve, reject) => {
                    img.onload = () => {
                        const assetItem = {
                            key: asset,
                            url,
                            width: img.width,
                            height: img.height
                        };
                        resolve(assetItem);
                    };
                });
            });
        });
        Promise.all(assetLoaders).then((values) => {
            console.log(values);
            setAssetLib(values);
        });
    }, []);
    return (React.createElement(AssetContext.Provider, { value: assetsLib }, props.children));
};
//# sourceMappingURL=AssetProvider.js.map