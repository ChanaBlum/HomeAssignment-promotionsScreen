import axios from "axios";

export const localhostUrl = 'http://localhost:5000/';

export const actionUrl = {
    fetchPromotionsColumns: `${localhostUrl}getPromotionsColumns`,
    fetchPromotions: `${localhostUrl}getPromotions`,
    removePromotion: `${localhostUrl}removePromotion`,
    duplicatePromotion: `${localhostUrl}duplicatePromotion`,
    editPromotion: `${localhostUrl}editPromotion`,
    createPromotionsCollection: `${localhostUrl}createPromotionsCollection`
}

export const fetchPromotionsColumns = async () => {
    const response = await axios.get(actionUrl.fetchPromotionsColumns);
    if (response.status === 200) {
        return response.data;
    } else {
        return [];
    }
};

export const fetchPromotions = async (startPromotionId) => {
    const response = await axios.get(actionUrl.fetchPromotions,  { params: {startPromotionId }});
    if (response.status === 200) {
        return response.data;
    } else {
        return [];
    }
};

export const removePromotion = async (id) => {
    const result = await axios.delete(actionUrl.removePromotion, { params: { promotionId: id } });
    return result;
}

export const duplicatePromotion = async id => {
    const result = await axios.post(actionUrl.duplicatePromotion, { params: { promotionId: id } } );
    return result;
};

export const editPromotion = async promotion => {
    const result = await axios.post(actionUrl.editPromotion, { params: { promotion } } );
    return result;
};

export const createPromotionsCollection = async () => {
   const result = await axios.post(actionUrl.createPromotionsCollection);
   return result;
}