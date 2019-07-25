import * as Types from './../constants/index'
import { ROOT_URL } from './../constants/api'  
import axios from 'axios'

export const fetchDataOrder = () => {
    return (dispatch) => {
        axios.get(`${ROOT_URL}/list/bill`).then(response => {
            dispatch(fetchDataStore(response.data))
        })
    }
}

export const fetchDataStore = (data) => {
    return {
        type: Types.LIST_ORDER,
        data
    }
} 

 export  const  fetchDataOrderDetail = (id) => {
    return async (dispatch) => {
        var data = await axios.get(`${ROOT_URL}/list/bill/detail/`+id)
            dispatch(fetchDataDetailStore(data.data))
        
    }
}

export const fetchDataDetailStore = (data) => {
    return {
        type: Types.FETCH_DATA_ORDER_DETAIL,
        data
    }
}
//query date order
export  const  queryDateOrder = (date) => {
    return async (dispatch) => {
        var data = await axios.post(`${ROOT_URL}/queryDate/bill/`,{
            dateStart : date.dateStart,
            dateEnd: date.dateEnd,
            status : date.status
        })
        // console.log(data)
            dispatch(fetchDataStore(data.data))
        
    }
}

// export const fetchDataOrder = (data) => {
//     return {
//         type: Types.FETCH_DATA_ORDER_DETAIL,
//         data
//     }
// }

export  const  changeStatusOrder = (id) => {
    return async (dispatch) => {
        var data = await axios.post(`${ROOT_URL}/edit/bill/`+id)
            // dispatch(changeStatusOrderStore(data.data))
        
    }
}

// export const changeStatusOrderStore = (data) => {
//     return {
//         type: Types.FETCH_DATA_ORDER_DETAIL,
//         data
//     }
// }
