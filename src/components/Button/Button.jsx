import PropTypes from 'prop-types';
import { ButtonContainer, Button } from './Button.module.css';

const LoadMore = ({ onClick }) => {
  return (
    <ButtonContainer>
      <Button type="button" onClick={onClick}>
        Load More
      </Button>
    </ButtonContainer>
  );
};

export default LoadMore;

LoadMore.propTypes = {
  onClick: PropTypes.func.isRequired,
};
