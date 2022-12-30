export const airlineLogos = [
  {
    airlineName: 'Lion Air',
    logo: 'https://res.cloudinary.com/dmgrxm78p/image/upload/v1672053726/terbangtinggi/1dedfd4e-2f74-4fa9-a3f5-d238c74d3d72-1608152770164-b210808aea30c7543cab4380aca4c3ad_x0ok1r.png'
  },
  {
    airlineName: 'Citylink',
    logo: 'https://res.cloudinary.com/dmgrxm78p/image/upload/v1672053748/terbangtinggi/3deec547-980a-4d75-ac89-6e34eb9ddcf7-1608153225434-f5996f5af379dc69b93f00f8b725e579_uhadby.png'
  },
  {
    airlineName: 'Garuda Indonesia',
    logo: 'https://res.cloudinary.com/dmgrxm78p/image/upload/v1672053768/terbangtinggi/884009ae-b512-478a-9c3d-f4dbf22386eb-1608152537048-0c289e6d3a1bcb518efdd93be5ae139c_o3rig6.png'
  },
  {
    airlineName: 'Batik Air',
    logo: 'https://res.cloudinary.com/dmgrxm78p/image/upload/v1672053785/terbangtinggi/4d7fa58c-a41f-4424-a599-7a2ccd27f270-1608152644158-75f5ada3c1800a50a7ba02a56ae2603b_duz2mo.png'
  },
  {
    airlineName: 'Air Asia',
    logo: 'https://res.cloudinary.com/dmgrxm78p/image/upload/v1672053808/terbangtinggi/9ef0e1f0-2d8c-4441-b010-bf029dcba80c-1670411731382-4a9191284529bab874bff9f2d5f23e1a_exuvcj.png'
  },
  {
    airlineName: 'Sriwijaya Air',
    logo: 'https://res.cloudinary.com/dmgrxm78p/image/upload/v1672053824/terbangtinggi/97329954-f734-4840-bb0b-a191d251672b-1608153267798-8b0e1941c0d909a586e08d437a15a1f6_zmqnic.png'
  }
];

/**
 *
 * @param {string} airlineName
 * @returns string
 */
export const getAirlineLogo = (airlineName) =>
  airlineLogos
    ?.filter((x) => x?.airlineName?.toLowerCase() === airlineName?.toLowerCase())
    .map((y) => y?.logo)[0] ??
  'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Placeholder_view_vector.svg/681px-Placeholder_view_vector.svg.png';
