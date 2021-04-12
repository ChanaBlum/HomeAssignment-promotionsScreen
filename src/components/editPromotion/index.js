import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import './style.css';

function EditPromotion({isOpen=false, setIsEdit, promotion = {}, onSave }) {

    const [promotionEdit, setPromotionEdit] = useState(promotion);

    useEffect(() => {
        setPromotionEdit(promotion);
    }, [promotion]);

    const onClose = () => {
        setIsEdit(false);
    }

    const onSavePromotion = () => {
        onSave(promotionEdit);
        onClose();
    }

    const onChangeValue = (val) => {
        setPromotionEdit({...promotionEdit, [val.target.name]: val.target.value});
    }

    return (
        <Modal show={isOpen} onHide={onClose}>
            <Modal.Header closeButton>
            <Modal.Title>edit promotion</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            {Object.entries(promotionEdit).map(([key , value]) => {
                    if(key !== 'id'){
                        return (
                            <div >
                                <Form.Label>{key}</Form.Label>
                                <Form.Control 
                                    name={key}
                                    defaultValue={value}
                                    onChange={(e) => onChangeValue(e)}/>
                          </div>);
                    }
                })}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={onSavePromotion}>
                    Save Changes
                </Button>
            </Modal.Footer>
        </Modal>
        
//         <div>
//             {isOpen && 
//             (<div>
//                 <div id="light" className="white_content">
//                 <p>edit promotion </p>
//                 {Object.entries(promotionEdit).map(([key , value]) => {
//                     if(key !== 'id'){
//                         return (
//                             <div>
//                                 <label for={key}>{key}:</label>
//                                 <br /> 
//                                 <input type="text" name={key}  value={value} onChange={(e) => onChangeValue(e)}/>
//                                 <br />
//                             </div>);
//                     }
//                 })}
//                 <Button onClick={onCloseDialog}>close</Button>
//                 <Button onClick={onSavePromotion}>save</Button>
//             </div>
//             <div id="fade" className="black_overlay"></div></div>
//             )
// }
//         </div>
      
    );
}

export default EditPromotion;