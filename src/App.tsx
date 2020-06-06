import React from 'react';
import logo from './logo.svg';
import { FlatLand } from './containers/Flatland'
import { Sprite } from './containers/Sprite';

function App() {
  return (
    <div className="App">
      <FlatLand
        assets={['./images/64x64.png']}
      >
        <Sprite url={'./images/64x64.png'} x={32} y={0} frame={1}/>
        <Sprite url={'./images/64x64.png'} x={0} y={32} frame={2}/>
        <Sprite url={'./images/64x64.png'} x={64} y={32} frame={2}/>
        <Sprite url={'./images/64x64.png'} x={96} y={0} frame={1}/>
      </FlatLand>
    </div>
  );
}

export default App;
