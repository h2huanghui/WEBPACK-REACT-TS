import React from 'react'
import '@/styles/components/Icon/index.less'

export default props => {
  return <i {...props} className={`dsc-icon icon-${props.type} ${props.className}`} ></i>
}