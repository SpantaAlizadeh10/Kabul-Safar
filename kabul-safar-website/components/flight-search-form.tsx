"use client";

import { useState, useEffect, useRef } from "react";
import { useI18n } from "@/components/i18n-provider";
import { getFooterContent } from "@/lib/data";
import { Search, Calendar, Users, Plane, ArrowRightLeft } from "lucide-react";
import { Toast } from "@/components/toast";

export const FlightSearchForm = () => {
  const { lang } = useI18n();
  const isRtl = lang === "fa" || lang === "ps";
  const [tripType, setTripType] = useState<"one-way" | "round-trip">("one-way");
  const [returnDate, setReturnDate] = useState("");
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [originDisplay, setOriginDisplay] = useState("");
  const [destinationDisplay, setDestinationDisplay] = useState("");
  const [date, setDate] = useState("");
  const [passengers, setPassengers] = useState("1");
  const [showOriginList, setShowOriginList] = useState(false);
  const [showDestinationList, setShowDestinationList] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const originRef = useRef<HTMLDivElement | null>(null);
  const destRef = useRef<HTMLDivElement | null>(null);

  const today = new Date().toISOString().split("T")[0];

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (originRef.current && !originRef.current.contains(e.target as Node)) {
        setShowOriginList(false);
      }
      if (destRef.current && !destRef.current.contains(e.target as Node)) {
        setShowDestinationList(false);
      }
    }

    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setShowOriginList(false);
        setShowDestinationList(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKey);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKey);
    };
  }, []);

  const swapCities = () => {
    const tempOrigin = origin;
    const tempOriginDisplay = originDisplay;
    setOrigin(destination);
    setOriginDisplay(destinationDisplay);
    setDestination(tempOrigin);
    setDestinationDisplay(tempOriginDisplay);
  };

  const showToastMessage = (message: string) => {
    setToastMessage(message);
    setShowToast(true);
  };

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsSearching(true);
    showToastMessage(
      lang === "fa"
        ? "در حال جستجو - لینک در تب جدید باز می‌شود"
        : lang === "ps"
          ? "په لټون کې - لینک په نوی ټیب کې پرتېږي"
          : "Searching - link will open in new tab"
    );

    try {
      const params = new URLSearchParams({
        origin,
        destination,
        date,
        passengers,
        tripType,
      });

      if (tripType === "round-trip" && returnDate) {
        params.append("returnDate", returnDate);
      }

      const response = await fetch(`/api/flights/search?${params.toString()}`);
      const data = await response.json();

      if (data.success) {
        // If we have an affiliate link, redirect to it
        if (data.affiliateLink) {
          window.open(data.affiliateLink, '_blank');
        }
        // If we have flight data, we could display it (for future enhancement)
        else if (data.data) {
          // For now, still redirect to affiliate link as fallback
          let affiliateUrl = `https://www.aviasales.com/search?currency=usd&locale=en&origin_iata=${origin}&destination_iata=${destination}&depart_date=${date}&adults=${passengers}`;
          if (tripType === "round-trip" && returnDate) {
            affiliateUrl += `&return_date=${returnDate}`;
          }
          window.open(affiliateUrl, '_blank');
        }
      } else {
        // Fallback to WhatsApp if API fails
        const footer = getFooterContent(lang);
        let phone = footer?.phone || "";
        phone = phone.replace(/\D/g, "");
        if (phone.startsWith("00")) phone = phone.replace(/^00/, "");
        if (phone.startsWith("+")) phone = phone.replace(/^\+/, "");

        const title = lang === "fa" ? "درخواست سفر" : lang === "ps" ? "د سفر غوښتنه" : "Trip request";
        const msgLines = [
          title,
          `${lang === "fa" ? "مبدأ" : lang === "ps" ? "مبدا" : "Origin"}: ${originDisplay || "-"}`,
          `${lang === "fa" ? "مقصد" : lang === "ps" ? "مقصد" : "Destination"}: ${destinationDisplay || "-"}`,
          `${lang === "fa" ? "تاریخ" : lang === "ps" ? "نېټه" : "Date"}: ${date || "-"}`,
          `${lang === "fa" ? "مسافران" : lang === "ps" ? "مسافرین" : "Passengers"}: ${passengers || "-"}`,
        ];
        const message = msgLines.join("\n");
        const encoded = encodeURIComponent(message);
        const waBase = `https://api.whatsapp.com/send?phone=${phone}&text=${encoded}`;
        window.open(waBase, "_blank");
        showToastMessage(
          lang === "fa"
            ? "واتس‌اپ در تب جدید باز شد - این تب را باز نگه دارید"
            : lang === "ps"
              ? "واتس‌اپ په نوی ټیب کې پرته شو - دا ټیب پرانیزې پاتې کړئ"
              : "WhatsApp opened in new tab - keep this tab open"
        );
      }
    } catch (error) {
      console.error('Flight search error:', error);
      // Fallback to WhatsApp on error
      const footer = getFooterContent(lang);
      let phone = footer?.phone || "";
      phone = phone.replace(/\D/g, "");
      if (phone.startsWith("00")) phone = phone.replace(/^00/, "");
      if (phone.startsWith("+")) phone = phone.replace(/^\+/, "");

      const title = lang === "fa" ? "درخواست سفر" : lang === "ps" ? "د سفر غوښتنه" : "Trip request";
      const msgLines = [
        title,
        `${lang === "fa" ? "مبدأ" : lang === "ps" ? "مبدا" : "Origin"}: ${originDisplay || "-"}`,
        `${lang === "fa" ? "مقصد" : lang === "ps" ? "مقصد" : "Destination"}: ${destinationDisplay || "-"}`,
        `${lang === "fa" ? "تاریخ" : lang === "ps" ? "نېټه" : "Date"}: ${date || "-"}`,
        `${lang === "fa" ? "مسافران" : lang === "ps" ? "مسافرین" : "Passengers"}: ${passengers || "-"}`,
      ];
      const message = msgLines.join("\n");
      const encoded = encodeURIComponent(message);
      const waBase = `https://api.whatsapp.com/send?phone=${phone}&text=${encoded}`;
      window.open(waBase, "_blank");
    } finally {
      setIsSearching(false);
    }
  }

  // IATA code mappings for cities
  const cityIATAMapping: Record<string, { iata: string; fa: string; ps: string; en: string }> = {
    // Afghanistan
    "KBL": { iata: "KBL", fa: "کابل", ps: "کابل", en: "Kabul" },
    "MZR": { iata: "MZR", fa: "مزار شریف", ps: "مزار شریف", en: "Mazar-i-Sharif" },
    "KDH": { iata: "KDH", fa: "قندهار", ps: "قندهار", en: "Kandahar" },
    "HEA": { iata: "HEA", fa: "هرات", ps: "هرات", en: "Herat" },

    // Iran
    "THR": { iata: "THR", fa: "تهران", ps: "تهران", en: "Tehran" },
    "MHD": { iata: "MHD", fa: "مشهد", ps: "مشهد", en: "Mashhad" },
    "SYZ": { iata: "SYZ", fa: "شیراز", ps: "شیراز", en: "Shiraz" },
    "IFN": { iata: "IFN", fa: "اصفهان", ps: "اصفهان", en: "Isfahan" },
    "TBZ": { iata: "TBZ", fa: "تبریز", ps: "تبریز", en: "Tabriz" },
    "KIH": { iata: "KIH", fa: "کیش", ps: "کیش", en: "Kish" },
    "AWZ": { iata: "AWZ", fa: "اهواز", ps: "اهواز", en: "Ahvaz" },

    // Turkey
    "IST": { iata: "IST", fa: "استانبول", ps: "استانبول", en: "Istanbul" },
    "AYT": { iata: "AYT", fa: "آنتالیا", ps: "آنتالیا", en: "Antalya" },
    "ESB": { iata: "ESB", fa: "آنکارا", ps: "آنکارا", en: "Ankara" },
    "SAW": { iata: "SAW", fa: "استانبول (صبیحه)", ps: "استانبول (صبیحه)", en: "Istanbul (Sabiha)" },
    "ADB": { iata: "ADB", fa: "ازمیر", ps: "ازمیر", en: "Izmir" },

    // Iraq
    "BGW": { iata: "BGW", fa: "بغداد", ps: "بغداد", en: "Baghdad" },
    "BSR": { iata: "BSR", fa: "بصره", ps: "بصره", en: "Basra" },
    "EBL": { iata: "EBL", fa: "اربیل", ps: "اربیل", en: "Erbil" },

    // UAE
    "DXB": { iata: "DXB", fa: "دبی", ps: "دبی", en: "Dubai" },
    "AUH": { iata: "AUH", fa: "ابوظبی", ps: "ابوظبی", en: "Abu Dhabi" },
    "SHJ": { iata: "SHJ", fa: "شارجه", ps: "شارجه", en: "Sharjah" },
    "DWC": { iata: "DWC", fa: "دبی (ال مکتوم)", ps: "دبی (ال مکتوم)", en: "Dubai (Al Maktoum)" },

    // Saudi Arabia
    "JED": { iata: "JED", fa: "جده", ps: "جده", en: "Jeddah" },
    "RUH": { iata: "RUH", fa: "ریاض", ps: "ریاض", en: "Riyadh" },
    "DMM": { iata: "DMM", fa: "دمام", ps: "دمام", en: "Dammam" },
    "MED": { iata: "MED", fa: "مدینه", ps: "مدینه", en: "Medina" },

    // Qatar
    "DOH": { iata: "DOH", fa: "دوحه", ps: "دوحه", en: "Doha" },

    // Kuwait
    "KWI": { iata: "KWI", fa: "کویت", ps: "کویت", en: "Kuwait" },

    // Oman
    "MCT": { iata: "MCT", fa: "مسقط", ps: "مسقط", en: "Muscat" },

    // Bahrain
    "BAH": { iata: "BAH", fa: "بحرین", ps: "بحرین", en: "Bahrain" },

    // Pakistan
    "ISB": { iata: "ISB", fa: "اسلام‌آباد", ps: "اسلام‌آباد", en: "Islamabad" },
    "KHI": { iata: "KHI", fa: "کراچی", ps: "کراچی", en: "Karachi" },
    "LHE": { iata: "LHE", fa: "لاهور", ps: "لاهور", en: "Lahore" },
    "PEW": { iata: "PEW", fa: "پشاور", ps: "پشاور", en: "Peshawar" },

    // India
    "DEL": { iata: "DEL", fa: "دهلی", ps: "دهلی", en: "Delhi" },
    "BOM": { iata: "BOM", fa: "مومبای", ps: "مومبای", en: "Mumbai" },
    "BLR": { iata: "BLR", fa: "بنگلور", ps: "بنگلور", en: "Bangalore" },
    "MAA": { iata: "MAA", fa: "چنای", ps: "چنای", en: "Chennai" },
    "CCU": { iata: "CCU", fa: "کولکاتا", ps: "کولکاتا", en: "Kolkata" },
    "HYD": { iata: "HYD", fa: "حیدرآباد", ps: "حیدرآباد", en: "Hyderabad" },

    // Bangladesh
    "DAC": { iata: "DAC", fa: "داکا", ps: "داکا", en: "Dhaka" },
    "CGP": { iata: "CGP", fa: "چیتاگونگ", ps: "چیتاگونگ", en: "Chittagong" },

    // Sri Lanka
    "CMB": { iata: "CMB", fa: "کلمبو", ps: "کلمبو", en: "Colombo" },

    // Nepal
    "KTM": { iata: "KTM", fa: "کاتماندو", ps: "کاتماندو", en: "Kathmandu" },

    // Malaysia
    "KUL": { iata: "KUL", fa: "کوالالامپور", ps: "کوالالامپور", en: "Kuala Lumpur" },
    "PEN": { iata: "PEN", fa: "پنانگ", ps: "پنانگ", en: "Penang" },
    "LGK": { iata: "LGK", fa: "لانگکاوی", ps: "لانگکاوی", en: "Langkawi" },

    // Singapore
    "SIN": { iata: "SIN", fa: "سنگاپور", ps: "سنگاپور", en: "Singapore" },

    // Indonesia
    "CGK": { iata: "CGK", fa: "جاکارتا", ps: "جاکارتا", en: "Jakarta" },
    "DPS": { iata: "DPS", fa: "بالی", ps: "بالی", en: "Bali" },
    "SUB": { iata: "SUB", fa: "سورابایا", ps: "سورابایا", en: "Surabaya" },

    // Thailand
    "BKK": { iata: "BKK", fa: "بانکوک", ps: "بانکوک", en: "Bangkok" },
    "HKT": { iata: "HKT", fa: "فوکت", ps: "فوکت", en: "Phuket" },
    "CNX": { iata: "CNX", fa: "چیانگ مای", ps: "چیانگ مای", en: "Chiang Mai" },

    // Vietnam
    "SGN": { iata: "SGN", fa: "هو چی مین", ps: "هو چی مین", en: "Ho Chi Minh" },
    "HAN": { iata: "HAN", fa: "هانوی", ps: "هانوی", en: "Hanoi" },
    "DAD": { iata: "DAD", fa: "دانانگ", ps: "دانانگ", en: "Da Nang" },

    // Philippines
    "MNL": { iata: "MNL", fa: "مانیلا", ps: "مانیلا", en: "Manila" },
    "CEB": { iata: "CEB", fa: "سبو", ps: "سبو", en: "Cebu" },

    // China
    "PEK": { iata: "PEK", fa: "پکن", ps: "پکن", en: "Peking" },
    "PVG": { iata: "PVG", fa: "شانگهای", ps: "شانگهای", en: "Shanghai" },
    "CAN": { iata: "CAN", fa: "گوانژو", ps: "گوانژو", en: "Guangzhou" },
    "SZX": { iata: "SZX", fa: "شنجن", ps: "شنجن", en: "Shenzhen" },
    "HKG": { iata: "HKG", fa: "هنگ کنگ", ps: "هنگ کنگ", en: "Hong Kong" },

    // Japan
    "NRT": { iata: "NRT", fa: "توکیو (ناریتا)", ps: "توکیو (ناریتا)", en: "Tokyo (Narita)" },
    "HND": { iata: "HND", fa: "توکیو (هانه‌دا)", ps: "توکیو (هانه‌دا)", en: "Tokyo (Haneda)" },
    "KIX": { iata: "KIX", fa: "اوساکا", ps: "اوساکا", en: "Osaka" },
    "NGO": { iata: "NGO", fa: "ناگویا", ps: "ناگویا", en: "Nagoya" },
    "FUK": { iata: "FUK", fa: "فوکوکا", ps: "فوکوکا", en: "Fukuoka" },
    "OKA": { iata: "OKA", fa: "ناها", ps: "ناها", en: "Naha" },

    // South Korea
    "ICN": { iata: "ICN", fa: "سئول (اینچئون)", ps: "سئول (اینچئون)", en: "Seoul (Incheon)" },
    "GMP": { iata: "GMP", fa: "سئول (گیمپو)", ps: "سئول (گیمپو)", en: "Seoul (Gimpo)" },
    "PUS": { iata: "PUS", fa: "بوسان", ps: "بوسان", en: "Busan" },
    "CJU": { iata: "CJU", fa: "ججو", ps: "ججو", en: "Jeju" },

    // Taiwan
    "TPE": { iata: "TPE", fa: "تایپه", ps: "تایپه", en: "Taipei" },
    "KHH": { iata: "KHH", fa: "کائوهیونگ", ps: "کائوهیونگ", en: "Kaohsiung" },

    // United Kingdom
    "LHR": { iata: "LHR", fa: "لندن (هیثرو)", ps: "لندن (هیثرو)", en: "London (Heathrow)" },
    "LGW": { iata: "LGW", fa: "لندن (گاتویک)", ps: "لندن (گاتویک)", en: "London (Gatwick)" },
    "STN": { iata: "STN", fa: "لندن (استنستد)", ps: "لندن (استنستد)", en: "London (Stansted)" },
    "MAN": { iata: "MAN", fa: "منچستر", ps: "منچستر", en: "Manchester" },
    "EDI": { iata: "EDI", fa: "ادینبرو", ps: "ادینبرو", en: "Edinburgh" },
    "BHX": { iata: "BHX", fa: "برمینگام", ps: "برمینگام", en: "Birmingham" },
    "GLA": { iata: "GLA", fa: "گلاسگو", ps: "گلاسگو", en: "Glasgow" },

    // France
    "CDG": { iata: "CDG", fa: "پاریس (شارل دوگل)", ps: "پاریس (شارل دوگل)", en: "Paris (Charles de Gaulle)" },
    "ORY": { iata: "ORY", fa: "پاریس (اورلی)", ps: "پاریس (اورلی)", en: "Paris (Orly)" },
    "NCE": { iata: "NCE", fa: "نیس", ps: "نیس", en: "Nice" },
    "LYS": { iata: "LYS", fa: "لیون", ps: "لیون", en: "Lyon" },
    "MRS": { iata: "MRS", fa: "مارسلی", ps: "مارسلی", en: "Marseille" },
    "TLS": { iata: "TLS", fa: "تولوز", ps: "تولوز", en: "Toulouse" },
    "BOD": { iata: "BOD", fa: "بوردو", ps: "بوردو", en: "Bordeaux" },

    // Germany
    "FRA": { iata: "FRA", fa: "فرانکفورت", ps: "فرانکفورت", en: "Frankfurt" },
    "MUC": { iata: "MUC", fa: "مونیخ", ps: "مونیخ", en: "Munich" },
    "BER": { iata: "BER", fa: "برلین", ps: "برلین", en: "Berlin" },
    "DUS": { iata: "DUS", fa: "دوسلدورف", ps: "دوسلدورف", en: "Düsseldorf" },
    "HAM": { iata: "HAM", fa: "هامبورگ", ps: "هامبورگ", en: "Hamburg" },
    "CGN": { iata: "CGN", fa: "کلن", ps: "کلن", en: "Cologne" },
    "STR": { iata: "STR", fa: "اشتوتگارت", ps: "اشتوتگارت", en: "Stuttgart" },

    // Italy
    "FCO": { iata: "FCO", fa: "رم (فیومیچینو)", ps: "رم (فیومیچینو)", en: "Rome (Fiumicino)" },
    "CIA": { iata: "CIA", fa: "رم (چیامپینو)", ps: "رم (چیامپینو)", en: "Rome (Ciampino)" },
    "MXP": { iata: "MXP", fa: "میلان (مالپنسا)", ps: "میلان (مالپنسا)", en: "Milan (Malpensa)" },
    "VCE": { iata: "VCE", fa: "ونیز", ps: "ونیز", en: "Venice" },
    "NAP": { iata: "NAP", fa: "ناپل", ps: "ناپل", en: "Naples" },
    "FLR": { iata: "FLR", fa: "فلورانس", ps: "فلورانس", en: "Florence" },
    "BLQ": { iata: "BLQ", fa: "بولونیا", ps: "بولونیا", en: "Bologna" },

    // Spain
    "MAD": { iata: "MAD", fa: "مادرید", ps: "مادرید", en: "Madrid" },
    "BCN": { iata: "BCN", fa: "بارسلونا", ps: "بارسلونا", en: "Barcelona" },
    "PMI": { iata: "PMI", fa: "مایورکا", ps: "مایورکا", en: "Mallorca" },
    "AGP": { iata: "AGP", fa: "مالاگا", ps: "مالاگا", en: "Malaga" },
    "VLC": { iata: "VLC", fa: "والنسیا", ps: "والنسیا", en: "Valencia" },
    "SVQ": { iata: "SVQ", fa: "سویا", ps: "سویا", en: "Seville" },
    "BIO": { iata: "BIO", fa: "بیلبائو", ps: "بیلبائو", en: "Bilbao" },

    // Netherlands
    "AMS": { iata: "AMS", fa: "آمستردام", ps: "آمستردام", en: "Amsterdam" },
    "RTM": { iata: "RTM", fa: "روتردام", ps: "روتردام", en: "Rotterdam" },
    "EIN": { iata: "EIN", fa: "ایندهوون", ps: "ایندهوون", en: "Eindhoven" },

    // Belgium
    "BRU": { iata: "BRU", fa: "بروکسل", ps: "بروکسل", en: "Brussels" },
    "ANR": { iata: "ANR", fa: "آنورپ", ps: "آنورپ", en: "Antwerp" },

    // Switzerland
    "ZRH": { iata: "ZRH", fa: "زوریخ", ps: "زوریخ", en: "Zurich" },
    "GVA": { iata: "GVA", fa: "ژنو", ps: "ژنو", en: "Geneva" },
    "BSL": { iata: "BSL", fa: "بازل", ps: "بازل", en: "Basel" },

    // Austria
    "VIE": { iata: "VIE", fa: "وین", ps: "وین", en: "Vienna" },
    "SZG": { iata: "SZG", fa: "سالزبورگ", ps: "سالزبورگ", en: "Salzburg" },

    // Czech Republic
    "PRG": { iata: "PRG", fa: "پراگ", ps: "پراگ", en: "Prague" },

    // Poland
    "WAW": { iata: "WAW", fa: "ورشو", ps: "ورشو", en: "Warsaw" },
    "KRK": { iata: "KRK", fa: "کراکوف", ps: "کراکوف", en: "Krakow" },
    "GDN": { iata: "GDN", fa: "دانسک", ps: "دانسک", en: "Gdansk" },

    // Hungary
    "BUD": { iata: "BUD", fa: "بوداپست", ps: "بوداپست", en: "Budapest" },

    // Romania
    "OTP": { iata: "OTP", fa: "بوخارست", ps: "بوخارست", en: "Bucharest" },
    "CLJ": { iata: "CLJ", fa: "کلوج-ناپوکا", ps: "کلوج-ناپوکا", en: "Cluj-Napoca" },

    // Bulgaria
    "SOF": { iata: "SOF", fa: "صوفیه", ps: "صوفیه", en: "Sofia" },
    "VAR": { iata: "VAR", fa: "وارنا", ps: "وارنا", en: "Varna" },

    // Greece
    "ATH": { iata: "ATH", fa: "آتن", ps: "آتن", en: "Athens" },
    "JTR": { iata: "JTR", fa: "سانتورینی", ps: "سانتورینی", en: "Santorini" },
    "HER": { iata: "HER", fa: "هراکلیون", ps: "هراکلیون", en: "Heraklion" },

    // Sweden
    "ARN": { iata: "ARN", fa: "استکهلم (آرلاندا)", ps: "استکهلم (آرلاندا)", en: "Stockholm (Arlanda)" },
    "GOT": { iata: "GOT", fa: "گوتنبرگ", ps: "گوتنبرگ", en: "Gothenburg" },
    "MMX": { iata: "MMX", fa: "مالمو", ps: "مالمو", en: "Malmo" },

    // Denmark
    "CPH": { iata: "CPH", fa: "کپنهاگ", ps: "کپنهاگ", en: "Copenhagen" },
    "AAL": { iata: "AAL", fa: "آلبورگ", ps: "آلبورگ", en: "Aalborg" },
    "BLL": { iata: "BLL", fa: "بیلوند", ps: "بیلوند", en: "Billund" },

    // Norway
    "OSL": { iata: "OSL", fa: "اسلو (گاردرموئن)", ps: "اسلو (گاردرموئن)", en: "Oslo (Gardermoen)" },
    "BGO": { iata: "BGO", fa: "برگن", ps: "برگن", en: "Bergen" },
    "TRD": { iata: "TRD", fa: "تروندهایم", ps: "تروندهایم", en: "Trondheim" },
    "SVG": { iata: "SVG", fa: "استوانگر", ps: "استوانگر", en: "Stavanger" },

    // Finland
    "HEL": { iata: "HEL", fa: "هلسینکی", ps: "هلسینکی", en: "Helsinki" },
    "TMP": { iata: "TMP", fa: "تامپره", ps: "تامپره", en: "Tampere" },

    // Iceland
    "KEF": { iata: "KEF", fa: "ریکیاویک", ps: "ریکیاویک", en: "Reykjavik" },

    // Russia
    "MOW": { iata: "MOW", fa: "مسکو", ps: "مسکو", en: "Moscow" },
    "LED": { iata: "LED", fa: "سنت پترزبورگ", ps: "سنت پترزبورگ", en: "Saint Petersburg" },
    "KZN": { iata: "KZN", fa: "قازان", ps: "قازان", en: "Kazan" },
    "SVX": { iata: "SVX", fa: "یکاترینبورگ", ps: "یکاترینبورگ", en: "Yekaterinburg" },

    // Ukraine
    "KBP": { iata: "KBP", fa: "کیف", ps: "کیف", en: "Kyiv" },
    "ODS": { iata: "ODS", fa: "اودسا", ps: "اودسا", en: "Odessa" },
    "LWO": { iata: "LWO", fa: "لویو", ps: "لویو", en: "Lviv" },

    // Belarus
    "MSQ": { iata: "MSQ", fa: "مینسک", ps: "مینسک", en: "Minsk" },

    // Georgia
    "TBS": { iata: "TBS", fa: "تفلیس", ps: "تفلیس", en: "Tbilisi" },
    "KUT": { iata: "KUT", fa: "کوتایسی", ps: "کوتایسی", en: "Kutaisi" },

    // Armenia
    "EVN": { iata: "EVN", fa: "ایروان", ps: "ایروان", en: "Yerevan" },

    // Azerbaijan
    "GYD": { iata: "GYD", fa: "باکو", ps: "باکو", en: "Baku" },

    // Kazakhstan
    "ALA": { iata: "ALA", fa: "آلماتی", ps: "آلماتی", en: "Almaty" },
    "NQZ": { iata: "NQZ", fa: "نورسلطان", ps: "نورسلطان", en: "Nur-Sultan" },

    // Uzbekistan
    "TAS": { iata: "TAS", fa: "تاشکند", ps: "تاشکند", en: "Tashkent" },
    "SAM": { iata: "SAM", fa: "سمرقند", ps: "سمرقند", en: "Samarkand" },

    // Turkmenistan
    "ASB": { iata: "ASB", fa: "عشق‌آباد", ps: "عشق‌آباد", en: "Ashgabat" },

    // Kyrgyzstan
    "FRU": { iata: "FRU", fa: "بیشکک", ps: "بیشکک", en: "Bishkek" },

    // Tajikistan
    "DYU": { iata: "DYU", fa: "دوشنبه", ps: "دوشنبه", en: "Dushanbe" },

    // Egypt
    "CAI": { iata: "CAI", fa: "قاهره", ps: "قاهره", en: "Cairo" },
    "HRG": { iata: "HRG", fa: "شرم‌الشیخ", ps: "شرم‌الشیخ", en: "Sharm El Sheikh" },
    "SSH": { iata: "SSH", fa: "شرم‌الشیخ (بین‌المللی)", ps: "شرم‌الشیخ (بین‌المللی)", en: "Sharm El Sheikh (International)" },
    "LXR": { iata: "LXR", fa: "لوکسور", ps: "لوکسور", en: "Luxor" },
    "ASW": { iata: "ASW", fa: "اسوان", ps: "اسوان", en: "Aswan" },

    // Morocco
    "CMN": { iata: "CMN", fa: "کازابلانکا", ps: "کازابلانکا", en: "Casablanca" },
    "RAK": { iata: "RAK", fa: "مراکش", ps: "مراکش", en: "Marrakech" },
    "FEZ": { iata: "FEZ", fa: "فاس", ps: "فاس", en: "Fez" },
    "TNG": { iata: "TNG", fa: "طنجه", ps: "طنجه", en: "Tangier" },

    // Tunisia
    "TUN": { iata: "TUN", fa: "تونس", ps: "تونس", en: "Tunis" },
    "MIR": { iata: "MIR", fa: "منستیر", ps: "منستیر", en: "Monastir" },

    // Algeria
    "ALG": { iata: "ALG", fa: "الجزیره", ps: "الجزیره", en: "Algiers" },
    "ORN": { iata: "ORN", fa: "وران", ps: "وران", en: "Oran" },

    // Libya
    "TIP": { iata: "TIP", fa: "طرابلس", ps: "طرابلس", en: "Tripoli" },
    "BEN": { iata: "BEN", fa: "بنغازی", ps: "بنغازی", en: "Benghazi" },

    // Jordan
    "AMM": { iata: "AMM", fa: "عمان", ps: "عمان", en: "Amman" },
    "AQJ": { iata: "AQJ", fa: "عقبه", ps: "عقبه", en: "Aqaba" },

    // Lebanon
    "BEY": { iata: "BEY", fa: "بیروت", ps: "بیروت", en: "Beirut" },

    // Syria
    "DAM": { iata: "DAM", fa: "دمشق", ps: "دمشق", en: "Damascus" },
    "ALE": { iata: "ALE", fa: "حلب", ps: "حلب", en: "Aleppo" },

    // Cyprus
    "LCA": { iata: "LCA", fa: "لارناکا", ps: "لارناکا", en: "Larnaca" },
    "PFO": { iata: "PFO", fa: "پافوس", ps: "پافوس", en: "Paphos" },

    // Malta
    "MLA": { iata: "MLA", fa: "مالتا", ps: "مالتا", en: "Malta" },

    // Portugal
    "LIS": { iata: "LIS", fa: "لیسبون", ps: "لیسبون", en: "Lisbon" },
    "OPO": { iata: "OPO", fa: "پورتو", ps: "پورتو", en: "Porto" },
    "FAO": { iata: "FAO", fa: "فارو", ps: "فارو", en: "Faro" },
    "FNC": { iata: "FNC", fa: "مادیرا", ps: "مادیرا", en: "Madeira" },

    // Ireland
    "DUB": { iata: "DUB", fa: "دوبلین", ps: "دوبلین", en: "Dublin" },
    "SNN": { iata: "SNN", fa: "شنون", ps: "شنون", en: "Shannon" },
    "ORK": { iata: "ORK", fa: "کرک", ps: "کرک", en: "Cork" },

    // Canada
    "YYZ": { iata: "YYZ", fa: "تورنتو", ps: "تورنتو", en: "Toronto" },
    "YUL": { iata: "YUL", fa: "مونترال", ps: "مونترال", en: "Montreal" },
    "YVR": { iata: "YVR", fa: "ونکوور", ps: "ونکوور", en: "Vancouver" },
    "YEG": { iata: "YEG", fa: "ادمونتون", ps: "ادمونتون", en: "Edmonton" },
    "YYC": { iata: "YYC", fa: "کلگری", ps: "کلگری", en: "Calgary" },
    "YOW": { iata: "YOW", fa: "اوتاوا", ps: "اوتاوا", en: "Ottawa" },
    "YWG": { iata: "YWG", fa: "وینیپگ", ps: "وینیپگ", en: "Winnipeg" },
    "YHZ": { iata: "YHZ", fa: "هالیفکس", ps: "هالیفاکس", en: "Halifax" },

    // United States
    "JFK": { iata: "JFK", fa: "نیویورک (جی‌اف‌کی)", ps: "نیویورک (جی‌اف‌کی)", en: "New York (JFK)" },
    "LAX": { iata: "LAX", fa: "لس‌آنجلس", ps: "لس‌آنجلس", en: "Los Angeles" },
    "ORD": { iata: "ORD", fa: "شیکاگو (اوهر)", ps: "شیکاگو (اوهر)", en: "Chicago (O'Hare)" },
    "MIA": { iata: "MIA", fa: "میامی", ps: "میامی", en: "Miami" },
    "SFO": { iata: "SFO", fa: "سان‌فرانسیسکو", ps: "سان‌فرانسیسکو", en: "San Francisco" },
    "ATL": { iata: "ATL", fa: "آتلانتا", ps: "آتلانتا", en: "Atlanta" },
    "DFW": { iata: "DFW", fa: "دالاس", ps: "دالاس", en: "Dallas" },
    "DEN": { iata: "DEN", fa: "دنور", ps: "دنور", en: "Denver" },
    "SEA": { iata: "SEA", fa: "سیاتل", ps: "سیاتل", en: "Seattle" },
    "BOS": { iata: "BOS", fa: "بوستون", ps: "بوستون", en: "Boston" },
    "PHL": { iata: "PHL", fa: "فیلادلفیا", ps: "فیلادلفیا", en: "Philadelphia" },
    "LAS": { iata: "LAS", fa: "لاس‌وگاس", ps: "لاس‌وگاس", en: "Las Vegas" },
    "PHX": { iata: "PHX", fa: "فینیکس", ps: "فینیکس", en: "Phoenix" },
    "IAH": { iata: "IAH", fa: "هیوستون", ps: "هیوستون", en: "Houston" },
    "MCO": { iata: "MCO", fa: "اورلاندو", ps: "اورلاندو", en: "Orlando" },
    "EWR": { iata: "EWR", fa: "نیوآرک", ps: "نیوآرک", en: "Newark" },
    "DTW": { iata: "DTW", fa: "دیترویت", ps: "دیترویت", en: "Detroit" },
    "MSP": { iata: "MSP", fa: "مینیاپولیس", ps: "مینیاپولیس", en: "Minneapolis" },
    "SAN": { iata: "SAN", fa: "سان‌دیگو", ps: "سان‌دیگو", en: "San Diego" },
    "TPA": { iata: "TPA", fa: "تامپا", ps: "تامپا", en: "Tampa" },
    "FLL": { iata: "FLL", fa: "فورت لادردیل", ps: "فورت لادردیل", en: "Fort Lauderdale" },
    "HNL": { iata: "HNL", fa: "هونولولو", ps: "هونولولو", en: "Honolulu" },

    // Mexico
    "MEX": { iata: "MEX", fa: "مکزیکو سیتی", ps: "مکزیکو سیتی", en: "Mexico City" },
    "CUN": { iata: "CUN", fa: "کانکون", ps: "کانکون", en: "Cancun" },
    "GDL": { iata: "GDL", fa: "گوادالاخارا", ps: "گوادالاخارا", en: "Guadalajara" },
    "MTY": { iata: "MTY", fa: "مونتری", ps: "مونتری", en: "Monterrey" },
    "SJD": { iata: "SJD", fa: "سن خوزه دل کابو", ps: "سن خوزه دل کابو", en: "San Jose del Cabo" },

    // Brazil
    "GRU": { iata: "GRU", fa: "سائو پائولو", ps: "سائو پائولو", en: "Sao Paulo" },
    "GIG": { iata: "GIG", fa: "ریو دو ژانیرو", ps: "ریو دو ژانیرو", en: "Rio de Janeiro" },
    "BSB": { iata: "BSB", fa: "برازیلیا", ps: "برازیلیا", en: "Brasilia" },
    "CNF": { iata: "CNF", fa: "بلو هوریزونته", ps: "بلو هوریزونته", en: "Belo Horizonte" },
    "FOR": { iata: "FOR", fa: "فورتالزا", ps: "فورتالزا", en: "Fortaleza" },
    "POA": { iata: "POA", fa: "پورتو آلگره", ps: "پورتو آلگره", en: "Porto Alegre" },
    "REC": { iata: "REC", fa: "رسیف", ps: "رسیف", en: "Recife" },

    // Argentina
    "EZE": { iata: "EZE", fa: "بوئنوس آیرس", ps: "بوئنوس آیرس", en: "Buenos Aires" },
    "COR": { iata: "COR", fa: "کوردوبا", ps: "کوردوبا", en: "Cordoba" },
    "MDZ": { iata: "MDZ", fa: "مندوزا", ps: "مندوزا", en: "Mendoza" },

    // Chile
    "SCL": { iata: "SCL", fa: "سانتیاگو", ps: "سانتیاگو", en: "Santiago" },

    // Colombia
    "BOG": { iata: "BOG", fa: "بوگوتا", ps: "بوگوتا", en: "Bogota" },
    "MDE": { iata: "MDE", fa: "مدئین", ps: "مدئین", en: "Medellin" },
    "CLO": { iata: "CLO", fa: "کالی", ps: "کالی", en: "Cali" },
    "CTG": { iata: "CTG", fa: "کارتاگنا", ps: "کارتاگنا", en: "Cartagena" },

    // Peru
    "LIM": { iata: "LIM", fa: "لیما", ps: "لیما", en: "Lima" },
    "CUZ": { iata: "CUZ", fa: "کوزکو", ps: "کوزکو", en: "Cusco" },

    // Ecuador
    "UIO": { iata: "UIO", fa: "کیتو", ps: "کیتو", en: "Quito" },
    "GYE": { iata: "GYE", fa: "گایاکیل", ps: "گایاکیل", en: "Guayaquil" },

    // Venezuela
    "CCS": { iata: "CCS", fa: "کاراکاس", ps: "کاراکاس", en: "Caracas" },

    // Australia
    "SYD": { iata: "SYD", fa: "سیدنی", ps: "سیدنی", en: "Sydney" },
    "MEL": { iata: "MEL", fa: "ملبورن", ps: "ملبورن", en: "Melbourne" },
    "BNE": { iata: "BNE", fa: "بریزبین", ps: "بریزبین", en: "Brisbane" },
    "PER": { iata: "PER", fa: "پرت", ps: "پرت", en: "Perth" },
    "ADL": { iata: "ADL", fa: "آدلاید", ps: "آدلاید", en: "Adelaide" },
    "CBR": { iata: "CBR", fa: "کانبرا", ps: "کانبرا", en: "Canberra" },
    "OOL": { iata: "OOL", fa: "گلد کوست", ps: "گلد کوست", en: "Gold Coast" },
    "CNS": { iata: "CNS", fa: "کیرنز", ps: "کیرنز", en: "Cairns" },

    // New Zealand
    "AKL": { iata: "AKL", fa: "آکلند", ps: "آکلند", en: "Auckland" },
    "WLG": { iata: "WLG", fa: "ولینگتون", ps: "ولینگتون", en: "Wellington" },
    "CHC": { iata: "CHC", fa: "کرایست‌چرچ", ps: "کرایست‌چرچ", en: "Christchurch" },
    "ZQN": { iata: "ZQN", fa: "کویینزتاون", ps: "کویینزتاون", en: "Queenstown" },

    // Fiji
    "NAN": { iata: "NAN", fa: "ناندی", ps: "ناندی", en: "Nadi" },

    // South Africa
    "JNB": { iata: "JNB", fa: "ژوهانسبورگ", ps: "ژوهانسبورگ", en: "Johannesburg" },
    "CPT": { iata: "CPT", fa: "کیپ‌تاون", ps: "کیپ‌تاون", en: "Cape Town" },
    "DUR": { iata: "DUR", fa: "دوربان", ps: "دوربان", en: "Durban" },

    // Kenya
    "NBO": { iata: "NBO", fa: "نایروبی", ps: "نایروبی", en: "Nairobi" },
    "MBA": { iata: "MBA", fa: "مومباسا", ps: "مومباسا", en: "Mombasa" },

    // Ethiopia
    "ADD": { iata: "ADD", fa: "آدیس‌آبابا", ps: "آدیس‌آبابا", en: "Addis Ababa" },

    // Tanzania
    "DAR": { iata: "DAR", fa: "دارالسلام", ps: "دارالسلام", en: "Dar es Salaam" },
    "ZNZ": { iata: "ZNZ", fa: "زنجیبار", ps: "زنجیبار", en: "Zanzibar" },
    "JRO": { iata: "JRO", fa: "کیلیمنجارو", ps: "کیلیمنجارو", en: "Kilimanjaro" },

    // Uganda
    "EBB": { iata: "EBB", fa: "کامپالا", ps: "کامپالا", en: "Kampala" },

    // Rwanda
    "KGL": { iata: "KGL", fa: "کیگالی", ps: "کیگالی", en: "Kigali" },

    // Nigeria
    "LOS": { iata: "LOS", fa: "لاگوس", ps: "لاگوس", en: "Lagos" },
    "ABV": { iata: "ABV", fa: "ابوجا", ps: "ابوجا", en: "Abuja" },

    // Ghana
    "ACC": { iata: "ACC", fa: "آکرا", ps: "آکرا", en: "Accra" },

    // Senegal
    "DKR": { iata: "DKR", fa: "داکار", ps: "داکار", en: "Dakar" },

    // Ivory Coast
    "ABJ": { iata: "ABJ", fa: "آبیجان", ps: "آبیجان", en: "Abidjan" },

    // Cameroon
    "DLA": { iata: "DLA", fa: "دوالا", ps: "دوالا", en: "Douala" },
    "NSI": { iata: "NSI", fa: "یائونده", ps: "یائونده", en: "Yaounde" },

    // Angola
    "LAD": { iata: "LAD", fa: "لوآندا", ps: "لوآندا", en: "Luanda" },

    // Mozambique
    "MPM": { iata: "MPM", fa: "ماپوتو", ps: "ماپوتو", en: "Maputo" },

    // Zambia
    "LUN": { iata: "LUN", fa: "لوساکا", ps: "لوساکا", en: "Lusaka" },

    // Zimbabwe
    "HRE": { iata: "HRE", fa: "هاراره", ps: "هاراره", en: "Harare" },

    // Botswana
    "GBE": { iata: "GBE", fa: "گابورون", ps: "گابورون", en: "Gaborone" },

    // Namibia
    "WDH": { iata: "WDH", fa: "ویندهوک", ps: "ویندهوک", en: "Windhoek" },

    // Mauritius
    "MRU": { iata: "MRU", fa: "موریس", ps: "موریس", en: "Mauritius" },

    // Seychelles
    "SEZ": { iata: "SEZ", fa: "سیشل", ps: "سیشل", en: "Seychelles" },

    // Maldives
    "MLE": { iata: "MLE", fa: "مالدیو", ps: "مالدیو", en: "Maldives" },

    // Myanmar
    "RGN": { iata: "RGN", fa: "یانگون", ps: "یانگون", en: "Yangon" },
    "MDY": { iata: "MDY", fa: "ماندالای", ps: "ماندالای", en: "Mandalay" },

    // Cambodia
    "PNH": { iata: "PNH", fa: "پنوم‌پن", ps: "پنوم‌پن", en: "Phnom Penh" },
    "REP": { iata: "REP", fa: "سیام‌ریپ", ps: "سیام‌ریپ", en: "Siem Reap" },

    // Laos
    "VTE": { iata: "VTE", fa: "وینتیان", ps: "وینتیان", en: "Vientiane" },

    // Brunei
    "BWN": { iata: "BWN", fa: "بندر سری بگاوان", ps: "بندر سری بگاوان", en: "Bandar Seri Begawan" },

    // Papua New Guinea
    "POM": { iata: "POM", fa: "پورت مورسبی", ps: "پورت مورسبی", en: "Port Moresby" },

    // Dominican Republic
    "SDQ": { iata: "SDQ", fa: "سانتو دومینگو", ps: "سانتو دومینگو", en: "Santo Domingo" },
    "PUJ": { iata: "PUJ", fa: "پونتا کانا", ps: "پونتا کانا", en: "Punta Cana" },

    // Jamaica
    "KIN": { iata: "KIN", fa: "کینگستون", ps: "کینگستون", en: "Kingston" },
    "MBJ": { iata: "MBJ", fa: "مونتگو بی", ps: "مونتگو بی", en: "Montego Bay" },

    // Bahamas
    "NAS": { iata: "NAS", fa: "ناسائو", ps: "ناسائو", en: "Nassau" },

    // Cuba
    "HAV": { iata: "HAV", fa: "هاوانا", ps: "هاوانا", en: "Havana" },
    "VRA": { iata: "VRA", fa: "وارادرو", ps: "وارادرو", en: "Varadero" },

    // Puerto Rico
    "SJU": { iata: "SJU", fa: "سان خوان", ps: "سان خوان", en: "San Juan" },

    // Panama
    "PTY": { iata: "PTY", fa: "پاناما سیتی", ps: "پاناما سیتی", en: "Panama City" },

    // Costa Rica
    "SJO": { iata: "SJO", fa: "سان خوزه", ps: "سان خوزه", en: "San Jose" },
    "LIR": { iata: "LIR", fa: "لیبریا", ps: "لیبریا", en: "Liberia" },

    // Guatemala
    "GUA": { iata: "GUA", fa: "گواتمالا سیتی", ps: "گواتمالا سیتی", en: "Guatemala City" },

    // El Salvador
    "SAL": { iata: "SAL", fa: "سان سالوادور", ps: "سان سالوادور", en: "San Salvador" },

    // Honduras
    "TGU": { iata: "TGU", fa: "تگوسیگالپا", ps: "تگوسیگالپا", en: "Tegucigalpa" },
    "SAP": { iata: "SAP", fa: "سان پدرو سولا", ps: "سان پدرو سولا", en: "San Pedro Sula" },

    // Nicaragua
    "MGA": { iata: "MGA", fa: "ماناگوا", ps: "ماناگوا", en: "Managua" },

    // Paraguay
    "ASU": { iata: "ASU", fa: "آسونسیون", ps: "آسونسیون", en: "Asuncion" },

    // Uruguay
    "MVD": { iata: "MVD", fa: "مونته‌ویدئو", ps: "مونته‌ویدئو", en: "Montevideo" },

    // Bolivia
    "LPB": { iata: "LPB", fa: "لاپاز", ps: "لاپاز", en: "La Paz" },
    "VVI": { iata: "VVI", fa: "سانتا کروز", ps: "سانتا کروز", en: "Santa Cruz" },

    // Suriname
    "PBM": { iata: "PBM", fa: "پاراماریبو", ps: "پاراماریبو", en: "Paramaribo" },

    // Guyana
    "GEO": { iata: "GEO", fa: "جورج‌تاون", ps: "جورج‌تاون", en: "Georgetown" },

    // Haiti
    "PAP": { iata: "PAP", fa: "پورت‌او‌پرنس", ps: "پورت‌او‌پرنس", en: "Port au Prince" },

    // Trinidad and Tobago
    "POS": { iata: "POS", fa: "پورت آو اسپاین", ps: "پورت آو اسپاین", en: "Port of Spain" },

    // Barbados
    "BGI": { iata: "BGI", fa: "بریدج‌تاون", ps: "بریدج‌تاون", en: "Bridgetown" },

    // Grenada
    "GND": { iata: "GND", fa: "سنت جورجز", ps: "سنت جورجز", en: "St. George's" },

    // Saint Lucia
    "UVF": { iata: "UVF", fa: "ویو فورت", ps: "ویو فورت", en: "Vieux Fort" },

    // Antigua and Barbuda
    "ANU": { iata: "ANU", fa: "سنت جانز", ps: "سنت جانز", en: "St. John's" },

    // Aruba
    "AUA": { iata: "AUA", fa: "اورانجستاد", ps: "اورانجستاد", en: "Oranjestad" },

    // Curacao
    "CUR": { iata: "CUR", fa: "ویلمستاد", ps: "ویلمستاد", en: "Willemstad" },

    // Luxembourg
    "LUX": { iata: "LUX", fa: "لوکزامبورگ", ps: "لوکزامبورگ", en: "Luxembourg" },

    // Slovenia
    "LJU": { iata: "LJU", fa: "لیوبلیانا", ps: "لیوبلیانا", en: "Ljubljana" },

    // Croatia
    "ZAG": { iata: "ZAG", fa: "زاگرب", ps: "زاگرب", en: "Zagreb" },
    "SPU": { iata: "SPU", fa: "سپلیت", ps: "سپلیت", en: "Split" },
    "DBV": { iata: "DBV", fa: "دوبروونیک", ps: "دوبروونیک", en: "Dubrovnik" },

    // Serbia
    "BEG": { iata: "BEG", fa: "بلگراد", ps: "بلگراد", en: "Belgrade" },

    // Bosnia and Herzegovina
    "SJJ": { iata: "SJJ", fa: "سارایوو", ps: "سارایوو", en: "Sarajevo" },

    // North Macedonia
    "SKP": { iata: "SKP", fa: "اسکوپیه", ps: "اسکوپیه", en: "Skopje" },

    // Albania
    "TIA": { iata: "TIA", fa: "تیرانا", ps: "تیرانا", en: "Tirana" },

    // Montenegro
    "TGD": { iata: "TGD", fa: "پودگوریتسا", ps: "پودگوریتسا", en: "Podgorica" },
    "TIV": { iata: "TIV", fa: "تیوات", ps: "تیوات", en: "Tivat" },

    // Kosovo
    "PRN": { iata: "PRN", fa: "پریشتینا", ps: "پریشتینا", en: "Pristina" },

    // Moldova
    "KIV": { iata: "KIV", fa: "کیشیناو", ps: "کیشیناو", en: "Chisinau" },

    // Latvia
    "RIX": { iata: "RIX", fa: "ریگا", ps: "ریگا", en: "Riga" },

    // Lithuania
    "VNO": { iata: "VNO", fa: "ویلنیوس", ps: "ویلنیوس", en: "Vilnius" },
    "KUN": { iata: "KUN", fa: "کاوناس", ps: "کاوناس", en: "Kaunas" },

    // Estonia
    "TLL": { iata: "TLL", fa: "تالین", ps: "تالین", en: "Tallinn" },

    // Slovakia
    "BTS": { iata: "BTS", fa: "براتیسلاوا", ps: "براتیسلاوا", en: "Bratislava" },

    // Andorra
    "ALV": { iata: "ALV", fa: "آندورا لا ولا", ps: "آندورا لا ولا", en: "Andorra la Vella" },

    // Monaco
    "MCM": { iata: "MCM", fa: "موناکو", ps: "موناکو", en: "Monaco" },

    // San Marino
    "RSM": { iata: "RSM", fa: "سان مارینو", ps: "سان مارینو", en: "San Marino" },

    // Liechtenstein
    "QVU": { iata: "QVU", fa: "فادوتس", ps: "فادوتس", en: "Vaduz" },

    // Greenland
    "JGR": { iata: "JGR", fa: "نوک", ps: "نوک", en: "Nuuk" },

    // Faroe Islands
    "FAE": { iata: "FAE", fa: "تورشاون", ps: "تورشاون", en: "Torshavn" },
  };

  const allCities = Object.values(cityIATAMapping).map(city => ({
    iata: city.iata,
    name: lang === "fa" ? city.fa : lang === "ps" ? city.ps : city.en
  }));

  // Filter cities based on search input
  const filteredOriginCities = originDisplay
    ? allCities.filter(city => city.name.toLowerCase().includes(originDisplay.toLowerCase()))
    : allCities;

  const filteredDestinationCities = destinationDisplay
    ? allCities.filter(city => city.name.toLowerCase().includes(destinationDisplay.toLowerCase()))
    : allCities;

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Trip Type Selector */}
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => {
              setTripType("one-way");
              setReturnDate("");
            }}
            className={`flex-1 rounded-xl px-4 py-3 text-sm font-semibold transition-all ${tripType === "one-way"
              ? "bg-gradient-to-r from-[#0dadd1] to-[#377bc9] text-white shadow-lg"
              : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
          >
            {lang === "fa" ? "رفت" : lang === "ps" ? "رفت" : "One-way"}
          </button>
          <button
            type="button"
            onClick={() => setTripType("round-trip")}
            className={`flex-1 rounded-xl px-4 py-3 text-sm font-semibold transition-all ${tripType === "round-trip"
              ? "bg-gradient-to-r from-[#0dadd1] to-[#377bc9] text-white shadow-lg"
              : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
          >
            {lang === "fa" ? "رفت و برگشت" : lang === "ps" ? "رفت او ورست" : "Round-trip"}
          </button>
        </div>

        {/* Origin and Destination */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end">
          {/* Origin */}
          <div ref={originRef} className="relative md:col-span-5">
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              {lang === "fa" ? "کشور مبدا" : lang === "ps" ? "د مبدا هیواد" : "From Country"}
            </label>
            <div className="relative">
              <input
                type="text"
                value={originDisplay}
                onChange={(e) => {
                  setOriginDisplay(e.target.value);
                  const matched = allCities.find(c => c.name.includes(e.target.value));
                  if (matched) {
                    setOrigin(matched.iata);
                  }
                }}
                onFocus={() => setShowOriginList(true)}
                placeholder={lang === "fa" ? "کشور مبدا" : lang === "ps" ? "د مبدا هیواد" : "Origin country"}
                className={`w-full rounded-xl border-2 border-slate-200 py-3 text-base text-slate-900 placeholder:text-slate-400 focus:border-[#0dadd1] focus:outline-none focus:ring-2 focus:ring-[#0dadd1]/20 transition-all ${isRtl ? 'pr-14 pl-4' : 'pl-14 pr-4'}`}
              />
              <Plane className={`absolute top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none ${isRtl ? 'left-4' : 'right-4'}`} />
            </div>
            {showOriginList && (
              <div className="absolute z-10 mt-2 max-h-60 w-full overflow-y-auto rounded-xl border border-slate-200 bg-white shadow-xl">
                {filteredOriginCities.map((city) => (
                  <button
                    key={city.iata}
                    type="button"
                    onClick={() => {
                      setOrigin(city.iata);
                      setOriginDisplay(city.name);
                      setShowOriginList(false);
                    }}
                    className="w-full px-4 py-3 text-left text-sm text-slate-700 hover:bg-slate-100 transition-colors"
                  >
                    {city.name} ({city.iata})
                  </button>
                ))}
                {filteredOriginCities.length === 0 && (
                  <div className="px-4 py-3 text-sm text-slate-500">
                    {lang === "fa" ? "شهری یافت نشد" : lang === "ps" ? "هیڅ ښار وموندل نشو" : "No city found"}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Swap Button */}
          <div className="hidden md:flex items-center justify-center md:col-span-2">
            <button
              type="button"
              onClick={swapCities}
              className="h-12 w-12 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-lg hover:from-blue-600 hover:to-blue-700 transition-all hover:scale-110"
            >
              <ArrowRightLeft className="h-5 w-5" />
            </button>
          </div>

          {/* Destination */}
          <div ref={destRef} className="relative md:col-span-5">
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              {lang === "fa" ? "کشور مقصد" : lang === "ps" ? "د مقصد هیواد" : "To Country"}
            </label>
            <div className="relative">
              <input
                type="text"
                value={destinationDisplay}
                onChange={(e) => {
                  setDestinationDisplay(e.target.value);
                  const matched = allCities.find(c => c.name.includes(e.target.value));
                  if (matched) {
                    setDestination(matched.iata);
                  }
                }}
                onFocus={() => setShowDestinationList(true)}
                placeholder={lang === "fa" ? "کشور مقصد" : lang === "ps" ? "د مقصد هیواد" : "Destination country"}
                className={`w-full rounded-xl border-2 border-slate-200 py-3 text-base text-slate-900 placeholder:text-slate-400 focus:border-[#0dadd1] focus:outline-none focus:ring-2 focus:ring-[#0dadd1]/20 transition-all ${isRtl ? 'pr-14 pl-4' : 'pl-14 pr-4'}`}
              />
              <Plane className={`absolute top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none ${isRtl ? 'left-4 rotate-180' : 'right-4 rotate-180'}`} />
            </div>
            {showDestinationList && (
              <div className="absolute z-10 mt-2 max-h-60 w-full overflow-y-auto rounded-xl border border-slate-200 bg-white shadow-xl">
                {filteredDestinationCities.map((city) => (
                  <button
                    key={city.iata}
                    type="button"
                    onClick={() => {
                      setDestination(city.iata);
                      setDestinationDisplay(city.name);
                      setShowDestinationList(false);
                    }}
                    className="w-full px-4 py-3 text-left text-sm text-slate-700 hover:bg-slate-100 transition-colors"
                  >
                    {city.name} ({city.iata})
                  </button>
                ))}
                {filteredDestinationCities.length === 0 && (
                  <div className="px-4 py-3 text-sm text-slate-500">
                    {lang === "fa" ? "شهری یافت نشد" : lang === "ps" ? "هیڅ ښار وموندل نشو" : "No city found"}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Date and Passengers */}
        <div className={`grid gap-4 ${tripType === "round-trip" ? "grid-cols-1 md:grid-cols-3" : "grid-cols-1 md:grid-cols-2"}`}>
          {/* Departure Date */}
          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              {lang === "fa" ? "تاریخ رفت" : lang === "ps" ? "د رفت نېټه" : "Departure Date"}
            </label>
            <div className="flex flex-col gap-2 sm:flex-row sm:gap-2">
              <div className="relative flex-1 w-full">
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  min={today}
                  required
                  className={`w-full rounded-xl border-2 border-slate-200 py-2.5 text-sm text-slate-900 focus:border-[#0dadd1] focus:outline-none focus:ring-2 focus:ring-[#0dadd1]/20 transition-all ${isRtl ? 'pr-3 pl-3' : 'pl-3 pr-3'}`}
                />
              </div>
              <div className="flex gap-2 sm:w-auto">
                <button
                  type="button"
                  onClick={() => setDate(today)}
                  className="flex-1 sm:flex-none rounded-xl bg-gradient-to-br from-blue-50 to-blue-100 px-3 py-2.5 text-xs font-semibold text-blue-700 shadow-sm transition-all hover:from-blue-100 hover:to-blue-200 hover:shadow-md border border-blue-200 whitespace-nowrap"
                >
                  {lang === "fa" ? "امروز" : lang === "ps" ? "نن" : "Today"}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    const tomorrow = new Date();
                    tomorrow.setDate(tomorrow.getDate() + 1);
                    setDate(tomorrow.toISOString().split("T")[0]);
                  }}
                  className="flex-1 sm:flex-none rounded-xl bg-gradient-to-br from-blue-50 to-blue-100 px-3 py-2.5 text-xs font-semibold text-blue-700 shadow-sm transition-all hover:from-blue-100 hover:to-blue-200 hover:shadow-md border border-blue-200 whitespace-nowrap"
                >
                  {lang === "fa" ? "فردا" : lang === "ps" ? "پرېږده" : "Tomorrow"}
                </button>
              </div>
            </div>
          </div>

          {/* Return Date (only for round-trip) */}
          {tripType === "round-trip" && (
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                {lang === "fa" ? "تاریخ برگشت" : lang === "ps" ? "د ورست نېټه" : "Return Date"}
              </label>
              <div className="flex flex-col gap-2 sm:flex-row sm:gap-2">
                <div className="relative flex-1 w-full">
                  <input
                    type="date"
                    value={returnDate}
                    onChange={(e) => setReturnDate(e.target.value)}
                    min={date || today}
                    required={tripType === "round-trip"}
                    className={`w-full rounded-xl border-2 border-slate-200 py-2.5 text-sm text-slate-900 focus:border-[#0dadd1] focus:outline-none focus:ring-2 focus:ring-[#0dadd1]/20 transition-all ${isRtl ? 'pr-3 pl-3' : 'pl-3 pr-3'}`}
                  />
                </div>
                <button
                  type="button"
                  onClick={() => {
                    const nextDay = new Date(date || today);
                    nextDay.setDate(nextDay.getDate() + 1);
                    setReturnDate(nextDay.toISOString().split("T")[0]);
                  }}
                  className="flex-1 sm:flex-none rounded-xl bg-gradient-to-br from-blue-50 to-blue-100 px-3 py-2.5 text-xs font-semibold text-blue-700 shadow-sm transition-all hover:from-blue-100 hover:to-blue-200 hover:shadow-md border border-blue-200 whitespace-nowrap"
                >
                  {lang === "fa" ? "روز بعد" : lang === "ps" ? "بل ورځ" : "+1 Day"}
                </button>
              </div>
            </div>
          )}

          {/* Passengers */}
          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              {lang === "fa" ? "تعداد مسافران" : lang === "ps" ? "د مسافرینو شمیر" : "Passengers"}
            </label>
            <div className="relative">
              <select
                value={passengers}
                onChange={(e) => setPassengers(e.target.value)}
                className={`w-full rounded-xl border-2 border-slate-200 py-3 text-base text-slate-900 focus:border-[#0dadd1] focus:outline-none focus:ring-2 focus:ring-[#0dadd1]/20 transition-all appearance-none ${isRtl ? 'pr-14 pl-4' : 'pl-14 pr-4'}`}
              >
                <option value="1">1 {lang === "fa" ? "مسافر" : lang === "ps" ? "مسافر" : "Passenger"}</option>
                <option value="2">2 {lang === "fa" ? "مسافر" : lang === "ps" ? "مسافر" : "Passengers"}</option>
                <option value="3">3 {lang === "fa" ? "مسافر" : lang === "ps" ? "مسافر" : "Passengers"}</option>
                <option value="4">4 {lang === "fa" ? "مسافر" : lang === "ps" ? "مسافر" : "Passengers"}</option>
                <option value="5">5+ {lang === "fa" ? "مسافر" : lang === "ps" ? "مسافر" : "Passengers"}</option>
              </select>
              <Users className={`absolute top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none ${isRtl ? 'left-4' : 'right-4'}`} />
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSearching}
          className="flex w-full items-center justify-center gap-3 rounded-xl bg-gradient-to-r from-[#0dadd1] to-[#377bc9] px-6 py-4 text-base font-bold text-white shadow-lg transition-all hover:from-[#0a9bbf] hover:to-[#2d6aa8] hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isSearching ? (
            <>
              <div className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
              {lang === "fa" ? "در حال جستجو..." : lang === "ps" ? "په لټون کې..." : "Searching..."}
            </>
          ) : (
            <>
              <Search className="h-5 w-5" />
              {lang === "fa" ? "جستجوی پرواز" : lang === "ps" ? "الوتنه وپلټئ" : "Search Flights"}
            </>
          )}
        </button>
      </form>

      {showToast && (
        <Toast
          message={toastMessage}
          onClose={() => setShowToast(false)}
        />
      )}
    </>
  );
};