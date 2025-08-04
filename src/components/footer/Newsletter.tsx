// components/footer/Newsletter.tsx
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useNewsletter } from "@/hooks/useNewsletter";

export const NewsletterSection = () => {
  const {
    email,
    setEmail,
    isSubmitting,
    status,
    subscribe,
  } = useNewsletter();

  return (
    <div className="w-full">
      <h3 className="text-sm sm:text-base lg:text-sm xl:text-base 2xl:text-lg mb-3 lg:mb-4">
        Stay Updated
      </h3>
      <p className="text-black dark:text-white text-xs sm:text-sm lg:text-xs xl:text-sm 2xl:text-base leading-relaxed mb-3 lg:mb-4 font-optima w-full max-w-full sm:max-w-[250px] lg:max-w-[180px] xl:max-w-[220px] 2xl:max-w-[280px]">
        Subscribe for latest updates on projects and offers.
      </p>

      {/* Newsletter Form */}
      <form onSubmit={subscribe} className="mb-6 w-full">
        <div className="flex flex-col space-y-2 lg:space-y-3 w-full max-w-full sm:max-w-[250px] lg:max-w-[180px] xl:max-w-[220px] 2xl:max-w-[280px]">
          <Input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-transparent border-0 border-b border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white rounded-none focus:outline-none focus:ring-0 focus:border-[#8c2e47] focus-visible:ring-0 focus-visible:ring-offset-0 placeholder-gray-500 dark:placeholder-gray-400 text-xs sm:text-sm lg:text-xs xl:text-sm 2xl:text-base transition-all duration-300 font-optima px-0 py-2 lg:py-3 shadow-none"
            required
            disabled={isSubmitting}
          />
          <Button
            type="submit"
            className="w-full px-4 py-2 lg:px-6 lg:py-4 bg-[#8c2e47] hover:bg-transparent border border-[#8c2e47] hover:border-[#8c2e47] hover:text-black cursor-pointer text-white font-medium rounded-full transition-all duration-300 ease-in text-xs sm:text-sm lg:text-xs xl:text-sm 2xl:text-base disabled:opacity-100 disabled:bg-[#8c2e47] disabled:border-[#8c2e47] disabled:text-white disabled:cursor-not-allowed"
            aria-label="Subscribe to newsletter"
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Subscribing...
              </span>
            ) : (
              "Subscribe"
            )}
          </Button>
        </div>

        {/* Status Messages */}
        {status.type && (
          <div className={`mt-3 p-2 rounded-md text-xs sm:text-sm transition-all duration-300 ${
            status.type === "success"
              ? "bg-green-100 text-green-800 border border-green-200 dark:bg-green-900/20 dark:text-green-400 dark:border-green-800"
              : "bg-red-100 text-red-800 border border-red-200 dark:bg-red-900/20 dark:text-red-400 dark:border-red-800"
          }`}>
            {status.message}
          </div>
        )}
      </form>
    </div>
  );
};