import Particles from 'react-tsparticles';
import { loadSlim } from 'tsparticles-slim';
import { useCallback } from 'react';
import { Engine } from 'tsparticles-engine';

const isDesktop = document.body.clientWidth > 1100;

const options = {
  fpsLimit: 40,
  background: {
    color: 'transparent',
  },
  fullScreen: {
    enable: true,
    zIndex: -1,
  },
  particles: {
    links: {
      enable: true,
      distance: isDesktop ? 200 : 100,
    },
    move: {
      enable: true,
      speed: { min: 1, max: 2 },
    },
    opacity: {
      value: { min: 0.3, max: 1 },
    },
    size: {
      value: { min: 1, max: 5 },
    },
    number: {
      density: {
        enable: true,
        area: 800,
      },
      value: isDesktop ? 80 : 60,
    },
  },
};

const ParticlesComponent = () => {
  const particlesInit = useCallback(async (engine: Engine) => {
    await loadSlim(engine);
  }, []);

  return (
    <div className={"absolute top-0 left-0 w-screen h-screen z-0"}>
      <Particles init={particlesInit} options={options} />
    </div>
  );
};

export default ParticlesComponent;
