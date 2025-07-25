import type { ReactNode } from "react";

type DashMainProps = {
  children: ReactNode;
};

const DashMain = ({ children }: DashMainProps) => {
  return (
    <>
      <main className="flex animate-fade-in-slow overflow-auto flex-col items-center z-2 grow col-start-2 col-end-3 row-start-2 row-end-3 p-2 gap-6">
        {children}
      </main>
    </>
  );
};

export default DashMain;
