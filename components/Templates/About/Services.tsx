import {
  PenSquare,
  ShoppingCart,
  LayoutTemplate,
  BarChart3,
} from "lucide-react";

const services = [
  {
    icon: <PenSquare className="text-blue-600" />,
    title: "Copywrite",
    desc: "Mauris neque libero, aliquet vel mollis nec...",
  },
  {
    icon: <ShoppingCart className="text-blue-600" />,
    title: "Ecommerce",
    desc: "Mauris neque libero, aliquet vel mollis nec...",
  },
  {
    icon: <LayoutTemplate className="text-blue-600" />,
    title: "Web Design",
    desc: "Mauris neque libero, aliquet vel mollis nec...",
  },
  {
    icon: <BarChart3 className="text-blue-600" />,
    title: "Marketing",
    desc: "Mauris neque libero, aliquet vel mollis nec...",
  },
];

export default function Services() {
  return (
    <section>
      <h2 className="text-2xl font-bold mb-6">What I Do</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {services.map((service, i) => (
          <div key={i} className="flex items-start gap-4">
            <div className="mt-1">{service.icon}</div>
            <div>
              <h3 className="font-semibold">{service.title}</h3>
              <p className="text-sm text-gray-600">{service.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
