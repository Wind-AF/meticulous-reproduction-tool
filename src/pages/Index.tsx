import { useState } from "react";
import TikTokLogo from "@/components/TikTokLogo";
import WithdrawModal from "@/components/WithdrawModal";

const options = [
  { emoji: "😍", label: "Excelente" },
  { emoji: "😊", label: "Buena" },
  { emoji: "😐", label: "Regular" },
  { emoji: "😒", label: "Mala" },
];

const Index = () => {
  const [selected, setSelected] = useState<number | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [balance] = useState(0);
  const [progress] = useState(0);

  return (
    <div className="flex min-h-screen items-start justify-center bg-background px-4 py-8">
      <div className="w-full max-w-md overflow-hidden rounded-2xl bg-card shadow-lg">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-3">
          <TikTokLogo />
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-card-foreground">€{balance}</span>
            <button
              onClick={() => setModalOpen(true)}
              className="rounded-full bg-primary px-4 py-1.5 text-xs font-bold uppercase tracking-wide text-primary-foreground transition-opacity hover:opacity-90"
            >
              RETIRAR
            </button>
          </div>
        </div>

        {/* Progress bar */}
        <div className="h-1 w-full bg-muted">
          <div
            className="h-full bg-primary transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Quiz */}
        <div className="px-5 py-6">
          <h1 className="mb-2 text-center text-xl font-bold text-card-foreground leading-tight">
            ¿Cómo valoras tu experiencia general en TikTok?
          </h1>
          <p className="mb-6 text-center text-sm text-muted-foreground">
            Selecciona una opción para continuar:
          </p>

          <div className="space-y-3">
            {options.map((opt, i) => (
              <button
                key={i}
                onClick={() => setSelected(i)}
                className={`flex w-full items-center justify-between rounded-xl border px-4 py-3.5 transition-all ${
                  selected === i
                    ? "border-primary bg-primary/5"
                    : "border-border hover:border-muted-foreground/30"
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{opt.emoji}</span>
                  <span className="text-sm font-medium text-card-foreground">{opt.label}</span>
                </div>
                <div
                  className={`flex h-5 w-5 items-center justify-center rounded border-2 transition-colors ${
                    selected === i
                      ? "border-primary bg-primary"
                      : "border-muted-foreground/40"
                  }`}
                >
                  {selected === i && (
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <path d="M2 6L5 9L10 3" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                </div>
              </button>
            ))}
          </div>

          <button
            disabled={selected === null}
            className={`mt-6 w-full rounded-xl py-3.5 text-sm font-semibold transition-all ${
              selected !== null
                ? "bg-primary text-primary-foreground hover:opacity-90"
                : "bg-muted text-muted-foreground cursor-not-allowed"
            }`}
          >
            Continuar
          </button>

          <p className="mt-4 text-center text-sm font-medium text-accent cursor-pointer hover:underline">
            Participa en un bono adicional
          </p>

          <div className="my-5 h-px w-full bg-border" />
        </div>

        {/* Footer */}
        <div className="px-5 pb-5">
          <p className="text-center text-xs text-muted-foreground">
            Al participar en las actividades de recompensa, aceptas nuestros{" "}
            <a href="#" className="text-accent hover:underline">Términos</a> y{" "}
            <a href="#" className="text-accent hover:underline">Condiciones</a>.
          </p>
        </div>
      </div>

      <WithdrawModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </div>
  );
};

export default Index;
