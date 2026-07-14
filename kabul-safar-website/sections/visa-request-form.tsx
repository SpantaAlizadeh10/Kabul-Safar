"use client";

import { useState } from "react";
import { useI18n } from "@/components/i18n-provider";
import { getFooterContent } from "@/lib/data";

const formText = {
  fa: {
    stepTitles: ["جزئیات سفر", "سفر و هتل", "اطلاعات تماس", "بازبینی و ارسال"],
    labels: {
      tripType: "نوع سفر",
      visaType: "نوع ویزا",
      flightClass: "کلاس پرواز",
      origin: "مبدا",
      destination: "مقصد",
      departDate: "تاریخ رفت",
      returnDate: "تاریخ برگشت",
      passengers: "تعداد مسافرین",
      hotel: "هتل مورد نظر",
      roomType: "نوع اتاق",
      nights: "تعداد شب",
      budget: "بودجه تقریبی",
      travelReason: "نوع سفر",
      fullName: "نام کامل",
      phone: "شماره واتساپ",
      email: "ایمیل (اختیاری)",
      notes: "یادداشت / درخواست ویژه",
    },
    placeholders: {
      origin: "مثلاً تهران یا کابل",
      destination: "مثلاً تفلیس یا استانبول",
      hotel: "نام هتل یا محل اقامت",
      budget: "مثلاً 2000 یورو",
      travelReason: "تفریحی، زیارتی یا کاری",
      fullName: "نام و نام خانوادگی",
      phone: "مثلاً +989123456789",
      email: "example@mail.com",
      notes: "هر درخواست خاصی دارید بنویسید",
    },
    buttons: {
      next: "مرحله بعد",
      back: "بازگشت",
      send: "ارسال به واتساپ",
      edit: "ویرایش",
    },
    summaryTitle: "خلاصه درخواست شما",
    formTitle: "درخواست ویزای پیشرفته",
    formSubtitle: "یک فرم چند مرحله‌ای برای برنامه‌ریزی کامل سفر شما.",
    successMessage: "پیام شما آماده ارسال به واتساپ است.",
  },
  en: {
    stepTitles: [
      "Trip details",
      "Hotel & stay",
      "Contact info",
      "Review & send",
    ],
    labels: {
      tripType: "Trip type",
      visaType: "Visa type",
      flightClass: "Flight class",
      origin: "Origin",
      destination: "Destination",
      departDate: "Departure date",
      returnDate: "Return date",
      passengers: "Passengers",
      hotel: "Hotel preference",
      roomType: "Room type",
      nights: "Nights",
      budget: "Estimated budget",
      travelReason: "Travel purpose",
      fullName: "Full name",
      phone: "WhatsApp number",
      email: "Email (optional)",
      notes: "Notes / special requests",
    },
    placeholders: {
      origin: "e.g. Tehran or Kabul",
      destination: "e.g. Tbilisi or Istanbul",
      hotel: "Hotel name or accommodation",
      budget: "e.g. 2000 EUR",
      travelReason: "Leisure, pilgrimage, business",
      fullName: "Full name",
      phone: "+1234567890",
      email: "example@mail.com",
      notes: "Any special requirements",
    },
    buttons: {
      next: "Next step",
      back: "Back",
      send: "Send to WhatsApp",
      edit: "Edit",
    },
    summaryTitle: "Your request summary",
    formTitle: "Advanced visa request",
    formSubtitle: "A multi-step form for complete trip planning.",
    successMessage: "Your request is ready to send via WhatsApp.",
  },
  ps: {
    stepTitles: [
      "د سفر جزئيات",
      "هوټل او پاتې کېدل",
      "د تماس معلومات",
      "کتنه او لیږل",
    ],
    labels: {
      tripType: "د سفر ډول",
      visaType: "د ویزې ډول",
      flightClass: "د الوتنې کلاس",
      origin: "مبدا",
      destination: "مقصد",
      departDate: "د تګ نېټه",
      returnDate: "د راستنېدو نېټه",
      passengers: "د مسافرینو شمېر",
      hotel: "د هوټل غوره توب",
      roomType: "د خونې ډول",
      nights: "شپې",
      budget: "اټکل شوی بودیجه",
      travelReason: "د سفر هدف",
      fullName: "بشپړ نوم",
      phone: "د واتساپ شمېره",
      email: "بریښنالیک (اختیاري)",
      notes: "یادداشت / ځانګړي غوښتنې",
    },
    placeholders: {
      origin: "مثلاً کابل یا تهران",
      destination: "مثلاً استانبول یا دوبۍ",
      hotel: "د هوټل نوم یا د استوګنې ځای",
      budget: "مثلاً 2000 EUR",
      travelReason: "سياحتي، زيارتي يا کاري",
      fullName: "ستاسو بشپړ نوم",
      phone: "+1234567890",
      email: "example@mail.com",
      notes: "خپلې ځانګړې غوښتنې دلته ولیکئ",
    },
    buttons: {
      next: "راتلونکی پړاو",
      back: "شاته",
      send: "واتساپ ته واستوئ",
      edit: "سمون",
    },
    summaryTitle: "ستاسو د غوښتنې لنډيز",
    formTitle: "پرمختللې ویزې غوښتنه",
    formSubtitle: "د سفر د بشپړ پلان جوړولو لپاره څو مرحلوي فورمه.",
    successMessage: "ستاسو پیغام د واتساپ لپاره چمتو دی.",
  },
};

export const VisaRequestForm = () => {
  const { lang } = useI18n();
  const isRtl = lang === "fa" || lang === "ps";
  const content = formText[lang];
  const today = new Date().toISOString().split("T")[0];

  const [step, setStep] = useState(0);
  const [values, setValues] = useState({
    tripType: "Round-trip",
    visaType: "Tourist",
    flightClass: "Economy",
    origin: "",
    destination: "",
    departDate: "",
    returnDate: "",
    passengers: "1",
    hotel: "",
    roomType: "Double",
    nights: "3",
    budget: "",
    travelReason: "",
    fullName: "",
    phone: "",
    email: "",
    notes: "",
  });

  const handleChange = (key: string, value: string) => {
    setValues((prev) => ({ ...prev, [key]: value }));
  };

  const footer = getFooterContent(lang);
  const phone =
    footer.phone?.replace(/\D/g, "").replace(/^00/, "").replace(/^\+/, "") ||
    "";

  const message = [
    content.formTitle,
    `${content.labels.origin}: ${values.origin || "-"}`,
    `${content.labels.destination}: ${values.destination || "-"}`,
    `${content.labels.tripType}: ${values.tripType}`,
    `${content.labels.visaType}: ${values.visaType}`,
    `${content.labels.flightClass}: ${values.flightClass}`,
    `${content.labels.departDate}: ${values.departDate || "-"}`,
    `${content.labels.returnDate}: ${values.returnDate || "-"}`,
    `${content.labels.passengers}: ${values.passengers}`,
    `${content.labels.hotel}: ${values.hotel || "-"}`,
    `${content.labels.roomType}: ${values.roomType}`,
    `${content.labels.nights}: ${values.nights}`,
    `${content.labels.budget}: ${values.budget || "-"}`,
    `${content.labels.travelReason}: ${values.travelReason || "-"}`,
    `${content.labels.fullName}: ${values.fullName || "-"}`,
    `${content.labels.phone}: ${values.phone || "-"}`,
    `${content.labels.email}: ${values.email || "-"}`,
    `${content.labels.notes}: ${values.notes || "-"}`,
  ].join("\n");

  const sendWhatsApp = () => {
    const encoded = encodeURIComponent(message);
    const url = phone
      ? `https://api.whatsapp.com/send?phone=${phone}&text=${encoded}`
      : `https://api.whatsapp.com/send?text=${encoded}`;
    window.open(url, "_blank");
  };

  const isLastStep = step === 3;

  return (
    <section className="rounded-[30px] bg-white p-6 shadow-sm ring-1 ring-slate-200 md:p-10">
      <div className="space-y-4 md:flex md:items-end md:justify-between md:space-y-0">
        <div className="space-y-2 text-right">
          <h2 className="text-2xl font-bold text-slate-900">
            {content.formTitle}
          </h2>
          <p className="max-w-2xl text-sm leading-6 text-slate-600">
            {content.formSubtitle}
          </p>
        </div>
        <div className="rounded-2xl bg-slate-50 px-4 py-3 text-sm text-slate-600">
          {content.stepTitles[step]}
        </div>
      </div>

      <div className="mt-6 flex items-center gap-2 overflow-x-auto pb-2">
        {content.stepTitles.map((label, idx) => (
          <div
            key={label}
            className={`min-w-28 rounded-2xl border px-3 py-2 text-center text-xs font-semibold ${
              idx === step
                ? "border-[#0dadd1] bg-[#0dadd1]/10 text-[#0dadd1]"
                : "border-slate-200 bg-white text-slate-500"
            }`}
          >
            {label}
          </div>
        ))}
      </div>

      <div className="mt-6 space-y-6 text-right">
        {step === 0 && (
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-slate-700">
                {content.labels.tripType}
              </label>
              <select
                value={values.tripType}
                onChange={(e) => handleChange("tripType", e.target.value)}
                className="w-full field-fancy text-sm text-slate-700"
              >
                <option>{isRtl ? "دو طرفه" : "Round-trip"}</option>
                <option>{isRtl ? "یک طرفه" : "One-way"}</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-slate-700">
                {content.labels.visaType}
              </label>
              <select
                value={values.visaType}
                onChange={(e) => handleChange("visaType", e.target.value)}
                className="w-full field-fancy text-sm text-slate-700"
              >
                <option>{isRtl ? "توریستی" : "Tourist"}</option>
                <option>{isRtl ? "کاری" : "Business"}</option>
                <option>{isRtl ? "زیارتی" : "Pilgrimage"}</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-slate-700">
                {content.labels.flightClass}
              </label>
              <select
                value={values.flightClass}
                onChange={(e) => handleChange("flightClass", e.target.value)}
                className="w-full field-fancy text-sm text-slate-700"
              >
                <option>{isRtl ? "اکونومی" : "Economy"}</option>
                <option>{isRtl ? "بیزینس" : "Business"}</option>
                <option>{isRtl ? "فرست کلاس" : "First class"}</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-slate-700">
                {content.labels.origin}
              </label>
              <input
                value={values.origin}
                onChange={(e) => handleChange("origin", e.target.value)}
                placeholder={content.placeholders.origin}
                className="w-full field-fancy text-sm text-slate-700"
              />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-slate-700">
                {content.labels.destination}
              </label>
              <input
                value={values.destination}
                onChange={(e) => handleChange("destination", e.target.value)}
                placeholder={content.placeholders.destination}
                className="w-full field-fancy text-sm text-slate-700"
              />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-slate-700">
                {content.labels.departDate}
              </label>
              <input
                type="date"
                min={today}
                value={values.departDate}
                onChange={(e) => handleChange("departDate", e.target.value)}
                className="w-full field-fancy text-sm text-slate-700"
              />
            </div>
            {values.tripType === (isRtl ? "دو طرفه" : "Round-trip") && (
              <div className="space-y-2 md:col-span-2">
                <label className="block text-sm font-semibold text-slate-700">
                  {content.labels.returnDate}
                </label>
                <input
                  type="date"
                  min={values.departDate || today}
                  value={values.returnDate}
                  onChange={(e) => handleChange("returnDate", e.target.value)}
                  className="w-full field-fancy text-sm text-slate-700"
                />
              </div>
            )}
          </div>
        )}

        {step === 1 && (
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-slate-700">
                {content.labels.passengers}
              </label>
              <input
                type="number"
                min="1"
                value={values.passengers}
                onChange={(e) => handleChange("passengers", e.target.value)}
                className="w-full field-fancy text-sm text-slate-700"
              />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-slate-700">
                {content.labels.hotel}
              </label>
              <input
                value={values.hotel}
                onChange={(e) => handleChange("hotel", e.target.value)}
                placeholder={content.placeholders.hotel}
                className="w-full field-fancy text-sm text-slate-700"
              />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-slate-700">
                {content.labels.roomType}
              </label>
              <select
                value={values.roomType}
                onChange={(e) => handleChange("roomType", e.target.value)}
                className="w-full field-fancy text-sm text-slate-700"
              >
                <option>{isRtl ? "دو تخته" : "Double"}</option>
                <option>{isRtl ? "یک تخته" : "Single"}</option>
                <option>{isRtl ? "خانوادگی" : "Family"}</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-slate-700">
                {content.labels.nights}
              </label>
              <input
                type="number"
                min="1"
                value={values.nights}
                onChange={(e) => handleChange("nights", e.target.value)}
                className="w-full field-fancy text-sm text-slate-700"
              />
            </div>
            <div className="md:col-span-2 space-y-2">
              <label className="block text-sm font-semibold text-slate-700">
                {content.labels.budget}
              </label>
              <input
                value={values.budget}
                onChange={(e) => handleChange("budget", e.target.value)}
                placeholder={content.placeholders.budget}
                className="w-full field-fancy text-sm text-slate-700"
              />
            </div>
            <div className="md:col-span-2 space-y-2">
              <label className="block text-sm font-semibold text-slate-700">
                {content.labels.travelReason}
              </label>
              <input
                value={values.travelReason}
                onChange={(e) => handleChange("travelReason", e.target.value)}
                placeholder={content.placeholders.travelReason}
                className="w-full field-fancy text-sm text-slate-700"
              />
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-slate-700">
                {content.labels.fullName}
              </label>
              <input
                value={values.fullName}
                onChange={(e) => handleChange("fullName", e.target.value)}
                placeholder={content.placeholders.fullName}
                className="w-full field-fancy text-sm text-slate-700"
              />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-slate-700">
                {content.labels.phone}
              </label>
              <input
                value={values.phone}
                onChange={(e) => handleChange("phone", e.target.value)}
                placeholder={content.placeholders.phone}
                className="w-full field-fancy text-sm text-slate-700"
              />
            </div>
            <div className="space-y-2 md:col-span-2">
              <label className="block text-sm font-semibold text-slate-700">
                {content.labels.email}
              </label>
              <input
                type="email"
                value={values.email}
                onChange={(e) => handleChange("email", e.target.value)}
                placeholder={content.placeholders.email}
                className="w-full field-fancy text-sm text-slate-700"
              />
            </div>
            <div className="md:col-span-2 space-y-2">
              <label className="block text-sm font-semibold text-slate-700">
                {content.labels.notes}
              </label>
              <textarea
                value={values.notes}
                onChange={(e) => handleChange("notes", e.target.value)}
                placeholder={content.placeholders.notes}
                rows={4}
                className="w-full field-fancy text-sm text-slate-700"
              />
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-4 rounded-3xl bg-slate-50 p-5 md:p-6">
            <h3 className="text-lg font-bold text-slate-900">
              {content.summaryTitle}
            </h3>
            <div className="grid gap-3 md:grid-cols-2">
              {Object.entries(values).map(([key, value]) => (
                <div
                  key={key}
                  className="rounded-2xl border border-slate-200 bg-white p-4 text-sm"
                >
                  <p className="font-semibold text-slate-700">
                    {(content.labels as any)[key] || key}
                  </p>
                  <p className="mt-1 text-slate-600">{value || "-"}</p>
                </div>
              ))}
            </div>
            <p className="text-sm text-slate-500">{content.successMessage}</p>
          </div>
        )}
      </div>

      <div className="mt-6 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <button
          type="button"
          onClick={() => setStep((prev) => Math.max(prev - 1, 0))}
          disabled={step === 0}
          className="rounded-full border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-400 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {content.buttons.back}
        </button>

        <div className="flex flex-1 flex-col gap-3 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={() => setStep((prev) => Math.min(prev + 1, 3))}
            disabled={isLastStep}
            className="rounded-full bg-slate-100 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-200 disabled:opacity-50"
          >
            {content.buttons.next}
          </button>
          <button
            type="button"
            onClick={sendWhatsApp}
            disabled={!isLastStep}
            className="rounded-full bg-[#0dadd1] px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#0a94b6] disabled:cursor-not-allowed disabled:bg-slate-300 disabled:text-slate-500"
          >
            {content.buttons.send}
          </button>
        </div>
      </div>
    </section>
  );
};
