import cities from "./gb-cities.json";

export async function getCities(filter: string) {
  const lowerFilter = filter.toLocaleLowerCase();
  return cities
    .filter(({ city }) => city.toLocaleLowerCase().includes(lowerFilter))
    .slice(0, 5)
    .map(({ city }) => ({
      value: city,
      label: `${city}`,
    }));
}
