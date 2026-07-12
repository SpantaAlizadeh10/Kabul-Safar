import { About } from "@/sections/about";
import { CtaPromo } from "@/sections/cta-promo";
import { Destination } from "@/sections/destination";
import { Footer } from "@/sections/footer";
import { Header } from "@/sections/header";
import { Hero } from "@/sections/hero";
import { HowItWorks } from "@/sections/how-it-works";
import { Partners } from "@/sections/partners";
import { ServiceFeature } from "@/sections/service-feature";
import { Stats } from "@/sections/stats";
import { Testimonials } from "@/sections/testimonials";
import { WhyChooseUs } from "@/sections/why-choose-us";
import { LanguageDirWrapper } from "@/sections/language-dir-wrapper";

export default function Home() {
  return (
    <LanguageDirWrapper>
      <div className="mx-auto min-h-screen w-full max-w-100.5 bg-[#e9ebed] md:max-w-300">
        <main className="space-y-4 px-4 py-4 md:space-y-8 md:px-8 md:py-6">
          <Header />
          <Hero />
          <Partners />
          <Destination />
          <HowItWorks />

          <div className="space-y-5 rounded-[10px] bg-white p-4 md:space-y-8 md:rounded-2xl md:p-8">
            <ServiceFeature />
            <Stats />
            <WhyChooseUs />
            <About />
          </div>

          <Testimonials />
          <CtaPromo />
        </main>
        <Footer />
      </div>
    </LanguageDirWrapper>
  );
}
