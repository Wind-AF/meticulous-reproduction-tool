import { useEffect, useState } from "react";
import { useAnimatedCounter } from "@/hooks/useAnimatedCounter";
import confetti from "canvas-confetti";

interface RewardModalProps {
  isOpen: boolean;
  reward: number;
  onContinue: () => void;
}

const RewardModal = ({ isOpen, reward, onContinue }: RewardModalProps) => {
  useEffect(() => {
    if (isOpen) {
      const duration = 2000;
      const end = Date.now() + duration;
      const frame = () => {
        confetti({
          particleCount: 3,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors: ["#ff0050", "#00f2ea", "#fffc00", "#ff00ff", "#00ff00"],
        });
        confetti({
          particleCount: 3,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors: ["#ff0050", "#00f2ea", "#fffc00", "#ff00ff", "#00ff00"],
        });
        if (Date.now() < end) requestAnimationFrame(frame);
      };
      frame();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="mx-4 w-full max-w-sm rounded-2xl bg-card p-8 text-center shadow-2xl animate-in zoom-in-95">
        <h2 className="text-xl font-bold text-primary">Nueva recompensa</h2>
        <p className="mt-2 text-sm text-card-foreground">Has ganado</p>
        <p className="my-3 text-5xl font-extrabold text-primary">
          €{reward.toFixed(2)}
        </p>
        <p className="text-sm text-muted-foreground">
          Responde a más encuestas
          <br />
          para ganar hasta €850
        </p>
        <button
          onClick={onContinue}
          className="mt-6 w-full rounded-xl bg-foreground py-3.5 text-sm font-semibold text-background transition-opacity hover:opacity-90"
        >
          Seguir recibiendo
        </button>
      </div>
    </div>
  );
};

export default RewardModal;
