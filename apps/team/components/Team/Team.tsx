import { ImageFieldImage } from '@prismicio/types';
import styles from './Team.module.css';
import 'swiper/swiper.min.css';
import Slider from './SliderFramer/Slider';

// eslint-disable-next-line @typescript-eslint/ban-types
export type EmptyItemFields = {};

export interface PrismicSlice<PrimaryFields = EmptyItemFields,
  ItemsFields = EmptyItemFields> {
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
        <Slider images={slice.items}/>
      </div>
    </div>
  </section>
);
