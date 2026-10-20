import { z } from "zod";

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export interface FaqAccordionProps {
  className?: string;
}

export type LandingFaqProps = FaqAccordionProps;

export interface FaqSupportBannerProps {
  className?: string;
}

export const CONTACT_TOPIC_OPTIONS = [
  { value: "general", label: "General Inquiry" },
  { value: "wardrobe-uploads", label: "Wardrobe Photo Uploads" },
  { value: "capsule-rules", label: "Capsule Wardrobe Rules" },
  { value: "ai-styling", label: "AI Styling & Suggestions" },
  { value: "privacy-security", label: "Privacy & Image Security" },
  { value: "billing-plans", label: "Plan Upgrades & Billing" },
] as const;

export const contactFormSchema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters"),
  email: z.string().trim().email("Please enter a valid email address"),
  topic: z.string().min(1, "Please select an inquiry topic"),
  message: z.string().trim().min(10, "Message must be at least 10 characters"),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;

export interface FaqContactFormProps {
  className?: string;
  selectedTopic?: string;
  onTopicChange?: (topic: string) => void;
  onSuccess?: (data: ContactFormData) => void;
}

export interface FaqViewProps {
  className?: string;
}