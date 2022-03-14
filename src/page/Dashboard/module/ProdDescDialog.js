import React from 'react';
import EnhanceModal from '@/components/EnhanceModal';

export default function ProdDescDialog({
  visible,
  desc,
  handleOk,
  handleCancel,
  nameCn
}) {
  return (
    <EnhanceModal
      visible={visible}
      onCancel={handleCancel}
      onOk={handleOk}
      title={nameCn}
      className='prod-desc-dialog'
      okText="确认"
      cancelText="取消"
    >
      <div dangerouslySetInnerHTML={{ __html: desc }} >
      </div>
    </EnhanceModal>
  )
}