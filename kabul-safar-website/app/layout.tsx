import type { Metadata } from "next";
import { Vazirmatn } from "next/font/google";
import "./globals.css";
import { I18nProvider } from "@/components/i18n-provider";
import { CONTACT_WHATSAPP_URL } from "@/lib/contact";

const vazirmatn = Vazirmatn({
  variable: "--font-vazirmatn",
  subsets: ["arabic"],
});

export const metadata: Metadata = {
  title: "Kabul Safar",
  description: "Kabul Safar tourism landing page",
  icons: {
    icon: "/Logo.jpeg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fa"
      dir="rtl"
      className={`${vazirmatn.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <I18nProvider>
          {children}
          <a
            href={CONTACT_WHATSAPP_URL}
            aria-label="واتساپ کابل سفر"
            target="_blank"
            rel="noreferrer"
            className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-xl shadow-[#25d36680] transition-transform duration-200 hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-[#25d366]/60"
          >
            <svg
              viewBox="0 0 32 32"
              xmlns="http://www.w3.org/2000/svg"
              className="h-7 w-7"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M16.004 3C9.372 3 3.997 8.381 3.997 15.013c0 2.642.86 5.083 2.33 7.09L3 29l7.109-2.303a12.96 12.96 0 0 0 5.895 1.432h.005c6.632 0 12.01-5.381 12.01-12.013S22.637 3 16.004 3Zm0 21.995c-1.935 0-3.824-.528-5.434-1.523l-.39-.233-4.226 1.37 1.42-4.125-.256-.415A9.988 9.988 0 0 1 6.014 15.01c0-5.524 4.484-10.01 9.99-10.01 5.506 0 9.99 4.486 9.99 10.01s-4.484 10.01-9.99 10.01Zm5.694-6.6c-.31-.155-1.84-.905-2.126-1.008-.286-.103-.494-.155-.702.155-.206.31-.794 1.008-.973 1.214-.18.206-.36.232-.67.077-.31-.155-1.304-.481-2.484-1.528-.92-.819-1.542-1.828-1.722-2.137-.18-.31-.02-.477.135-.632.138-.137.31-.36.465-.54.155-.18.207-.31.31-.517.103-.206.052-.386-.026-.54-.077-.155-.702-1.694-.962-2.32-.255-.617-.515-.534-.702-.545-.18-.01-.386-.01-.592-.01-.206 0-.539.077-.822.31-.286.232-1.09 1.065-1.09 2.598 0 1.533 1.116 3.015 1.27 3.225.155.206 2.2 3.36 5.33 4.706.745.322 1.327.514 1.781.66.748.24 1.43.206 1.97.125.601-.094 1.84-.752 2.1-1.476.26-.724.26-1.343.18-1.476-.077-.134-.28-.206-.59-.36Z" />
            </svg>
          </a>
        </I18nProvider>
      </body>
    </html>
  );
}
