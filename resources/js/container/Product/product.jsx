import React, { Component } from 'react';
import './../../../sass/product/index.scss'
import { connect } from 'react-redux'
import { addProduct, fetchProduct } from './../../actions/product'
import { withRouter, Link } from 'react-router-dom'
class productContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      status: -1
    }
  }
  componentWillMount() {
    this.props.fetchProduct()
  }
  queryOrder = (e) => {
    this.setState({
      status: e
    })
  }
  render() {
    var { status } = this.state
    var { products } = this.props
    if (status == 0) {
      products = products.filter(item => item.qty > 0)
    } else if (status == 1) {
      products = products.filter(item => item.qty === 0)
    }
    else if (status == 3) {
      products = products.filter(item => item.status === 1)
    }
    if (products) {
      var almProduct = products.map((product, index) => {
        return (
          <div className="product" key={index}>
            <Link to={{
              pathname: `/product/${product.id}`,
              state: { authenticated: true }
            }}>
              <div className="product-div">
                <div className="img">
                  <img src={product.image} />
                </div>
                <div className="name">
                  {product.name}
                </div>
                <div className="price">
                  <p>{product.price} đ</p>
                </div>
              </div>
            </Link>
          </div>
        );
      })
    }

    return (
      <div className='container-product'>
        <div className='old-wrapper'>
          <div className="menu-product">
            <div className='item' onClick={() => this.queryOrder(-1)} className={status === -1 ? 'active' : 'item'}>
              <a >Tất cả</a>
            </div>
            <div className='item' onClick={() => this.queryOrder(0)} className={status === 0 ? 'active' : 'item'}>
              <a >Còn hàng</a>
            </div>
            <div className='item' onClick={() => this.queryOrder(1)} className={status === 1 ? 'active' : 'item'}>
              <a >Hết hàng</a>
            </div>
            <div className='item' onClick={() => this.queryOrder(2)} className={status === 2 ? 'active' : 'item'}>
              <a>Đã bị khóa</a>
            </div>
            <div className='item' onClick={() => this.queryOrder(3)} className={status === 3 ? 'active' : 'item'}>
              <a >Đã bị ẩn</a>
            </div>
          </div>
        </div>
        <div className='content'>
          <div className="old-pr">
            <div>
              <h5>1 Sản Phẩm</h5>
            </div>
            <div className='total-product'>
              <p>1 / 1000</p>
            </div>
          </div>
          <div className="product-content">
            {almProduct}
            {/* <div style=" clear:both;"></div> */}
          </div>
        </div >
      </div >
    );
  }
}


const mapStateToProps = state => {
  return {
    products: state.product.products
  }
}
const mapDispatchToProps = (dispatch, props) => {
  return {
    fetchProduct: () => {
      dispatch(fetchProduct())
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(productContainer);