import React, { useState } from "react";
import { AiOutlinePlusCircle, AiOutlineMinusCircle } from "react-icons/ai";
import "./accordion.scss";

const AccordionUI = ({ title, main, Id, Index, setIndex }) => {
  const [idState, setIdState] = useState(1);
  const handleSetIndex = (Id) => {
    console.log(Id);
    setIdState(Id);
    if (Index !== idState) {
      setIndex(Id);
    } else {
      setIndex(false);
    }
  };

  return (
    <>
      <div onClick={() => handleSetIndex(Id)} className="accordionItem">
        {Index !== Id ? (
          <AiOutlinePlusCircle className="plusIcon " />
        ) : (
          <AiOutlineMinusCircle className="minusIcon " />
        )}
        <div className="accordionTitle">
          <div>{title}</div>
        </div>
      </div>
      {Index === Id && (
        <div className="accordionGroup">
          {main.subject}
          <ol>
            <br />
            {main.step_one && <li className="text-sm">{main.step_one}</li>}
            <br />
            {main.step_two && <li className="text-sm">{main.step_two}</li>}
            <br />
            {main.step_three && <li className="text-sm">{main.step_three}</li>}
            <br />
            {main.step_four && <li className="text-sm">{main.step_four}</li>}
          </ol>
        </div>
      )}
    </>
  );
};

export default AccordionUI;
