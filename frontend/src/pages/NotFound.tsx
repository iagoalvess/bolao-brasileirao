import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import PageHeader from "@/components/PageHeader";
import PageFooter from "@/components/PageFooter";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-soccer-field via-soccer-green to-soccer-yellow p-4 sm:p-6">
      <PageHeader showBackButton onBackClick={() => navigate("/home")} />
      
      <div className="w-full max-w-5xl mx-auto flex-grow flex flex-col">
        <div className="flex-grow flex items-center justify-center text-center">
          <div className="space-y-6">
            <h1 className="text-6xl font-extrabold text-white drop-shadow-lg">
              404
            </h1>
            <p className="text-xl sm:text-2xl text-white/80">
              Opa! A página que você tentou acessar não existe.
            </p>
          </div>
        </div>
      </div>

      <PageFooter />
    </div>
  );
};

export default NotFound;
