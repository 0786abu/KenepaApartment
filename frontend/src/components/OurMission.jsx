import { Link } from "react-router-dom";

export default function VisionPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-gray-100 flex items-center justify-center px-6 py-12">
      <div className="max-w-3xl bg-white shadow-xl rounded-3xl p-10 text-center border border-gray-100">
        <h1 className="text-3xl font-bold text-gray-900 mb-6 tracking-tight">Onze Visie</h1>
        <p className="text-gray-700 leading-relaxed text-lg">
          Bij Kenepa Apartments geloven we dat iedereen zich ergens thuis moet kunnen voelen ook als het verblijf tijdelijk is.
          Wij willen een plek bieden waar warmte, gemak en ontspanning samenkomen.
          Een omgeving waar mensen elkaar groeten, waar je tot rust komt na een drukke dag, en waar wonen voelt als vakantie.
          Ons doel is om voor iedereen die tijdelijk op Curaçao verblijft of dat nu voor werk, stage of avontuur is een tweede thuis te zijn.
        </p>
        <div className="mt-10">
          <Link to="/">
            <span className="inline-block px-5 py-2.5 rounded-full bg-teal-500 text-white text-sm font-medium shadow hover:bg-teal-600 transition">Kenepa Apartments</span>
          </Link>
        </div>
      </div>
    </div>
  );
}