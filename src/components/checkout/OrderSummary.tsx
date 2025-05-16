
import { Separator } from "@/components/ui/separator";
import { useLanguage } from "@/hooks/useLanguage";
import { formatPrice, isEligibleForFreeShipping, SHIPPING_FEE, shippingTranslations, Truck } from "@/lib/utils";
import DiscountCodeSection from "./DiscountCodeSection";
import { useCart } from "@/hooks/useCart";

interface OrderSummaryProps {
  discountCode: string;
  setDiscountCode: (code: string) => void;
  appliedDiscount: number | null;
  applyDiscountCode: () => void;
  removeDiscount: () => void;
}

const OrderSummary = ({
  discountCode,
  setDiscountCode,
  appliedDiscount,
  applyDiscountCode,
  removeDiscount,
}: OrderSummaryProps) => {
  const { items, getTotalPrice } = useCart();
  const { t, language } = useLanguage();

  // Calculate the final price
  const subtotal = getTotalPrice();
  const isShippingFree = isEligibleForFreeShipping(subtotal);
  const shippingCost = isShippingFree ? 0 : SHIPPING_FEE;
  const taxAmount = Math.round(subtotal * 0.1);
  const discountAmount = appliedDiscount ? (subtotal * appliedDiscount / 100) : 0;
  const finalTotal = subtotal + taxAmount + shippingCost - discountAmount;

  return (
    <div>
      <div className="bg-white p-6 rounded-lg shadow-sm border sticky top-24">
        <h2 className="text-xl font-serif font-medium mb-4">{t("Order Summary")}</h2>

        {/* Items */}
        <div className="space-y-4 mb-6">
          {items.map((item) => (
            <div key={item.product.id} className="flex justify-between">
              <div>
                <p className="font-medium">{item.product.name}</p>
                <p className="text-sm text-muted-foreground">
                  {t("Qty")}: {item.quantity}
                  {item.selectedColor && ` • ${item.selectedColor}`}
                  {item.selectedSize && ` • ${item.selectedSize}`}
                </p>
              </div>
              <p className="font-medium">
                {formatPrice(item.product.price * item.quantity)}
              </p>
            </div>
          ))}
        </div>

        {/* Shipping Notice */}
        <div className="mb-4">
          <div className="flex items-center gap-2">
            <Truck
              size={16}
              className={isShippingFree ? "text-green-500" : "text-amber-500"}
            />
            <p className="text-sm text-muted-foreground">
              {shippingTranslations[language].free_shipping_message}
            </p>
          </div>
        </div>

        {/* Discount Code Input */}
        <DiscountCodeSection
          discountCode={discountCode}
          setDiscountCode={setDiscountCode}
          appliedDiscount={appliedDiscount}
          applyDiscountCode={applyDiscountCode}
          removeDiscount={removeDiscount}
        />

        <Separator className="my-4" />

        {/* Totals */}
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-muted-foreground">{t("Subtotal")}</span>
            <span>{formatPrice(subtotal)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">
              {shippingTranslations[language].shipping_fee}
            </span>
            <span>
              {isShippingFree
                ? shippingTranslations[language].free_shipping
                : formatPrice(shippingCost)}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">{t("Tax")}</span>
            <span>{formatPrice(taxAmount)}</span>
          </div>

          {/* Show discount if applied */}
          {appliedDiscount !== null && (
            <div className="flex justify-between text-red-500">
              <span>
                {t("Discount")} ({appliedDiscount}%)
              </span>
              <span>-{formatPrice(discountAmount)}</span>
            </div>
          )}
        </div>

        <Separator className="my-4" />

        <div className="flex justify-between text-lg font-medium">
          <span>{t("Total")}</span>
          <span>{formatPrice(finalTotal)}</span>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
