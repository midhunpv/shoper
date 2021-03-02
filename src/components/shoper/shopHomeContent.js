import React from "react";
import { connect } from "react-redux";
import { addToCart } from "../../actions";
import ShopCart from "../shoper/shopCart";

class ShopHomeContent extends React.Component {
  generateUserControls(product) {
    if (this.props.isSignedIn) {
      return (
        <button
          onClick={() => this.props.addToCart(product)}
          className="ui right floated mini primary button"
        >
          Add to cart
          <i className="right cart plus icon"></i>
        </button>
      );
    }
  }
  renderedList() {
    if (this.props.products) {
      return this.props.products.map((product) => {
        const productName = product.ProductName.replace(/ /g, "");
        const src = `${process.env.PUBLIC_URL}/images/${productName}.jpg`;
        return (
          <div className="item" key={product.id}>
            <img className="ui tiny rounded image" src={src}></img>
            <div className="content">
              <a className="header">{product.ProductName}</a>
              <div className="meta">
                <span className="description">{product.StorageSize}</span>
              </div>
              <div className="description">
                <p></p>
              </div>
              <div className="extra">
                {this.generateUserControls(product)}
                <div className="ui label">{product.Price}</div>
              </div>
            </div>
          </div>
        );
      });
    } else {
      return (
        <div className="ui segment centered">
          <div className="ui active inverted dimmer">
            <div className="ui text loader">Loading</div>
          </div>
          <p></p>
        </div>
      );
    }
  }
  render() {
    return (
      <div className="ui fluid grid">
        <div className="seven wide column">
          <div className="ui divided items">{this.renderedList()}</div>
        </div>
        <div className="four wide column"></div>

        <div className="five wide column">
          <div className="ui hidden divider"></div>
          <ShopCart />
        </div>
      </div>
    );
  }
}

export default connect(null, { addToCart })(ShopHomeContent);
