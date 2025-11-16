import type { MediaItem } from '../../types/walkthrough';
import styles from './MediaGallery.module.css';

const MediaGallery = ({ media }: { media?: MediaItem[] }) => {
  if (!media?.length) return null;
  return (
    <div className={styles.gallery}>
      <h3>Media</h3>
      <div className={styles.items}>
        {media.map((item, index) => (
          <figure key={index}>
            <img src={item.url} alt={item.caption ?? 'Screenshot'} />
            {item.caption && <figcaption>{item.caption}</figcaption>}
          </figure>
        ))}
      </div>
    </div>
  );
};

export default MediaGallery;
