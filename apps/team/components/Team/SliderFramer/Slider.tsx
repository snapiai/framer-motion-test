import * as React from 'react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { wrap } from 'popmotion';

const variants = {
  enter: (direction: number) => {
    return {
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
    };
  },
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1
  },
  exit: (direction: number) => {
    return {
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0
    };
  }
};

const swipeConfidenceThreshold = 10000;
const swipePower = (offset: number, velocity: number) => {
  return Math.abs(offset) * velocity;
};

export const Slider = ({ images }) => {
  const [[page, direction], setPage] = useState([0, 0]);

  const imageIndex = wrap(0, images.length, page);

  const paginate = (newDirection: number) => {
    setPage([page + newDirection, newDirection]);
  };

  return (
    <>
      <AnimatePresence initial={false} custom={direction}>
        <div className="flex flex-col items-center space-y-6">
          <div className="w-full max-w-[400px] self-center">
            <motion.img
              key={page}
              src={images[imageIndex]?.avatar?.url}
              custom={direction}
              variants={variants}
              initial="start"
              animate="middle"
              exit="end"
              transition={{
                x: { type: 'spring', stiffness: 300, damping: 100 },
                opacity: { duration: 0.6 }
              }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={1}
              onDragEnd={(e, { offset, velocity }) => {
                const swipe = swipePower(offset.x, velocity.x);

                if (swipe < -swipeConfidenceThreshold) {
                  paginate(1);
                } else if (swipe > swipeConfidenceThreshold) {
                  paginate(-1);
                }
              }}
            />
          </div>
          <div className="max-w-xs sm:px-6">
            <h4>{images[imageIndex]?.title}</h4>
            <p className="mt-1 text-gray">{images[imageIndex]?.bio}</p>
            <div className="mt-3">{images[imageIndex]?.description}</div>
          </div>
        </div>
      </AnimatePresence>
    </>
  );
};
export default Slider;
