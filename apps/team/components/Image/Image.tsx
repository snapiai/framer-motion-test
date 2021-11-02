import { ImageFieldImage } from '@prismicio/types';
import NextImage, { ImageProps } from 'next/image';

export const Image: React.FC<
  ImageFieldImage & {
    className?: string;
    layout?: ImageProps['layout'];
  }
> = ({ url, dimensions, alt, className, layout = 'intrinsic' }) => {
  if (!dimensions || !url) {
    return null;
  }

  return (
    <NextImage
      src={url}
      width={dimensions.width}
      height={dimensions.height}
      className={className}
      alt={alt ? alt : undefined}
      layout={layout}
    />
  );
};
