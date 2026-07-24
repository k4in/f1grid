import { drivers as catalog } from "@/data/drivers";
import type { Driver, DriverId } from "@/types/types";

function slugify(value: string): string {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export function driverIdFrom(driver: Driver): DriverId {
  return slugify(driver.lastname);
}

export type DriverRecord = Driver & { id: DriverId };

export const drivers: DriverRecord[] = catalog.map((driver) => ({
  ...driver,
  id: driverIdFrom(driver),
}));

export const driverById = Object.fromEntries(
  drivers.map((driver) => [driver.id, driver]),
) as Record<DriverId, DriverRecord>;

export function formatDriverName(driver: Driver): string {
  return `${driver.firstname} ${driver.lastname}`;
}

export function flagUrl(countryCode: string): string {
  return `https://flagcdn.com/w40/${countryCode.toLowerCase()}.png`;
}
