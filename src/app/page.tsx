"use client";
import * as THREE from "three";
import React, { Suspense } from "react";
import { Canvas, useLoader } from "@react-three/fiber";
import { Stage, OrbitControls } from "@react-three/drei";
import { MTLLoader, OBJLoader, DDSLoader } from "three-stdlib";

type Props = {};

THREE.DefaultLoadingManager.addHandler(/\.dds$/i, new DDSLoader());

function Model(props: any) {
  const materials = useLoader(MTLLoader, "/teeth.mtl");
  const obj = useLoader(OBJLoader, "/teeth.obj", (loader) => {
    materials.preload();
    loader.setMaterials(materials);
  });
  return <primitive object={obj} {...props} />;
}

export default function Home({}: Props) {
  return (
    <>
      <div>Home</div>

      <Canvas camera={{ position: [0, 0, 180], fov: 60 }}>
        <Suspense fallback={null}>
          <Stage>
            <Model />
            <OrbitControls />
          </Stage>
        </Suspense>
      </Canvas>
    </>
  );
}
