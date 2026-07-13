import Image from "next/image";
import Link from "next/link";
import { ContactForm } from "@/components/contact-form";

export function SiteFooter() {
  return (
    <footer id="contact" className="bg-mmunc-green-dark text-white">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-3">
        <div>
          <div className="flex items-center gap-2">
            <Image src="/logo.png" alt="MMUNC logo" width={32} height={32} className="h-8 w-8" />
            <h3 className="font-script text-2xl font-bold text-mmunc-gold">
              MMUNC
            </h3>
          </div>
          <p className="mt-3 text-sm leading-relaxed text-white/70">
            Manarat Dhaka International School and College Model United
            Nations Club — cultivating diplomacy, debate, and global
            citizenship among our students.
          </p>

          <div className="mt-5 space-y-1 text-sm text-white/70">
            <p className="font-semibold text-white">School Address</p>
            <p>Manarat Dhaka International School and College</p>
            <p>H.No 16, Road No. 104, Gulshan 2, Dhaka 1212</p>
          </div>

          <div className="mt-5">
            <a
              href="https://instagram.com/manaratmunclub"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-medium text-white/80 transition hover:text-mmunc-gold"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.8}
                className="h-5 w-5"
              >
                <rect x="3" y="3" width="18" height="18" rx="5" />
                <circle cx="12" cy="12" r="4" />
                <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
              </svg>
              @manaratmunclub
            </a>
          </div>
        </div>

        <div>
          <h3 className="font-script text-2xl font-bold text-mmunc-gold">
            Quick Links
          </h3>
          <nav className="mt-3 flex flex-col gap-2 text-sm text-white/70">
            <Link href="/" className="w-fit transition hover:text-mmunc-gold">
              Home
            </Link>
            <Link href="/about" className="w-fit transition hover:text-mmunc-gold">
              About Us
            </Link>
            <Link href="/committees" className="w-fit transition hover:text-mmunc-gold">
              Committees
            </Link>
            <Link href="/signup" className="w-fit transition hover:text-mmunc-gold">
              Register as a Delegate
            </Link>
          </nav>
        </div>

        <div>
          <h3 className="font-script text-2xl font-bold text-mmunc-gold">
            Contact Us
          </h3>
          <p className="mt-3 text-sm text-white/70">
            Have a question about MMUNC? Send us a message.
          </p>
          <div className="mt-4">
            <ContactForm />
          </div>
        </div>
      </div>

      <div className="border-t border-white/10 py-5 text-center text-xs text-white/50">
        <p>
          © {new Date().getFullYear()} MMUNC — Manarat Dhaka International
          School and College. All rights reserved.
        </p>
        <p className="mt-1">Developed by - Muntasir B28</p>
      </div>
    </footer>
  );
}
