import * as React from 'react';
interface iAssetProvider {
    assets?: string[];
}
interface iAsset {
    key: string;
    url: string;
    width: number;
    height: number;
}
export declare const AssetContext: React.Context<iAsset[]>;
export declare const AssetProvider: React.FC<iAssetProvider>;
export {};
//# sourceMappingURL=AssetProvider.d.ts.map