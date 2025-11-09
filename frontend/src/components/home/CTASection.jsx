import { Link } from "react-router-dom";

export function CTASection() {
return (
<section className="py-12 px-6 bg-white">
<div className="max-w-4xl mx-auto text-center border border-gray-100 shadow-md rounded-3xl p-10">
<h4 className="text-xl font-semibold text-gray-900">Nieuwsgierig geworden?</h4>
<p className="mt-3 text-gray-700 leading-relaxed">Neem contact met ons op voor meer informatie, beschikbaarheid of een bezichtiging.<br/>Uw nieuwe thuis wacht op u bij Kenepa Apartments.</p>
<div className="mt-6 flex flex-col sm:flex-row justify-center gap-4">
<Link to="/contact" className="inline-block px-6 py-2 rounded-full bg-teal-500 text-white font-medium shadow hover:bg-teal-600 transition">Contact opnemen</Link>
</div>
</div>
</section>
);
}