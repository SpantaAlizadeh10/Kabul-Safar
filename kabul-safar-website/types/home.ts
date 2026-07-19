import type { LucideIcon } from "lucide-react";

export type NavItem = {
  label: string;
  href: string;
};

export type StepCard = {
  id: number;
  title: string;
  description: string;
  icon: LucideIcon;
  accent?: boolean;
};

export type FeatureCard = {
  id: number;
  title: string;
  description: string;
  icon: LucideIcon;
  variant: "dark" | "light";
};

export type StatItem = {
  id: number;
  value: string;
  label: string;
};

export type Testimonial = {
  id: number;
  name: string;
  role: string;
  message: string;
  avatar: string;
};

export type FaqItem = {
  id: number;
  question: string;
  answer: string;
};

export type FooterLinkGroup = {
  title: string;
  links: { label: string; href: string }[];
};

export type PartnerLogo = {
  name: string;
  src: string;
  width: number;
  height: number;
};

export type DestinationSlide = {
  id: "afghanistan" | "iran" | "turkey" | "iraq" | "makke";
  title: string;
  subtitle: string;
  imageSrc: string;
};
