import React from "react";
import { connect } from "react-redux";
import Header from "../header";
import { signIn, fetchProducts } from "../../actions";
import ShopHomeContent from "./shopHomeContent";

class ShoperHome extends React.Component {
  componentDidMount() {
    this.props.fetchProducts();
  }

  render() {
    const isSignedIn = this.props.user.isSignedIn;
    if (isSignedIn) {
      const userName = this.props.user.userId.firstName;
      return (
        <div className="ui container">
          <Header userName={userName} isSignedIn={isSignedIn} />
          <ShopHomeContent
            products={this.props.products}
            isSignedIn={isSignedIn}
          />
        </div>
      );
    } else {
      return (
        <div className="ui container">
          <Header userName="Please Login" isSignedIn={isSignedIn} />
          <ShopHomeContent
            products={this.props.products}
            isSignedIn={isSignedIn}
          />
        </div>
      );
    }
  }
}
const mapStateToProps = (state) => {
  return { user: state.auth, products: Object.values(state.product) };
};

export default connect(mapStateToProps, { signIn, fetchProducts })(ShoperHome);
