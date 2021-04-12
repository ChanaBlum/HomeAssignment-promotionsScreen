
import React, { useState } from 'react';
import Button from 'react-bootstrap/Button'
import PromotionTable from '../promotionTable';
import EditPromotion from '../editPromotion';
import container from './container';
import './style.css';

const defaultFunc = () => { };

const PromotionsTable = ({
  promotionsColumns = [],
  promotions = [],
  onScroll = defaultFunc,
  onDelete = defaultFunc,
  onDuplicate = defaultFunc,
  onEdit= defaultFunc,
  onCreatePromotions = defaultFunc
}) => {

  const [selectedPromotion, setSelectedPromotion] = useState([]);
  const [isEdit, setIsEdit] = useState(false);

  const onEditSelected = (promotion) => {
      setSelectedPromotion(promotion);
  }
  const noData= promotions.length === 0 ? true: false;
  return (
    <div>
      { noData ? (
        <div className='noData'>- no data -</div>
      ) : (
        <div>
          <PromotionTable 
            promotionColumns={promotionsColumns} 
            promotions={promotions}
            onDuplicate={onDuplicate}
            onDelete={onDelete}
            onScroll={onScroll}
            onEditSelected={onEditSelected}
            setIsEdit={setIsEdit}
          />
          <EditPromotion isOpen={isEdit} setIsEdit={setIsEdit} promotion={selectedPromotion}  onSave={onEdit} />
        </div>
      )}
      <Button block onClick={onCreatePromotions}>create 10,000 promotions</Button>
    </div>
  );
};

export default container(PromotionsTable);