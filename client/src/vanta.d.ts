declare module 'vanta/dist/vanta.globe.min' {
  import type * as THREE from 'three';

  interface VantaGlobeOptions {
    el: HTMLElement;
    THREE: typeof THREE;
    mouseControls?: boolean;
    touchControls?: boolean;
    gyroControls?: boolean;
    minHeight?: number;
    minWidth?: number;
    scale?: number;
    scaleMobile?: number;
    color?: number;
    color2?: number;
    backgroundColor?: number;
    size?: number;
  }

  interface VantaEffect {
    destroy: () => void;
    resize: () => void;
  }

  // Vite's CJS/UMD interop double-wraps this module's export at runtime,
  // so the real factory function lives at `.default` of the default export.
  const moduleExport: { default: (options: VantaGlobeOptions) => VantaEffect };
  export default moduleExport;
}
