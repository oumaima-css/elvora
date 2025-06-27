
import { useState, useEffect } from "react";
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
  { country: "UK", code: "+44", format: "+44 XXXX XXXXXX", digits: 10 },
  { country: "Italy", code: "+39", format: "+39 XXX XXX XXXX", digits: 10 },
  { country: "UAE", code: "+971", format: "+971 XX XXX XXXX", digits: 8 },
  { country: "China", code: "+86", format: "+86 XXX XXXX XXXX", digits: 11 },
];

const countryCityMap = {
  morocco: [
    "Casablanca", "Rabat", "Marrakech", "Fes", "Tangier", "Agadir", "Meknes", "Oujda"
  ],
  uae: [
    "Dubai", "Abu Dhabi", "Sharjah", "Ajman", "Fujairah", "Ras Al Khaimah", "Umm Al Quwain", "Al Ain"
  ],
  uk: [
    "London", "Manchester", "Birmingham", "Glasgow", "Liverpool", "Bristol", "Leeds", "Edinburgh"
  ],
  france: [
    "Paris", "Marseille", "Lyon", "Toulouse", "Nice", "Nantes", "Strasbourg", "Montpellier"
  ],
  spain: [
    "Madrid", "Barcelona", "Valencia", "Seville", "Zaragoza", "Málaga", "Murcia", "Palma"
  ],
  italy: [
    "Rome", "Milan", "Naples", "Turin", "Palermo", "Genoa", "Bologna", "Florence"
  ],
  china: [
    "Beijing", "Shanghai", "Guangzhou", "Shenzhen", "Chengdu", "Hangzhou", "Wuhan", "Xi'an"
  ],
};

const countries = [
  { code: "morocco", label: "Morocco" },
  { code: "uae", label: "UAE" },
  { code: "uk", label: "UK" },
  { code: "france", label: "France" },
  { code: "spain", label: "Spain" },
  { code: "italy", label: "Italy" },
  { code: "china", label: "China" },
];

const checkoutSchema = z.object({
  fullName: z
    .string()
    .min(2, { message: "Full name must be at least 2 characters" })
    .regex(/^[A-Za-zÀ-ÿ\s]+$/, { message: "Full name can only contain letters and spaces" }),
  email: z
    .string()
    .email({ message: "Valid email is required" })
    .regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, { message: "Email must be in format: something@something.something" }),
  countryCode: z.string().min(1, { message: "Country code is required" }),
  phone: z
    .string()
    .min(5, { message: "Phone number is required" }),
  address: z
    .string()
    .min(5, { message: "Address is required" })
    .regex(/^[A-Za-z0-9\s]+$/, { message: "Address can only contain letters, numbers and spaces" }),
  city: z
    .string()
    .min(2, { message: "City is required" }),
  state: z
    .string()
    .min(2, { message: "State/Province is required" })
    .regex(/^[A-Za-z\s]+$/, { message: "State/Province must contain only letters" }),
  postalCode: z
    .string()
    .min(3, { message: "Postal code is required" })
    .regex(/^\d+$/, { message: "Postal code must contain only digits" }),
  country: z.enum([
    "morocco",
    "uae",
    "uk",
    "france",
    "spain",
    "italy",
    "china",
  ], { errorMap: () => ({ message: "Country is required" }) }),
});

export type CheckoutFormValues = z.infer<typeof checkoutSchema>;

interface CustomerInfoFormProps {
  form: ReturnType<typeof useForm<CheckoutFormValues>>;
}

const CustomerInfoForm = ({ form }: CustomerInfoFormProps) => {
  const { t } = useLanguage();
  const [cities, setCities] = useState<string[]>(countryCityMap["morocco"]);

  useEffect(() => {
    const subscription = form.watch((value) => {
      if (value.country && countryCityMap[value.country]) {
        setCities(countryCityMap[value.country]);
        form.setValue("city", "");
      }
    });
    return () => subscription.unsubscribe();
  }, [form]);

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
          {t("customer_information")}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <FormField
            control={form.control}
            name="fullName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("full_name")}</FormLabel>
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
                <FormLabel>{t("email_address")}</FormLabel>
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
            {t("phone_number")}
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
          {t("shipping_information")}
        </h2>

        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem className="mb-4">
              <FormLabel>{t("street_address")}</FormLabel>
              <FormControl>
                <Input 
                  {...field} 
                  onChange={(e) => {
                    // Only allow letters, numbers and spaces
                    const sanitized = e.target.value.replace(/[^A-Za-z0-9\s]/g, '');
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
          name="country"
          render={({ field }) => (
            <FormItem className="mt-4">
              <FormLabel>
                <Flag className="inline mr-2" size={16} />
                {t("country")}
              </FormLabel>
              <FormControl>
                <select
                  {...field}
                  className="w-full border rounded px-3 py-2"
                  defaultValue="morocco"
                  onChange={(e) => {
                    field.onChange(e);
                  }}
                >
                  {countries.map(({ code, label }) => (
                    <option key={code} value={code}>
                      {label}
                    </option>
                  ))}
                </select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <br/>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <FormField
            control={form.control}
            name="city"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  <Building className="inline mr-2" size={16} />
                  {t("city")}
                </FormLabel>
                <FormControl>
                  <select
                    {...field}
                    className="w-full border rounded px-3 py-2"
                    onChange={(e) => {
                      field.onChange(e);
                    }}
                  >
                    <option value="">-- {t('select_city')} --</option>
                    {cities.map((city) => (
                      <option key={city} value={city}>
                        {city}
                      </option>
                    ))}
                  </select>
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
                <FormLabel>{t("state_province")}</FormLabel>
                <FormControl>
                  <Input 
                    {...field} 
                    onChange={(e) => {
                      // Only allow letters and spaces
                      const sanitized = e.target.value.replace(/[^A-Za-z\s]/g, '');
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
            name="postalCode"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("postal_code")}</FormLabel>
                <FormControl>
                  <Input 
                    {...field} 
                    onChange={(e) => {
                      // Only allow numbers
                      const sanitized = e.target.value.replace(/[^\d]/g, '');
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
  );
};

export default CustomerInfoForm;
