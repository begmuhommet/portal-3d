import { Center, Sparkles, useGLTF, useTexture } from "@react-three/drei";
import portalFragmentShader from "@/shaders/portal/fragment.glsl";
import portalVertexShader from "@/shaders/portal/vertex.glsl";

interface IProps {}

const PortalModel: React.FC<IProps> = () => {
  const portal: any = useGLTF("/models/portal.glb");
  const texture = useTexture("/textures/baked.jpg");
  texture.flipY = false;

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
          <meshBasicMaterial color="#FD8700FF" />
        </mesh>

        <mesh
          geometry={portal.nodes.poleLightRight.geometry}
          position={portal.nodes.poleLightRight.position}
        >
          <meshBasicMaterial color="#FD8700FF" />
        </mesh>

        <mesh
          geometry={portal.nodes.portalLight.geometry}
          position={portal.nodes.portalLight.position}
        >
          <shaderMaterial
            fragmentShader={portalFragmentShader}
            vertexShader={portalVertexShader}
          />
          {/*<meshBasicMaterial color="#FFFFFF" />*/}
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

export default PortalModel;
