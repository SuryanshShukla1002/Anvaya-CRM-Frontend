import { createContext, useContext } from "react";

const LeadCartContext = createContext();

const useLeadCartContext = () => useContext(LeadCartContext);

export default useLeadCartContext;

export const LeadCartManageMentProvide = ({ children }) => {
  return (
    <>
      <LeadCartContext.Provider value={{}}>{children}</LeadCartContext.Provider>
    </>
  );
};
