import Link from "next/link";
import { Button } from "../../ui/button";

export default function CallToAction() {
  const whatsappLink = `https://wa.me/6289687407837?text=${encodeURIComponent(
    "Hi, I’m interested in collaborating with you!",
  )}`;

  return (
    <div className="my-14">
      <div className="rounded-3xl bg-gradient-to-r from-lime-100 via-white to-teal-100 p-6 md:p-8 flex justify-between items-center shadow-sm">
        <div className="max-w-md space-y-2">
          <h2 className="text-xl font-semibold text-emerald-800">
            Interest in working together or collaborating?
          </h2>
          <p className="text-sm text-gray-600">
            Let’s connect and explore how we can work together.
          </p>
          <div className="space-x-3">
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-flex items-center gap-2 bg-emerald-600 text-white text-sm px-4 py-2 rounded-lg hover:bg-emerald-700 transition ease-in-out"
            >
              Let’s talk
            </a>
            <Link
              href={`/about`}
              className="mt-3 inline-flex items-center gap-2 text-slate-800 text-sm px-4 py-2 rounded-lg hover:text-slate-900/70 hover:font-medium transition ease-in-out"
            >
              About Me
            </Link>
          </div>
        </div>

        {/* Illustration / Cursor Icon */}
        <div className="hidden md:block">
          {/* <svg
            viewBox="0 0 24 24"
            className="w-24 h-24 text-purple-600 drop-shadow-md"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          >
            <path
              d="M4 4L20 20M4 20L20 4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg> */}
        </div>
      </div>
    </div>
  );
}
