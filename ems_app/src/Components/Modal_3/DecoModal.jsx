import React, { Suspense, useState } from 'react';
import * as Three from "three";
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stars ,useGLTF } from '@react-three/drei';

export function Model(props) {
    const { nodes, materials } = useGLTF('/scene.gltf')
    return (
      <group {...props} dispose={null} scale={0.5}>
        <group rotation={[-Math.PI / 2, 0, 0]}>
          <mesh geometry={nodes.Cube007_0.geometry} material={materials.marble1} position={[0, 0, 0.26]} rotation={[0, 0, -2.36]} scale={[0.28, 0.28, 0.04]} material-color={"purple"}/>
          <mesh geometry={nodes.Cube006_0.geometry} material={materials.marble2} position={[0, 0, 0.26]} rotation={[0, 0, -Math.PI / 4]} scale={[0.28, 0.28, 0.04]} material-color={"purple"}/>
          <mesh geometry={nodes.Cube002_0.geometry} material={materials.marble3} position={[0, 0, 0.26]} rotation={[0, 0, Math.PI / 2]} scale={[0.28, 0.28, 0.04]} material-color={"hotpink"}/>
          <mesh geometry={nodes.Cube001_0.geometry} material={materials.marble4} position={[0, 0, 0.26]} scale={[0.28, 0.28, 0.04]} material-color={"hotpink"}/>
          <mesh geometry={nodes.Cube_0.geometry} material={materials.marble} position={[0, 0, 0.26]} scale={[0.28, 0.28, 0.03]} />
          <mesh geometry={nodes.Circle_0.geometry} material={materials.marble} scale={2.93} />
          <mesh geometry={nodes.Cube009_0.geometry} material={materials.marble} />
          <mesh geometry={nodes.Plane_0.geometry} material={materials.grass} scale={8.53} />
        </group>
      </group>
    )
  }

function Box(params) {

    const [color , setColor] = useState("#688dd8");
    return(<>
      <mesh>
        <boxGeometry attach="geometry"/>
        <meshLambertMaterial attach="material" color={color}/>
      </mesh>

  
    </>);
  }

function DecoModal() {
return ( <>
    <div>
        <div style={{"width":"505","height":"400PX","backgroundColor":"black"}}>
            <Canvas>
                <Suspense>
                <OrbitControls enablePan={true}/>
                    <Stars/>
                    <ambientLight intensity={0.3}/>
                    <spotLight  position={[10 , 15 , 10]} angle={0.3}
                                penumbra={1}
                    />
                        <Model/>
                </Suspense>       
            </Canvas>
        </div>
    </div>

</> );
}

export default DecoModal;