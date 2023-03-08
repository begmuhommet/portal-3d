import { OrbitControls } from "@react-three/drei";
import WorldScene from "@/components/WorldScene";
import { Canvas } from "@react-three/fiber";

interface IProps {}

const World: React.FC<IProps> = () => {
  return (
    <Canvas flat camera={{ position: [0, 0, 15] }}>
      <color args={["#000000"]} attach="background" />
      <OrbitControls enableZoom={true} />
      <WorldScene />
    </Canvas>
  );
};

export default World;
