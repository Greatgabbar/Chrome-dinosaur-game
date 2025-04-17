"use client";

import { useState, useEffect, useRef } from "react";

function useGameState() {
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [backgroundIndex, setBackgroundIndex] = useState(0);
  const gameSpeed = useRef(5);
  const frame = useRef(0);

  const incrementScore = (amount = 1) => {
    setScore((prev) => prev + amount);
  };

  const resetGame = () => {
    if (score > highScore) {
      setHighScore(score);
    }
    setGameOver(false);
    setScore(0);
    gameSpeed.current = 5;
    frame.current = 0;
    setBackgroundIndex(0);
    setIsPlaying(true);

    return { gameSpeed: gameSpeed.current };
  };

  const startGame = () => {
    setIsPlaying(true);
    return resetGame();
  };

  const endGame = () => {
    setGameOver(true);
  };

  return {
    score,
    highScore,
    gameOver,
    isPlaying,
    backgroundIndex,
    gameSpeed,
    frame,
    incrementScore,
    resetGame,
    startGame,
    endGame,
    setBackgroundIndex,
  };
}

function useParticles() {
  const particles = useRef<
    {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      color: string;
      life: number;
    }[]
  >([]);

  interface Particle {
    x: number;
    y: number;
    size: number;
    speedX: number;
    speedY: number;
    color: string;
    life: number;
  }

  interface Dino {
    x: number;
    y: number;
    width: number;
    height: number;
  }

  interface Colors {
    particleJump: string;
    particleCollision: string;
  }

  const createJumpParticles = (dino: Dino, colors: Colors): void => {
    for (let i = 0; i < 10; i++) {
      particles.current.push({
        x: dino.x + dino.width / 2,
        y: dino.y + dino.height,
        size: Math.random() * 3 + 1,
        speedX: (Math.random() - 0.5) * 3,
        speedY: Math.random() * 2 + 1,
        color: colors.particleJump,
        life: Math.random() * 20 + 10,
      } as Particle);
    }
  };

  const createCollisionParticles = (dino: Dino, colors: Colors) => {
    for (let i = 0; i < 30; i++) {
      particles.current.push({
        x: dino.x + dino.width / 2,
        y: dino.y + dino.height / 2,
        size: Math.random() * 4 + 2,
        speedX: (Math.random() - 0.5) * 6,
        speedY: (Math.random() - 0.5) * 6,
        color: colors.particleCollision,
        life: Math.random() * 30 + 20,
      });
    }
  };

  const updateParticles = () => {
    particles.current.forEach((particle, index) => {
      particle.x += particle.speedX;
      particle.y += particle.speedY;
      particle.life--;

      if (particle.life <= 0) {
        particles.current.splice(index, 1);
      }
    });
  };

  const reset = () => {
    particles.current = [];
  };

  return {
    particles,
    createJumpParticles,
    createCollisionParticles,
    updateParticles,
    reset,
  };
}

function useClouds(canvasWidth: number) {
  const clouds = useRef<
    { x: number; y: number; width: number; speed: number }[]
  >([]);

  const initializeClouds = () => {
    clouds.current = [];
    for (let i = 0; i < 3; i++) {
      clouds.current.push({
        x: Math.random() * canvasWidth,
        y: Math.random() * 100 + 20,
        width: Math.random() * 50 + 30,
        speed: Math.random() * 1 + 0.5,
      });
    }
  };

  const updateClouds = (canvasWidth: number) => {
    clouds.current.forEach((cloud) => {
      cloud.x -= cloud.speed;

      if (cloud.x + cloud.width < 0) {
        cloud.x = canvasWidth;
        cloud.y = Math.random() * 100 + 20;
      }
    });
  };

  return {
    clouds,
    initializeClouds,
    updateClouds,
  };
}

function useTheme() {
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  const lightThemeBackgrounds = [
    {
      bg: "#f5f7fa",
      ground: "#3a3a3a",
      cloudColor: "rgba(255, 255, 255, 0.8)",
    },
    {
      bg: "#b3d9ff",
      ground: "#336699",
      cloudColor: "rgba(255, 255, 255, 0.8)",
    },
    {
      bg: "#ffe6cc",
      ground: "#cc8800",
      cloudColor: "rgba(255, 255, 255, 0.7)",
    },
    {
      bg: "#e0f7fa",
      ground: "#00796b",
      cloudColor: "rgba(255, 255, 255, 0.8)",
    },
    {
      bg: "#f0f4c3",
      ground: "#827717",
      cloudColor: "rgba(255, 255, 255, 0.7)",
    },
  ];

  const darkThemeBackgrounds = [
    {
      bg: "#1a1a2e",
      ground: "#16213e",
      cloudColor: "rgba(100, 100, 150, 0.4)",
    },
    { bg: "#0d1b2a", ground: "#1b263b", cloudColor: "rgba(70, 90, 120, 0.5)" },
    { bg: "#2c3e50", ground: "#1a2530", cloudColor: "rgba(80, 100, 130, 0.4)" },
    { bg: "#252525", ground: "#151515", cloudColor: "rgba(80, 80, 80, 0.5)" },
    { bg: "#3e1f47", ground: "#291030", cloudColor: "rgba(120, 80, 140, 0.4)" },
  ];

  const themeColors = {
    light: {
      dinoBody: "#4CAF50",
      dinoHead: "#388E3C",
      dinoTail: "#66BB6A",
      dinoLegs: "#33691E",
      cactus: "#2E7D32",
      cactusDetail: "#1B5E20",
      rock: "#795548",
      rockDetail: "#5D4037",
      bush: "#689F38",
      bushDetail: "#8BC34A",
      particleJump: "rgba(150, 150, 150, 0.7)",
      particleCollision: "rgba(255, 100, 50, 0.8)",
    },
    dark: {
      dinoBody: "#2e7d32",
      dinoHead: "#1b5e20",
      dinoTail: "#388e3c",
      dinoLegs: "#0d3311",
      cactus: "#1b5e20",
      cactusDetail: "#0d3311",
      rock: "#4e342e",
      rockDetail: "#3e2723",
      bush: "#33691e",
      bushDetail: "#558b2f",
      particleJump: "rgba(80, 110, 80, 0.7)",
      particleCollision: "rgba(200, 80, 40, 0.8)",
    },
  };

  const toggleTheme = () => {
    setIsDarkTheme((prev) => !prev);
  };

  const getCurrentColors = () => {
    return isDarkTheme ? themeColors.dark : themeColors.light;
  };

  const getCurrentBackgrounds = () => {
    return isDarkTheme ? darkThemeBackgrounds : lightThemeBackgrounds;
  };

  useEffect(() => {
    const savedTheme = localStorage.getItem("dinoGameTheme");
    if (savedTheme) {
      setIsDarkTheme(savedTheme === "dark");
    } else {
      const prefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
      setIsDarkTheme(prefersDark);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("dinoGameTheme", isDarkTheme ? "dark" : "light");
  }, [isDarkTheme]);

  return {
    isDarkTheme,
    toggleTheme,
    getCurrentColors,
    getCurrentBackgrounds,
  };
}

interface DinoState {
  x: number;
  y: number;
  width: number;
  height: number;
  originalHeight: number;
  crouchHeight: number;
  dy: number;
  gravity: number;
  jumpPower: number;
  maxFallSpeed: number;
  isCrouching: boolean;
  isJumping: boolean;
  frameCount: number;
  animationSpeed: number;
}

interface UseDinoReturn {
  dino: React.MutableRefObject<DinoState>;
  jump: () => boolean;
  crouch: () => boolean;
  standUp: () => void;
  update: () => void;
  reset: () => void;
}

function useDino(createJumpParticles: () => void): UseDinoReturn {
  const dino = useRef<DinoState>({
    x: 80,
    y: 150,
    width: 40,
    height: 40,
    originalHeight: 40,
    crouchHeight: 25,
    dy: 0,
    gravity: 0.4,
    jumpPower: -10,
    maxFallSpeed: 8,
    isCrouching: false,
    isJumping: false,
    frameCount: 0,
    animationSpeed: 5,
  });

  const jump = (): boolean => {
    if (dino.current.y === 150 && !dino.current.isJumping) {
      dino.current.dy = dino.current.jumpPower;
      dino.current.isJumping = true;
      dino.current.isCrouching = false;
      dino.current.height = dino.current.originalHeight;
      createJumpParticles();
      return true;
    }
    return false;
  };

  const crouch = (): boolean => {
    if (dino.current.y === 150 && !dino.current.isJumping) {
      dino.current.isCrouching = true;
      dino.current.height = dino.current.crouchHeight;
      dino.current.y =
        150 + (dino.current.originalHeight - dino.current.crouchHeight);
      return true;
    }
    return false;
  };

  const standUp = (): void => {
    if (dino.current.isCrouching) {
      dino.current.isCrouching = false;
      dino.current.height = dino.current.originalHeight;
      dino.current.y = 150;
    }
  };

  const update = (): void => {
    dino.current.dy += dino.current.gravity;
    if (dino.current.dy > dino.current.maxFallSpeed) {
      dino.current.dy = dino.current.maxFallSpeed;
    }
    dino.current.y += dino.current.dy;
    if (dino.current.y > 150) {
      dino.current.y = 150;
      dino.current.dy = 0;
      dino.current.isJumping = false;
    }
    dino.current.frameCount++;
  };

  const reset = (): void => {
    dino.current.y = 150;
    dino.current.dy = 0;
    dino.current.isJumping = false;
    dino.current.isCrouching = false;
    dino.current.height = dino.current.originalHeight;
    dino.current.frameCount = 0;
  };

  return {
    dino,
    jump,
    crouch,
    standUp,
    update,
    reset,
  };
}

function useObstacles(canvasWidth: number) {
  const obstacles = useRef<Obstacle[]>([]);
  const obstacleTypes = useRef<number[]>([]);
  const obstacleFrequency = 90;

  interface Obstacle {
    x: number;
    y: number;
    width: number;
    height: number;
  }

  const generateObstacle = (frame: number): void => {
    if (frame % obstacleFrequency === 0) {
      const height: number = Math.random() > 0.5 ? 40 : 30;
      const width: number = Math.random() > 0.5 ? 20 : 25;

      obstacles.current.push({
        x: canvasWidth,
        y: 190 - height,
        width,
        height,
      } as Obstacle);
      obstacleTypes.current.push(Math.floor(Math.random() * 3));
    }
  };

  interface Hitbox {
    x: number;
    y: number;
    width: number;
    height: number;
  }

  interface UpdateObstaclesParams {
    gameSpeed: number;
    onPassObstacle: () => void;
    onCollision: () => void;
    dinoRef: React.MutableRefObject<{
      x: number;
      y: number;
      width: number;
      height: number;
    }>;
  }

  const updateObstacles = ({
    gameSpeed,
    onPassObstacle,
    onCollision,
    dinoRef,
  }: UpdateObstaclesParams): void => {
    obstacles.current.forEach((obstacle, index) => {
      obstacle.x -= gameSpeed;

      const dinoHitbox: Hitbox = {
        x: dinoRef.current.x + 5,
        y: dinoRef.current.y + 5,
        width: dinoRef.current.width - 10,
        height: dinoRef.current.height - 5,
      };

      const obstacleHitbox: Hitbox = {
        x: obstacle.x + 2,
        y: obstacle.y + 2,
        width: obstacle.width - 4,
        height: obstacle.height - 4,
      };

      const collided: boolean =
        dinoHitbox.x < obstacleHitbox.x + obstacleHitbox.width &&
        dinoHitbox.x + dinoHitbox.width > obstacleHitbox.x &&
        dinoHitbox.y < obstacleHitbox.y + obstacleHitbox.height &&
        dinoHitbox.y + dinoHitbox.height > obstacleHitbox.y;

      if (collided) {
        onCollision();
      }

      if (obstacle.x + obstacle.width < 0) {
        obstacles.current.splice(index, 1);
        obstacleTypes.current.splice(index, 1);
        onPassObstacle();
      }
    });
  };

  const reset = () => {
    obstacles.current = [];
    obstacleTypes.current = [];
  };

  return {
    obstacles,
    obstacleTypes,
    generateObstacle,
    updateObstacles,
    reset,
  };
}

function useControls({
  dino,
  gameState,
  toggleTheme,
}: {
  dino: UseDinoReturn;
  gameState: ReturnType<typeof useGameState>;
  toggleTheme: () => void;
}) {
  useEffect(() => {
    interface HandleKeyDownParams {
      code: string;
      repeat: boolean;
    }

    const handleKeyDown = (e: HandleKeyDownParams): void => {
      if (!gameState.isPlaying && !gameState.gameOver) {
        gameState.startGame();
        return;
      }

      if ((e.code === "Space" || e.code === "ArrowUp") && !e.repeat) {
        dino.jump();
      }

      if (e.code === "ArrowDown") {
        dino.crouch();
      }

      if (e.code === "Enter" && gameState.gameOver) {
        gameState.resetGame();
        dino.reset();
      }

      if (e.code === "KeyT") {
        toggleTheme();
      }
    };

    const handleKeyUp = (e: HandleKeyDownParams) => {
      if (e.code === "ArrowDown") {
        dino.standUp();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [gameState.gameOver, gameState.isPlaying, dino, gameState, toggleTheme]);

  return {};
}

interface GameHeaderProps {
  score: number;
  highScore: number;
  isDarkTheme: boolean;
}

const GameHeader: React.FC<GameHeaderProps> = ({
  score,
  highScore,
  isDarkTheme,
}) => {
  return (
    <div
      className={`${
        isDarkTheme
          ? "bg-gradient-to-r from-purple-900 to-indigo-900"
          : "bg-gradient-to-r from-indigo-500 to-purple-600"
      } px-6 py-4 flex justify-between items-center transition-colors duration-300`}
    >
      <h1 className="text-3xl font-bold text-white tracking-wider">
        DINO RUNNER
      </h1>
      <div className="flex space-x-4">
        <div className="bg-white bg-opacity-20 rounded-lg px-4 py-2">
          <p className="text-lg font-semibold text-purple-300">
            SCORE: {score}
          </p>
        </div>
        <div className="bg-white bg-opacity-20 rounded-lg px-4 py-2">
          <p className="text-lg font-semibold text-emerald-400">
            HIGH: {Math.max(score, highScore)}
          </p>
        </div>
      </div>
    </div>
  );
};

interface GameOverModalProps {
  score: number;
  highScore: number;
  onRestart: () => void;
  isDarkTheme: boolean;
}

const GameOverModal: React.FC<GameOverModalProps> = ({
  score,
  highScore,
  onRestart,
  isDarkTheme,
}) => {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <div
        className={`${
          isDarkTheme ? "bg-gray-900 border-red-800" : "bg-black border-red-500"
        } bg-opacity-70 rounded-xl p-6 backdrop-blur-sm border transform transition-all duration-300 animate-pulse`}
        role="dialog"
        aria-label="Game Over"
      >
        <h2 className="text-2xl font-bold text-red-500 mb-3">GAME OVER</h2>
        <p className="text-lg text-white mb-2">Final Score: {score}</p>
        {score > highScore && (
          <p className="text-md text-yellow-400 font-semibold mb-3">
            NEW HIGH SCORE!
          </p>
        )}
        <button
          onClick={onRestart}
          className={`${
            isDarkTheme
              ? "bg-gradient-to-r from-red-800 to-orange-900 hover:from-red-900 hover:to-orange-950"
              : "bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600"
          } text-white font-bold py-2 px-6 rounded-full transform transition hover:scale-105 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50`}
          aria-label="Restart game"
        >
          TRY AGAIN
        </button>
      </div>
    </div>
  );
};

import React from "react";

interface GameControlsProps {
  isDarkTheme: boolean;
}

const GameControls: React.FC<GameControlsProps> = ({ isDarkTheme }) => {
  return (
    <div
      className={`${
        isDarkTheme
          ? "bg-gray-900 border-gray-700"
          : "bg-gray-100 border-gray-300"
      } p-4 border-t-2 transition-colors duration-300`}
    >
      <div className="flex flex-wrap justify-center gap-4 text-center">
        <ControlButton label="Jump" symbol="↑" isDarkTheme={isDarkTheme} />
        <ControlButton label="Crouch" symbol="↓" isDarkTheme={isDarkTheme} />
        <ControlButton label="Reset" symbol="⏎" isDarkTheme={isDarkTheme} />
        <ControlButton
          label="Change Theme"
          symbol="T"
          isDarkTheme={isDarkTheme}
        />
      </div>

      <p className="text-sm text-gray-500 text-center mt-3">
        Tap upper half of screen to jump, lower half to crouch (on mobile)
      </p>
    </div>
  );
};

interface ControlButtonProps {
  label: string;
  symbol: string;
  isDarkTheme: boolean;
}

const ControlButton: React.FC<ControlButtonProps> = ({
  label,
  symbol,
  isDarkTheme,
}) => {
  return (
    <div
      className={`${
        isDarkTheme ? "bg-gray-800" : "bg-gray-200"
      } rounded-lg px-4 py-2 flex items-center transition-colors duration-300`}
    >
      <div className="w-10 h-10 bg-blue-600 flex items-center justify-center rounded-full text-white font-bold mr-2">
        {symbol}
      </div>
      <p className={`${isDarkTheme ? "text-gray-300" : "text-gray-700"}`}>
        {label}
      </p>
    </div>
  );
};

// interface GameCanvasProps {
//   canvasRef: React.RefObject<HTMLCanvasElement>;
//   width: number;
//   height: number;
//   onTouchStart: (e: TouchEvent) => void;
//   onTouchEnd: () => void;
// }

// const GameCanvas: React.FC<GameCanvasProps> = ({
//   canvasRef,
//   width,
//   height,
//   onTouchStart,
//   onTouchEnd,
// }) => {
//   useEffect(() => {
//     const canvas = canvasRef.current;
//     if (!canvas) return;

//     canvas.addEventListener("touchstart", onTouchStart);
//     canvas.addEventListener("touchend", onTouchEnd);

//     return () => {
//       canvas.removeEventListener("touchstart", onTouchStart);
//       canvas.removeEventListener("touchend", onTouchEnd);
//     };
//   }, [canvasRef, onTouchStart, onTouchEnd]);

//   return (
//     <canvas
//       ref={canvasRef}
//       width={width}
//       height={height}
//       className="block w-full h-[200px]"
//       aria-label="Dino Runner Game Canvas"
//     />
//   );
// };

interface DinoState {
  x: number;
  y: number;
  width: number;
  height: number;
  isCrouching: boolean;
  frameCount: number;
  isJumping: boolean;
  animationSpeed: number;
}

interface Colors {
  dinoBody: string;
  dinoHead: string;
  dinoTail: string;
  dinoLegs: string;
  cactus: string;
  cactusDetail: string;
  rock: string;
  rockDetail: string;
  bush: string;
  bushDetail: string;
}

interface Obstacle {
  x: number;
  y: number;
  width: number;
  height: number;
}

interface Cloud {
  x: number;
  y: number;
  width: number;
}

interface Background {
  bg: string;
  ground: string;
  cloudColor: string;
}

interface Particle {
  x: number;
  y: number;
  size: number;
  color: string;
}

interface Canvas {
  width: number;
  height: number;
}

const drawUtils = {
  drawDino: (
    ctx: CanvasRenderingContext2D,
    dino: DinoState,
    isDarkTheme: boolean,
    colors: Colors
  ): void => {
    const { x, y, width, height, isCrouching, frameCount, isJumping } = dino;

    const legOffset =
      Math.floor(frameCount / dino.animationSpeed) % 2 === 0 ? 5 : -5;

    // Body
    ctx.fillStyle = colors.dinoBody;
    ctx.beginPath();
    ctx.roundRect(x, y, width, height, [8, 8, 0, 0]);
    ctx.fill();

    // Head
    ctx.fillStyle = colors.dinoHead;
    ctx.beginPath();
    ctx.roundRect(x + width - 15, y - 15, 25, 25, [10, 10, 0, 0]);
    ctx.fill();

    // Eye white
    ctx.fillStyle = "#fff";
    ctx.beginPath();
    ctx.arc(x + width - 5, y - 5, 4, 0, Math.PI * 2);
    ctx.fill();

    // Eye pupil
    ctx.fillStyle = "#000";
    ctx.beginPath();
    ctx.arc(x + width - 4, y - 4, 2, 0, Math.PI * 2);
    ctx.fill();

    // Tail
    ctx.beginPath();
    ctx.moveTo(x, y + height / 2);
    ctx.lineTo(x - 20, y + height / 3);
    ctx.lineTo(x, y + height);
    ctx.closePath();
    ctx.fillStyle = colors.dinoTail;
    ctx.fill();

    // Legs based on state
    if (!isCrouching && !isJumping) {
      ctx.fillStyle = colors.dinoLegs;
      ctx.fillRect(x + width - 10, y + height, 5, 15 + legOffset);
      ctx.fillRect(x + 10, y + height, 5, 15 - legOffset);
    } else if (isCrouching) {
      ctx.fillStyle = colors.dinoLegs;
      ctx.fillRect(x + width - 15, y + height, 8, 10);
      ctx.fillRect(x + 5, y + height, 8, 10);
    } else {
      ctx.fillStyle = colors.dinoLegs;
      ctx.fillRect(x + width - 15, y + height, 5, 10);
      ctx.fillRect(x + 10, y + height, 5, 10);
    }

    // Shadow
    ctx.fillStyle = isDarkTheme ? "rgba(0,0,0,0.3)" : "rgba(0,0,0,0.2)";
    ctx.beginPath();
    ctx.ellipse(
      x + width / 2,
      y + height + 15,
      width / 2,
      5,
      0,
      0,
      Math.PI * 2
    );
    ctx.fill();
  },

  drawObstacle: (
    ctx: CanvasRenderingContext2D,
    obstacle: Obstacle,
    type: number,
    colors: Colors
  ): void => {
    switch (type) {
      case 0: // Cactus
        ctx.fillStyle = colors.cactus;
        ctx.beginPath();
        ctx.roundRect(
          obstacle.x,
          obstacle.y - 10,
          obstacle.width,
          obstacle.height + 10,
          [5, 5, 0, 0]
        );
        ctx.fill();

        ctx.beginPath();
        ctx.roundRect(obstacle.x - 8, obstacle.y + 15, 8, 10, [2, 0, 0, 2]);
        ctx.fill();

        ctx.beginPath();
        ctx.roundRect(
          obstacle.x + obstacle.width,
          obstacle.y + 10,
          8,
          15,
          [0, 2, 2, 0]
        );
        ctx.fill();

        ctx.strokeStyle = colors.cactusDetail;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(obstacle.x + obstacle.width / 2, obstacle.y);
        ctx.lineTo(
          obstacle.x + obstacle.width / 2,
          obstacle.y + obstacle.height
        );
        ctx.stroke();
        break;

      case 1: // Rock
        ctx.fillStyle = colors.rock;
        ctx.beginPath();
        ctx.roundRect(
          obstacle.x,
          obstacle.y,
          obstacle.width + 5,
          obstacle.height,
          [8, 8, 0, 0]
        );
        ctx.fill();

        ctx.fillStyle = colors.rockDetail;
        ctx.beginPath();
        ctx.arc(obstacle.x + 10, obstacle.y + 10, 3, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.arc(obstacle.x + 20, obstacle.y + 15, 2, 0, Math.PI * 2);
        ctx.fill();
        break;

      case 2: // Bush
        ctx.fillStyle = colors.bush;
        ctx.beginPath();
        ctx.arc(obstacle.x + 15, obstacle.y + 20, 20, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = colors.bushDetail;
        ctx.beginPath();
        ctx.arc(obstacle.x + 25, obstacle.y + 15, 15, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = colors.bush;
        ctx.beginPath();
        ctx.arc(obstacle.x + 5, obstacle.y + 15, 12, 0, Math.PI * 2);
        ctx.fill();
        break;

      default:
        ctx.fillStyle = colors.rock;
        ctx.fillRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);
    }
  },

  drawClouds: (
    ctx: CanvasRenderingContext2D,
    clouds: Cloud[],
    backgroundIndex: number,
    backgrounds: Background[]
  ): void => {
    ctx.fillStyle = backgrounds[backgroundIndex].cloudColor;

    clouds.forEach((cloud) => {
      ctx.beginPath();
      ctx.arc(cloud.x, cloud.y, cloud.width / 2, 0, Math.PI * 2);
      ctx.arc(
        cloud.x + cloud.width / 2,
        cloud.y - cloud.width / 4,
        cloud.width / 3,
        0,
        Math.PI * 2
      );
      ctx.arc(cloud.x + cloud.width, cloud.y, cloud.width / 2, 0, Math.PI * 2);
      ctx.fill();
    });
  },

  drawParticles: (
    ctx: CanvasRenderingContext2D,
    particles: Particle[]
  ): void => {
    particles.forEach((particle) => {
      ctx.fillStyle = particle.color;
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
      ctx.fill();
    });
  },

  drawStartScreen: (
    ctx: CanvasRenderingContext2D,
    canvas: Canvas,
    isDarkTheme: boolean
  ): void => {
    ctx.fillStyle = isDarkTheme ? "#e0e0e0" : "#333";
    ctx.font = "bold 20px 'Press Start 2P', monospace";
    ctx.textAlign = "center";
    ctx.fillText("PRESS ANY KEY TO START", canvas.width / 2, 80);

    ctx.font = "bold 14px 'Press Start 2P', monospace";
    ctx.fillText("OR TAP THE SCREEN", canvas.width / 2, 110);
  },
};

// Main component with significantly reduced complexity

export default function Home() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const requestRef = useRef<number>(0);

  // Initialize theme
  const { isDarkTheme, toggleTheme, getCurrentColors, getCurrentBackgrounds } =
    useTheme();

  // Initialize game state
  const gameState = useGameState();

  // Initialize particles system
  const particleSystem = useParticles();

  // Initialize clouds
  const cloudSystem = useClouds(canvasRef.current?.width || 800);

  // Custom dino hook with particle integration
  const createJumpParticles = () => {
    particleSystem.createJumpParticles(
      dinoController.dino.current,
      getCurrentColors()
    );
  };

  const dinoController = useDino(createJumpParticles);

  // Initialize obstacles
  const obstacleController = useObstacles(canvasRef.current?.width || 800);

  // Initialize controls
  useControls({
    dino: dinoController,
    gameState,
    toggleTheme,
  });

  // Initialize clouds on mount
  useEffect(() => {
    cloudSystem.initializeClouds();
  }, []);

  // Handle touch controls
  // const handleTouchStart = (e: TouchEvent) => {
  //   if (!gameState.isPlaying && !gameState.gameOver) {
  //     gameState.startGame();
  //     return;
  //   }

  //   if (gameState.gameOver) {
  //     handleRestart();
  //     return;
  //   }

  //   const touch = e.touches[0];
  //   const canvas = canvasRef.current;
  //   if (!canvas) return;

  //   if (
  //     touch.clientY <
  //     canvas.getBoundingClientRect().top + canvas.height / 2
  //   ) {
  //     dinoController.jump();
  //   } else {
  //     dinoController.crouch();
  //   }
  // };

  // const handleTouchEnd = () => {
  //   dinoController.standUp();
  // };

  // // Handle restart
  // const handleRestart = () => {
  //   gameState.resetGame();
  //   dinoController.reset();
  //   obstacleController.reset();
  //   particleSystem.reset();
  // };

  // Game loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas dimensions - responsive
    canvas.width = Math.min(800, window.innerWidth - 40);
    canvas.height = 200;

    const backgrounds = getCurrentBackgrounds();
    const colors = getCurrentColors();

    // Handle start screen
    if (!gameState.isPlaying && !gameState.gameOver) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = backgrounds[0].bg;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = backgrounds[0].ground;
      ctx.fillRect(0, canvas.height - 10, canvas.width, 10);

      // Draw dino in start position
      drawUtils.drawDino(ctx, dinoController.dino.current, isDarkTheme, colors);

      // Draw decorative clouds
      drawUtils.drawClouds(
        ctx,
        cloudSystem.clouds.current,
        gameState.backgroundIndex,
        backgrounds
      );

      // Draw start instructions
      drawUtils.drawStartScreen(ctx, canvas, isDarkTheme);

      return;
    }

    // Main game animation loop
    const gameLoop = () => {
      if (gameState.gameOver) return;

      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw background
      const currentBg = backgrounds[gameState.backgroundIndex];
      ctx.fillStyle = currentBg.bg;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Update and draw clouds
      cloudSystem.updateClouds(canvas.width);
      drawUtils.drawClouds(
        ctx,
        cloudSystem.clouds.current,
        gameState.backgroundIndex,
        backgrounds
      );

      // Draw ground
      ctx.fillStyle = currentBg.ground;
      ctx.fillRect(0, 190, canvas.width, 10);

      // Ground texture
      ctx.strokeStyle = isDarkTheme
        ? "rgba(255,255,255,0.05)"
        : "rgba(0,0,0,0.1)";
      ctx.beginPath();
      for (let i = 0; i < canvas.width; i += 40) {
        ctx.moveTo(i, 190);
        ctx.lineTo(i + 20, 190);
      }
      ctx.stroke();

      // Update dino position
      dinoController.update();

      // Draw dino
      drawUtils.drawDino(ctx, dinoController.dino.current, isDarkTheme, colors);

      // Generate obstacles
      obstacleController.generateObstacle(gameState.frame.current);

      // Update and draw obstacles
      obstacleController.updateObstacles({
        gameSpeed: gameState.gameSpeed.current,
        onPassObstacle: () => gameState.incrementScore(5),
        onCollision: () => {
          particleSystem.createCollisionParticles(
            dinoController.dino.current,
            colors
          );
          gameState.endGame();
        },
        dinoRef: dinoController.dino,
      });

      // Draw obstacles
      obstacleController.obstacles.current.forEach((obstacle, index) => {
        drawUtils.drawObstacle(
          ctx,
          obstacle,
          obstacleController.obstacleTypes.current[index],
          colors
        );
      });

      // Update and draw particles
      particleSystem.updateParticles();
      drawUtils.drawParticles(ctx, particleSystem.particles.current);

      // Increment score
      if (gameState.frame.current % 10 === 0) {
        gameState.incrementScore();
      }

      // Increase speed over time
      if (gameState.frame.current % 500 === 0) {
        gameState.gameSpeed.current += 0.25;
      }

      // Change background occasionally
      if (
        gameState.frame.current % 1000 === 0 &&
        gameState.frame.current !== 0
      ) {
        gameState.setBackgroundIndex((prev) => (prev + 1) % backgrounds.length);
      }

      // Increment frame counter
      gameState.frame.current++;

      // Continue animation loop
      requestRef.current = requestAnimationFrame(gameLoop);
    };

    requestRef.current = requestAnimationFrame(gameLoop);

    // Cleanup animation frame on unmount
    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [
    gameState.gameOver,
    gameState.backgroundIndex,
    gameState.isPlaying,
    gameState,
    isDarkTheme,
    cloudSystem,
    dinoController,
    getCurrentBackgrounds,
    getCurrentColors,
    obstacleController,
    particleSystem,
  ]);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      const canvas = canvasRef.current;
      if (canvas) {
        canvas.width = Math.min(800, window.innerWidth - 40);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div
      className={`min-h-screen flex flex-col items-center justify-center ${
        isDarkTheme
          ? "bg-gradient-to-b from-gray-900 to-gray-950"
          : "bg-gradient-to-b from-blue-50 to-indigo-100"
      } font-sans p-4 transition-colors duration-300`}
    >
      <div
        className={`w-full max-w-3xl ${
          isDarkTheme ? "bg-gray-800" : "bg-white"
        } rounded-xl shadow-2xl overflow-hidden border-4 ${
          isDarkTheme ? "border-gray-700" : "border-gray-300"
        } transition-colors duration-300`}
      >
        <GameHeader
          score={gameState.score}
          highScore={gameState.highScore}
          isDarkTheme={isDarkTheme}
        />

        <div className="relative">
          <canvas ref={canvasRef} className="block w-full h-[200px]" />

          {gameState.gameOver && (
            <GameOverModal
              score={gameState.score}
              highScore={gameState.highScore}
              onRestart={() => {
                gameState.resetGame();
                dinoController.reset();
                obstacleController.reset();
              }}
              isDarkTheme={isDarkTheme}
            />
          )}
        </div>

        <GameControls isDarkTheme={isDarkTheme} />
      </div>
    </div>
  );
}
