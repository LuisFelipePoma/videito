import { ArrowLeft } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router";

interface Props {
  text?: string;
}
export const BackButton: React.FC<Props> = ({ text }) => {
  const navigate = useNavigate();
  const handleBack = () => {
    navigate(-1);
  };
  return (
    <button
      onClick={handleBack}
      className="flex items-center gap-2 hover:text-lighttextsec"
    >
      <ArrowLeft className="h-4 w-4" />
      {text}
    </button>
  );
};
