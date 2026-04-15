import { useEffect } from "react";
import confetti from "canvas-confetti";

interface CompletionModalProps {
  isOpen: boolean;
  totalReward: number;
  onClaim: () => void;
}

const CompletionModal = ({ isOpen, totalReward, onClaim }: CompletionModalProps) => {
  useEffect(() => {
    if (isOpen) {
      const duration = 3000;
      const end = Date.now() + duration;
      const frame = () => {
        confetti({
          particleCount: 5,
          angle: 60,
          spread: 80,
          origin: { x: 0, y: 0.6 },
          colors: ["#ff0050", "#00f2ea", "#fffc00", "#ff00ff", "#00ff00"],
        });
        confetti({
          particleCount: 5,
          angle: 120,
          spread: 80,
          origin: { x: 1, y: 0.6 },
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
      <div
        className="mx-4 w-full max-w-sm rounded-2xl p-8 text-center shadow-2xl animate-in zoom-in-95"
        style={{
          background: "linear-gradient(135deg, #c084fc, #a855f7, #9333ea)",
        }}
      >
        <p className="text-sm font-medium text-white/90">¡Enhorabuena!</p>
        <p className="mt-1 text-base font-bold text-white">
          Has completado el quiz y has ganado
        </p>
        <p className="my-3 text-5xl font-extrabold text-yellow-300">
          €{totalReward.toFixed(2)}
        </p>
        <p className="text-sm text-white/80">
          ¡Gracias por participar en nuestra encuesta!
        </p>
        <button
          onClick={onClaim}
          className="mt-6 w-full rounded-xl bg-card py-3.5 text-sm font-semibold text-card-foreground transition-opacity hover:opacity-90"
        >
          Recibir recompensa
        </button>
      </div>
    </div>
  );
};

export default CompletionModal;
