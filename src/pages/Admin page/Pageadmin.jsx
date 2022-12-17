import React from 'react';

import { Dashboard } from '../../components/Layout';
// import CustomModal from '../../components/Modal/CustomModal';

export default function Pageadmin() {
  // const [isOpen, setIsOpen] = useState(false);

  // const openModal = () => {
  //   setIsOpen(true);
  // };

  // const closeModal = () => {
  //   setIsOpen(false);
  // };

  return (
    <Dashboard>
      <h1 className="font-bold mx-4 text-4xl lg:text-5xl text-transparent bg-clip-text bg-gradient-to-tr from-[#0b6cff] to-[#512bd4] p-2 text-center py-52">
        Welcome To Dashboard Admin
      </h1>
      {/* <button onClick={openModal} type="button">
        Buka modal
      </button>
      <CustomModal isOpen={isOpen} closeModal={closeModal}>
        <h1>Hello from modal</h1>
      </CustomModal> */}
    </Dashboard>
  );
}
