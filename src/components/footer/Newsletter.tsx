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
  <div>
    <h3 className="text-lg mb-4 font-medium font-optima dark:text-white">
      Stay Updated
    </h3>
    <p className="text-black dark:text-white text-sm sm:text-base leading-relaxed mb-4 font-optima">
      Subscribe for latest updates on projects and offers.
    </p>

    {/* Newsletter Form */}
    <form onSubmit={onSubmit} className="mb-6">
      <div className="flex flex-col space-y-3">
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8c2e47] focus:border-transparent placeholder-gray-500 dark:placeholder-gray-400 text-sm sm:text-base transition-all duration-300 font-optima"
          required
        />
        <Button
          type="submit"
          className="w-full sm:w-auto px-6 py-3 bg-[#8c2e47] hover:bg-[#6d1f36] text-white font-medium rounded-lg transition-all duration-300 text-sm sm:text-base font-optima"
        >
          Subscribe
        </Button>
      </div>
    </form>
  </div>
);
