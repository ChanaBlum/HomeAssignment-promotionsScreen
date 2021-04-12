import React, { memo } from 'react';
import Table from 'react-bootstrap/Table'
import PromotionRow from '../promotionRow';
import './style.css';

const RowsPromotion = memo((props) => {
    const { promotions , ...rect} = props;
    return (
        <tbody>
            {promotions.map((promotion) => (
                <PromotionRow
                    key={promotion.id}
                    promotion={promotion}
                    { ...rect }
                />
            ))}
        </tbody>)});

const promotionTable = memo(({
    promotionColumns,
    promotions,
    onDuplicate,
    onDelete,
    onScroll,
    onEditSelected ,
    setIsEdit
}) => {
    
    const columns = promotionColumns.slice(1);

    return (
        <div id='promotionsTable-wrapper' onScroll={onScroll}>
          <Table striped bordered hover>
              <thead>
                  <tr>
                      <th></th>
                      {columns.map((columnName)=>(
                        <th>{columnName}</th>
                      ))}
                      <th></th>
                  </tr>
              </thead>
              <RowsPromotion 
                promotions={promotions} 
                onDuplicate={onDuplicate}
                onEdit={onEditSelected}
                onDelete={onDelete}
                setIsEdit={setIsEdit}/>
          </Table>
      </div>
    )
});

export default promotionTable;