import Link from "next/link";
import { getPopularCategories } from "@/lib/inventory";
import { localizedHref, type Locale } from "@/lib/i18n";

const BODY_LABELS_EN: Record<string, string> = {
  Sedan: "Sedans",
  SUV: "SUVs",
  Truck: "Pickup Trucks",
  Coupe: "Coupes",
  Van: "Vans & Minivans",
  Hatchback: "Hatchbacks",
  Wagon: "Wagons",
  Convertible: "Convertibles",
  Other: "Other",
};

const BODY_LABELS_ES: Record<string, string> = {
  Sedan: "Sedanes",
  SUV: "SUVs",
  Truck: "Camionetas",
  Coupe: "Coupés",
  Van: "Vans y Minivans",
  Hatchback: "Hatchbacks",
  Wagon: "Wagons",
  Convertible: "Convertibles",
  Other: "Otros",
};

function CategoryLink({
  href,
  label,
  count,
}: {
  href: string;
  label: string;
  count: number;
}) {
  return (
    <li>
      <Link
        href={href}
        className="group inline-flex items-baseline gap-1.5 text-sm text-white/85 transition-colors hover:text-green-bright"
      >
        <span className="underline-offset-2 group-hover:underline">{label}</span>
        <span className="text-xs text-white/40">({count})</span>
      </Link>
    </li>
  );
}

function Heading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="mb-5 font-display text-lg font-bold uppercase tracking-[0.14em] text-white">
      {children}
    </h2>
  );
}

export async function PopularCategories({ locale = "en" }: { locale?: Locale }) {
  const { bodyTypes, makes, models } = await getPopularCategories();
  const isEs = locale === "es";
  const bodyLabels = isEs ? BODY_LABELS_ES : BODY_LABELS_EN;
  const inventoryPath = localizedHref(locale, "/inventory");

  return (
    <section className="border-t border-white/10 bg-black py-14 text-white lg:py-16">
      <div className="mx-auto max-w-7xl space-y-12 px-5 lg:px-8">
        <div>
          <Heading>
            {isEs ? "Estilos Populares" : "Popular Body Styles"}
          </Heading>
          <ul className="grid grid-cols-2 gap-x-6 gap-y-3 sm:grid-cols-3 lg:grid-cols-4">
            {bodyTypes.map((b) => (
              <CategoryLink
                key={b.label}
                href={`${inventoryPath}?bodyType=${encodeURIComponent(b.label)}`}
                label={bodyLabels[b.label] ?? b.label}
                count={b.count}
              />
            ))}
          </ul>
        </div>

        <div>
          <Heading>{isEs ? "Marcas Populares" : "Popular Makes"}</Heading>
          <ul className="grid grid-cols-2 gap-x-6 gap-y-3 sm:grid-cols-3 lg:grid-cols-4">
            {makes.map((m) => (
              <CategoryLink
                key={m.label}
                href={`${inventoryPath}?make=${encodeURIComponent(m.label)}`}
                label={m.label}
                count={m.count}
              />
            ))}
          </ul>
        </div>

        <div>
          <Heading>
            {isEs ? "Modelos Populares" : "Popular Make Models"}
          </Heading>
          <ul className="grid grid-cols-2 gap-x-6 gap-y-3 sm:grid-cols-3 lg:grid-cols-4">
            {models.map((m) => (
              <CategoryLink
                key={`${m.make}-${m.model}`}
                href={`${inventoryPath}?make=${encodeURIComponent(m.make)}&model=${encodeURIComponent(m.model)}`}
                label={`${m.make} ${m.model}`}
                count={m.count}
              />
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
