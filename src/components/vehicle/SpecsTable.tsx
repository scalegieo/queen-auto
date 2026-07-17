import type { Vehicle } from "@/types/vehicle";
import { formatMileage } from "@/lib/format";

export function SpecsTable({ vehicle }: { vehicle: Vehicle }) {
  const rows: [string, string | number | undefined][] = [
    ["Year", vehicle.year],
    ["Make", vehicle.make],
    ["Model", vehicle.model],
    ["Trim", vehicle.trim],
    ["Body Type", vehicle.bodyType],
    ["Mileage", formatMileage(vehicle.mileage)],
    ["Exterior", vehicle.exteriorColor],
    ["Interior", vehicle.interiorColor],
    ["Transmission", vehicle.transmission],
    ["Drivetrain", vehicle.drivetrain],
    ["Engine", vehicle.engine],
    ["Fuel", vehicle.fuelType],
    ["Doors", vehicle.doors],
    [
      "MPG",
      vehicle.mpgCity && vehicle.mpgHighway
        ? `${vehicle.mpgCity} city / ${vehicle.mpgHighway} hwy`
        : undefined,
    ],
  ];

  return (
    <section>
      <h2 className="font-display text-2xl font-bold tracking-tight">
        Vehicle Specs
      </h2>
      <div className="mt-6 overflow-hidden border border-border">
        <table className="w-full text-sm">
          <tbody>
            {rows
              .filter(([, v]) => v != null && v !== "")
              .map(([label, value], i) => (
                <tr
                  key={label}
                  className={i % 2 === 0 ? "bg-surface" : "bg-bg-elevated"}
                >
                  <th className="w-1/3 px-4 py-3 text-left font-medium text-muted">
                    {label}
                  </th>
                  <td className="px-4 py-3">{value}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
