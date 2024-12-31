import { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface MatrixRainProps {
  className?: string;
}

const MatrixRain = ({ className }: MatrixRainProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Setup
    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 10);
    camera.position.z = 1;

    const renderer = new THREE.WebGLRenderer({ 
      alpha: true,
      antialias: true,
      powerPreference: "high-performance"
    });
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    containerRef.current.appendChild(renderer.domElement);

    // Création du shader
    const vertexShader = `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `;

    const fragmentShader = `
      uniform float iTime;
      uniform vec2 iResolution;
      varying vec2 vUv;

      #define RAIN_SPEED 1.0
      #define DROP_SIZE 3.0

      float rand(vec2 co) {
        return fract(sin(dot(co.xy ,vec2(12.9898,78.233))) * 43758.5453);
      }

      float rchar(vec2 outer, vec2 inner, float globalTime) {
        vec2 seed = floor(inner * 4.0) + outer.y;
        if (rand(vec2(outer.y, 23.0)) > 0.98) {
          seed += floor((globalTime + rand(vec2(outer.y, 49.0))) * 3.0);
        }
        return float(rand(seed) > 0.5);
      }

      void main() {
        vec2 fragCoord = vUv * iResolution;
        vec2 position = fragCoord.xy / iResolution.xy;
        position.x /= iResolution.x / iResolution.y;
        float globalTime = iTime * RAIN_SPEED;
        
        float scaledown = DROP_SIZE;
        float rx = fragCoord.x / (40.0 * scaledown);
        float mx = 40.0 * scaledown * fract(position.x * 30.0 * scaledown);
        vec4 result = vec4(0.0);
        
        if (mx <= 12.0 * scaledown) {
          float x = floor(rx);
          float r1x = floor(fragCoord.x / 15.0);
          
          float ry = position.y * 600.0 + rand(vec2(x, x * 3.0)) * 100000.0 + 
                     globalTime * rand(vec2(r1x, 23.0)) * 120.0;
          float my = mod(ry, 15.0);
          
          if (my <= 12.0 * scaledown) {
            float y = floor(ry / 15.0);
            float b = rchar(vec2(rx, floor(ry / 15.0)), vec2(mx, my) / 12.0, globalTime);
            float col = max(mod(-y, 24.0) - 4.0, 0.0) / 20.0;
            vec3 c = col < 0.8 ? 
                     vec3(0.0, col / 0.8, 0.0) : 
                     mix(vec3(0.0, 1.0, 0.0), vec3(1.0), (col - 0.8) / 0.2);
            
            result = vec4(c * b, 1.0);
          }
        }
        
        gl_FragColor = result;
      }
    `;

    // Création du matériau avec le shader
    const material = new THREE.ShaderMaterial({
      uniforms: {
        iTime: { value: 0 },
        iResolution: { value: new THREE.Vector2(
          containerRef.current.clientWidth,
          containerRef.current.clientHeight
        )}
      },
      vertexShader,
      fragmentShader,
      transparent: true,
    });

    // Création du plan qui remplit l'écran
    const geometry = new THREE.PlaneGeometry(2, 2);
    const plane = new THREE.Mesh(geometry, material);
    scene.add(plane);

    // Animation
    let animationFrameId: number;
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      material.uniforms.iTime.value += 0.016;
      renderer.render(scene, camera);
    };

    // Handle resize avec ResizeObserver
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const width = entry.contentRect.width;
        const height = entry.contentRect.height;
        
        renderer.setSize(width, height);
        material.uniforms.iResolution.value.set(width, height);
      }
    });

    resizeObserver.observe(containerRef.current);
    animate();

    return () => {
      resizeObserver.disconnect();
      cancelAnimationFrame(animationFrameId);
      renderer.dispose();
      scene.clear();
      if (containerRef.current?.contains(renderer.domElement)) {
        containerRef.current.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div 
      ref={containerRef} 
      className={`absolute inset-0 w-full h-full pointer-events-none ${className}`}
      style={{ 
        background: 'rgba(0,0,0,0.95)',
        mixBlendMode: 'screen'
      }}
    />
  );
};

export default MatrixRain; 