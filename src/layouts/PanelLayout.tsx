import React, { PropsWithChildren } from 'react';

const PanelLayout = ({ children }: PropsWithChildren) => {
  return (
    <div className="flex h-screen items-center bg-blue-400">
      <div className="m-auto grid h-3/5 w-1/2 bg-slate-50 shadow-2xl lg:grid-cols-2">
        <div>Image Here</div>
        <div className="right flex flex-col justify-evenly bg-gray-500">
          <div className="py-10 text-center">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default PanelLayout;
