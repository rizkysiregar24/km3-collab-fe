/**
 * @param {string} sortBy
 * @param {array} ticket
 * @return array
 */
export const getSortedTicket = (sortBy, ticket) => {
  const tempData = ticket.map((x) => x) ?? [];
  if (sortBy === 'price' && ticket) {
    return tempData?.sort((a, b) => a.price - b.price);
  }
  if (sortBy === 'priceAsc' && ticket) {
    return tempData?.sort((a, b) => b.price - a.price);
  }
  if (sortBy === 'time' && ticket) {
    const times = tempData.map((obj) => {
      const parts = obj.arrivalTime.split(':');
      return {
        ...obj,
        timeShorter:
          parseInt(parts[0], 10) * 3600 + parseInt(parts[1], 10) * 60 + parseInt(parts[2], 10)
      };
    });
    return times?.sort((a, b) => a.timeShorter - b.timeShorter);
  }
  if (sortBy === 'timeLate' && ticket) {
    const times = tempData.map((obj) => {
      const parts = obj.arrivalTime.split(':');
      return {
        ...obj,
        timeShorter:
          parseInt(parts[0], 10) * 3600 + parseInt(parts[1], 10) * 60 + parseInt(parts[2], 10)
      };
    });
    return times?.sort((a, b) => b.timeShorter - a.timeShorter);
  }
  return ticket;
};
