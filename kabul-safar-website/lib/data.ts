import { FileText, Globe, Headphones, Search } from "lucide-react";
import type { Lang } from "@/lib/i18n";
import type {
  DestinationSlide,
  FeatureCard,
  FooterLinkGroup,
  NavItem,
  PartnerLogo,
  StatItem,
  StepCard,
  Testimonial,
} from "@/types/home";

export const partners: PartnerLogo[] = [
  { name: "Emirates", src: "/images/emirates.png", width: 37, height: 24 },
  { name: "Ariana", src: "/images/ariana.png", width: 58, height: 17 },
  {
    name: "Turkish Airlines",
    src: "/images/turkish.png",
    width: 62,
    height: 10,
  },
  { name: "Lufthansa", src: "/images/lufthansa.png", width: 58, height: 10 },
];

const baseSlides = [
  { id: "afghanistan", imageSrc: "/images/destination.jpg" },
  { id: "iran", imageSrc: "/images/destination-iran.jpg" },
  { id: "turkey", imageSrc: "/images/destination-turkey.jpg" },
  { id: "iraq", imageSrc: "/images/destination-iraq.jpg" },
] as const;

type LocalizedContent = {
  navItems: Omit<NavItem, "href">[];
  hero: {
    titlePrefix: string;
    titleIran: string;
    titleAsia: string;
    subTitle: string;
    bullets: string[];
    consultCta: string;
  };
  partnersTitle: string;
  destination: {
    title: string;
    viewAll: string;
    slides: { title: string; subtitle: string }[];
  };
  howItWorks: {
    title: string;
    subtitle: string;
    steps: { title: string; description: string }[];
  };
  serviceFeature: {
    titlePrefix: string;
    titleAccent: string;
    titleSuffix: string;
    body: string;
    discount: string;
  };
  stats: { title: string; labels: string[] };
  why: {
    title: string;
    subtitle: string;
    cards: { title: string; description: string }[];
  };
  about: {
    title: string;
    subtitle: string;
    columns: string[];
  };
  testimonials: {
    title: string;
    items: { name: string; role: string; message: string }[];
  };
  faq: {
    title: string;
    subtitle: string;
    cta: string;
    items: { question: string; answer: string }[];
  };
  cta: {
    visaTitle: string;
    visaBody: string;
    planTitle: string;
    planBody: string;
  };
  footer: {
    brand: string;
    blurb: string;
    follow: string;
    phone: string;
    designer: string;
    groups: { title: string; links: string[] }[];
  };
};

const content: Record<Lang, LocalizedContent> = {
  fa: {
    navItems: [
      { label: "صفحه اصلی" },
      { label: "خدمات" },
      { label: "ویزا" },
      { label: "بلاگ" },
      { label: "درباره ما" },
      { label: "تماس با ما" },
    ],
    hero: {
      titlePrefix: "ویزای",
      titleIran: "ایران",
      titleAsia: "آسیا",
      subTitle: "برای شهروندان افغانستانی",
      bullets: [
        "دریافت ویزا در کمتر از ۷۲ ساعت",
        "پشتیبانی فارسی / دری و انگلیسی",
        "مشاوره رایگان قبل از ثبت درخواست",
      ],
      consultCta: "دریافت ویزا و مشاوره",
    },
    partnersTitle: "همکاری با معتبرترین ایرلاین ها",
    destination: {
      title: "مکان های تحت پوشش",
      viewAll: "مشاهده همه",
      slides: [
        { title: "Afghanistan", subtitle: "Band-Amir Bamiyan" },
        { title: "Iran", subtitle: "Naghse-jahan Esfahan" },
        { title: "Turkey", subtitle: "Galata-Tower Turkey" },
        { title: "Karbala", subtitle: "Karbala-Emam-Hossein" },
      ],
    },
    howItWorks: {
      title: "سفر شما از همین‌جا آغاز می‌شود",
      subtitle:
        "در سه مرحله ساده درخواست خود را ثبت کنید. روند به سادگی با تماس در واتساپ انجام میگیرد.",
      steps: [
        {
          title: "خدمت مورد نظر خود را انتخاب کنید",
          description: "ویزای ایران یا مشاوره برای بلیط سفر",
        },
        {
          title: "درخواست خود را ثبت کنید",
          description: "از طریق واتساپ یا فرم درخواست با ما در تماس شوید.",
        },
        {
          title: "راهنمایی دریافت کنید",
          description: "کارشناسان ما در تمام مراحل همراه شما خواهند بود.",
        },
      ],
    },
    serviceFeature: {
      titlePrefix: "سفر به",
      titleAccent: "آسیا",
      titleSuffix: "با خدمات کابل سفر ساده تر از همیشه",
      body: "ما با ارائه راهنمایی تخصصی، ارتباط شفاف و پشتیبانی قابل اعتماد، روند دریافت ویزای ایران را برای هموطنان افغانستانی مقیم اروپا آسان و مطمئن می‌سازیم",
      discount: "20% تخفیف",
    },
    stats: {
      title: "تجربه ما",
      labels: ["مسافرین راضی", "سال تجربه", "میانگین رضایت"],
    },
    why: {
      title: "ساده، مطمئن و حرفه‌ای",
      subtitle:
        "دریافت ویزای ایران نباید پیچیده باشد. ما با ارائه راهنمایی دقیق، پشتیبانی حرفه‌ای و ارتباط شفاف، این مسیر را برای شما آسان می‌کنیم.",
      cards: [
        {
          title: "پشتیبانی حرفه‌ای",
          description:
            "کارشناسان ما از آغاز ثبت درخواست تا پایان فرآیند، همراه و پاسخ‌گوی شما خواهند بود.",
        },
        {
          title: "پشتیبانی چندزبانه",
          description:
            "تیم ما آماده پاسخ‌گویی به زبان‌های دری، پشتو، فارسی و انگلیسی است تا ارتباطی آسان و بدون مشکل داشته باشید.",
        },
        {
          title: "روند شفاف",
          description:
            "تمام مراحل به‌صورت واضح برای شما توضیح داده می‌شود تا بدون نگرانی درخواست خود را ثبت کنید.",
        },
      ],
    },
    about: {
      title: "درباره ما",
      subtitle:
        "از راهنمایی‌های ویزا گرفته تا خدمات مربوط به پرواز، تیم ما اینجاست تا سفر شما به ایران را آسان، مطمئن و بدون استرس کند.",
      columns: [
        "در کابل ویزا باور داریم که هر سفر موفق با اعتماد آغاز می‌شود. هدف ما این است که روند دریافت ویزای ایران را برای هموطنان افغانستانی مقیم اروپا ساده، سریع و قابل اطمینان کنیم.",
        "تیم ما در تمامی مراحل، از بررسی مدارک تا راهنمایی و پاسخ‌گویی، در کنار شما خواهد بود تا با اطمینان بیشتری برای سفر خود برنامه‌ریزی کنید.",
      ],
    },
    testimonials: {
      title: "داستان مسافرین ما",
      items: [
        {
          name: "شعیب نوروزی",
          role: "مهندس",
          message:
            "برای سفر به ایران نیاز به راهنمایی داشتم و نمی‌دانستم از کجا شروع کنم. تیم کابل ویزا تمام مراحل را برایم توضیح داد و همیشه از طریق واتساپ پاسخ‌گو بود.",
        },
        {
          name: "قمر حمیدزی",
          role: "هنرمند",
          message:
            "روند دریافت ویزا بسیار ساده‌تر از چیزی بود که تصور می‌کردم. تیم کابل ویزا در تمام مراحل پاسخ‌گوی سؤالاتم بود و با راهنمایی دقیق، تهیه مدارک را برایم آسان کرد.",
        },
        {
          name: "مریم احمدی",
          role: "دانشجو موسیقی",
          message:
            "بیشتر از همه صداقت و مسئولیت‌پذیری این مجموعه برایم ارزشمند بود. همه چیز طبق برنامه پیش رفت و در انتخاب بلیط سفر نیز راهنمایی بسیار خوبی دریافت کردم.",
        },
      ],
    },
    faq: {
      title: "سوالات متداول",
      subtitle:
        "پاسخ به پرسش‌های مهم شما درباره روند دریافت ویزا و پشتیبانی کابل سفر.",
      cta: "سوالی دارید؟ همین حالا در واتساپ بپرسید.",
      items: [
        {
          question: "چطور درخواست ویزا را شروع کنم؟",
          answer:
            "کافی است از طریق واتساپ پیام دهید یا فرم تماس را پر کنید تا کارشناسان ما روند را برای شما آغاز کنند.",
        },
        {
          question: "مدارک مورد نیاز چه چیزهایی هستند؟",
          answer:
            "لیست مدارک لازم برای ویزای ایران بر اساس وضعیت شما ارسال می‌شود و در هر مرحله همراهتان خواهیم بود.",
        },
        {
          question: "پشتیبانی به چه زبان‌هایی ارائه می‌شود؟",
          answer:
            "ما به فارسی، دری، پشتو و انگلیسی پاسخ‌گو هستیم تا ارتباط شما با ما ساده و روان باشد.",
        },
      ],
    },
    cta: {
      visaTitle: "برای دریافت ویزا نیاز به راهنمایی دارید؟",
      visaBody: "ما فقط یک پیام با شما فاصله داریم.",
      planTitle: "سفر خود را برنامه‌ریزی کنید",
      planBody: "همین امروز با ما تماس بگیرید و درخواست خود را آغاز کنید.",
    },
    footer: {
      brand: "Kabul Safar",
      blurb:
        "کابل سفر همراه مطمئن شما در دریافت ویزای ایران و خدمات سفر است. ما با ارائه مشاوره تخصصی و پشتیبانی حرفه‌ای، در تمام مراحل کنار شما خواهیم بود.",
      follow: "Follow",
      phone: "0036-36393050",
      designer: "Designer: Sepanta(Ali) Alizadeh",
      groups: [
        {
          title: "شرکت",
          links: ["درباره ما", "سرویس های ما", "مراحل ویزا", "تماس با ما"],
        },
        {
          title: "خدمات",
          links: [
            "دریافت ویزای ایران",
            "راهنمایی تهیه بلیط",
            "مشاوره سفر",
            "پشتیبانی واتساپ",
          ],
        },
        {
          title: "پشتیبانی",
          links: [
            "حریم خصوصی",
            "قوانین و مقررات",
            "ارتباط با پشتیبانی",
            "ایمیل",
          ],
        },
      ],
    },
  },
  en: {
    navItems: [
      { label: "Home" },
      { label: "Services" },
      { label: "Visa" },
      { label: "Blog" },
      { label: "About" },
      { label: "Contact" },
    ],
    hero: {
      titlePrefix: "Visa for",
      titleIran: "Iran",
      titleAsia: "Asia",
      subTitle: "For Afghan citizens",
      bullets: [
        "Visa issued in less than 72 hours",
        "Support in Persian / Dari / English",
        "Free consultation before submission",
      ],
      consultCta: "Get visa consultation",
    },
    partnersTitle: "Partnering with trusted airlines",
    destination: {
      title: "Covered destinations",
      viewAll: "View all",
      slides: [
        { title: "Afghanistan", subtitle: "Band-Amir Bamiyan" },
        { title: "Iran", subtitle: "Naghse-jahan Esfahan" },
        { title: "Turkey", subtitle: "Galata-Tower Turkey" },
        { title: "Karbala", subtitle: "Karbala-Emam-Hossein" },
      ],
    },
    howItWorks: {
      title: "Your journey starts right here",
      subtitle:
        "Submit your request in three simple steps. The process is easy and starts via WhatsApp.",
      steps: [
        {
          title: "Choose your service",
          description: "Iran visa or ticket consultation",
        },
        {
          title: "Submit your request",
          description: "Contact us via WhatsApp or request form.",
        },
        {
          title: "Get expert guidance",
          description: "Our team supports you in every step.",
        },
      ],
    },
    serviceFeature: {
      titlePrefix: "Travel to",
      titleAccent: "Asia",
      titleSuffix: "with Kabul Safar, easier than ever",
      body: "With expert guidance, clear communication, and trusted support, we make Iran visa processing easy and reliable for Afghan citizens living in Europe.",
      discount: "20% OFF",
    },
    stats: {
      title: "Our experience",
      labels: [
        "Satisfied travelers",
        "Years of experience",
        "Average satisfaction",
      ],
    },
    why: {
      title: "Simple, secure, professional",
      subtitle:
        "Getting an Iran visa should not be complicated. We make the process easy through clear guidance and professional support.",
      cards: [
        {
          title: "Professional support",
          description:
            "Our experts stay with you from the first request to final approval.",
        },
        {
          title: "Multilingual support",
          description:
            "Support available in Dari, Pashto, Persian, and English for easy communication.",
        },
        {
          title: "Transparent process",
          description:
            "Every step is clearly explained so you can apply with confidence.",
        },
      ],
    },
    about: {
      title: "About us",
      subtitle:
        "From visa guidance to flight assistance, our team is here to make your Iran trip simple, reliable, and stress-free.",
      columns: [
        "At Kabul Visa, we believe every successful journey starts with trust. Our goal is to simplify and speed up Iran visa processing for Afghans living in Europe.",
        "Our team is beside you in all stages, from document review to final support, so you can plan your trip confidently.",
      ],
    },
    testimonials: {
      title: "Traveler stories",
      items: [
        {
          name: "Shoaib Norouzi",
          role: "Engineer",
          message:
            "I needed guidance for my Iran trip and didn’t know where to start. Kabul Visa explained every step and was always responsive on WhatsApp.",
        },
        {
          name: "Qamar Hamidzi",
          role: "Artist",
          message:
            "The visa process was much easier than I expected. The team answered all my questions and made document preparation simple.",
        },
        {
          name: "Maryam Ahmadi",
          role: "Music Student",
          message:
            "Their honesty and responsibility impressed me the most. Everything went according to plan and I also got great ticket guidance.",
        },
      ],
    },
    faq: {
      title: "Frequently asked questions",
      subtitle:
        "Your important questions about the visa process and support from Kabul Safar.",
      cta: "Have a question? Ask us on WhatsApp now.",
      items: [
        {
          question: "How do I start a visa application?",
          answer:
            "Just send us a message on WhatsApp or fill out the contact form and our team will start the process for you.",
        },
        {
          question: "What documents do I need?",
          answer:
            "We will send you the required document list based on your situation and support you through each step.",
        },
        {
          question: "Which languages do you support?",
          answer:
            "We offer support in Dari, Pashto, Persian, and English to make communication easy.",
        },
      ],
    },
    cta: {
      visaTitle: "Need visa guidance?",
      visaBody: "We are just one message away.",
      planTitle: "Plan your journey",
      planBody: "Contact us today and start your request.",
    },
    footer: {
      brand: "Kabul Safar",
      blurb:
        "Kabul Safar is your reliable partner for Iran visa and travel services. We provide expert consultation and support in every step.",
      follow: "Follow",
      phone: "0036-36393050",
      designer: "Designer: Sepanta(Ali) Alizadeh",
      groups: [
        {
          title: "Company",
          links: ["About", "Our Services", "Visa Steps", "Contact"],
        },
        {
          title: "Services",
          links: [
            "Iran Visa",
            "Flight Guidance",
            "Travel Consultation",
            "WhatsApp Support",
          ],
        },
        {
          title: "Support",
          links: ["Privacy", "Terms", "Support Contact", "Email"],
        },
      ],
    },
  },
  ps: {
    navItems: [
      { label: "کور" },
      { label: "خدمتونه" },
      { label: "ویزه" },
      { label: "بلاګ" },
      { label: "زموږ په اړه" },
      { label: "اړیکه" },
    ],
    hero: {
      titlePrefix: "ویزه د",
      titleIran: "ایران",
      titleAsia: "آسیا",
      subTitle: "د افغان وګړو لپاره",
      bullets: [
        "ویزه تر ۷۲ ساعتونو کې",
        "په فارسي / دري / انګلیسي ملاتړ",
        "د غوښتنې نه مخکې وړیا مشوره",
      ],
      consultCta: "د ویزې او مشورې ترلاسه کول",
    },
    partnersTitle: "له معتبره هوايي شرکتونو سره همکاري",
    destination: {
      title: "تر پوښښ لاندې ځایونه",
      viewAll: "ټول وګوره",
      slides: [
        { title: "Afghanistan", subtitle: "Band-Amir Bamiyan" },
        { title: "Iran", subtitle: "Naghse-jahan Esfahan" },
        { title: "Turkey", subtitle: "Galata-Tower Turkey" },
        { title: "Karbala", subtitle: "Karbala-Emam-Hossein" },
      ],
    },
    howItWorks: {
      title: "ستاسو سفر له همدې ځايه پيلېږي",
      subtitle:
        "په درې اسانه پړاوونو کې خپله غوښتنه ثبت کړئ. بهیر د واتساپ له لارې ډېر ساده دی.",
      steps: [
        { title: "خپل خدمت وټاکئ", description: "د ایران ویزه یا د ټکټ مشوره" },
        {
          title: "غوښتنه ثبت کړئ",
          description: "له موږ سره د واتساپ یا فورم له لارې اړیکه ونیسئ.",
        },
        {
          title: "لارښوونه ترلاسه کړئ",
          description: "زموږ ټیم ستاسو ترڅنګ وي.",
        },
      ],
    },
    serviceFeature: {
      titlePrefix: "آسیا ته سفر",
      titleAccent: "آسیا",
      titleSuffix: "د کابل سفر له خدمتونو سره تر هر وخت اسانه",
      body: "موږ د مسلکي لارښوونې، روښانه اړیکو او باور وړ ملاتړ له لارې د اروپا مېشتو افغانانو لپاره د ایران ویزې بهیر اسانه او خوندي کوو.",
      discount: "۲۰٪ تخفیف",
    },
    stats: {
      title: "زموږ تجربه",
      labels: ["راضي مسافر", "د تجربې کلونه", "منځنۍ رضایت"],
    },
    why: {
      title: "اسانه، خوندي، مسلکي",
      subtitle:
        "د ایران ویزه باید پېچلې نه وي. موږ دا لاره د دقیقې لارښوونې او مسلکي ملاتړ له لارې اسانه کوو.",
      cards: [
        {
          title: "مسلکي ملاتړ",
          description:
            "زموږ متخصصین د غوښتنې له پیله تر پای پورې ستاسو ترڅنګ وي.",
        },
        {
          title: "څو ژبنی ملاتړ",
          description: "په دري، پښتو، فارسي او انګلیسي ژبو ملاتړ.",
        },
        {
          title: "شفاف بهیر",
          description: "هر پړاو په روښانه ډول درته بیانېږي.",
        },
      ],
    },
    about: {
      title: "زموږ په اړه",
      subtitle:
        "له ویزې لارښوونې تر الوتنې خدماتو پورې، زموږ ټیم ستاسو د سفر د اسانتیا لپاره دلته دی.",
      columns: [
        "موږ باور لرو چې هر بریالی سفر له باور څخه پیلېږي. زموږ موخه د اروپا مېشتو افغانانو لپاره د ایران ویزې بهیر ساده او چټک کول دي.",
        "زموږ ټیم د اسنادو له ارزونې تر وروستي پړاو پورې ستاسو ترڅنګ وي ترڅو سفر مو په ډاډه زړه پلان کړئ.",
      ],
    },
    testimonials: {
      title: "د مسافرو کیسې",
      items: [
        {
          name: "شعیب نوروزي",
          role: "انجنیر",
          message:
            "ما د ایران سفر لپاره لارښوونې ته اړتیا لرله. د کابل ویزا ټیم ټول پړاوونه واضح کړل او تل یې پر واتساپ ځواب راکاوه.",
        },
        {
          name: "قمر حمیدزي",
          role: "هنرمند",
          message:
            "د ویزې بهیر تر تمې ډېر اسانه و. ټیم زما پوښتنو ته بشپړ ځواب راکاوه او اسناد یې راسره سم برابر کړل.",
        },
        {
          name: "مریم احمدي",
          role: "د موسیقۍ زده‌کوونکې",
          message:
            "دوی رښتیني او مسؤل دي. هر څه د پلان له مخې ترسره شول او د ټکټ په ټاکنه کې یې هم ښه مرسته وکړه.",
        },
      ],
    },
    faq: {
      title: "پرله پسې پوښتنې",
      subtitle: "ستاسو مهمې پوښتنې د ویزې بهیر او کابل سفر ملاتړ په اړه.",
      cta: "پوښتنه لرئ؟ اوس پر واتساپ پوښتنه وکړئ.",
      items: [
        {
          question: "زه څنګه د ویزې غوښتنه پیل کړم؟",
          answer:
            "موږ ته په واتساپ کې پیغام راولیږئ یا د اړیکې فورمه ډکه کړئ، او زموږ ټیم به ستاسو لپاره بهیر پیل کړي.",
        },
        {
          question: "څه اسناد ته اړتیا لرم؟",
          answer:
            "موږ به ستاسې د وضعیت پراساس اړین سندونه درته واستوو او په هر پړاو کې به مو ملاتړ وکړو.",
        },
        {
          question: "په کومو ژبو ملاتړ کوئ؟",
          answer:
            "موږ په دري، پښتو، فارسي او انګلیسي ژبو کې ملاتړ وړاندې کوو ترڅو اړیکه مو آسانه وي.",
        },
      ],
    },
    cta: {
      visaTitle: "د ویزې لپاره لارښوونې ته اړتیا لرئ؟",
      visaBody: "موږ یوازې یو پیغام لرې یو.",
      planTitle: "خپل سفر پلان کړئ",
      planBody: "نن موږ سره اړیکه ونیسئ او غوښتنه پیل کړئ.",
    },
    footer: {
      brand: "Kabul Safar",
      blurb:
        "کابل سفر د ایران ویزې او سفر خدمتونو کې ستاسو باوري ملګری دی. موږ په هر پړاو کې مسلکي مشوره او ملاتړ وړاندې کوو.",
      follow: "Follow",
      phone: "0036-36393050",
      designer: "Designer: Sepanta(Ali) Alizadeh",
      groups: [
        {
          title: "شرکت",
          links: ["زموږ په اړه", "زموږ خدمتونه", "د ویزې پړاوونه", "اړیکه"],
        },
        {
          title: "خدمتونه",
          links: [
            "د ایران ویزه",
            "د الوتنې لارښوونه",
            "د سفر مشوره",
            "واتساپ ملاتړ",
          ],
        },
        {
          title: "ملاتړ",
          links: ["محرمیت", "شرایط", "د ملاتړ اړیکه", "برېښنالیک"],
        },
      ],
    },
  },
};

function pick(lang: Lang): LocalizedContent {
  return content[lang] ?? content.fa;
}

export function getNavItems(lang: Lang): NavItem[] {
  const labels = pick(lang).navItems;
  return [
    { label: labels[0].label, href: "/" },
    { label: labels[1].label, href: "/services" },
    { label: labels[2].label, href: "/visa" },
    { label: labels[3].label, href: "/blog" },
    { label: labels[4].label, href: "/about" },
    { label: labels[5].label, href: "/contact" },
  ];
}

export function getHeroContent(lang: Lang) {
  return pick(lang).hero;
}

export function getPartnersTitle(lang: Lang) {
  return pick(lang).partnersTitle;
}

export function getDestinationContent(lang: Lang): {
  title: string;
  viewAll: string;
  slides: DestinationSlide[];
} {
  const localized = pick(lang).destination;
  return {
    title: localized.title,
    viewAll: localized.viewAll,
    slides: baseSlides.map((slide, idx) => ({
      ...slide,
      title: localized.slides[idx].title,
      subtitle: localized.slides[idx].subtitle,
    })),
  };
}

export function getHowItWorksContent(lang: Lang) {
  const localized = pick(lang).howItWorks;
  const icons = [Search, FileText, Globe] as const;
  return {
    title: localized.title,
    subtitle: localized.subtitle,
    steps: localized.steps.map(
      (step, idx): StepCard => ({
        id: idx + 1,
        title: step.title,
        description: step.description,
        icon: icons[idx],
        accent: idx === 1,
      }),
    ),
  };
}

export function getServiceFeatureContent(lang: Lang) {
  return pick(lang).serviceFeature;
}

export function getStatsContent(lang: Lang): {
  title: string;
  stats: StatItem[];
} {
  const localized = pick(lang).stats;
  return {
    title: localized.title,
    stats: [
      { id: 1, value: "5k", label: localized.labels[0] },
      { id: 2, value: "2+", label: localized.labels[1] },
      { id: 3, value: "4.9", label: localized.labels[2] },
    ],
  };
}

export function getWhyContent(lang: Lang): {
  title: string;
  subtitle: string;
  features: FeatureCard[];
} {
  const localized = pick(lang).why;
  return {
    title: localized.title,
    subtitle: localized.subtitle,
    features: localized.cards.map(
      (card, idx): FeatureCard => ({
        id: idx + 1,
        title: card.title,
        description: card.description,
        icon: idx === 0 ? Headphones : idx === 1 ? Globe : FileText,
        variant: idx === 1 ? "light" : "dark",
      }),
    ),
  };
}

export function getAboutContent(lang: Lang) {
  return pick(lang).about;
}

export function getTestimonialsContent(lang: Lang): {
  title: string;
  testimonials: Testimonial[];
} {
  const localized = pick(lang).testimonials;
  const avatars = [
    "/images/avatar-1.jpg",
    "/images/avatar-2.jpg",
    "/images/avatar-3.jpg",
  ];
  return {
    title: localized.title,
    testimonials: localized.items.map(
      (item, idx): Testimonial => ({
        id: idx + 1,
        name: item.name,
        role: item.role,
        message: item.message,
        avatar: avatars[idx],
      }),
    ),
  };
}

export function getFaqContent(lang: Lang) {
  const localized = pick(lang);
  return localized.faq ?? content.fa.faq;
}

export function getCtaContent(lang: Lang) {
  return pick(lang).cta;
}

export function getFooterContent(lang: Lang): {
  brand: string;
  blurb: string;
  follow: string;
  phone: string;
  designer: string;
  groups: FooterLinkGroup[];
} {
  const localized = pick(lang).footer;
  return {
    brand: localized.brand,
    blurb: localized.blurb,
    follow: localized.follow,
    phone: localized.phone,
    designer: localized.designer,
    groups: localized.groups.map((group, groupIdx) => ({
      title: group.title,
      links: group.links.map((label, idx) => ({
        label,
        href:
          groupIdx === 0 && idx === 0
            ? "#about"
            : groupIdx === 0 && idx === 3
              ? "#contact"
              : "#",
      })),
    })),
  };
}
