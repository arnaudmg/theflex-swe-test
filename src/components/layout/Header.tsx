"use client";
import { useState, useEffect } from "react";
import { Menu, ChevronDown } from "lucide-react";
import Image from "next/image";

export function Header() {
  const [showOwnersMenu, setShowOwnersMenu] = useState(false);
  const [showLanguageMenu, setShowLanguageMenu] = useState(false);
  const [showCurrencyMenu, setShowCurrencyMenu] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("English");
  const [selectedCurrency, setSelectedCurrency] = useState("EUR");
  const [isScrolled, setIsScrolled] = useState(false);

  // Close dropdowns when clicking elsewhere
  useEffect(() => {
    const handleClickOutside = () => {
      setShowOwnersMenu(false);
      setShowLanguageMenu(false);
      setShowCurrencyMenu(false);
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  // Handle scroll to change header appearance
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-[51px] py-0 transition-colors duration-300 ${
        isScrolled ? "bg-[#284e4c] shadow-sm" : "bg-transparent"
      }`}
    >
      <nav className="flex items-center justify-between h-[88px] max-w-[1470px] mx-auto">
        <div className="flex items-center gap-4 lg:gap-8 xl:gap-[334px]">
          <div className="flex items-center">
            {isScrolled ? (
              <Image
                src="https://theflex.global/_next/image?url=https%3A%2F%2Flsmvmmgkpbyqhthzdexc.supabase.co%2Fstorage%2Fv1%2Fobject%2Fpublic%2Fwebsite%2FUploads%2FWhite_V3%2520Symbol%2520%26%2520Wordmark.png&w=256&q=75"
                alt="The Flex"
                width={256}
                height={32}
                className="h-6 sm:h-8 w-auto transition-opacity duration-300"
                priority
              />
            ) : (
              <Image
                src="https://theflex.global/_next/image?url=https%3A%2F%2Flsmvmmgkpbyqhthzdexc.supabase.co%2Fstorage%2Fv1%2Fobject%2Fpublic%2Fwebsite%2FUploads%2FGreen_V3%2520Symbol%2520%26%2520Wordmark%2520(1).png&w=256&q=75"
                alt="The Flex"
                width={256}
                height={32}
                className="h-6 sm:h-8 w-auto transition-opacity duration-300"
                priority
              />
            )}
          </div>
          <div className="hidden lg:flex items-center gap-4 xl:gap-8">
            <div className="relative" onClick={(e) => e.stopPropagation()}>
              <button
                onClick={() => setShowOwnersMenu(!showOwnersMenu)}
                className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  isScrolled
                    ? "text-white hover:bg-white/10"
                    : "text-black hover:bg-black/10"
                }`}
              >
                <Menu className="size-4" />
                Owners
                <ChevronDown
                  className={`size-4 transition-transform ${
                    showOwnersMenu ? "rotate-180" : ""
                  }`}
                />
              </button>
              {showOwnersMenu && (
                <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-50">
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Become an owner
                  </a>
                  <a
                    href="/dashboard"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Manage my property
                  </a>
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Owner support
                  </a>
                </div>
              )}
            </div>
            <a
              href="#"
              className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                isScrolled
                  ? "text-white hover:bg-white/10"
                  : "text-black hover:bg-black/10"
              }`}
            >
              About us
            </a>
            <a
              href="#"
              className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                isScrolled
                  ? "text-white hover:bg-white/10"
                  : "text-black hover:bg-black/10"
              }`}
            >
              Careers
            </a>
            <a
              href="#"
              className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                isScrolled
                  ? "text-white hover:bg-white/10"
                  : "text-black hover:bg-black/10"
              }`}
            >
              Contact
            </a>
            <div className="relative" onClick={(e) => e.stopPropagation()}>
              <button
                onClick={() => setShowLanguageMenu(!showLanguageMenu)}
                className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  isScrolled
                    ? "text-white hover:bg-white/10"
                    : "text-black hover:bg-black/10"
                }`}
              >
                {selectedLanguage}
                <ChevronDown
                  className={`size-4 transition-transform ${
                    showLanguageMenu ? "rotate-180" : ""
                  }`}
                />
              </button>
              {showLanguageMenu && (
                <div className="absolute top-full right-0 mt-2 w-32 bg-white rounded-lg shadow-lg py-2 z-50">
                  <button
                    onClick={() => {
                      setSelectedLanguage("English");
                      setShowLanguageMenu(false);
                    }}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    English
                  </button>
                  <button
                    onClick={() => {
                      setSelectedLanguage("English");
                      setShowLanguageMenu(false);
                    }}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    English
                  </button>
                  <button
                    onClick={() => {
                      setSelectedLanguage("العربية");
                      setShowLanguageMenu(false);
                    }}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    العربية
                  </button>
                </div>
              )}
            </div>
            <div className="relative" onClick={(e) => e.stopPropagation()}>
              <button
                onClick={() => setShowCurrencyMenu(!showCurrencyMenu)}
                className={`flex items-center gap-1 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  isScrolled
                    ? "text-white hover:bg-white/10"
                    : "text-black hover:bg-black/10"
                }`}
              >
                <span className="text-lg">
                  {selectedCurrency === "EUR"
                    ? "€"
                    : selectedCurrency === "USD"
                    ? "$"
                    : "£"}
                </span>
                {selectedCurrency}
                <ChevronDown
                  className={`size-4 transition-transform ${
                    showCurrencyMenu ? "rotate-180" : ""
                  }`}
                />
              </button>
              {showCurrencyMenu && (
                <div className="absolute top-full right-0 mt-2 w-24 bg-white rounded-lg shadow-lg py-2 z-50">
                  <button
                    onClick={() => {
                      setSelectedCurrency("EUR");
                      setShowCurrencyMenu(false);
                    }}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    € EUR
                  </button>
                  <button
                    onClick={() => {
                      setSelectedCurrency("USD");
                      setShowCurrencyMenu(false);
                    }}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    $ USD
                  </button>
                  <button
                    onClick={() => {
                      setSelectedCurrency("GBP");
                      setShowCurrencyMenu(false);
                    }}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    £ GBP
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden">
            <button
              className={`p-2 rounded-md transition-colors ${
                isScrolled
                  ? "text-white hover:bg-white/10"
                  : "text-black hover:bg-black/10"
              }`}
            >
              <Menu className="size-6" />
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
}
