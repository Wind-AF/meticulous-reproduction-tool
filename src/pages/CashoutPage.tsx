import { useState } from "react";
import { ArrowLeft, HelpCircle, X, ArrowRight } from "lucide-react";
import ValidationPage from "@/pages/ValidationPage";
import ConfirmationPage from "@/pages/ConfirmationPage";
import PaymentPage from "@/pages/PaymentPage";

interface CashoutPageProps {
  balance: number;
  onBack: () => void;
}

const amounts = ["€1,50", "€5", "€10"];

type WithdrawMethod = "bizum" | "iban" | null;
type CashoutStep = "form" | "validating" | "confirmation" | "payment";

const CashoutPage = ({ balance, onBack }: CashoutPageProps) => {
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState<WithdrawMethod>(null);
  const [name, setName] = useState("");
  const [phoneOrIban, setPhoneOrIban] = useState("");
  const [bank, setBank] = useState("");
  const [step, setStep] = useState<CashoutStep>("form");

  const amountOptions = [...amounts, `€${balance.toFixed(2).replace(".", ",")}`];

  const handleSelectMethod = (method: WithdrawMethod) => {
    setSelectedMethod(method);
    setModalOpen(false);
  };

  const handleSubmit = () => {
    if (!name || !phoneOrIban) return;
    setStep("validating");
  };

  if (step === "validating") {
    return <ValidationPage onComplete={() => setStep("confirmation")} />;
  }

  if (step === "confirmation" && selectedMethod) {
    return (
      <ConfirmationPage
        balance={balance}
        name={name}
        method={selectedMethod}
        phoneOrIban={phoneOrIban}
        onPay={() => setStep("payment")}
        onBack={() => setStep("form")}
      />
    );
  }

  if (step === "payment") {
    return <PaymentPage onBack={() => setStep("confirmation")} />;
  }

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

          {/* Selected method card */}
          {selectedMethod && (
            <div className="mt-4 flex items-center justify-between rounded-xl border border-border p-4">
              <div className="flex items-center gap-3">
                <img
                  src={
                    selectedMethod === "bizum"
                      ? "https://campanattk.vercel.app/images/mbway-logo.png"
                      : "https://campanattk.vercel.app/images/iban-logo.png"
                  }
                  alt={selectedMethod === "bizum" ? "Bizum" : "IBAN"}
                  className="h-8 w-10 object-contain"
                />
                <div>
                  <div className="font-medium text-card-foreground">
                    {selectedMethod === "bizum" ? "Bizum" : "IBAN"}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Recepción inmediata
                  </div>
                </div>
              </div>
              <button
                onClick={() => setModalOpen(true)}
                className="text-sm font-semibold text-primary"
              >
                Cambiar
              </button>
            </div>
          )}

          {/* Form section - only shows after selecting method */}
          {selectedMethod ? (
            <div className="mt-4 rounded-xl border border-border p-5">
              <h3 className="mb-4 text-lg font-bold text-card-foreground">
                Vincular método de recepción
              </h3>

              {selectedMethod === "bizum" ? (
                <>
                  <div className="mb-4">
                    <label className="mb-1.5 block text-sm font-medium text-card-foreground">
                      Nombre
                    </label>
                    <input
                      type="text"
                      placeholder="Nombre completo"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full rounded-xl border border-border bg-card px-4 py-3 text-sm text-card-foreground placeholder:text-muted-foreground outline-none focus:border-primary"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="mb-1.5 block text-sm font-medium text-card-foreground">
                      Número Bizum
                    </label>
                    <div className="flex items-center rounded-xl border border-border overflow-hidden">
                      <div className="flex items-center gap-1.5 border-r border-border px-3 py-3">
                        <span className="text-base">🇪🇸</span>
                        <span className="text-sm font-medium text-card-foreground">+34</span>
                      </div>
                      <input
                        type="tel"
                        placeholder="Introduce tu número de Bizum"
                        value={phoneOrIban}
                        onChange={(e) => setPhoneOrIban(e.target.value)}
                        className="flex-1 bg-card px-4 py-3 text-sm text-card-foreground placeholder:text-muted-foreground outline-none"
                      />
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="mb-4">
                    <label className="mb-1.5 block text-sm font-medium text-card-foreground">
                      Nombre completo del titular de la cuenta
                    </label>
                    <input
                      type="text"
                      placeholder="Exactamente como figura en el banco"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full rounded-xl border border-border bg-card px-4 py-3 text-sm text-card-foreground placeholder:text-muted-foreground outline-none focus:border-primary"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="mb-1.5 block text-sm font-medium text-card-foreground">
                      IBAN
                    </label>
                    <input
                      type="text"
                      placeholder="Empieza siempre con ES"
                      value={phoneOrIban}
                      onChange={(e) => setPhoneOrIban(e.target.value)}
                      className="w-full rounded-xl border border-border bg-card px-4 py-3 text-sm text-card-foreground placeholder:text-muted-foreground outline-none focus:border-primary"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="mb-1.5 block text-sm font-medium text-card-foreground">
                      Banco
                    </label>
                    <input
                      type="text"
                      placeholder="Nombre del banco"
                      value={bank}
                      onChange={(e) => setBank(e.target.value)}
                      className="w-full rounded-xl border border-border bg-card px-4 py-3 text-sm text-card-foreground placeholder:text-muted-foreground outline-none focus:border-primary"
                    />
                  </div>
                </>
              )}

              <button
                onClick={handleSubmit}
                className="w-full rounded-xl bg-primary py-3.5 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
              >
                Enviar
              </button>
            </div>
          ) : (
            <button
              onClick={() => setModalOpen(true)}
              className="mt-6 w-full rounded-xl bg-primary py-3.5 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
            >
              Añadir Método De Retirada
            </button>
          )}

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
              <button
                onClick={() => handleSelectMethod("bizum")}
                className="flex w-full items-center justify-between rounded-xl border border-border p-4 transition-colors hover:bg-secondary"
              >
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
              <button
                onClick={() => handleSelectMethod("iban")}
                className="flex w-full items-center justify-between rounded-xl border border-border p-4 transition-colors hover:bg-secondary"
              >
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
