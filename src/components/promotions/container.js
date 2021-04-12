import React, { useEffect, useState } from 'react';
import { 
  fetchPromotionsColumns, 
  fetchPromotions, 
  removePromotion,
  duplicatePromotion,
  editPromotion,
  createPromotionsCollection 
} from '../../integration/promotions';

const promotionsContainer = WrappedComponent => (props) => {

    const [promotions, setPromotions] = useState([]);
    const [promotionsColumns, setPromotionsColumns] = useState([]);

    const [page, setPage] = useState(0);
    const [directionScroll, setDirectionScroll] = useState('down');
    const [endPage, setEndPage] = useState(false);

    const fetchColumnsData = async () => {
      const promotionsColumns = await fetchPromotionsColumns()
        setPromotionsColumns(promotionsColumns);
    };
  
    const fetchData = async () => {
        const promotions = await fetchPromotions(0);
        setPromotions(promotions);
    };

    useEffect(() => {
        fetchColumnsData();
    },[]);

    useEffect(() => {
      if(directionScroll === 'down') {
        getNextPagesPromotions()
      }
      else { getPrevPagesPromotions() }
    }, [page]);
    
    const onScroll = () => {
      const obj = document.getElementById("promotionsTable-wrapper");
      //scroll to down
      if ((obj.scrollHeight - obj.scrollTop) === obj.clientHeight && !endPage) {
        setDirectionScroll('down');
        setPage(page + 2);
      }
      //scroll to up
      else if (obj.scrollTop <= 0) {
        // if is not first page
        if (page > 0) {
          setDirectionScroll('up');
          setPage(page - 2);
          obj.scrollTop = 50;
        }
      } 
    }
  
  const getNextPagesPromotions = async () => {
    const startPromotionId = page * 15;
    const morePromotions = await fetchPromotions(startPromotionId);
    const lastPagePromotions = promotions.slice(promotions.length - 15, promotions.length);
    setPromotions([ ...lastPagePromotions, ...morePromotions ]);
    //Check that there are no more promotions but not because there is no data
    if(morePromotions.length < 30 && promotions.length > 0){ 
      setEndPage(true);
    }
  }

  const getPrevPagesPromotions = async () => {
    if(page === 0){
      setPromotions(await fetchPromotions(0))
    }
    else {
      const startPromotionId = ( page - 1 ) * 15;
      const morePromotions = await fetchPromotions(startPromotionId);
      const lastPagePromotions = promotions.slice(0, 15);
      setPromotions([ ...morePromotions, ...lastPagePromotions ]);
      setEndPage(false);
    }
    
  }

  const onEdit = async (promotionEdit) => {
    const result = await editPromotion(promotionEdit);
    if (result.status === 200) {
      setPromotions(promotions.map( promotion =>
        promotion.id === promotionEdit.id ? promotionEdit: promotion 
        ));
    } else {
      alert("error in edit....")
    }
  }

  const onDuplicate = async (promotionID) => {
    const result = await duplicatePromotion(promotionID);
    if (result.status === 200) {
      setPromotions(
        [...promotions, result.data.newPromotion]
      );
    } else {
      alert("error in duplicate....")
    }
  }

  const onDelete = async (promotionID) => {
    const result = await removePromotion(promotionID);
    if (result.status === 200) {
      setPromotions(
        promotions.filter(promotion => promotion.id !== promotionID)
      );
    } else {
       alert("error in delete....")
     }
  }

  const onCreatePromotions = async () => {
    const result = await createPromotionsCollection();
    if (result.status === 200) {
      fetchColumnsData();
      fetchData();
    } else {
       alert("error create promotions....")
    }
  }

  return (
    <WrappedComponent
      {...props}
      promotions={promotions}
      promotionsColumns={promotionsColumns}
      onScroll={onScroll}
      onEdit={onEdit}
      onDuplicate={onDuplicate}
      onDelete={onDelete}
      onCreatePromotions={onCreatePromotions}
    />
  );
};

export default promotionsContainer;