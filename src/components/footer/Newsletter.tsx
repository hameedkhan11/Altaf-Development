// components/footer/Newsletter.tsx
import { FormEvent } from "react";
import { Button } from "../ui/button";

interface NewsletterSectionProps {
  email: string;
  setEmail: (email: string) => void;
  onSubmit: (e: FormEvent) => void;
}

export const NewsletterSection = ({
  email,
  setEmail,
  onSubmit,
}: NewsletterSectionProps) => (
  <div className="w-full">
    <h3 className="text-sm sm:text-base lg:text-sm xl:text-base 2xl:text-lg mb-3 lg:mb-4">
      Stay Updated
    </h3>
    <p className="text-black dark:text-white text-xs sm:text-sm lg:text-xs xl:text-sm 2xl:text-base leading-relaxed mb-3 lg:mb-4 font-optima w-full max-w-full sm:max-w-[250px] lg:max-w-[180px] xl:max-w-[220px] 2xl:max-w-[280px]">
      Subscribe for latest updates on projects and offers.
    </p>

    {/* Newsletter Form */}
    <form onSubmit={onSubmit} className="mb-6 w-full">
      <div className="flex flex-col space-y-2 lg:space-y-3 w-full max-w-full sm:max-w-[250px] lg:max-w-[180px] xl:max-w-[220px] 2xl:max-w-[280px]">
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-3 py-2 lg:px-4 lg:py-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8c2e47] focus:border-transparent placeholder-gray-500 dark:placeholder-gray-400 text-xs sm:text-sm lg:text-xs xl:text-sm 2xl:text-base transition-all duration-300 font-optima"
          required
        />
        <Button
          type="submit"
          className="w-full px-4 py-2 lg:px-6 lg:py-4 bg-[#8c2e47] hover:bg-transparent border border-[#8c2e47] hover:border-[#8c2e47] hover:text-black cursor-pointer text-white font-medium rounded-full transition-all duration-300 ease-in text-xs sm:text-sm lg:text-xs xl:text-sm 2xl:text-base"
          aria-label="Subscribe to newsletter"
        >
          Subscribe
        </Button>
      </div>
    </form>
  </div>
);
