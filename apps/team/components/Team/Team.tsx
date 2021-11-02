import { ImageFieldImage } from '@prismicio/types';
import { Image } from '../Image';
import { Swiper, SwiperSlide } from 'swiper/react';
import styles from './Team.module.css';
import 'swiper/swiper.min.css';

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
  avatarBackground: ImageFieldImage;
};

export type TeamSlice = PrismicSlice<TeamPrimaryField, TeamItemFields>;

export const Team: PrismicSliceComponent<TeamSlice> = ({ slice }) => (
  <section>
    <div className="container md:flex md:flex-col md:justify-center md:gap-8">
      <div className="self-center text-center">
        <div>
          <h2>{slice.primary.title}</h2>
        </div>
        <div className="pt-4">{slice.primary.description}</div>
      </div>
      <div className={`w-full ${styles.customCursor}`}>
        <Swiper
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
          className="mySwiper"
        >
          {slice.items.map(({ title, bio, description, avatar }, i) => (
            <SwiperSlide key={i}>
              <div className="flex flex-col items-center space-y-6">
                <div className="w-full max-w-[400px] self-center">
                  <Image {...avatar} />
                </div>
                <div className="max-w-xs sm:px-6">
                  <h4>{title}</h4>
                  <p className="mt-1 text-gray">{bio}</p>
                  <div className="mt-3">{description}</div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  </section>
);
