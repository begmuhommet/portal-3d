import {
  Center,
  shaderMaterial,
  Sparkles,
  useGLTF,
  useTexture,
} from "@react-three/drei";
import portalFragmentShader from "@/shaders/portal/fragment.glsl";
import portalVertexShader from "@/shaders/portal/vertex.glsl";
import { extend, useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { Color } from "three";

const PortalMaterial = shaderMaterial(
  { uTime: 0 },
  portalVertexShader,
  portalFragmentShader
);

extend({ PortalMaterial });

interface IProps {}

const WorldScene: React.FC<IProps> = () => {
  const portal: any = useGLTF("/models/portal.glb");
  const texture = useTexture("/textures/baked.jpg");
  texture.flipY = false;

  const portalMaterialRef = useRef(null);

  useFrame((state, delta) => {
    if (portalMaterialRef.current) {
      (portalMaterialRef.current as any).uTime += delta;
    }
  });

  return (
    <>
      <Center>
        <mesh geometry={portal.nodes.Portal.geometry}>
          <meshBasicMaterial map={texture} />
        </mesh>

        <mesh
          geometry={portal.nodes.poleLightLeft.geometry}
          position={portal.nodes.poleLightLeft.position}
        >
          <meshBasicMaterial color={new Color("#faf189")} />
        </mesh>

        <mesh
          geometry={portal.nodes.poleLightRight.geometry}
          position={portal.nodes.poleLightRight.position}
        >
          <meshBasicMaterial color={new Color("#faf389")} />
        </mesh>

        <mesh
          geometry={portal.nodes.portalLight.geometry}
          position={portal.nodes.portalLight.position}
        >
          <portalMaterial ref={portalMaterialRef} />
        </mesh>
      </Center>
      <Sparkles
        size={8}
        scale={[30, 30, 30]}
        position-y={10}
        speed={1}
        count={30}
      />
    </>
  );
};

export default WorldScene;
