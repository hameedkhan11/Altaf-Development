import React from "react";
import { Button } from "@/components/ui/button";
import { PropertyKey } from "@/lib/types";

interface PropertySelectorProps {
  selectedProperty: PropertyKey;
  onPropertyChange: (property: PropertyKey) => void;
}

export const PropertySelector: React.FC<PropertySelectorProps> = ({
  selectedProperty,
  onPropertyChange,
}) => {
  return (
    <div className="flex gap-4 mb-6">
      <Button
        variant={selectedProperty === "1bed" ? "default" : "outline"}
        className={`${
          selectedProperty === "1bed"
            ? "bg-[rgb(140,46,71)] hover:bg-[#8B2131] text-white"
            : "border-[rgb(140,46,71)] text-[rgb(140,46,71)] hover:bg-[rgb(140,46,71)] hover:text-white"
        }`}
        onClick={() => onPropertyChange("1bed")}
      >
        1 Bedroom
      </Button>
      <Button
        variant={selectedProperty === "2bed" ? "default" : "outline"}
        className={`${
          selectedProperty === "2bed"
            ? "bg-[rgb(140,46,71)] hover:bg-[#8B2131] text-white"
            : "border-[rgb(140,46,71)] text-[rgb(140,46,71)] hover:bg-[rgb(140,46,71)] hover:text-white"
        }`}
        onClick={() => onPropertyChange("2bed")}
      >
        2 Bedroom
      </Button>
    </div>
  );
};