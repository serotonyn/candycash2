import { type ISourceOptions } from "@tsparticles/engine";
import { loadConfettiPreset } from "@tsparticles/preset-confetti";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { useEffect, useMemo, useState } from "react";
import { usePosStore } from "../pos/store";

export const Confettis = () => {
  const [init, setInit] = useState(false);
  const isConffettis = usePosStore((state) => state.isConffettis);
  const setIsConffettis = usePosStore((state) => state.setIsConffettis);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadConfettiPreset(engine);
    }).then(() => {
      setInit(true);
    });
  }, [isConffettis]);

  const options: ISourceOptions = useMemo(
    () => ({
      fullScreen: {
        zIndex: 1,
      },
      particles: {
        number: {
          value: 0,
        },
        color: {
          value: [
            "#f94144",
            "#f3722c",
            "#f8961e",
            "#f9844a",
            "#f9c74f",
            "#90be6d",
            "#43aa8b",
            "#4d908e",
            "#577590",
            "#277da1",
          ],
        },
        shape: {
          type: ["circle", "polygon"],
          options: {
            polygon: [
              {
                sides: 5,
              },
              {
                sides: 6,
              },
            ],
          },
        },
        opacity: {
          value: {
            min: 0,
            max: 1,
          },
          animation: {
            enable: false,
            speed: 2,
            startValue: "max",
            destroy: "min",
          },
        },
        size: {
          value: {
            min: 2,
            max: 4,
          },
        },
        links: {
          enable: false,
        },
        life: {
          duration: {
            sync: true,
            value: 5,
          },
          count: 1,
        },
        move: {
          enable: true,
          gravity: {
            enable: true,
            acceleration: 10,
          },
          speed: {
            min: 10,
            max: 20,
          },
          decay: 0.1,
          direction: "none",
          straight: false,
          outModes: {
            default: "destroy",
            top: "none",
          },
        },
        rotate: {
          value: {
            min: 0,
            max: 360,
          },
          direction: "random",
          move: true,
          animation: {
            enable: true,
            speed: 60,
          },
        },
        tilt: {
          direction: "random",
          enable: true,
          move: true,
          value: {
            min: 0,
            max: 360,
          },
          animation: {
            enable: true,
            speed: 60,
          },
        },
        roll: {
          darken: {
            enable: true,
            value: 25,
          },
          enable: true,
          speed: {
            min: 15,
            max: 25,
          },
        },
        wobble: {
          distance: 30,
          enable: true,
          move: true,
          speed: {
            min: -15,
            max: 15,
          },
        },
      },
      emitters: {
        startCount: 1,
        life: {
          count: 0,
          duration: 0.1,
          delay: 2.4,
        },
        rate: {
          delay: 0.1,
          quantity: 200,
        },
        size: {
          width: 0,
          height: 0,
        },
      },
    }),
    []
  );

  if (init && isConffettis) {
    return (
      <div
        style={{
          position: "absolute",
        }}
        onClick={() => setIsConffettis(false)}>
        <Particles id="1" options={options} />
        <Particles id="2" options={{ ...options }} />
        <Particles id="3" options={options} />
        <Particles id="4" options={options} />
      </div>
    );
  }

  return <></>;
};
