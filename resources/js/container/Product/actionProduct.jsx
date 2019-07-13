import React, { Component } from 'react';
import './../../../sass/product/action.scss'

import { connect } from 'react-redux'
import { addProduct, fetchData, editProduct ,updateProduct} from './../../actions/product'
class actionProduct extends Component {
  constructor(props) {
    super(props)
    this.state = {
      id: -1,
      name: '',
      CateId: 1,
      SubcateId: '',
      UnitId: '',
      description: '',
      discount: '',
      price: '',
      qty: '',
      mass: '',
      image: '',
      files: [],
      images: [],
      index : -1
    }
    this.fileSelectedHandler = this.fileSelectedHandler.bind(this);
  }
  componentWillMount() {


    var { match } = this.props
    if (match) {
      var id = match.params.id
      this.props.editProduct(id)
      this.props.fetchData()
    } else {
      this.props.fetchData()
    }
  }
  async fileSelectedHandler(e) {
    console.log(e.target.files[0])
    var anhquy = e.target.files
    await this.setState({ files: [...this.state.files, ...e.target.files] })
    let files
    files = this.state.files
    console.log(files)
    if (files.length > 0) {
      var formData = new FormData();
      for (const file of files) {
        formData.append('files[]', file, file.name);
      }
      // formData.append('files[]', files);
      axios.post('http://localhost:8000/uploads/',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
      ).then(response => {
        this.state.files = []
        var image = { image : '/img/' + response.data.result}
        console.log(response)
        console.log(this.state.images)
        this.setState({ images: [...this.state.images, image ] })
        console.log(this.state.images)
        // this.setState({
        //   image: '/img/' + response.data.result
        // })
      })
        .catch(function () {
          console.log('FAILURE!!')
        });
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps && nextProps.product) {
      var { product, mulimage } = nextProps;
      this.setState({
        name: product.name,
        CateId: product.CateId,
        SubcateId: product.SubcateId,
        UnitId: product.UnitId,
        description: product.description,
        discount: product.discount,
        price: product.price,
        qty: product.qty,
        mass: product.mass,
        image: product.image,
        images: mulimage,
        index : 0
      });
    }
  }

  uploadImg = (event) => {
    let file
    file = event.target.files[0]
    console.log(file)
    let formData = new FormData();
    formData.append('file', file);

    axios.post('http://localhost:8000/upload/',
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }
    ).then(response => {
      this.setState({
        image: '/img/' + response.data.result
      })
    })
      .catch(function () {
        console.log('FAILURE!!')
      });

  }
  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }
  onClick = () => {
    var { name, CateId, SubcateId, UnitId, description, discount, price, qty, mass, image, images ,index } = this.state
    var product = {
      name: name,
      SubcateId: SubcateId,
      UnitId: UnitId,
      description: description,
      discount: discount,
      qty: qty,
      mass: mass,
      image: image,
      price: price,
      images: images,
      CateId: CateId
    }
    if( index > -1 ){
      var id = this.props.match.params.id
      console.log('đây')
      this.props.updateProduct(id,product)
    }else{
      console.log('k')
      this.props.addProduct(product)
    }
    
  }
  render() {
    var { cates, units, subcates } = this.props
    var { images } = this.state
    var { name, CateId, SubcateId, UnitId, description, discount, price, qty, mass, image } = this.state
    if (units) {
      var elmUnit = units.map((unit, index) => {
        return (
          <option value={unit.id} key={index}>{unit.name}</option>
        );
      })
    }
    if (cates) {
      var elmCates = cates.map((cate, index) => {
        return (
          <option value={cate.id} key={index}>{cate.name}</option>
        );
      })
    }
    if (subcates) {
      var elmSubcate = subcates.map((subcate, index) => {
        if (subcate.CateId == CateId) {
          return (
            <option value={subcate.id} key={index}>{subcate.name}</option>
          );
        }

      })
    }
    if (images.length > 0) {
      var elmimage = images.map((image, index) => {
        return (
          <img className="img" src={image.image} key={index} />
        );
      })
    }

    return (
      <div className="container-content">
        <h5>Thông tin cơ bản</h5>
        <div className="form">
          <div className="label">
            <p>*Chọn danh mục</p>
          </div>
          <div className="txt-form" >
            <select className="form-control" onChange={this.onChange} value={CateId} name="CateId">
              {elmCates}
            </select>
          </div>
        </div>
        <div className="form">
          <div className="label">
            <p>*Chọn loại sản phẩm</p>
          </div>
          <div className="txt-form">
            <select className="form-control" onChange={this.onChange} value={SubcateId} name="SubcateId">
              {elmSubcate}
            </select>
          </div>
        </div>
        <div className="form">
          <div className="label">
            <p>*Đơn vị</p>
          </div>
          <div className="txt-form">
            <select className="form-control" onChange={this.onChange} value={UnitId} name="UnitId">
              {elmUnit}
            </select>
          </div>
        </div>
        <div className="form">
          <div className="label">
            <p>*Tên sản phẩm</p>
          </div>
          <div className="txt-form">
            <input type="text" className="form-control" onChange={this.onChange} value={name} name="name" />
          </div>
        </div>
        <div className="form">
          <div className="label">
            <p>*Giá</p>
          </div>
          <div className="txt-form">
            <input type="number" className="form-control" onChange={this.onChange} value={price} name="price" />
          </div>
        </div>
        <div className="form">
          <div className="label">
            <p>*Khối lượng</p>
          </div>
          <div className="txt-form">
            <input type="number" className="form-control" onChange={this.onChange} value={mass} name="mass" />
          </div>
        </div>
        <div className="form">
          <div className="label">
            <p>Số lượng</p>
          </div>
          <div className="txt-form">
            <input type="number" className="form-control" onChange={this.onChange} value={qty} name="qty" />
          </div>
        </div>
        <div className="form">
          <div className="label">
            <p>Gía khuyến mại</p>
          </div>
          <div className="txt-form">
            <input type="number" className="form-control" onChange={this.onChange} value={discount} name="discount" />
          </div>
        </div>
        <div className="form">
          <div className="label">
            <p>Miêu tả</p>
          </div>
          <div className="txt-form">
            <textarea name="" id="" cols="30" rows="10" className="form-control-textarea" onChange={this.onChange} value={description} name="description"></textarea>
          </div>
        </div>
        <input type="file" onChange={this.uploadImg} ref='file' id='file' ref='file' />
        <img src={image} />
        {elmimage}
        <input type="file" multiple onChange={this.fileSelectedHandler} />
        <div className="form">
          <button onClick={this.onClick}>Lưu</button>
          <button>Hủy</button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  console.log(state)
  return {
    cates: state.product.cates,
    subcates: state.product.subcates,
    units: state.product.units,
    product: state.product.product,
    mulimage: state.product.mulimage
  }
}
const mapDispatchToProps = (dispatch, props) => {
  return {
    fetchData: () => {
      dispatch(fetchData())
    },
    addProduct: (product) => {
      console.log(product)
      dispatch(addProduct(product))
    },
    editProduct: (id) => {
      dispatch(editProduct(id))
    },
    updateProduct : (id,product)=>{
      dispatch(updateProduct(id,product))
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(actionProduct);
