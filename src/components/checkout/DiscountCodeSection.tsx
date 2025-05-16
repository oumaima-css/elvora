
import { Tag } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { discountCodeTranslations } from "@/lib/utils";

interface DiscountCodeSectionProps {
  discountCode: string;
  setDiscountCode: (code: string) => void;
  appliedDiscount: number | null;
  applyDiscountCode: () => void;
  removeDiscount: () => void;
}

const DiscountCodeSection = ({
  discountCode,
  setDiscountCode,
  appliedDiscount,
  applyDiscountCode,
  removeDiscount,
}: DiscountCodeSectionProps) => {
  const { language } = useLanguage();

  return (
    <div className="mb-4">
      <div className="flex items-center gap-2 mb-2">
        <Tag size={16} className="text-red-500" />
        <Label htmlFor="discount-code" className="text-sm font-medium">
          {discountCodeTranslations[language].discount_code}
        </Label>
      </div>

      <div className="flex gap-2">
        <Input
          id="discount-code"
          value={discountCode}
          onChange={(e) => setDiscountCode(e.target.value)}
          placeholder="80off"
          disabled={appliedDiscount !== null}
          className="flex-grow"
        />
        {appliedDiscount === null ? (
          <Button
            type="button"
            onClick={applyDiscountCode}
            disabled={!discountCode}
            className="bg-red-500 hover:bg-red-600 text-white"
          >
            {discountCodeTranslations[language].apply}
          </Button>
        ) : (
          <Button type="button" onClick={removeDiscount} variant="outline">
            ✕
          </Button>
        )}
      </div>

      {appliedDiscount !== null && (
        <p className="text-sm text-green-600 mt-1">
          {discountCodeTranslations[language].discount_applied}: {appliedDiscount}%
        </p>
      )}
    </div>
  );
};

export default DiscountCodeSection;
