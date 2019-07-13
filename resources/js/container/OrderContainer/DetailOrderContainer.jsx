import React, { Component } from 'react';
import { connect } from 'react-redux'
import { withRouter, Link } from 'react-router-dom'
import './../../../sass/order/detail.scss'
import { fetchDataOrderDetail } from '../../actions/order'

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
  render() {
    var { ordersDetail } = this.props
    var bills_detail
    if (ordersDetail) {
      bills_detail = ordersDetail.bills_detail;

    }
    if(!ordersDetail || !ordersDetail.address) return null;
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
              <p>{item.product.discount}</p>
            </div>
            <div className='qty-order'>
              <p>1</p>
            </div>
            <div className='total-order'>
              <p>{item.product.discount * item.qty}</p>
            </div>
          </div>
        );
      })
    }
    // if (ordersDetail) {
    //   return (
    //     <div className='infor' >
    //       <p>Địa chỉ nhận hàng</p>
    //       <p>{ ordersDetail.address } - { ordersDetail.district.name } - { ordersDetail.province.address }</p>
    //       <p>{ ordersDetail.name }, { ordersDetail.phone }</p>
    //     </div>
    //   );
    // }
    return (
      <div className='container-detail'>
        <div className='status'>
          <p>Đã hủy</p>
          <span>Do người dùng hủy</span>
        </div>
        <div className='infor-customer'>
          <div className='infor'>
            <p>ID Đơn hàng</p>
            <span>{ordersDetail ? ordersDetail.id  + '-' +  ordersDetail.address.district.name  : ''}</span>
          </div>
          <div className='infor'>
            <p>Địa chỉ nhận hàng</p>
            <p> {ordersDetail ? ordersDetail.address.address  + '-' +ordersDetail.address.district.name  + '-' +  ordersDetail.address.province.name  : ''}</p>
            <p>{ordersDetail ? ordersDetail.address.name  + '-' +  ordersDetail.address.phone : ''}</p>
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
              <strong>phamquy96cn</strong>
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
                    <p>₫{ordersDetail ? ordersDetail.sum : ''}</p>
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
const mapDispatchToProps =  (dispatch, props) => {
  console.log('anhquy')
  return {
    fetchDataOrderDetail: (id) => {
      dispatch(fetchDataOrderDetail(id))
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(DetailOrderContainer);