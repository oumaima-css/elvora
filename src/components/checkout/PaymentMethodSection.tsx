
import { CreditCard, CreditCardIcon, Wallet } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface PaymentMethodSectionProps {
  paymentMethod: string;
  setPaymentMethod: (method: string) => void;
}

const PaymentMethodSection = ({
  paymentMethod,
  setPaymentMethod,
}: PaymentMethodSectionProps) => {
  const { t } = useLanguage();

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border mb-8">
      <h2 className="text-xl font-serif font-medium mb-4">
        {t("Payment Method")}
      </h2>

      <Tabs
        defaultValue="credit-card"
        onValueChange={setPaymentMethod}
        value={paymentMethod}
      >
        <TabsList className="mb-4 grid grid-cols-3 w-full">
          <TabsTrigger
            value="credit-card"
            className="flex items-center gap-2"
          >
            <CreditCard className="h-4 w-4" />
            <span className="hidden sm:inline">{t("Credit Card")}</span>
          </TabsTrigger>
          <TabsTrigger value="paypal" className="flex items-center gap-2">
            <CreditCardIcon className="h-4 w-4" />
            <span className="hidden sm:inline">PayPal</span>
          </TabsTrigger>
          <TabsTrigger value="other" className="flex items-center gap-2">
            <Wallet className="h-4 w-4" />
            <span className="hidden sm:inline">{t("Other")}</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="credit-card">
          <div className="mb-4">
            <Label htmlFor="card-number">{t("Card Number")}</Label>
            <Input
              id="card-number"
              placeholder="1234 5678 9012 3456"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <Label htmlFor="expiry">{t("Expiry Date")}</Label>
              <Input id="expiry" placeholder="MM/YY" required />
            </div>
            <div>
              <Label htmlFor="cvc">CVC</Label>
              <Input id="cvc" placeholder="123" required />
            </div>
          </div>

          <div>
            <Label htmlFor="name-on-card">{t("Name on Card")}</Label>
            <Input id="name-on-card" placeholder="John Doe" required />
          </div>

          <div className="flex flex-wrap gap-3 mt-4">
            <div className="border rounded-md p-2 w-12 h-8 flex items-center justify-center">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Visa_Inc._logo.svg/2560px-Visa_Inc._logo.svg.png"
                alt="Visa"
                className="max-h-full max-w-full"
              />
            </div>
            <div className="border rounded-md p-2 w-12 h-8 flex items-center justify-center">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Mastercard-logo.svg/1280px-Mastercard-logo.svg.png"
                alt="Mastercard"
                className="max-h-full max-w-full"
              />
            </div>
            <div className="border rounded-md p-2 w-12 h-8 flex items-center justify-center">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/PayPal.svg/1200px-PayPal.svg.png"
                alt="American Express"
                className="max-h-full max-w-full"
              />
            </div>
          </div>
        </TabsContent>

        <TabsContent value="paypal">
          <div className="text-center py-6">
            <p className="text-muted-foreground mb-4">
              {t("You will be redirected to PayPal to complete your purchase securely.")}
            </p>
            <Button type="button" className="bg-blue-500 hover:bg-blue-600">
              {t("Proceed with PayPal")}
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="other">
          <div className="space-y-4">
            <div className="border rounded-md p-4 flex items-center gap-3">
              <input type="radio" id="apple-pay" name="other-payment" />
              <label htmlFor="apple-pay" className="flex items-center gap-2">
                <span className="font-medium">Apple Pay</span>
              </label>
            </div>

            <div className="border rounded-md p-4 flex items-center gap-3">
              <input type="radio" id="google-pay" name="other-payment" />
              <label htmlFor="google-pay" className="flex items-center gap-2">
                <span className="font-medium">Google Pay</span>
              </label>
            </div>

            <div className="border rounded-md p-4 flex items-center gap-3">
              <input type="radio" id="bank-transfer" name="other-payment" />
              <label htmlFor="bank-transfer" className="flex items-center gap-2">
                <span className="font-medium">{t("Bank Transfer")}</span>
              </label>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PaymentMethodSection;
