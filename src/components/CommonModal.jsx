import React, {useState} from 'react'
import { Button, Modal } from 'antd';
function CommonModal(props) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = () => {
      if(props?.openModalClick){
        props.openModalClick();
      }
      setIsModalOpen(true);
    };
    const handleOk = () => {
        props?.handleOk ? 
        props.handleOk() : null
      setIsModalOpen(false);
    };
    const handleCancel = () => {
      setIsModalOpen(false);
    };
  return (
    <>
      <Button type="primary" onClick={showModal}>
        {props.btnText}
      </Button>
      <Modal title={props.title} open={isModalOpen} onOk={handleOk} onCancel={handleCancel} okText ={props.oktext}>
        {props.children}
      </Modal>
    </>
  )
}

export default CommonModal
