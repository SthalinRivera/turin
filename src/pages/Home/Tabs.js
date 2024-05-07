import React, { useState } from 'react';

const Tabs = ({ children }) => {
  const [activeTab, setActiveTab] = useState(0);

  const changeTab = (index) => {
    setActiveTab(index);
  };

  return (
    <> <div className="w-full">
      <div className="flex content-center justify-center">
        {children.map((tab, index) => (
          <button
            key={index}
            onClick={() => changeTab(index)}
            className={`${
              activeTab === index
                ? ' text-white'
                : ' text-gray-800'
            } py-2 px-4 rounded-l focus:outline-none`}
          >
            {tab.props.title}
          </button>
         
        ))} <hr class="border-t border-gray-200"/>
      </div>
      <div className="p-4">{children[activeTab]}</div>
    </div>
    

    </>
   
    
  );
};

export default Tabs;
