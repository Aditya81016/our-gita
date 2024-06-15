import { Canvas, CanvasProps, MeshProps, useThree } from "@react-three/fiber";
import html2canvas from "html2canvas";
import { useEffect, useRef, useState } from "react";
import { Texture, TextureLoader } from "three";

export default function Canvas3D({ children, ...props }: CanvasProps) {
  const loader = new TextureLoader();

  const pageRef = useRef<HTMLDivElement>(null);

  const [canvasVisible, setCanvasVisible] = useState(false);
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [texture, setTexture] = useState<Texture | undefined>(undefined);

  useEffect(() => {
    if (pageRef.current)
      html2canvas(pageRef.current, {}).then((canvas) => {
        setTexture(loader.load(canvas.toDataURL()));
      });
  }, []);

  const onMouseDown = () => {
    if (!isMouseDown && pageRef.current) {
      setIsMouseDown(true);
      setCanvasVisible(true);
      // onMouseMove();
    } else {
      onMouseUp();
    }
  };

  // const onMouseMove = () => {
  //   if (isMouseDown && texture) setCanvasVisible(true);
  // };

  const onMouseUp = () => {
    setIsMouseDown(false);
    setCanvasVisible(false);
  };

  return (
    <div
      className="fixed w-screen h-screen"
      onClick={onMouseDown}
      // onMouseMove={onMouseMove}
      // onMouseUp={onMouseUp}
    >
      {canvasVisible ? (
        <div className="w-screen h-screen">
          <Canvas {...props}>
            <ambientLight intensity={1} />
            <Paper texture={texture} />
          </Canvas>
        </div>
      ) : (
        <div ref={pageRef}>{children}</div>
      )}
    </div>
  );
}

function Paper({
  texture,
}: MeshProps & {
  texture: Texture | undefined;
}) {
  const { size, camera } = useThree();

  camera.position.set(0, 0, 400);

  return (
    <mesh>
      <planeGeometry args={[size.width, size.height, 10, 10]} />
      <meshBasicMaterial map={texture} />
    </mesh>
  );
}
