import React from "react";

type props = {
  showModel: boolean;
  children: React.ReactNode | JSX.Element;
  setShowModel?: (b: boolean) => void;
};

const MODEL = ({ showModel, children, setShowModel = () => {} }: props) => {
  return (
    <>
      {showModel ? (
        <>
          <div className="fixed  left-0 top-0 z-50 flex h-full min-h-screen w-full items-center justify-center bg-black/90 px-4 py-5 block">
            <div className="border-0 rounded-xl overflow-hidden shadow-lg relative flex flex-col w-[95%] bg-white outline-none focus:outline-none">
              <div className="flex items-center justify-between p-4 md:p-5 border-b border-[#EEEEEE] rounded-t">
                <button
                  onClick={() => setShowModel(!showModel)}
                  type="button"
                  className="cursor-pointer ms-auto" 
                >
                  &#x2715;
                </button>
              </div>
              <div className="w-full lex items-center justify-between">
                {children}
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
};

export default MODEL;
