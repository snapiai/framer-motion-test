import React, { useState } from "react";
import { motion, AnimateSharedLayout } from "framer-motion";
import PageSlider from "./PageSlider";
import "./styles.css";

const Pagination = ({ currentPage, setPage }) => {
  return (
    <AnimateSharedLayout>
      <div className="Indicators">
        {pages.map((page) => (
          <Indicator
            key={page}
            onClick={() => setPage(page)}
            isSelected={page === currentPage}
          />
        ))}
      </div>
    </AnimateSharedLayout>
  );
};

const Indicator = ({ isSelected, onClick }) => {
  return (
    <div className="Indicator-container" onClick={onClick}>
      <div className="Indicator">
        {isSelected && (
          <motion.div className="Indicator-highlight"
                      layoutId="highlight" />
        )}
      </div>
    </div>
  );
};

const pages = [0, 1, 2, 3, 4];

const main = () => {
  const [[currentPage, direction], setCurrentPage] = useState([0, 0]);

  function setPage(newPage, newDirection) {
    if (!newDirection) newDirection = newPage - currentPage;
    setCurrentPage([newPage, newDirection]);
  }

  return (
    <>
      <PageSlider
        currentPage={currentPage}
        direction={direction}
        setPage={setPage}
      />
      <Pagination currentPage={currentPage}
                  setPage={setPage} />
    </>
  );
};
export default Pagination
