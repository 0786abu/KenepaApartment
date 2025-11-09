export function FeaturesSection() {
return (
<section className="py-8 px-6 bg-gray-50">
    <h2 className="text-center text-2xl sm:text-3xl font-bold leading-tight tracking-tight my-4">Features</h2>
<div className="max-w-5xl mx-auto grid gap-8 md:grid-cols-2">
<div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
<h3 className="text-lg font-medium text-gray-900">Comfortabel wonen zonder gedoe</h3>
<ul className="mt-4 space-y-2 text-gray-700 list-disc list-inside">
<li>Een gezellige woonkamer met comfortabele meubels</li>
<li>Een volledig ingerichte keuken</li>
<li>Een nette badkamer</li>
<li>Een fijne slaapkamer</li>
<li>Wifi en televisie</li>
</ul>
</div>


<div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
<h3 className="text-lg font-medium text-gray-900">Heerlijk ontspannen op ons terrein</h3>
<ul className="mt-4 space-y-2 text-gray-700 list-disc list-inside">
<li>Een verfrissend zwembad</li>
<li>Parkeergelegenheid</li>
<li>Een veilige en rustige omgeving</li>
<li>Washok</li>
<li>BBQ set</li>
</ul>
</div>
</div>
</section>
);
}