import { useSelector } from 'react-redux';

/**
 * This hook is getting airportsIndonesia state from Redux store and transform the data to meet
 * requirements for `react-select` library that must have a label and value.
 * After having a value, it'll be filtered by their label and alias for searching in `react-select` lib
 * and then it'll return the filtered options
 * @returns {Array}
 */
const useAirportList = () => {
  const { airportsIndonesia } = useSelector((state) => state.airport);

  const optionsAllAirportData = airportsIndonesia?.map(
    ({ airportCode: value, airportName: label, cityName: city, ...rest }) => ({
      value,
      label: `${label} (${value}) - ${city}`,
      airportName: label,
      cityName: city,
      ...rest
    })
  );

  const filterAirports = (inputValue) =>
    optionsAllAirportData.filter((airport) =>
      airport.label.concat(airport.alias.join(' ')).toLowerCase().includes(inputValue.toLowerCase())
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
