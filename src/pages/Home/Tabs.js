import React, { useState } from 'react';

const Tabs = ({ children }) => {
  const [activeTab, setActiveTab] = useState(0);

  const changeTab = (index) => {
    setActiveTab(index);
  };

  return (
    <div className="w-full">
      <div className="flex content-center justify-center">
        {children.map((tab, index) => (
          <button
            key={index}
            onClick={() => changeTab(index)}
            className={`${
              activeTab === index
                ? 'text-slate-700 dark:text-white font-bold text-sm '
                : 'text-slate-400 dark:text-gray-400 text-sm'
            } py-2 px-4 rounded-l transition-colors`}
          >
            {tab.props.title}
          </button>
        ))}
      </div>
      <hr className="border-t border-slate-400 dark:border-slate-700 w-96 mx-auto" />
      <div className="p-4">{children[activeTab]}</div>
    </div>
  );
};

export default Tabs;
