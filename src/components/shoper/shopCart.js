import React from "react";
import { connect } from "react-redux";
import { ExportCSV } from "../HelperComponents/CSVExport";
import { fetchCartProducts, deleteCartItem } from "../../actions";

class ShopCart extends React.Component {
  componentDidMount() {
    const isSignedIn = this.props.user.isSignedIn;
    if (isSignedIn) {
      const { id } = this.props.user.userId;
      this.props.fetchCartProducts(id);
    }
  }
  onRemoveCartItem = (id) => {
    this.props.deleteCartItem(id);
  };
  componentDidUpdate() {
    const isSignedIn = this.props.user.isSignedIn;
    if (isSignedIn) {
      const { id } = this.props.user.userId;
      this.props.fetchCartProducts(id);
    }
  }

  renderedList() {
    const cartItemLength = this.props.cartItems.length;
    const src = `${process.env.PUBLIC_URL}/images/emptycart.png`;
    if (cartItemLength !== 0) {
      if (this.props.cartItems[0].length !== 0) {
        return this.props.cartItems[0].map((cartItem) => {
          return (
            <div className="content">
              {cartItem.ProductName}
              <div className="right floated" data-inverted=""  data-position="left center"  data-tooltip="Remove from cart">
                <i
                  onClick={() => this.onRemoveCartItem(cartItem.id)}
                  className="small red circle  minus icon"
                ></i>
              </div>
              <div className="right floated" data-inverted=""  data-position="left center"  data-tooltip="Buy">
                <i className="check circle small green icon"></i>
              </div>
            </div>
          );
        });
      } else {
        return (
          <div className="content">
            <div className="center aligned">
              <img className="ui tiny rounded image" src={src}></img>
            </div>
          </div>
        );
      }
    } else {
      return <div className="ui active centered inline loader"></div>;
    }
  }

  // renderExportCartDetails = () => {
  //   const cartItemLength = this.props.cartItems.length;
  //   if (cartItemLength !== 0) {
  //     if (this.props.cartItems[0].length !== 0) {
  //       return (
  //         <div>
  //           <button className="ui circular mini button">
  //             <CSVLink data={this.props.cartItems[0]} filename="filename.csv">
  //               <i className="download grey icon"></i>
  //             </CSVLink>
  //           </button>
  //         </div>
  //       );
  //     }
  //   }
  // };

  render() {
    if (this.props.user.isSignedIn) {
      return (
        <div className="ui fluid card">
          <div className="content">
            <div className="header">
              <div className="left floated">
                <i className="cart blue icon"></i>
              </div>
            </div>
            <div className="ui hidden divider"></div>
            <h4>{this.renderedList()}</h4>
            <ExportCSV csvData={this.props.cartItems} fileName="Cart Items" />
          </div>
        </div>
      );
    } else {
      return <div></div>;
    }
  }
}
const mapStateToProps = (state) => {
  return { user: state.auth, cartItems: Object.values(state.cartFetch) };
};

export default connect(mapStateToProps, { fetchCartProducts, deleteCartItem })(
  ShopCart
);
