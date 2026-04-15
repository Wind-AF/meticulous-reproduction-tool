import { useEffect } from "react";
import TikTokLogo from "@/components/TikTokLogo";

interface ValidationPageProps {
  onComplete: () => void;
}

const ValidationPage = ({ onComplete }: ValidationPageProps) => {
  useEffect(() => {
    const timer = setTimeout(onComplete, 3000);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="w-full max-w-md rounded-2xl bg-card p-12 text-center shadow-lg">
        <div className="mb-6 flex justify-center">
          <TikTokLogo />
        </div>
        <p className="mb-6 text-lg font-semibold text-card-foreground">
          Validando acceso...
        </p>
        <div className="flex justify-center">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-muted border-t-primary" />
        </div>
      </div>
    </div>
  );
};

export default ValidationPage;
