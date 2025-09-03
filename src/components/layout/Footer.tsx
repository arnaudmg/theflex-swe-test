import { Check, Facebook, Twitter, Instagram, Phone, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#284e4c] text-white" role="contentinfo">
      <div className="mx-auto max-w-[1400px] px-6 py-16">
        {/* One line on desktop, stacked on mobile */}
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-6">
          {/* Newsletter */}
          <section
            aria-labelledby="footer-newsletter"
            className="lg:col-span-2"
          >
            <h2 id="footer-newsletter" className="text-xl font-bold">
              Join The Flex
            </h2>
            <p className="mt-2 text-gray-200/80 leading-6">
              Sign up now and stay up to date on our latest news and exclusive
              deals including 5% off your first stay!
            </p>

            <form
              className="mt-6 space-y-4"
              onSubmit={(e) => e.preventDefault()}
            >
              <div className="flex flex-col gap-4 sm:flex-row">
                <div className="flex-1">
                  <label htmlFor="first-name" className="sr-only">
                    First name
                  </label>
                  <input
                    id="first-name"
                    type="text"
                    autoComplete="given-name"
                    placeholder="First name"
                    className="w-full rounded-md border border-white/20 bg-white/10 px-3 py-2 text-sm text-white placeholder:text-gray-300/70 focus:outline-none focus:ring-2 focus:ring-white/40"
                  />
                </div>
                <div className="flex-1">
                  <label htmlFor="last-name" className="sr-only">
                    Last name
                  </label>
                  <input
                    id="last-name"
                    type="text"
                    autoComplete="family-name"
                    placeholder="Last name"
                    className="w-full rounded-md border border-white/20 bg-white/10 px-3 py-2 text-sm text-white placeholder:text-gray-300/70 focus:outline-none focus:ring-2 focus:ring-white/40"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="sr-only">
                  Email address
                </label>
                <input
                  id="email"
                  type="email"
                  autoComplete="email"
                  placeholder="Email address"
                  className="w-full rounded-md border border-white/20 bg-white/10 px-3 py-2 text-sm text-white placeholder:text-gray-300/70 focus:outline-none focus:ring-2 focus:ring-white/40"
                />
              </div>

              <div className="flex gap-4">
                <div className="w-[80px]">
                  <label htmlFor="country-code" className="sr-only">
                    Country code
                  </label>
                  <select
                    id="country-code"
                    className="w-full rounded-md border border-white/20 bg-white/10 px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-white/40"
                    defaultValue="+44"
                    aria-label="Country code"
                  >
                    <option value="+44">+44</option>
                    <option value="+33">+33</option>
                    <option value="+213">+213</option>
                  </select>
                </div>
                <div className="flex-1">
                  <label htmlFor="phone" className="sr-only">
                    Phone number
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    inputMode="tel"
                    placeholder="Phone number"
                    className="w-full rounded-md border border-white/20 bg-white/10 px-3 py-2 text-sm text-white placeholder:text-gray-300/70 focus:outline-none focus:ring-2 focus:ring-white/40"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="inline-flex w-full items-center justify-center gap-2 rounded-md bg-white px-4 py-2 text-sm font-medium text-[#10393c] hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-white/40"
              >
                <Check className="size-4" aria-hidden="true" />
                Subscribe
              </button>
            </form>
          </section>

          {/* About */}
          <section aria-labelledby="footer-about">
            <h2 id="footer-about" className="text-xl font-bold">
              The Flex
            </h2>
            <p className="mt-3 text-sm leading-6 text-gray-200/80">
              Professional property management services for landlords, flexible
              corporate lets for businesses and quality accommodations for
              short-term and long-term guests.
            </p>
            <ul
              className="mt-4 flex items-center gap-4"
              aria-label="Social links"
            >
              <li>
                <a
                  href="#"
                  aria-label="Facebook"
                  className="transition-opacity hover:opacity-80"
                >
                  <Facebook className="size-5" aria-hidden="true" />
                </a>
              </li>
              <li>
                <a
                  href="#"
                  aria-label="Twitter"
                  className="transition-opacity hover:opacity-80"
                >
                  <Twitter className="size-5" aria-hidden="true" />
                </a>
              </li>
              <li>
                <a
                  href="#"
                  aria-label="Instagram"
                  className="transition-opacity hover:opacity-80"
                >
                  <Instagram className="size-5" aria-hidden="true" />
                </a>
              </li>
            </ul>
          </section>

          {/* Quick Links */}
          <nav aria-labelledby="footer-quick-links">
            <h2 id="footer-quick-links" className="text-xl font-bold">
              Quick Links
            </h2>
            <ul className="mt-3 space-y-2 text-sm">
              <li>
                <a href="#" className="text-gray-200/80 hover:text-white">
                  Blog
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-200/80 hover:text-white">
                  Careers
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-200/80 hover:text-white">
                  Terms &amp; Conditions
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-200/80 hover:text-white">
                  Privacy Policy
                </a>
              </li>
            </ul>
          </nav>

          {/* Locations */}
          <section aria-labelledby="footer-locations">
            <h2 id="footer-locations" className="text-xl font-bold">
              Locations
            </h2>
            <ul className="mt-3 space-y-2 text-sm">
              <li>
                <a href="#" className="text-gray-200/80 hover:text-white">
                  London
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-200/80 hover:text-white">
                  Paris
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-200/80 hover:text-white">
                  Algiers
                </a>
              </li>
            </ul>
          </section>

          {/* Contact */}
          <section aria-labelledby="footer-contact" className="lg:col-span-1">
            <h2 id="footer-contact" className="text-xl font-bold">
              Contact Us
            </h2>
            <address className="not-italic mt-4 space-y-4 text-sm text-gray-200/90">
              <div>
                <div className="mb-2 flex items-center gap-2">
                  <Phone className="size-5" aria-hidden="true" />
                  <strong className="font-medium text-white">
                    Support Numbers
                  </strong>
                </div>
                <dl className="space-y-2">
                  <div className="flex items-center justify-between gap-6">
                    <dt className="text-gray-200/80">United Kingdom</dt>
                    <dd className="text-white">+44 77 2374 5646</dd>
                  </div>
                  <div className="flex items-center justify-between gap-6">
                    <dt className="text-gray-200/80">Algeria</dt>
                    <dd className="text-white">+33 7 57 59 22 41</dd>
                  </div>
                  <div className="flex items-center justify-between gap-6">
                    <dt className="text-gray-200/80">France</dt>
                    <dd className="text-white">+33 6 44 64 57 17</dd>
                  </div>
                </dl>
              </div>
              <p className="flex items-center gap-2">
                <Mail className="size-5" aria-hidden="true" />
                <a
                  href="mailto:info@theflex.global"
                  className="hover:underline"
                >
                  info@theflex.global
                </a>
              </p>
            </address>
          </section>
        </div>

        <div className="mt-12 border-t border-white/15 pt-8">
          <p className="text-center text-sm">
            © 2025 The Flex. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
