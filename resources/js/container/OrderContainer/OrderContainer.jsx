import React, { Component } from 'react';
import './../../../sass/product/index.scss'
import './../../../sass/order/index.scss'
import { connect } from 'react-redux'
import { withRouter, Link } from 'react-router-dom'
import { fetchDataOrder } from '../../actions/order'

class productContainer extends Component {
  constructor(props){
    super(props)
    this.state ={
      status : -1
    }
  }
  componentWillMount() {
    this.props.fetchDataOrder()
  }
  sum = (order) => {
    console.log(order)
  }
  queryOrder = (e) =>{
    this.setState({
      status : e
    })
    
  }
  render() {
    
    var { orders } = this.props
    var { status } = this.state
    
    var bill = orders
    if( status > -1){
      bill = bill.filter( item => item.status === status)
    }
    // let statusBill 
    // if( bill){
    //   if( bill.status == 0 ){
    //     statusBill = <p>Chờ xác nhận</p>
    //   }else if( bill.status == 1 ){
    //     statusBill = <p>Chờ lấy hàng</p>
    //   }else if( bill.status == 2 ){
    //     statusBill = <p>Đang giao</p>
    //   }else if( bill.status == 3 ){
    //     statusBill = <p>Hoàn thành</p>
    //   }else if( bill.status == 4 ){
    //     statusBill = <p>Đã hủy</p>
    //   }else{
    //     statusBill = <p>Đã hủy</p>
    //   }
    // }
    if (bill) {
      var almProduct = bill.map((order, index) => {
        return (
          <div className="product-content" key={index}>
            <div className='order-view-content'>
              <div className='user-buyer'>
                <div className='img'>
                  <img src="https://cf.shopee.vn/file/c1bdafa3b095b8dca82c74fe20ab2ee0" alt="" />
                </div>
                <div className='name-user'>
                  <p>{order.user.name}</p>
                </div>
              </div>
              {
                order.bills_detail.map((item, index) => {
                  return (
                    <div className='content' key={index}>
                      <div className='product-buyer'>
                        <div className='name'>
                          <div className='img-product'>
                            <img src={item.image} alt="" />
                          </div>
                          <div className='name-product'>
                            <p>{item.product.name}</p>
                          </div>
                          <div className='qty-product'>
                            <p>x{item.qty}</p>
                          </div>
                        </div>
                        <div className='sum-order'>
                          <p>{item.product.discount}</p>
                        </div>
                        <div className='status'>
                          { order.status === 0 ? <p>Chờ xác nhận</p> :'' }
                          { order.status === 1 ? <p>Chờ lấy hàng</p> :'' }
                          { order.status === 2 ? <p>Đang giao</p> :'' }
                          { order.status === 3 ? <p>Hoàn thành</p> :'' }
                          { order.status === 4 ? <p>Đã hủy</p> :'' }
                        </div>
                        <div className='transport'>
                          <p>Giao hàng tiết kiệm</p>
                        </div>
                        <div className='action'>
                          <Link to={{
                            pathname: `/order/detail/${order.id}`,
                            state: { authenticated: true }
                          }}>
                            <button>Xem chi tiết</button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  )
                })
              }

              <div className='total-money'>
                <div className='total-right'>
                  <div className='sum-qty'>
                    <div className='title'>
                      <p>Tổng số lượng: </p>
                    </div>
                    <div className='qty'>
                      <p>{order.sum}</p>
                    </div>
                  </div>
                  <div className='sum-price'>
                    <div className='title'>
                      <p>Tổng tiền hàng:</p>
                    </div>
                    <div className='sum'>
                      <p>₫{order.sum}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })
    }
    return (
      <div className='container-product'>
        <div className='old-wrapper'>
          <div className="menu-product">
            <div  onClick={ ()=> this.queryOrder(-1)} className={ status === -1 ? 'active' : 'item' }>
              <a >Tất cả</a>
            </div>
            <div  onClick={ ()=> this.queryOrder(0)} className={ status === 0 ? 'active' : 'item' }>
              <a >Chờ xác nhận</a>
            </div>
            <div  onClick={ ()=> this.queryOrder(1)} className={ status === 1 ? 'active' : 'item' }>
              <a >Chờ lấy hàng</a>
            </div>
            <div className='item' onClick={ ()=> this.queryOrder(2)} className={ status === 2 ? 'active' : 'item' }>
              <a >Đang giao</a>
            </div>
            <div className='item' onClick={ ()=> this.queryOrder(3)} className={ status === 3? 'active' : 'item' }>
              <a >Hoàn thành </a>
            </div>
            <div className='item' onClick={ ()=> this.queryOrder(4)} className={ status === 4 ? 'active' : 'item' }>
              <a >Đã hủy</a>
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
            <div className='name'>
              <p>Sản phẩm</p>
            </div>
            <div className='sum-order'>
              <p>Tổng đơn hàng</p>
            </div>
            <div className='status'>
              <p>Tình trạng</p>
            </div>
            <div className='transport'>
              <p>Đơn vị vận chuyển</p>
            </div>
            <div className='action'>
              <p>Thao tác</p>
            </div>
          </div>
          {almProduct}
        </div >
      </div >
    );
  }
}


const mapStateToProps = state => {
  console.log(state.order.orders)
  return {
    orders: state.order.orders
  }
}
const mapDispatchToProps = (dispatch, props) => {
  return {
    fetchDataOrder: () => {
      dispatch(fetchDataOrder())
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(productContainer);