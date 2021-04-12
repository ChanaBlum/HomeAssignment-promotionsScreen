export default function PromotionRow({
    promotion,
    onDuplicate,
    onDelete,
    onEdit,
    setIsEdit
}) {
    delete promotion._id;
    const { id } = promotion;

    const onEditHandle=()=>{
        setIsEdit(true);
        onEdit(promotion);
    }
    
    return (
        <tr>
            <td><input type="checkbox" /></td>
            {Object.values(promotion).map(value=>(<td>{value}</td>))}
            <td>
                 <img src="https://img.icons8.com/android/24/000000/edit.png" onClick={onEditHandle}/>
                 <img src="https://img.icons8.com/fluent-systems-filled/24/000000/duplicate.png" onClick={() => onDuplicate(id)}/>
                <img src="https://img.icons8.com/ios-glyphs/30/000000/delete-forever.png" onClick={() => onDelete(id)}/> 
            </td>
        </tr>
    )
}