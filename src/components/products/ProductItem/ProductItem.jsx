import { useNavigate } from "react-router-dom";

import Button from "../../shared/button/Button";

const ProductItem = (props) => {
    const navigate = useNavigate();

    return(
        <div className="products__item">
            <img className="product__img" src={props.product.images[0]} alt=""></img>
            <div className="product__content">
                <div className="product__title">{props.product.title}</div>
                <div className="product__price">{props.product.price} $</div>
                <div className="product__actions">
                    <Button onClick={() => navigate(`/products/${props.product.id}`)}>Open</Button>
                </div>
            </div>                
        </div>
    );
}

export default ProductItem;