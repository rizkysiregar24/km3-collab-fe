import { useSelector } from "react-redux";

const useAirportList = () => {
  const { airportsIndonesia } = useSelector((state) => state.airport);

  const optionsAllAirportData = airportsIndonesia?.map(
    ({ airportCode: value, airportName: label, cityName: city, ...rest }) => ({
      value,
      label: `${label} (${value}) - ${city}`,
      airportName: label,
      cityName: city,
      ...rest,
    })
  );

  const filterAirports = (inputValue) =>
    optionsAllAirportData.filter((airport) =>
      airport.label
        .concat(airport.alias.join(" "))
        .toLowerCase()
        .includes(inputValue.toLowerCase())
    );

  const promiseOptions = (inputValue) =>
    new Promise((resolve) => {
      setTimeout(() => {
        resolve(filterAirports(inputValue));
      }, 150);
    });

  return promiseOptions;
};

export default useAirportList;
