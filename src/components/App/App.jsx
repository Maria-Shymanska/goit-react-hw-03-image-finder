import React, { Component } from 'react';
import { Notify } from 'notiflix';
import { Api } from '../services/api';
import css from './App.module.css';
import ImageGallery from './ImageGallery/ImageGallery';
import Searchbar from './Searchbar/Searchbar';
import Modal from './Modal/Modal';
import Loader from './Loader';
import Button from './Button';

class App extends Component {
  state = {
    page: 1,
    query: '',
    photos: [],
    totalItems: 0,
    loading: false,
    isModalShow: false,
    modalData: {
      largeImageUrl: '',
      altName: '',
    },
  };

  async componentDidUpdate(_, prevState) {
    const { query, page, photos } = this.state;

    if (prevState.query !== query || prevState.page !== page) {
      this.setState({ loading: true });

      await Api(query, page)
        .then(res => {
          if (res.hits.length === 0) {
            Notify.failure('No images were found for your request');
            return;
          }

          if (prevState.totalItems !== res.total) {
            Notify.success(`We found ${res.total} images`);
          }
          const response = res.hits.map(
            ({ webformatURL, tags, largeImageURL, id }) => {
              return {
                id,
                webformatURL,
                tags,
                largeImageURL,
              };
            }
          );

          this.setState(() => {
            return {
              photos: [...photos, ...response],
              totalItems: res.total,
            };
          });
        })
        .catch(error => Notify.failure(error.message))
        .finally(() => this.setState({ loading: false }));
    }
  }

  onSubmit = query => {
    if (this.state.query !== query) {
      this.setState({ query, photos: [], page: 1 });
    }
  };

  loadMore = () => {
    this.setState(prevState => {
      return { page: prevState.page + 1 };
    });
  };

  toggleModalIsSow = () => {
    this.setState(({ isModalShow }) => ({
      isModalShow: !isModalShow,
    }));
  };

  openModalWindow = newModalData => {
    if (newModalData.largeImageUrl !== this.state.modalData.largeImageUrl) {
      this.setState(() => {
        return {
          modalData: { ...newModalData },
        };
      });
    }
    this.toggleModalIsSow();
  };

  render() {
    const { photos, loading, totalItems, page, isModalShow, modalData } =
      this.state;

    const { onSubmit, openModalWindow, loadMore, toggleModalIsSow } = this;

    return (
      <div className={css.App}>
        {/* ---------Searchbar------------- */}

        <Searchbar onSubmit={onSubmit} />

        {/* ---------Gallery------------- */}

        <ImageGallery photos={photos} openModalWindow={openModalWindow} />
        {loading && <Loader />}
        {photos.length > 0 && totalItems > page * 12 && !loading && (
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Button handleClick={loadMore} />
          </div>
        )}
        <>
          {/* ---------Modal window------------- */}

          {isModalShow && (
            <Modal modalData={modalData} onClose={toggleModalIsSow} />
          )}
        </>
      </div>
    );
  }
}

export default App;
