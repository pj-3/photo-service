import React from 'react';
import axios from 'axios';
import DefaultGall from './DefaultGall.jsx';

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      listing: {
        house_Id: 'number',
        images: [1, 2, 3, 4, 5].map((i) => {
          return {
            house_Id: i,
            photourl: '/loadingIMG.gif',
            photo_description: 'description'
          };
        })
      },
    };
    this.getListing = this.getListing.bind(this);
  }

  componentDidMount() {
    // getting index from url
    const splitUrl = window.location.href.split('/');
    const index = splitUrl[3];
    this.getListing(index);
  }

  // get a listing
  getListing(id) {
    axios.get('/listing', {
      params: {
        house_Id: id
      }
    })
      .then((result) => {
        this.setState({ listing: {house_Id: result.data[0].house_Id, images:result.data} }, () => console.log(result));
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    return (
      <div>
        <DefaultGall listing={this.state.listing} />
      </div>
    );
  }
}

export default Header;
