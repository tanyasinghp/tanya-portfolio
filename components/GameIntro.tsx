"use client";

import { useEffect, useMemo, useRef, useState } from "react";

export interface GameIntroProps {
  /** Optional: called when player catches 10 balls. */
  onGameComplete?: () => void;
}

const TARGET_SCORE = 22;
const BASKET_WIDTH = 140;
const BASKET_HEIGHT = 26;
const BASKET_RADIUS = 14;
const BALL_RADIUS = 14;
const BASKET_Y_OFFSET = 28;
const LERP = 0.12;
const BACKGROUND = "#0D0D0F";

interface Ball {
  x: number;
  y: number;
  r: number;
  color: string;
  vy: number;
}

function circleRectCollision(
  cx: number,
  cy: number,
  cr: number,
  rx: number,
  ry: number,
  rw: number,
  rh: number
): boolean {
  const closestX = Math.max(rx, Math.min(cx, rx + rw));
  const closestY = Math.max(ry, Math.min(cy, ry + rh));
  const dx = cx - closestX;
  const dy = cy - closestY;
  return dx * dx + dy * dy <= cr * cr;
}

export default function GameIntro({ onGameComplete }: GameIntroProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [score, setScore] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [shake, setShake] = useState(false);

  const [time, setTime] = useState(0);
  const [finalTime, setFinalTime] = useState("0:00.00");
  const timerRef = useRef<number | null>(null);
  const startTimeRef = useRef(0);
  const [timerStarted, setTimerStarted] = useState(false);

  //// INSERT THIS BLOCK — formatted stopwatch text
  const formattedTime = useMemo(() => {
    const t = time;
    const mins = Math.floor(t / 60000);
    const secs = Math.floor((t % 60000) / 1000);
    const ms = Math.floor((t % 1000) / 10);
    return `${mins}:${secs.toString().padStart(2, "0")}.${ms
      .toString()
      .padStart(2, "0")}`;
  }, [time]);

  const palette = useMemo(
    () => ["#C78BFF", "#4cc9f0", "#00f5d4", "#f72585", "#b5179e", "#7209b7"],
    []
  );

  const scoreRef = useRef(0);
  const rafRef = useRef<number | null>(null);

  const gameRef = useRef({
    basketX: 0,
    basketTargetX: 0,
    balls: [] as Ball[],
    baseSpeed: 2.0,
    running: true,
    width: 640,
    height: 480,
    spawnAcc: 0,
    lastTime: 0,
  });

  //// INSERT THIS BLOCK — stopwatch animation loop
  const updateTime = (now: number) => {
    setTime(now - startTimeRef.current);
    timerRef.current = requestAnimationFrame(updateTime);
  };

  const stop = () => {
    gameRef.current.running = false;
    if (rafRef.current != null) cancelAnimationFrame(rafRef.current);
    rafRef.current = null;

    /// ADD stopwatch stop
    if (timerRef.current != null) cancelAnimationFrame(timerRef.current);
  };

  const start = () => {
    const g = gameRef.current;
    if (g.running) return;
    g.running = true;
    g.lastTime = performance.now();
    rafRef.current = requestAnimationFrame(loop);

    /// ADD stopwatch start
    startTimeRef.current = performance.now();
    timerRef.current = requestAnimationFrame(updateTime);
  };

  const reset = () => {
    const g = gameRef.current;
    g.balls = [];
    g.baseSpeed = 2.0;
    g.spawnAcc = 0;
    scoreRef.current = 0;
    setScore(0);

    setCompleted(false);
    setTimerStarted(false);  // ⭐ reset
    timerRef.current = null; // ⭐ allow new start
    setTime(0);              // ⭐ reset displayed time
    setFinalTime("0:00.00"); // ⭐
    start();
  };

  const resizeCanvas = () => {
    const wrapper = wrapperRef.current;
    const canvas = canvasRef.current;
    if (!wrapper || !canvas) return;
    const rect = wrapper.getBoundingClientRect();
    const w = Math.max(1, Math.floor(rect.width));
    const h = Math.max(1, Math.floor(rect.height));
    canvas.width = w;
    canvas.height = h;
    const g = gameRef.current;
    g.width = w;
    g.height = h;
    g.basketX = w / 2;
    g.basketTargetX = w / 2;
  };

  const loop = (now: number) => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    const g = gameRef.current;
    if (!canvas || !ctx || !g.running) return;

    if (!timerStarted) {
      startTimeRef.current = now;
      timerRef.current = requestAnimationFrame(updateTime);
      setTimerStarted(true);
    }

    const dt = Math.min((now - g.lastTime) / 1000, 0.05);
    g.lastTime = now;

    const w = g.width;
    const h = g.height;

    // Update basket (smooth lerp toward target)
    g.basketX += (g.basketTargetX - g.basketX) * LERP;
    const bx = g.basketX - BASKET_WIDTH / 2;
    const by = h - BASKET_Y_OFFSET - BASKET_HEIGHT;

    // Spawn balls
    g.spawnAcc += dt;
    const spawnEvery = Math.max(0.55, 1.05 - g.baseSpeed * 0.06);
    if (g.spawnAcc >= spawnEvery) {
      g.spawnAcc = 0;
      g.balls.push({
        x: BALL_RADIUS + Math.random() * (w - 2 * BALL_RADIUS),
        y: -BALL_RADIUS,
        r: BALL_RADIUS,
        color: palette[Math.floor(Math.random() * palette.length)],
        vy: g.baseSpeed + Math.random() * 0.9,
      });
    }

    // if (g.balls.length === 1 && timerRef.current === null) {
    //   startTimeRef.current = now;
    //   timerRef.current = requestAnimationFrame(updateTime);
    // }

    // Increase speed over time
    g.baseSpeed += dt * 0.12;

    // Physics + collisions
    const toRemove: number[] = [];
    let caught = false;
    let missed = false;

    for (let i = 0; i < g.balls.length; i++) {
      const ball = g.balls[i];
      ball.y += ball.vy * (dt * 60);
      if (!timerStarted && timerRef.current === null && ball.y > -BALL_RADIUS + 5) {
        startTimeRef.current = now;
        timerRef.current = requestAnimationFrame(updateTime);
        setTimerStarted(true);
      }

      if (circleRectCollision(ball.x, ball.y, ball.r, bx, by, BASKET_WIDTH, BASKET_HEIGHT)) {
        toRemove.push(i);
        caught = true;
      } else if (ball.y > h + ball.r) {
        toRemove.push(i);
        missed = true;
      }
    }

    if (missed) setShake(true);

    if (caught) {
      scoreRef.current += 1;
      const newScore = scoreRef.current;
      setScore(newScore);

      if (newScore >= TARGET_SCORE) {
        setFinalTime(formattedTime);        // ⭐ capture final stopwatch time
        setCompleted(true);
        stop();
        onGameComplete?.();
      }
    }

    toRemove.sort((a, b) => b - a).forEach((idx) => g.balls.splice(idx, 1));

    // Draw
    ctx.fillStyle = BACKGROUND;
    ctx.fillRect(0, 0, w, h);

    // Balls (glow)
    for (const ball of g.balls) {
      const glow = ctx.createRadialGradient(
        ball.x - ball.r * 0.3,
        ball.y - ball.r * 0.3,
        0,
        ball.x,
        ball.y,
        ball.r * 2.1
      );
      glow.addColorStop(0, ball.color);
      glow.addColorStop(0.55, `${ball.color}99`);
      glow.addColorStop(1, `${ball.color}00`);

      ctx.beginPath();
      ctx.arc(ball.x, ball.y, ball.r * 1.5, 0, Math.PI * 2);
      ctx.fillStyle = glow;
      ctx.fill();

      ctx.beginPath();
      ctx.arc(ball.x, ball.y, ball.r, 0, Math.PI * 2);
      ctx.fillStyle = ball.color;
      ctx.fill();
    }

    // Basket
    ctx.save();
    ctx.shadowColor = "#C78BFF";
    ctx.shadowBlur = 20;
    ctx.fillStyle = "#1A1A1E";
    ctx.strokeStyle = "#2A2A2D";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.roundRect(bx, by, BASKET_WIDTH, BASKET_HEIGHT, BASKET_RADIUS);
    ctx.fill();
    ctx.stroke();
    ctx.restore();

    rafRef.current = requestAnimationFrame(loop);
  };

  useEffect(() => {
    resizeCanvas();
    const wrapper = wrapperRef.current;
    if (!wrapper) return;
    const ro = new ResizeObserver(resizeCanvas);
    ro.observe(wrapper);

    // Init animation
    const g = gameRef.current;
    g.running = true;
    g.lastTime = performance.now();
    rafRef.current = requestAnimationFrame(loop);

    return () => {
      ro.disconnect();
      stop();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!shake) return;
    const t = setTimeout(() => setShake(false), 180);
    return () => clearTimeout(t);
  }, [shake]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!gameRef.current.running) return;
      const step = 30;
      if (e.key === "ArrowLeft" || e.key === "a" || e.key === "A") {
        gameRef.current.basketTargetX = Math.max(
          BASKET_WIDTH / 2,
          gameRef.current.basketTargetX - step
        );
        e.preventDefault();
      }
      if (e.key === "ArrowRight" || e.key === "d" || e.key === "D") {
        gameRef.current.basketTargetX = Math.min(
          gameRef.current.width - BASKET_WIDTH / 2,
          gameRef.current.basketTargetX + step
        );
        e.preventDefault();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const setTargetFromClientX = (clientX: number) => {
      if (!gameRef.current.running) return;
      const rect = canvas.getBoundingClientRect();
      const x = clientX - rect.left;
      gameRef.current.basketTargetX = Math.max(
        BASKET_WIDTH / 2,
        Math.min(gameRef.current.width - BASKET_WIDTH / 2, x)
      );
    };

    const onMouseMove = (e: MouseEvent) => setTargetFromClientX(e.clientX);
    const onTouchMove = (e: TouchEvent) => {
      if (!e.touches.length) return;
      e.preventDefault();
      setTargetFromClientX(e.touches[0].clientX);
    };

    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("touchmove", onTouchMove, { passive: false });
    return () => {
      canvas.removeEventListener("mousemove", onMouseMove);
      canvas.removeEventListener("touchmove", onTouchMove);
    };
  }, []);

  return (
    <div
      ref={wrapperRef}
      className="relative w-full h-full bg-[#0D0D0F] overflow-hidden rounded-2xl border border-[#2A2A2D]"
    >
      <div className="absolute top-3 left-1/2 -translate-x-1/2 z-10 text-center">
        <div
          className="text-sm sm:text-base font-semibold text-[#C78BFF] tabular-nums"
          style={{ textShadow: "0 0 16px rgba(199,139,255,0.45)" }}
        >
          {score} / {TARGET_SCORE}
        </div>
        <div
          className="text-[10px] sm:text-xs text-[#CFCFCF]/80 mt-1 tabular-nums"
          style={{ textShadow: "0 0 8px rgba(255,255,255,0.15)" }}
        >
          {formattedTime}
        </div>
      </div>

      <canvas
        ref={canvasRef}
        className={`block w-full h-full ${shake ? "game-intro-shake" : ""} ${
          completed ? "opacity-40" : "opacity-100"
        }`}
        style={{ width: "100%", height: "100%", display: "block", transition: "opacity 400ms ease" }}
      />

      {completed && (
        <div className="absolute inset-0 z-20 flex items-center justify-center bg-[#0D0D0F]/35 backdrop-blur-sm">
          <div className="text-center px-6">
            <p className="text-[#F5F5F7] text-lg sm:text-xl font-semibold">Nice catch.</p>
            <p className="text-[#CFCFCF] text-sm sm:text-base mt-2">
              You caught {TARGET_SCORE} balls. Play again anytime.
            </p>
            <p className="text-[#C78BFF] text-sm sm:text-base mt-3 font-semibold tabular-nums">
              Time: {finalTime}
            </p>
            <button
              type="button"
              onClick={reset}
              className="mt-5 inline-flex items-center justify-center px-4 py-2 rounded-xl text-sm font-medium border border-[#2A2A2D] bg-[#1A1A1E] text-[#CFCFCF] hover:border-[#C78BFF]/40 hover:text-[#C78BFF] hover:shadow-[0_0_18px_rgba(199,139,255,0.12)] transition-all duration-200"
            >
              Play again
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
