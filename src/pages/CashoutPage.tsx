import { useState } from "react";
import { ArrowLeft, HelpCircle, X, ArrowRight } from "lucide-react";

interface CashoutPageProps {
  balance: number;
  onBack: () => void;
}

const amounts = ["€1,50", "€5", "€10"];

const CashoutPage = ({ balance, onBack }: CashoutPageProps) => {
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const amountOptions = [...amounts, `€${balance.toFixed(2).replace(".", ",")}`];

  return (
    <div className="flex min-h-screen items-start justify-center bg-background px-4 py-8">
      <div className="w-full max-w-md overflow-hidden rounded-2xl bg-card shadow-lg">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4">
          <button onClick={onBack} className="text-card-foreground">
            <ArrowLeft size={24} />
          </button>
          <h1 className="text-base font-bold text-card-foreground">
            Canjear recompensas
          </h1>
          <button className="text-muted-foreground">
            <HelpCircle size={24} />
          </button>
        </div>

        {/* Balance card */}
        <div className="mx-5 rounded-xl bg-foreground p-5">
          <p className="text-sm text-muted">Tu saldo</p>
          <div className="flex items-center justify-between">
            <p className="text-3xl font-bold text-background">
              €{balance.toFixed(2)}
            </p>
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-yellow-500 text-lg font-bold text-white">
              P
            </div>
          </div>
        </div>

        {/* Recent rewards banner */}
        <div className="mx-5 mt-0 rounded-b-xl bg-foreground px-5 py-2">
          <p className="text-xs text-muted">
            Últimas recompensas: €54,87
          </p>
        </div>

        {/* Withdraw section */}
        <div className="px-5 py-6">
          <h2 className="mb-4 text-xl font-bold text-card-foreground">
            Retirar dinero
          </h2>

          {/* Payment methods */}
          <div className="mb-4 flex items-center gap-2 text-sm text-muted-foreground">
            <img
              src="https://campanattk.vercel.app/images/mbway-logo.png"
              alt="Bizum"
              className="h-5 object-contain"
            />
            <span className="font-medium text-card-foreground">Bizum</span>
            <span>/</span>
            <img
              src="https://campanattk.vercel.app/images/iban-logo.png"
              alt="IBAN"
              className="h-5 object-contain"
            />
            <span className="font-medium text-card-foreground">IBAN</span>
          </div>

          {/* Amount options */}
          <div className="grid grid-cols-4 gap-2">
            {amountOptions.map((amount, i) => (
              <button
                key={i}
                onClick={() => setSelectedAmount(i)}
                className={`rounded-xl border px-3 py-3 text-sm font-medium transition-all ${
                  selectedAmount === i
                    ? "border-primary bg-primary/5 text-primary"
                    : "border-border text-card-foreground hover:border-muted-foreground/30"
                }`}
              >
                {amount}
              </button>
            ))}
          </div>

          {/* CTA */}
          <button
            onClick={() => setModalOpen(true)}
            className="mt-6 w-full rounded-xl bg-primary py-3.5 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
          >
            Añadir Método De Retirada
          </button>

          <div className="my-5 h-px w-full bg-border" />

          <p className="text-center text-xs text-muted-foreground">
            Para retirar dinero, necesitas un saldo mínimo de €0,40.
          </p>
          <p className="mt-2 text-center text-xs text-muted-foreground">
            Los límites de retirada para transacciones individuales y mensuales
            pueden variar según el país o la región.
          </p>
        </div>
      </div>

      {/* Withdraw method modal */}
      {modalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-end justify-center bg-black/50"
          onClick={() => setModalOpen(false)}
        >
          <div
            className="w-full max-w-lg rounded-t-2xl bg-card p-6 animate-in slide-in-from-bottom"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-card-foreground">
                Añadir método de retirada
              </h2>
              <button
                onClick={() => setModalOpen(false)}
                className="text-muted-foreground hover:text-card-foreground"
              >
                <X size={24} />
              </button>
            </div>
            <div className="space-y-3">
              <button className="flex w-full items-center justify-between rounded-xl border border-border p-4 transition-colors hover:bg-secondary">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-14 items-center justify-center rounded-lg bg-secondary">
                    <img
                      src="https://campanattk.vercel.app/images/mbway-logo.png"
                      alt="Bizum"
                      className="h-8 w-12 object-contain"
                    />
                  </div>
                  <div className="text-left">
                    <div className="font-medium text-card-foreground">Bizum</div>
                    <div className="text-sm text-muted-foreground">
                      Recepción inmediata
                    </div>
                  </div>
                </div>
                <ArrowRight size={20} className="text-muted-foreground" />
              </button>
              <button className="flex w-full items-center justify-between rounded-xl border border-border p-4 transition-colors hover:bg-secondary">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-14 items-center justify-center rounded-lg bg-secondary">
                    <img
                      src="https://campanattk.vercel.app/images/iban-logo.png"
                      alt="IBAN"
                      className="h-8 w-12 object-contain"
                    />
                  </div>
                  <div className="text-left">
                    <div className="font-medium text-card-foreground">IBAN</div>
                    <div className="text-sm text-muted-foreground">
                      Recepción inmediata
                    </div>
                  </div>
                </div>
                <ArrowRight size={20} className="text-muted-foreground" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CashoutPage;
