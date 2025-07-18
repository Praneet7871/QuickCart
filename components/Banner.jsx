'use client';
import React, { useEffect, useRef } from "react";
import { assets } from "@/assets/assets";
import Image from "next/image";

const Banner = () => {
  const canvasRef = useRef();

  useEffect(() => {
    const canvas = canvasRef.current;
    let can_w = window.innerWidth;
    let can_h = window.innerHeight;
    canvas.width = can_w;
    canvas.height = can_h;
    const ctx = canvas.getContext("2d");

    const BALL_NUM = 30;
    const R = 6;
    const link_line_width = 2;
    const dis_limit = 260;
    const alpha_f = 0.03;
    let balls = [];
    let mouse_in = false;

 const mouse_ball = { x: 0, y: 0, vx: 0, vy: 0, r: R, alpha: 1, phase: 0 };


    const getRandomSpeed = (pos) => {
      switch (pos) {
        case "top": return [Math.random() * 2 - 1, Math.random()];
        case "right": return [Math.random() * -1, Math.random() * 2 - 1];
        case "bottom": return [Math.random() * 2 - 1, Math.random() * -1];
        case "left": return [Math.random(), Math.random() * 2 - 1];
        default: return [0, 0];
      }
    };

    const randomSidePos = (length) => Math.ceil(Math.random() * length);

    const getRandomBall = () => {
      const pos = ["top", "right", "bottom", "left"][Math.floor(Math.random() * 4)];
      const [vx, vy] = getRandomSpeed(pos);
      const base = { vx, vy, r: R, alpha: 1, phase: Math.random() * 10 };

      if (pos === "top") return { x: randomSidePos(can_w), y: -R, ...base };
      if (pos === "right") return { x: can_w + R, y: randomSidePos(can_h), ...base };
      if (pos === "bottom") return { x: randomSidePos(can_w), y: can_h + R, ...base };
      if (pos === "left") return { x: -R, y: randomSidePos(can_h), ...base };
    };

    const renderBalls = () => {
      balls.forEach((b) => {
        if (!b.type) {
          ctx.fillStyle = `rgba(207,255,4,${b.alpha})`;
          ctx.beginPath();
          ctx.arc(b.x, b.y, R, 0, Math.PI * 2, true);
          ctx.closePath();
          ctx.fill();
        }
      });
    };

    const updateBalls = () => {
      const newBalls = [];
      balls.forEach((b) => {
        b.x += b.vx;
        b.y += b.vy;
        b.phase += alpha_f;
        b.alpha = Math.abs(Math.cos(b.phase));
        if (b.x > -50 && b.x < can_w + 50 && b.y > -50 && b.y < can_h + 50) {
          newBalls.push(b);
        }
      });
      balls = newBalls;
    };

    const getDis = (b1, b2) =>
      Math.sqrt((b1.x - b2.x) ** 2 + (b1.y - b2.y) ** 2);

    const renderLines = () => {
      for (let i = 0; i < balls.length; i++) {
        for (let j = i + 1; j < balls.length; j++) {
          const dis = getDis(balls[i], balls[j]);
          if (dis < dis_limit) {
            const alpha = 1 - dis / dis_limit;
            ctx.strokeStyle = `rgba(150,150,150,${alpha})`;
            ctx.lineWidth = link_line_width;
            ctx.beginPath();
            ctx.moveTo(balls[i].x, balls[i].y);
            ctx.lineTo(balls[j].x, balls[j].y);
            ctx.stroke();
            ctx.closePath();
          }
        }
      }
    };

    const addBalls = () => {
      while (balls.length < BALL_NUM) {
        balls.push(getRandomBall());
      }
    };

    const render = () => {
      ctx.clearRect(0, 0, can_w, can_h);
      renderBalls();
      renderLines();
      updateBalls();
      addBalls();
      requestAnimationFrame(render);
    };

    const init = () => {
      for (let i = 0; i < BALL_NUM; i++) {
        balls.push({
          x: randomSidePos(can_w),
          y: randomSidePos(can_h),
          vx: getRandomSpeed("top")[0],
          vy: getRandomSpeed("top")[1],
          r: R,
          alpha: 1,
          phase: Math.random() * 10,
        });
      }
      render();
    };

    init();

    window.addEventListener("resize", () => {
      can_w = window.innerWidth;
      can_h = window.innerHeight;
      canvas.width = can_w;
      canvas.height = can_h;
    });

    canvas.addEventListener("mouseenter", () => {
      mouse_in = true;
      balls.push(mouse_ball);
    });

    canvas.addEventListener("mouseleave", () => {
      mouse_in = false;
      balls = balls.filter((b) => !b.type);
    });

    canvas.addEventListener("mousemove", (e) => {
      mouse_ball.x = e.pageX;
      mouse_ball.y = e.pageY;
    });
  }, []);

  return (
    <div className="relative my-16 rounded-xl overflow-hidden h-[200px]">
      <canvas
        ref={canvasRef}
        className="absolute top-0 left-0 w-full h-full z-0 bg-black/50"
      />
      <div className="relative z-10 flex flex-col md:flex-row items-center justify-between md:pl-4 py-14 md:py-0 bg-transparent backdrop-blur-sm">
        <Image
          className="max-w-56"
          src={assets.jbl_soundbox_image}
          alt="jbl_soundbox_image"
        />
        <div className="flex flex-col items-center justify-center text-center space-y-2 px-4 md:px-0">
          <h2 className="text-2xl md:text-3xl font-semibold max-w-[290px] text-white">
            Level Up Modelling Experience
          </h2>
          <p className="max-w-[343px] font-medium text-white/70">
            Import and upload Models Quickly
          </p>
        </div>
        <Image
          className="hidden md:block max-w-[250px] pr-4"
          src={assets.md_controller_image}
          alt="md_controller_image"
        />
        <Image
          className="md:hidden max-w-[250px] pr-4"
          src={assets.sm_controller_image}
          alt="sm_controller_image"
        />
      </div>
    </div>
  );
};

export default Banner;
