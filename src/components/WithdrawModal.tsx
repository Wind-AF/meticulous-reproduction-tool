import { X, ArrowRight } from "lucide-react";

interface WithdrawModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const WithdrawModal = ({ isOpen, onClose }: WithdrawModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/50" onClick={onClose}>
      <div
        className="w-full max-w-lg rounded-t-2xl bg-card p-6 animate-in slide-in-from-bottom"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-card-foreground">Añadir método de retirada</h2>
          <button onClick={onClose} className="text-muted-foreground hover:text-card-foreground">
            <X size={24} />
          </button>
        </div>
        <div className="space-y-3">
          <button className="flex w-full items-center justify-between rounded-xl border border-border p-4 hover:bg-secondary transition-colors">
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
                <div className="text-sm text-muted-foreground">Recepción inmediata</div>
              </div>
            </div>
            <ArrowRight size={20} className="text-muted-foreground" />
          </button>
          <button className="flex w-full items-center justify-between rounded-xl border border-border p-4 hover:bg-secondary transition-colors">
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
                <div className="text-sm text-muted-foreground">Recepción inmediata</div>
              </div>
            </div>
            <ArrowRight size={20} className="text-muted-foreground" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default WithdrawModal;
