/**
 * `useHistorySearch` hook is a hook to get previous user search data from `localStorage` if it's not exist it'll use the default value instead as defined.
 * @returns {object} an object with these keys: `adult`, `arrival`, `departure`, `returnDate`, `seatClass`, `startDate`, `tripType`
 */
const useHistorySearch = () => {
  const historySearch = JSON.parse(localStorage.getItem('historySearch'));

  const { adult, arrival, departure, returnDate, seatClass, startDate, tripType } =
    historySearch ?? {
      adult: 1,
      arrival: {
        value: 'SUB',
        label: 'Juanda (SUB) - Surabaya',
        airportName: 'Juanda',
        cityName: 'Surabaya',
        id: '5b77a1b0e7941b3b942e7a87',
        airportLocation: 'Surabaya, Indonesia',
        type: 'airport',
        cityCode: 'SUBC',
        countryName: 'Indonesia',
        ref: null,
        precedence: null,
        alias: [
          'Suroboyo',
          'Sidoarjo',
          'Juanda ',
          'Yuanda ',
          ' Surabaya',
          'Sura Baya ',
          ' Suro Boyo ',
          ' SBY',
          'Sur',
          'SUB'
        ]
      },
      departure: {
        value: 'CGK',
        label: 'Soekarno Hatta (CGK) - Jakarta',
        airportName: 'Soekarno Hatta',
        cityName: 'Jakarta',
        id: '5b77a1ade7941b3b942e4c1d',
        airportLocation: 'Jakarta, Indonesia',
        type: 'airport',
        cityCode: 'JKTC',
        countryName: 'Indonesia',
        ref: 'JKTC',
        precedence: null,
        alias: [
          'Soekarno-Hatta',
          'SoekarnoHatta',
          'Soekarno Hatta',
          'Soetta',
          'Jakarta',
          'JKT',
          'DKI Jakarta',
          'Tangerang',
          'Cengkareng'
        ]
      },
      returnDate: new Date().toISOString().substring(0, 10),
      seatClass: 'economy',
      startDate: new Date().toISOString().substring(0, 10),
      tripType: 'one_way'
    };

  return { adult, arrival, departure, returnDate, seatClass, startDate, tripType };
};

export default useHistorySearch;
