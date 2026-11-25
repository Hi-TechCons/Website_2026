import logo1 from "./assets/clients/Kalpataru.svg";
import logo2 from "./assets/clients/L&T.svg";
import logo3 from "./assets/clients/PGVCL.svg";
import logo4 from "./assets/clients/R&B - Copy.png";
import logo5 from "./assets/clients/RMC.svg";
import logo6 from "./assets/clients/Tata_logo.svg";

const clients = [
  logo1,
  logo2,
  logo3,
  logo4,
  logo5,
  logo6
];

export default function ClientSection() {
  return (
    <section className="py-28 bg-slate-50 relative overflow-hidden">

      <div className="max-w-7xl mx-auto px-4 text-center">

        {/* Section Title */}
        <h2 className="text-3xl md:text-4xl font-black uppercase italic text-slate-900 mb-4 tracking-tight">
          Trusted By
        </h2>

        <p className="text-slate-500 max-w-2xl mx-auto mb-16 text-sm md:text-base">
          Government departments and organizations that trust our infrastructure
          and civil engineering expertise.
        </p>

        {/* Logo Slider */}
        <div className="relative overflow-hidden">

          {/* Fade Left */}
          <div className="absolute left-0 top-0 h-full w-32 bg-gradient-to-r from-slate-50 to-transparent z-10"></div>

          {/* Fade Right */}
          <div className="absolute right-0 top-0 h-full w-32 bg-gradient-to-l from-slate-50 to-transparent z-10"></div>

          <div className="flex w-max items-center gap-20 animate-client-scroll hover:[animation-play-state:paused]">

            {/* {[...clients, ...clients].map((logo, index) => (
              <div
                key={index}
                className="flex items-center justify-center min-w-[160px] h-20"
              >
                <img
                  src={logo}
                  alt="client"
                  className="h-16 w-auto object-contain grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition duration-300"
                />
              </div>
            ))} */}

            {[...clients, ...clients].map((logo, index) => (
              <div
                key={index}
                className="flex items-center justify-center min-w-[160px]"
              >
                <div className="w-40 h-20 flex items-center justify-center">
                  <img
                    src={logo}
                    alt="client"
                    className="max-h-full max-w-full object-contain grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition duration-300"
                  />
                </div>
              </div>
            ))}
          </div>

        </div>

      </div>

    </section>
  );
}
