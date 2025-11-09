import { Link } from "react-router-dom";

const About = () => {
  return (
    <div className="bg-gray-50 text-gray-800 font-sans min-h-screen">
      {/* Header */}
      <header className="bg-white mt-40 py-6">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-3xl font-bold">Welkom bij Kenepa Apartments!</h1>
          <p className="mt-2 text-gray-600">
            Bent u op zoek naar een fijne, gemeubileerde woonplek waar u zich direct thuis voelt? Bij Kenepa Apartments bent u van harte welkom!
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="container max-w-6xl mx-auto px-6 py-12 space-y-12">
        {/* About Apartments */}
        <section className="space-y-4 max-w-3xl mx-auto text-center">
          <h2 className="text-2xl font-semibold">Comfortabel wonen zonder gedoe</h2>
          <p>
            Alles wat u nodig heeft, is al aanwezig. Elk appartement beschikt over:
          </p>
          <ul className="mt-4 list-disc list-inside text-left md:text-center md:list-none md:flex md:justify-center md:gap-6">
            <li>Een gezellige woonkamer met comfortabele meubels</li>
            <li>Een volledig ingerichte keuken</li>
            <li>Een nette badkamer</li>
            <li>Een fijne slaapkamer</li>
            <li>Wifi en televisie</li>
          </ul>
          <p>U hoeft alleen uw koffers neer te zetten — en het genieten kan beginnen!</p>
        </section>

        {/* Long-term Stay */}
        <section className="space-y-4 max-w-3xl mx-auto text-center">
          <h2 className="text-2xl font-semibold">Voor langere verblijven</h2>
          <p>
            Wij verhuren onze appartementen voor een minimale periode van 6 maanden. Perfect voor stagiairs, expats of iedereen die voor langere tijd een tijdelijke woonplek zoekt — zonder zorgen over inrichting of langdurige huurcontracten.
          </p>
        </section>

        {/* Amenities */}
        <section className="space-y-4 max-w-3xl mx-auto text-center">
          <h2 className="text-2xl font-semibold">Heerlijk ontspannen op ons terrein</h2>
          <p>Bij Kenepa Apartments geniet u niet alleen van comfortabel wonen, maar ook van een ontspannen sfeer. Ons terrein biedt onder andere:</p>
          <ul className="mt-4 list-disc list-inside text-left md:text-center md:list-none md:flex md:justify-center md:gap-6">
            <li>Een verfrissend zwembad</li>
            <li>Parkeergelegenheid</li>
            <li>Een veilige en rustige omgeving</li>
            <li>Washok</li>
            <li>BBQ set</li>
          </ul>
        </section>

        {/* Location */}
        <section className="space-y-4 max-w-3xl mx-auto text-center">
          <h2 className="text-2xl font-semibold">Ontdek de omgeving</h2>
          <p>Onze locatie biedt alles binnen handbereik:</p>
          <ul className="mt-4 list-disc list-inside text-left md:text-center md:list-none md:flex md:justify-center md:gap-6">
            <li>Supermarkt op slechts 5 minuten loopafstand</li>
            <li>Mambo Beach op 10 minuten rijden</li>
            <li>Diverse restaurants en cafés in de buurt</li>
            <li>Bushalte en autoverhuur in de directe omgeving</li>
          </ul>
          <p>Zo woont u centraal, met alles wat u nodig heeft vlakbij.</p>
        </section>

        {/* Call to Action */}
        <section className="text-center">
          <h2 className="text-2xl font-semibold">Kom eens kijken!</h2>
          <p className="mt-2 text-gray-600">
            Nieuwsgierig geworden? We laten u graag zien wat Kenepa Apartments te bieden heeft. Neem gerust contact met ons op voor meer informatie, beschikbaarheid of een bezichtiging. Uw nieuwe thuis wacht op u bij Kenepa Apartments.
          </p>
          <Link
            to="/contact"
            className="mt-4 inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Contact opnemen
          </Link>
        </section>
      </main>
    </div>
  );
};

export default About;
