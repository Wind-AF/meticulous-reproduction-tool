import { ArrowLeft } from "lucide-react";

interface PaymentPageProps {
  onBack: () => void;
}

const PaymentPage = ({ onBack }: PaymentPageProps) => {
  const fee = 12.97;

  return (
    <div className="flex min-h-screen items-start justify-center bg-background px-4 py-8">
      <div className="w-full max-w-md overflow-hidden rounded-2xl bg-card shadow-lg">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4">
          <button onClick={onBack} className="text-card-foreground">
            <ArrowLeft size={24} />
          </button>
          <h1 className="text-base font-bold text-card-foreground">Pago</h1>
          <div className="w-6" />
        </div>

        {/* Pink banner */}
        <div
          className="mx-5 rounded-xl p-6 text-center"
          style={{ background: "linear-gradient(135deg, #ff4d6d, #ff2a5e)" }}
        >
          <p className="text-lg font-bold text-white">Pago de la Tasa</p>
          <p className="mt-1 text-3xl font-extrabold text-white">
            €{fee.toFixed(2).replace(".", ",")}
          </p>
        </div>

        {/* Breakdown */}
        <div className="mx-5 mt-5 rounded-xl border border-border p-5">
          <div className="flex items-center justify-between border-b border-border pb-3">
            <span className="text-sm text-muted-foreground">Tasa de verificación:</span>
            <span className="text-sm font-semibold text-card-foreground">€{fee.toFixed(2).replace(".", ",")}</span>
          </div>
          <div className="flex items-center justify-between pt-3">
            <span className="text-sm font-bold text-card-foreground">Total a pagar:</span>
            <span className="text-sm font-bold text-card-foreground">€{fee.toFixed(2).replace(".", ",")}</span>
          </div>
        </div>

        {/* Payment methods info */}
        <div className="mx-5 mt-4 rounded-xl border border-green-200 bg-green-50 p-4">
          <p className="text-sm text-card-foreground">
            <span className="font-bold text-green-700">Métodos disponibles:</span>{" "}
            <span className="text-muted-foreground">Tarjeta de crédito/débito, Google Pay y Apple Pay</span>
          </p>
        </div>

        {/* Warning */}
        <div className="mx-5 mt-4 rounded-xl border border-yellow-200 bg-yellow-50 p-4">
          <p className="text-sm text-muted-foreground">
            ⚠ Los pagos por Bizum y transferencia bancaria no están permitidos para la tasa de verificación de identidad, ya que estos métodos comprometen el proceso de reembolso automático.
          </p>
        </div>

        {/* Pay button */}
        <div className="mx-5 mt-5">
          <a
            href="https://checkout.centerpag.com/pay/PPU38CQAJ1H?"
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full rounded-xl bg-primary py-3.5 text-center text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
          >
            Pagar €{fee.toFixed(2).replace(".", ",")}
          </a>
        </div>

        <div className="px-5 py-5">
          <p className="text-center text-xs text-muted-foreground">
            🔒 Pago seguro a través de Cooud
          </p>
          <p className="text-center text-xs text-muted-foreground">
            Serás redirigido al checkout
          </p>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
