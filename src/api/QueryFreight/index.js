import api from '@/api';

export default {
  queryFreightSubmit: data => {
    return api({
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      url: '/freight/doCalculate',
      data: data
    })
  }
}