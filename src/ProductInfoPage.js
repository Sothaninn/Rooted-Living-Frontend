import React from "react";
import {
    Button,
} from '@mui/material';
import './css/ProductInfo.css';
import {images, tabs, items, imageDictionary} from './data';

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
            <div className="product-info">
                <div className="image-picture">
                    <img style={{
                        width: '100%',
                        objectFit: 'contain',
                    }} src={imageDictionary[item.picture]} />
                </div>
                <div>
                    <div>
                        Item Name: {item.name}
                    </div>
                    <div>
                        Item Description: {item.description}
                    </div>
                    <div>
                        Item Price: {item.price}
                    </div>
                    <div>
                        QTY
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