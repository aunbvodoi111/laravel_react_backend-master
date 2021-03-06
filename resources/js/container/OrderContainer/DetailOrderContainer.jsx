import React, { Component } from 'react';
import { connect } from 'react-redux'
import { withRouter, Link } from 'react-router-dom'
import './../../../sass/order/detail.scss'

import { fetchDataOrderDetail  ,changeStatusOrder } from '../../actions/order'

class DetailOrderContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }
  componentDidMount() {
    console.log('anhquy')
    var { match } = this.props
    if (match) {
      var id = match.params.id
      this.props.fetchDataOrderDetail(id)
    }
  }
  changeStatus = () =>{
    var { match } = this.props
    var id = match.params.id
    console.log(match.params.id)
    this.props.changeStatusOrder(id)
    this.props.history.goBack();
  }
  formatPrice = (value) => {
    let val = (value / 1).toFixed(0).replace(".", ",");
    return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  }
  render() {
    var { ordersDetail } = this.props
    var bills_detail
    if (ordersDetail) {
      bills_detail = ordersDetail.bills_detail;

    }
    if (!ordersDetail || !ordersDetail.address) return null;
    if (bills_detail) {
      var elmData = bills_detail.map((item, index) => {
        return (
          <div className='title-order-view' key={index}>
            <div className='stt'>
              <p>1</p>
            </div>
            <div className='name-order'>
              <div className='img'>
                <img src={item.image} alt="" />
              </div>
              <div className='name'>
                <p>{item.product.name}</p>
              </div>
            </div>
            <div className='price-order'>
              <p>{this.formatPrice(item.product.discount)}</p>
            </div>
            <div className='qty-order'>
              <p>1</p>
            </div>
            <div className='total-order'>
              <p>{this.formatPrice(item.product.discount * item.qty)}</p>
            </div>
          </div>
        );
      })
    }
    let status
    if (ordersDetail.status == 0 ) {   
      status = <p>Đơn hàng đang đợi xác nhận</p>
    }else if( ordersDetail.status == 1 ){     
      status = <p>Đơn hàng đã được xác nhận</p>
    }
    else if( ordersDetail.status == 2 ){
      status = <p>Đơn hàng đã giao cho đơn vị vận chuyển</p>
    }
    else if( ordersDetail.status == 3 ){
      status = <p>Đơn hàng đã giao được giao</p>
    }
    let button 
    if (ordersDetail.status == 0 ) {
      button =  <button onClick ={ this.changeStatus } className='btn btn-danger'>Xác nhận đơn hàng</button>
    }else if( ordersDetail.status == 1 ){
      button =  <button onClick ={ this.changeStatus } className='btn btn-danger'>Đã lấy hàng</button>
    }
    else if( ordersDetail.status == 2 ){
      button =  <button onClick ={ this.changeStatus } className='btn btn-danger'>Đã giao thành công</button>
      {ordersDetail.note === '' ? '' : <p>Lời nhắn người mua : { ordersDetail.note }</p>}
    }
    return (
      <div className='container-detail'>
        <div className='status'>
          {/* <p>Đã hủy</p> */}
          { status }
          <div className='button'>
            { button }
          </div>
        </div>
        <div className='infor-customer'>
          <div className='infor'>
            <p>ID Đơn hàng : { ordersDetail.id }</p>
            <span>{ordersDetail ? ordersDetail.id + '-' + ordersDetail.address.district.name : ''}</span>
          </div>
          <div className='infor'>
            <p>Địa chỉ nhận hàng</p>
            <p> {ordersDetail ? ordersDetail.address.address + '-' + ordersDetail.address.district.name + '-' + ordersDetail.address.province.name : ''}</p>
            <p>{ordersDetail ? ordersDetail.address.name + '-' + ordersDetail.address.phone : ''}</p>
          </div>
          <div className='infor'>
            <p>Thông tin vận chuyển</p>
            <span>Giao Hàng Nhanh</span>
          </div>
        </div>
        <div className='content-order'>
          <div className='title-order'>
            <div className='image'>
              <img src="https://cf.shopee.vn/file/aaa24a79e7015ab1d6c73392b4b54c93" alt="" />
            </div>
            <div className='name-user'>
              <strong>{ordersDetail.user.name}</strong>
            </div>
          </div>
          <div className='infor'>
            <strong>Thông tin thanh toán</strong>
            <div className='title-order-view'>
              <div className='stt'>
                <p>STT</p>
              </div>
              <div className='name-order'>
                <p>Sản phẩm</p>
              </div>
              <div className='price-order'>
                <p>Đơn Giá</p>
              </div>
              <div className='qty-order'>
                <p>Số lượng</p>
              </div>
              <div className='total-order'>
                <p>Thành tiền</p>
              </div>
            </div>

            {elmData}

            <div className='end-total'>
              <div className='div-right'>
                <div className='div'>
                  <div className='div-title'>
                    <p>Tổng tiền sản phẩm</p>
                  </div>
                  <div className='div-sum'>
                    <p>₫{ordersDetail ? this.formatPrice(ordersDetail.sum) : ''}</p>
                  </div>
                </div>
                <div className='div'>
                  <div className='div-title'>
                    <p>Phí vận chuyển </p>
                  </div>
                  <div className='div-sum'>
                    <p>₫27.684</p>
                  </div>
                </div>
                <div className='div'>
                  <div className='div-title'>
                    <p>Doanh thu</p>
                  </div>
                  <div className='div-sum'>
                    <p>₫0</p>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}


const mapStateToProps = state => {
  return {
    ordersDetail: state.order.ordersDetail
  }
}
const mapDispatchToProps = (dispatch, props) => {
  console.log('anhquy')
  return { 
    fetchDataOrderDetail: (id) => {
      dispatch(fetchDataOrderDetail(id))
    },
    changeStatusOrder: (id) => {
      dispatch(changeStatusOrder(id))
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(DetailOrderContainer);