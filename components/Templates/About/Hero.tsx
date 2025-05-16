import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function Hero() {
  return (
    <section className="flex flex-col md:flex-row items-center gap-8 mb-16">
      <div className="relative w-48 h-48 rounded-full overflow-hidden border-4 border-white shadow-md">
        <Image
          src="https://github.com/omoWahyu.png?size=400"
          alt="Profile"
          fill
          className="object-cover"
        />
      </div>
      <div className="text-center md:text-left max-w-2xl">
        <p className="text-gray-500 text-sm uppercase">Fullstack Developer</p>
        <h1 className="text-3xl font-bold mt-1 mb-2">Wahyudi Chrisdianto</h1>
        <p className="text-gray-600 mb-4">
          Fast-learning Software Engineer who passionate about building
          scalable, user-first digital products. Thrives in dynamic
          environments, Proficient in NextJS, JS, Rust, GO, Laravel, Wordpress,
          shopify and Flutter with the flexibility adapt to new languages and
          frameworks as needed.
        </p>
        <div className="flex gap-4 justify-center md:justify-start">
          <a
            href="/cv.pdf" // Make sure this file exists in /public folder
            download
          >
            <Button variant="default">Download CV</Button>
          </a>

          <a
            href="https://wa.me/6289687407837?text=Hi%20Wahyu%2C%20I%27m%20interested%20in%20working%20together%20with%20you!"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button variant="outline">Whatsapp</Button>
          </a>
        </div>
      </div>
    </section>
  );
}
