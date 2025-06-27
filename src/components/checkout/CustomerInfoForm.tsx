
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { User, Phone, MapPin, Building, Flag } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

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

// Create a schema for form validation
const checkoutSchema = z.object({
  fullName: z.string()
    .min(2, { message: "Full name must be at least 2 characters" })
    .regex(/^[A-Za-zÀ-ÿ\s]+$/, { message: "Full name can only contain letters and spaces" }),
  email: z.string().email({ message: "Valid email is required" }),
  countryCode: z.string().min(1, { message: "Country code is required" }),
  phone: z.string().min(5, { message: "Phone number is required" }),
  address: z.string().min(5, { message: "Address is required" }),
  city: z.string().min(2, { message: "City is required" }),
  state: z.string().min(2, { message: "State/Province is required" }),
  postalCode: z.string().min(3, { message: "Postal code is required" }),
  country: z.string().min(2, { message: "Country is required" }),
});

export type CheckoutFormValues = z.infer<typeof checkoutSchema>;

interface CustomerInfoFormProps {
  form: ReturnType<typeof useForm<CheckoutFormValues>>;
}

const CustomerInfoForm = ({ form }: CustomerInfoFormProps) => {
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

  const getCurrentCountryData = (countryCode: string) => {
    return COUNTRY_CODES.find(c => c.code === countryCode) || COUNTRY_CODES[0];
  };

  return (
    <div className="lg:col-span-2">
      {/* Customer Information */}
      <div className="bg-white p-6 rounded-lg shadow-sm border mb-8">
        <h2 className="text-xl font-serif font-medium mb-4">
          <User className="inline mr-2" size={20} />
          {t("Customer Information")}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <FormField
            control={form.control}
            name="fullName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("Full Name")}</FormLabel>
                <FormControl>
                  <Input 
                    {...field} 
                    onChange={(e) => {
                      // Only allow letters and spaces
                      const sanitized = e.target.value.replace(/[^A-Za-zÀ-ÿ\s]/g, '');
                      field.onChange(sanitized);
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("Email Address")}</FormLabel>
                <FormControl>
                  <Input {...field} type="email" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Phone Number with Country Code */}
        <div className="mb-4">
          <FormLabel>
            <Phone className="inline mr-2" size={16} />
            {t("Phone Number")}
          </FormLabel>
          <div className="flex gap-2">
            <FormField
              control={form.control}
              name="countryCode"
              render={({ field }) => (
                <FormItem className="w-40">
                  <FormControl>
                    <Select onValueChange={field.onChange} defaultValue={"+212"}>
                      <SelectTrigger>
                        <SelectValue placeholder="Code" />
                      </SelectTrigger>
                      <SelectContent>
                        {COUNTRY_CODES.map((country) => (
                          <SelectItem key={country.code} value={country.code}>
                            {country.code} ({country.country})
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormControl>
                    <Input 
                      {...field} 
                      type="tel" 
                      placeholder={getCurrentCountryData(form.watch("countryCode") || "+212").format}
                      onChange={(e) => {
                        // Only allow numbers and spaces
                        const sanitized = e.target.value.replace(/[^\d\s]/g, '');
                        field.onChange(sanitized);
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
      </div>

      {/* Shipping Information */}
      <div className="bg-white p-6 rounded-lg shadow-sm border mb-8">
        <h2 className="text-xl font-serif font-medium mb-4">
          <MapPin className="inline mr-2" size={20} />
          {t("Shipping Information")}
        </h2>

        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem className="mb-4">
              <FormLabel>{t("Street Address")}</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <FormField
            control={form.control}
            name="city"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  <Building className="inline mr-2" size={16} />
                  {t("City")}
                </FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="state"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("State/Province")}</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="postalCode"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("Postal Code")}</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="country"
          render={({ field }) => (
            <FormItem className="mt-4">
              <FormLabel>
                <Flag className="inline mr-2" size={16} />
                {t("Country")}
              </FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
};

export default CustomerInfoForm;
