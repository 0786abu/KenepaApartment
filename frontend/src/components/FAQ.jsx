/* eslint-disable react/prop-types */
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const faqs = [
  {
    q: "Zijn de appartementen gemeubileerd?",
    a: "Ja, al onze appartementen zijn volledig gemeubileerd en van alle gemakken voorzien. U vindt er meubels, een ingerichte keuken, badkamer, slaapkamer, televisie en wifi — u kunt dus direct intrekken.",
  },
  {
    q: "Wat is de minimale huurperiode?",
    a: "De minimale huurperiode is 6 maanden. Zo kunnen we rust en continuïteit bieden aan onze bewoners.",
  },
  {
    q: "Wat is bij de huurprijs inbegrepen?",
    a: "In de huurprijs zijn het gebruik van meubels, wifi en televisie inbegrepen. Water en elektriciteit worden meestal apart berekend op basis van verbruik. Neem gerust contact met ons op voor de exacte details.",
  },
  {
    q: "Is er een wasmachine aanwezig?",
    a: "Ja, er is een washok op het terrein waar bewoners gebruik van kunnen maken. Zo kunt u gemakkelijk uw was doen zonder dat u zelf een wasmachine hoeft te hebben in het appartement.",
  },
  {
    q: "Is er parkeergelegenheid?",
    a: "Ja, er is parkeergelegenheid op het terrein én buiten het terrein. U kunt uw auto dus altijd dichtbij parkeren.",
  },
  {
    q: "Mag ik gebruikmaken van het zwembad?",
    a: "Zeker! Bewoners kunnen vrij gebruikmaken van het zwembad op het terrein — heerlijk om even af te koelen of te ontspannen na een drukke dag.",
  },
  {
    q: "Voor wie zijn de appartementen bedoeld?",
    a: "Onze appartementen zijn bedoeld voor iedereen die zorgeloos wil genieten — of u nu op Curaçao bent voor werk, stage of gewoon op zoek bent naar een fijne, comfortabele plek om te wonen.",
  },
  {
    q: "Waar ligt Kenepa Apartments?",
    a: "Kenepa Apartments ligt op een centrale en rustige locatie. Supermarkt, bushalte en diverse winkels zijn dichtbij, en Mambo Beach ligt op slechts 10 minuten rijden.",
  },
  {
    q: "Hoe kan ik een appartement reserveren?",
    a: "U kunt eenvoudig contact met ons opnemen via e-mail, WhatsApp of het contactformulier op de website. We informeren u graag over de beschikbaarheid en plannen met plezier een bezichtiging in.",
  },
  {
    q: "Kan ik iemand spreken als ik vragen heb tijdens mijn verblijf?",
    a: "Natuurlijk! We zijn altijd bereikbaar voor onze bewoners. Of het nu om een vraag, reparatie of tip gaat — we helpen u graag persoonlijk verder.",
  },
];

function AccordionItem({ q, a, isOpen, onClick }) {
  return (
    <div className="border-b py-4">
      <button
        onClick={onClick}
        className="w-full flex justify-between items-center text-left text-lg font-bold"
      >
        {q}
        <span className="text-xl transition-transform duration-200">
          {isOpen ? "−" : "+"}
        </span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.p
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="mt-2 text-gray-600 leading-relaxed font-normal overflow-hidden"
          >
            {a}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FAQPage() {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggle = (index) => {
    setActiveIndex((prev) => (prev === index ? null : index));
  };

  return (
    <main className="max-w-3xl mt-16 mx-auto px-6 py-20">
      <h1 className="text-3xl md:text-4xl font-semibold text-center mb-12">
        Veelgestelde vragen
      </h1>
      <div className="space-y-4 border border-slate-200 p-4 rounded-lg shadow-sm">
        {faqs.map((f, idx) => (
          <AccordionItem
            key={idx}
            q={f.q}
            a={f.a}
            isOpen={activeIndex === idx}
            onClick={() => toggle(idx)}
          />
        ))}
      </div>
    </main>
  );
}