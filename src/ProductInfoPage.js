import React from "react";
import {
    Button,
} from '@mui/material';
import './css/ProductInfo.css';
import {imageDictionary} from './data';

class ProductInfoPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            itemQuantity: 1,
        };
    }

    render() {
        const { item, handleAddToCart } = this.props;
        let { itemQuantity } =  this.state;
        return (
            <div className="product-detail">
                <div className="image-picture">
                    <img src={imageDictionary[item.picture]} />
                </div>
                <div className="product-info">
                    <div>
                        {item.name}
                    </div>
                    <br/>
                    <div>
                        {item.description}
                    </div>
                    <br/>
                    <div>
                        {item.price}
                    </div>
                    <br/>
                    <div>
                        Quantity
                        <Button disabled={itemQuantity <= 0} onClick={() => this.setState({ itemQuantity: itemQuantity -= 1})}>-</Button>
                        {itemQuantity}
                        <Button onClick={() => this.setState({ itemQuantity: itemQuantity += 1})}>+</Button>
                    </div>
                    <div className="add-to-cart-button">
                        <Button onClick={() => handleAddToCart(item, itemQuantity)}>ADD TO CART</Button>
                    </div>
                </div>
            </div>
        );
    }
}

export default ProductInfoPage;