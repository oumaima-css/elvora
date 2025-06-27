
import { CreditCard, CreditCardIcon, Wallet, Truck } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

// Country codes with their phone number formats
const COUNTRY_CODES = [
  { country: "Morocco", code: "+212", format: "+212 XXXXXXXXX", digits: 9 },
  { country: "France", code: "+33", format: "+33 X XX XX XX XX", digits: 9 },
  { country: "Spain", code: "+34", format: "+34 XXX XXX XXX", digits: 9 },
  { country: "USA", code: "+1", format: "+1 XXX XXX XXXX", digits: 10 },
  { country: "UK", code: "+44", format: "+44 XXXX XXXXXX", digits: 10 },
  { country: "Germany", code: "+49", format: "+49 XXX XXXXXXX", digits: 10 },
  { country: "Italy", code: "+39", format: "+39 XXX XXX XXXX", digits: 10 },
  { country: "Canada", code: "+1", format: "+1 XXX XXX XXXX", digits: 10 },
  { country: "UAE", code: "+971", format: "+971 XX XXX XXXX", digits: 8 },
  { country: "Saudi Arabia", code: "+966", format: "+966 XX XXX XXXX", digits: 8 },
];

interface PaymentMethodSectionProps {
  paymentMethod: string;
  setPaymentMethod: (method: string) => void;
  selectedCountryCode?: string;
  setSelectedCountryCode?: (code: string) => void;
  onValidationChange?: (isValid: boolean) => void;
}

const PaymentMethodSection = ({
  paymentMethod,
  setPaymentMethod,
  selectedCountryCode = "+212",
  setSelectedCountryCode,
  onValidationChange,
}: PaymentMethodSectionProps) => {
  const { t } = useLanguage();

  const validatePhoneNumber = (phone: string, countryCode: string): boolean => {
    const countryData = COUNTRY_CODES.find(c => c.code === countryCode);
    if (!countryData) return false;
    
    // Remove country code and check if remaining digits match expected length
    const phoneWithoutCode = phone.replace(countryCode, '').replace(/\s/g, '');
    const isNumeric = /^\d+$/.test(phoneWithoutCode);
    const hasCorrectLength = phoneWithoutCode.length === countryData.digits;
    
    return isNumeric && hasCorrectLength;
  };

  const validateFullName = (name: string): boolean => {
    // Only letters and spaces, at least 2 characters
    return /^[A-Za-zÀ-ÿ\s]{2,}$/.test(name) && name.trim().length >= 2;
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Only allow numbers, plus sign, and spaces
    const sanitized = value.replace(/[^+\d\s]/g, '');
    e.target.value = sanitized;
    
    const isValid = validatePhoneNumber(sanitized, selectedCountryCode);
    onValidationChange?.(isValid);
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Only allow letters and spaces
    const sanitized = value.replace(/[^A-Za-zÀ-ÿ\s]/g, '');
    e.target.value = sanitized;
    
    const isValid = validateFullName(sanitized);
    onValidationChange?.(isValid);
  };

  const getCurrentCountryData = () => {
    return COUNTRY_CODES.find(c => c.code === selectedCountryCode) || COUNTRY_CODES[0];
  };

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
        <TabsList className="mb-4 grid grid-cols-4 w-full">
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
          <TabsTrigger value="cash-on-delivery" className="flex items-center gap-2">
            <Truck className="h-4 w-4" />
            <span className="hidden sm:inline">{t("Cash on Delivery")}</span>
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
            <Input 
              id="name-on-card" 
              placeholder="John Doe" 
              required 
              onChange={handleNameChange}
              title="Only letters and spaces are allowed"
            />
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

        <TabsContent value="cash-on-delivery">
          <div className="text-center py-6">
            <Truck className="h-12 w-12 text-gold mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">{t("Pay on Delivery")}</h3>
            <p className="text-muted-foreground mb-4">
              {t("Pay with cash when your order arrives at your doorstep.")}
            </p>
            <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4">
              <p className="text-sm text-yellow-800">
                {t("Please have the exact amount ready for the delivery person.")}
              </p>
            </div>
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
