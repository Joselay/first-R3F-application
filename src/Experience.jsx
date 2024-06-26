import {
  BakeShadows,
  OrbitControls,
  softShadows,
  useHelper,
} from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useControls } from "leva";
import { Perf } from "r3f-perf";
import { useRef } from "react";
import * as THREE from "three";

export default function Experience() {
  const directionalLight = useRef();
  useHelper(directionalLight, THREE.DirectionalLightHelper, 1);

  const cubeRef = useRef();

  useFrame((_, delta) => {
    cubeRef.current.rotation.y += delta * 0.2;
  });

  const { position, color, visible } = useControls({
    position: {
      value: { x: -2, y: 0 },
      step: 0.01,
      joystick: "invertY",
    },
    color: "#ff0000",
    visible: true,
  });

  return (
    <>
      <BakeShadows />
      <Perf position="top-left" />
      <OrbitControls makeDefault />

      <directionalLight
        shadow-mapSize={[1024, 1024]}
        castShadow
        ref={directionalLight}
        position={[1, 2, 3]}
        intensity={1.5}
      />
      <ambientLight intensity={0.5} />

      <mesh castShadow position={[position.x, position.y, 0]} visible={visible}>
        <sphereGeometry />
        <meshStandardMaterial color={color} />
      </mesh>

      <mesh castShadow position-x={2} scale={1.5} ref={cubeRef}>
        <boxGeometry />
        <meshStandardMaterial color="mediumpurple" />
      </mesh>

      <mesh
        receiveShadow
        position-y={-1}
        rotation-x={-Math.PI * 0.5}
        scale={10}
      >
        <planeGeometry />
        <meshStandardMaterial color="greenyellow" />
      </mesh>
    </>
  );
}
