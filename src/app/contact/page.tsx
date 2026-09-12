import type { Metadata } from "next";
import { ContactPageContent } from "@/components/contact/contact-page-content";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with Nirmal Kandel for roles, freelance work, or collaboration.",
};

export default function ContactPage() {
  return <ContactPageContent />;
}
