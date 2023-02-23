import { useState } from "react";
import Navbar from "v1/components/common/navigation/Navbar";
import Sidebar from "v1/components/common/navigation/Sidebar";

const Navigation = () => {
  const [isOpen, setOpen] = useState(false);

  return (
    <>
      <Sidebar isOpen={isOpen} onCloseMenu={() => setOpen(false)} />
      <Navbar onOpenMenu={() => setOpen(true)} />
    </>
  );
};

export default Navigation;
