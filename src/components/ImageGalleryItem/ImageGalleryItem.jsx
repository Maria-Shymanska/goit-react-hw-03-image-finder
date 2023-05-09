import PropTypes from 'prop-types';
import ItemImageGallery from './ImageGalleryItem.module.css';
import Image from './ImageGalleryItem.module.css';

const ImageGalleryItem = ({ id, largeImageURL, webformatURL, onClick }) => {
  return (
    <ItemImageGallery key={id} onClick={() => onClick(largeImageURL)}>
      <Image src={webformatURL} alt="" />
    </ItemImageGallery>
  );
};

export default ImageGalleryItem;

ImageGalleryItem.propTypes = {
  // id: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
  webformatURL: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};
