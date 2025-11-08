import { WhatsApp } from "@mui/icons-material";

const CarRentalServices = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white px-6 py-16">
      <div className="max-w-xl text-center">
        <h1 className="text-3xl md:text-4xl font-semibold text-gray-800 mb-4">
          Car Rental Service
        </h1>
        <p className="text-gray-600 leading-relaxed mb-6">
          Experience ultimate comfort and convenience during your stay. <br />
          We offer well-maintained cars for rent whether you need a quick ride
          around the island or a full-day trip, we’ve got you covered.
        </p>
        <p className="text-gray-600 mb-8">
          You can explore our available cars directly on the Home page all
          listings are already displayed there for your convenience.
        </p>

        <a
        href="https://wa.me/+31655518120"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 bg-green-600 text-white px-6 py-3 rounded-full hover:bg-green-700 transition"
        aria-label="Contact us on WhatsApp"
        title="Contact us on WhatsApp (+31 655 518 120)"
      >
        <WhatsApp fontSize="large" />
      </a>
      </div>
    </div>
  );
};

export default CarRentalServices;
