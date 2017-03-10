import * as React from 'react';
import * as React3 from 'react-three-renderer';
import * as THREE from 'three';
import { store } from './store/store';
import { loadTile } from './actions';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      scene: any;
      perspectiveCamera: any;
      ambientLight: any;
      axisHelper: any;
      mesh: any;
      boxGeometry: any;
      meshBasicMaterial: any;
      // other elements can be added here
    }
  }
}

export class Simple extends React.Component<any, any> {
  private cameraPosition: THREE.Vector;
  private _onAnimate: () => void;

  constructor(props, context) {
    super(props, context);
    this.cameraPosition = new THREE.Vector3(0, 0, 5);
    // this._onAnimate = this._onAnimate.bind(this);

    this.state = {
      cubeRotation: new THREE.Euler(),
    };

    this._onAnimate = () => {
      // debugger;
      console.log(this.refs.camera);
      // console.log('position', CameraUtils.position);
      store.dispatch(loadTile(this.refs.camera));
      this.setState({
        cubeRotation: new THREE.Euler(
          this.state.cubeRotation.x + 0.1,
          this.state.cubeRotation.y + 0.1,
          0
        ),
      });
    };
  }

  render() {
    const width = window.innerWidth; // canvas width
    const height = window.innerHeight; // canvas height
    // const meshes = (this.props.points).map((point) => {
    //   return <mesh>
    // })
    return (<React3
      mainCamera="camera"
      width={width}
      height={height}
      onAnimate={this._onAnimate}
    >
      <scene>
        <perspectiveCamera
          name="camera"
          fov={75}
          aspect={width / height}
          near={0.1}
          far={1000}
          ref="camera"
          position={this.cameraPosition}
        />
        <mesh
          rotation={this.state.cubeRotation}
        >
          <boxGeometry
            width={1}
            height={1}
            depth={1}
          />
          <meshBasicMaterial
            color={0x00ff00}
          />
        </mesh>
      </scene>
    </React3>);
  }
}
