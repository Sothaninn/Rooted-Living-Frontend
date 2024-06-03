import React from "react";
import {imageDictionary} from './data';
import {
    Box,
    ButtonBase,
    Button,
} from '@mui/material';
import {
    Link,
  } from "react-router-dom";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import './css/ProductTable.css';

class ProductTable extends React.Component {
    constructor(props) {
        super(props);


        this.addItemToCart = this.addItemToCart.bind(this);
        this.handleRemoveItem = this.handleRemoveItem.bind(this);

    }

    async addItemToCart(item) {
        const { user } = this.props;
        try {
            const response = await fetch('http://localhost:3001/cart', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    productId: item._id,
                    quantity: 1,
                    userId: user._id,
                })
            });
            const data = await response.json();
            console.log(data);
        } catch(err) {
            console.error(err);
        }
    }

    async handleRemoveItem(itemId) {
        const { user } = this.props;
        try {
            const response = await fetch(`http://localhost:3001/products/${itemId}`, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    userId: user._id,
                }),
            });

            if (response.ok) {
                // Filter out the removed product from the state
                this.props.updateProducts(itemId);
            } else {
                console.error('Failed to delete the product');
            }
        } catch (err) {
            console.error(err);
        }
    }

    render() {
        const { user, handleItemClick, products, handleAddToCart, handleOpenEditItemModal, selectedTypeFilter} = this.props
        // Filter products based on the filter value
        console.log(selectedTypeFilter);
        const filteredProducts = selectedTypeFilter === 'tool'||  selectedTypeFilter === 'plant'|| selectedTypeFilter === 'seed'|| selectedTypeFilter === 'planter'? products.filter(item => item.type === selectedTypeFilter) : products;
        return (
            <div className="grid-table">
                <div className="grid-container-title"> Most Popular Items</div>
                <Box class="grid-container">
                    {filteredProducts.map((item, index) => (
                        <div className="grid-item" key={index}>
                            <Link
                                to={'/product'}
                                onClick={() => handleItemClick(item)}
                            >
                                <img  src={imageDictionary[item.picture]} />
                            </Link>
                            <div className="item-info-box">
                                <div className="item-title-price">
                                    <label>{item.name}</label>
                                    <span>{item.price}</span>
                                </div>
                                <div className="item-buttons" >
                                    {
                                        user.role === 'admin' ? (
                                        <>
                                            <Button onClick={() => handleOpenEditItemModal(item)} > EDIT </Button>
                                            
                                            <Button onClick={() => this.handleRemoveItem(item._id)} > REMOVE </Button>
                                        </>
                                        ) : (
                                        <></>
                                        )
                                    }
                                    <ShoppingCartIcon onClick={() => handleAddToCart(item)} className='cart-icon' />
                                </div>                                
                            </div>
                        </div>
                    ))}
                </Box>
            </div>
        );
    }

}

export default ProductTable;