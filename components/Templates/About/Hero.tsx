"use client"; // Tambahkan ini di baris pertama!

import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function Hero() {
  return (
    <section className="flex flex-col md:flex-row gap-8 md:mt-16 mb-16">
      <div className="relative w-48 h-48 rounded-4xl overflow-hidden border-4 border-white shadow-md">
        <Image
          src="https://github.com/omoWahyu.png?size=400"
          alt="Profile"
          fill
          className="object-cover"
        />
      </div>
      <div className="text-center md:text-left max-w-2xl pt-4">
        <p className="text-gray-500 text-sm uppercase">Fullstack Developer</p>
        <h1 className="text-3xl font-bold mt-1 mb-2">Wahyudi Chrisdianto</h1>
        <p className="text-gray-600 mb-4">
          Fast-learning Software Engineer who passionate about building
          scalable, user-first digital products. Thrives in dynamic
          environments. Proficient in NextJS, JS, Rust, GO, Laravel, Wordpress,
          Shopify, and Flutter with flexibility to adapt to new languages and
          frameworks.
        </p>
        <div className="flex gap-4 pt-2 justify-center md:justify-start">
          <a href="/cv.pdf" download>
            <Button variant="default" className="py-5 px-7 rounded-full">
              Download Resume
            </Button>
          </a>
          <a
            href="https://wa.me/6289687407837?text=Hi%20Wahyu%2C%20I%27m%20interested%20in%20working%20together%20with%20you!"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button
              variant="outline"
              className="py-5 px-7 border-lime-500 bg-lime-200/50 hover:bg-lime-300/100 transition-all ease-in-out rounded-full"
            >
              Whatsapp
            </Button>
          </a>
        </div>
      </div>
    </section>
  );
}
