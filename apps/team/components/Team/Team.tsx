import { ImageFieldImage } from '@prismicio/types';
import { Image } from '../Image';
import styles from './Team.module.css';
import 'swiper/swiper.min.css';
import { AnimatePresence, motion, PanInfo, Variants } from 'framer-motion';
import { useEffect, useState } from 'react';
import { wrap } from 'popmotion';

// eslint-disable-next-line @typescript-eslint/ban-types
export type EmptyItemFields = {};
export interface PrismicSlice<
  PrimaryFields = EmptyItemFields,
  ItemsFields = EmptyItemFields
> {
  variation?: string;
  name?: string;
  id?: string;
  slice_type: string;
  slice_label?: string | null;
  primary: PrimaryFields;
  items: ItemsFields[];
}

export type PrismicSliceComponent<T> = React.FC<{ slice: T }>;

export type TeamPrimaryField = {
  title: string;
  description?: string;
};

export type TeamItemFields = {
  title: string;
  bio: string;
  description: string;
  avatar: ImageFieldImage;
};

export type TeamSlice = PrismicSlice<TeamPrimaryField, TeamItemFields>;

const variants: Variants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 400 : -400,
    opacity: 0
  }),
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    zIndex: 0,
    x: direction < 0 ? 400 : -400,
    opacity: 0,
  })
}

function getViewportWidth() {
  return Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0)
}

function geSlideAmount(viewportWidth: number) {
  if (viewportWidth < 640) {
    return 1
  }

  if (viewportWidth < 1024) {
    return 2
  }

  return 3
}

export const Team: PrismicSliceComponent<TeamSlice> = ({ slice }) => {
  const [[page, direction], setChange] = useState([0, 0])
  const [viewportWidth, setViewportWidth] = useState(320)

  const slideAmount = geSlideAmount(viewportWidth);
  const dataIndexes = Array(slideAmount).fill(1).map((_, index) => wrap(0, slice.items.length, page + index))

  useEffect(
    () => {
      const handleResize = () => {
        setViewportWidth(getViewportWidth())
      }

      setViewportWidth(getViewportWidth())
      
      window.addEventListener('resize', handleResize);

      return () => {
        window.removeEventListener('resize', handleResize)
      }
    },
    [],
  )
  
  const handleDragEnd = (_, { offset, velocity }: PanInfo) => {
    const swipe = Math.abs(offset.x) * velocity.x

    const threshold = 10000

    if (swipe < -threshold) {
      setChange(([prevPage]) => ([prevPage + 1, 1]))
      return
    }

    if (swipe > threshold) {
      setChange(([prevPage]) => ([prevPage - 1, -1]))
    }
  }

  return (
    <section>
      <div className="container md:flex md:flex-col md:justify-center md:gap-8">
        <div className="self-center text-center">
          <div>
            <h2>{slice.primary.title}</h2>
          </div>
          <div className="pt-4">{slice.primary.description}</div>
        </div>
        <div className={`w-full ${styles.customCursor} ${styles.container}`}>
          <AnimatePresence>
            <motion.div
              key={page}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={1}
              onDragEnd={handleDragEnd}
              variants={variants}
              custom={direction}
              initial="enter"
              animate="center"
              exit="exit"
              className={`${styles.motion}`}
              transition={{
                x: { type: 'spring', stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 },
              }}
            >
              {dataIndexes.map(index => {
                const { title, bio, description, avatar } = slice.items[index]

                return (
                  <div key={title} className="flex flex-col items-center space-y-6">
                    <div className="w-full max-w-[400px] self-center">
                      <Image {...avatar} />
                    </div>
                    <div className="max-w-xs sm:px-6">
                      <h4>{title}</h4>
                      <p className="mt-1 text-gray">{bio}</p>
                      <div className="mt-3">{description}</div>
                    </div>
                  </div>
                )
              })}
            </motion.div>
          </AnimatePresence>
          {/* <Swiper
            slidesPerView={1}
            spaceBetween={30}
            loop={true}
            breakpoints={{
              640: {
                slidesPerView: 2,
                spaceBetween: 20,
              },
              1024: {
                slidesPerView: 3,
                spaceBetween: 40,
              },
            }}
          >
            
              <SwiperSlide key={i}>
                
              </SwiperSlide>
            
          </Swiper> */}
        </div>
      </div>
    </section>
  )
};
