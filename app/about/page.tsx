import Hero from "@/components/Templates/About/Hero";
import Services from "@/components/Templates/About/Services";

import BasicLayout from "@/components/Templates/BasicLayout";
export default function AboutPage() {
  return (
    <BasicLayout>
      <div className="min-h-screen text-gray-800">
        <Hero />
        <Services />
      </div>
    </BasicLayout>
  );
}
