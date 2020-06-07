import * as React from 'react'

interface iAssetProvider {
  assets?: string[]
}

interface iAsset {
  key: string
  url: string
  width: number
  height: number
}

export const AssetContext = React.createContext<iAsset[]>([]);

export const AssetProvider: React.FC<iAssetProvider> = props => {
  const { assets = [] } = props
  const [assetsLib, setAssetLib] = React.useState<iAsset[]>([])

  React.useEffect(
    () => {
      const assetLoaders = assets.map(
        (asset) => {
          return fetch(asset)
            .then((response) => {
              return response.blob();
            })
            .then((blob) => {
              const url = URL.createObjectURL(blob)
              const img = document.createElement('img')
              img.src = url

              return new Promise((resolve: (asset: iAsset)=>void, reject) => {
                img.onload = () => {
                  const assetItem: iAsset = { 
                    key: asset,
                    url,
                    width: img.width,
                    height: img.height
                  }
                  resolve(assetItem)
                }
              })
            })
        }
      )
      Promise.all(assetLoaders).then((values) => {
        console.log(values)
        setAssetLib(values)
      });
    },
    []
  )
  
  return (
    <AssetContext.Provider value={assetsLib}>
      {props.children}
    </AssetContext.Provider>
  )
}