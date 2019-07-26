import React, { Component } from 'react';
import './../../../sass/product/index.scss'
// import './../../../sass/order/index.scss'
import { connect } from 'react-redux'
import { withRouter, Link } from 'react-router-dom'
import { fetchDataOrder, queryDateOrder } from '../../actions/order'
import './../../../sass/order/index.scss'
class productContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      status: -1,
      dateStart: '',
      dateEnd: ''
    }
  }
  componentWillMount() {
    this.props.fetchDataOrder()
  }
  sum = (order) => {
    console.log(order)
  }
  onChange = (e) => {
    console.log(e.target.value)
    this.setState({
      [e.target.name]: e.target.value
    })
  }
  onSubmit = (e) => {
    console.log('asddsasad')
    e.preventDefault()
    var { dateStart, dateEnd, status } = this.state
    var date = {
      dateStart: dateStart,
      dateEnd: dateEnd,
      status: status
    }
    this.props.queryDateOrder(date)
  }
  queryOrder = (e) => {
    var { dateStart, dateEnd, status } = this.state
    this.setState({
      status: e,
      dateStart: '',
      dateEnd: ''
    })
  }
  formatPrice = (value) => {
    let val = (value / 1).toFixed(0).replace(".", ",");
    return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  }
  render() {

    var { orders } = this.props
    var { status, dateStart, dateEnd } = this.state

    var bill = orders
    if (status > -1) {
      bill = bill.filter(item => item.status === status)
    }
    if (!bill) return null;
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
          <div className="bill-content" key={index}>
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
                          {order.status === 0 ? <p>Chờ xác nhận</p> : ''}
                          {order.status === 1 ? <p>Chờ lấy hàng</p> : ''}
                          {order.status === 2 ? <p>Đang giao</p> : ''}
                          {order.status === 3 ? <p>Hoàn thành</p> : ''}
                          {order.status === 4 ? <p>Đã hủy</p> : ''}
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
                      <p>{this.formatPrice(order.sum)}</p>
                    </div>
                  </div>
                  <div className='sum-price'>
                    <div className='title'>
                      <p>Tổng tiền hàng:</p>
                    </div>
                    <div className='sum'>
                      <p>₫{this.formatPrice(order.sum)}</p>
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
            <div onClick={() => this.queryOrder(-1)} className={status === -1 ? 'active' : 'item'}>
              <a >Tất cả</a>
            </div>
            <div onClick={() => this.queryOrder(0)} className={status === 0 ? 'active' : 'item'}>
              <a >Chờ xác nhận</a>
            </div>
            <div onClick={() => this.queryOrder(1)} className={status === 1 ? 'active' : 'item'}>
              <a >Chờ lấy hàng</a>
            </div>
            <div className='item' onClick={() => this.queryOrder(2)} className={status === 2 ? 'active' : 'item'}>
              <a >Đang giao</a>
            </div>
            <div className='item' onClick={() => this.queryOrder(3)} className={status === 3 ? 'active' : 'item'}>
              <a >Hoàn thành </a>
            </div>
            <div className='item' onClick={() => this.queryOrder(4)} className={status === 4 ? 'active' : 'item'}>
              <a >Đã hủy</a>
            </div>
          </div>
        </div>


        {bill.length == 0 ? <h1>Không có đơn hàng nào</h1> : <div className='content'>
          <div className='row'>
            <div class="col-xs-15 col-sm-15 col-md-15 col-lg-4">
              <input type="text" name="" class="form-control" placeholder="Nhập tên hoặc mã đon hàng để tìm kiếm" />
            </div>
            <div class="col-xs-15 col-sm-15 col-md-15 col-lg-1 name-date" >
              <p>Ngày đặt :</p>
            </div>
            <div class="col-xs-15 col-sm-15 col-md-15 col-lg-2" >
              <input type="date" id="input-1" class="form-control" name="dateStart" onChange={this.onChange} value={dateStart} />
            </div>
            <div class="col-xs-15 col-sm-15 col-md-15 col-lg-2" >
              <input type="date" id="input-2" class="form-control" name="dateEnd" onChange={this.onChange} value={dateEnd} />
            </div>
            <input type="submit" name="" value="Tìm" class="btn btn-danger" onClick={this.onSubmit} />
          </div>
          <div className="old-pr">
            <div>
              <h5>{orders.length} Đơn hàng</h5>
            </div>
            <div className='total-product'>
              <p>{orders.length} / 1000</p>
            </div>
          </div>
          <div className="bill-content">
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
        </div >}

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
    },
    queryDateOrder: (date) => {
      dispatch(queryDateOrder(date))
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(productContainer);