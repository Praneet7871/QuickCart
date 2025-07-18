'use client';
import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment } from '@react-three/drei';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader';
import { useLoader } from '@react-three/fiber';

function LoaderComponent({ url, type }) {
  const loaderMap = {
    glb: GLTFLoader,
    gltf: GLTFLoader,
    obj: OBJLoader,
    fbx: FBXLoader,
  };

  const Loader = loaderMap[type.toLowerCase()];
  const model = useLoader(Loader, url);

  if (type === 'glb' || type === 'gltf') {
    return <primitive object={model.scene} />;
  }

  return <primitive object={model} />;
}

const ModelViewer = ({ url, type }) => {
  return (
    <div className="w-full h-[400px] border">
      <Canvas camera={{ position: [0, 0, 3] }}>
        <ambientLight intensity={0.6} />
        <directionalLight position={[0, 5, 5]} intensity={1} />
        <Suspense fallback={null}>
          <LoaderComponent url={url} type={type} />
          <Environment preset="sunset" />
        </Suspense>
        <OrbitControls enableZoom />
      </Canvas>
    </div>
  );
};

export default ModelViewer;
