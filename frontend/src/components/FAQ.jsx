/* eslint-disable react/prop-types */
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const faqs = [
  {
    q: "Zijn de appartementen ondersteund?",
    a: "Ja, al onze appartementen zijn volledig uitgerust en van alle gemakken voorzien. Je vindter meubels, een ingerichte keuken, badkamer, slaapkamer, televisie en wifi. Je kunt dus direct intrekken.",
  },
  {
    q: "Wat is de minimale huurperiode?",
    a: "De minimale huurperiode is 3 maanden. Zo kunnen we rust en continuïteit bieden aan onze bewoners.",
  },
  {
    q: "Wat is de maximale huurperiode?",
    a: "De maximale huurperiode is 12 maanden.",
  },
  {
    q: "Wat is bij de huurprijs inbegrepen?",
    a: "In de huurprijs zijn het gebruik van meubels, wifi en televisie inbegrepen. Water en elektriciteit worden maandelijks apart berekend op basis van verbruik.",
  },
  {
    q: "Is er een wasmachine aanwezig?",
    a: "Ja, er is een washok op het terrein waar bewoners gebruik van kunnen maken voor 6 XCG. Zo kun je gemakkelijk je was doen zonder dat je zelf een wasmachine in het appartement hoeft te hebben.",
  },
  {
    q: "Is er parkeergelegenheid?",
    a: "Ja, er is parkeergelegenheid op het terrein én buiten het terrein. Je kunt je auto dus altijd dichtbij parkeren.",
  },
  {
    q: "Mag ik gebruikmaken van het zwembad?",
    a: "Zeker! Bewoners kunnen tussen 8:00 uur en 22:00 uur vrij gebruikmaken van hetzwembad op het terrein. Heerlijk om even af te koelen of te ontspannen na een drukkedag.",
  },
  {
    q: "Mogen mijn bezoekers gebruikmaken van het zwembad?",
    a: "Nee, het zwembad is speciaal voor onze gasten die bij Kenepa verblijven. Zo kunnen zijin alle rust genieten van hun verblijf.",
  },
  {
    q: "Voor wie zijn de appartementen bedoeld?",
    a: "Onze appartementen zijn bedoeld voor iedereen die zorgeloos wil genieten. Of je nu opCuraçao bent voor werk, stage of gewoon op zoek bent naar een fijne, comfortabele plekom te wonen.",
  },
  {
    q: "Waar ligt Kenepa Apartments?",
    a: "Kenepa Apartments ligt in Dominguito, een centrale en rustige locatie. Supermarkt en Mambo Beach ligt op slechts 5 minuten afstand",
  },
  {
    q: "Kan ik iemand spreken als ik vragen heb tijdens mijn verblijf?",
    a: "Natuurlijk! We zijn altijd bereikbaar voor onze bewoners. Of het nu om een vraag, reparatie of tip gaat we helpen je graag persoonlijk verder.",
  },
  {
    q: "Hoe kan ik een appartement reserveren?",
    a: "Je kunt eenvoudig contact met ons opnemen via e-mail, WhatsApp of het contactformulier op de website. We informeren je graag over de eschikbaarheid en plannen met plezier een bezichtiging in.",
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