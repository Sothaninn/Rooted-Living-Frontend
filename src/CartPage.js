import React from "react";
import {
    Button,
    ButtonBase,
    TextField,
} from '@mui/material';
import './css/CartPage.css';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import Select from 'react-select';
import {
    Navigate,
  } from "react-router-dom";
import {imageDictionary} from './data';


class CartPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            itemQuantity: 1,
            totalPrice: 0,
            cartItems: [],
            selectedQuantity: 0,
            checkoutSuccess: false,
        };

        this.handleItemQuantityChange = this.handleItemQuantityChange.bind(this);
        this.updateCartItemQuantity = this.updateCartItemQuantity.bind(this);
        this.handleQuantityInputChange = this.handleQuantityInputChange.bind(this);
        this.deleteCartItem = this.deleteCartItem.bind(this);
        this.handleCheckout = this.handleCheckout.bind(this);
        this.calculateTotalPrice = this.calculateTotalPrice.bind(this);

    }

    async handleCheckout() {
        const { user } = this.props;
        try {
            const response = await fetch('http://localhost:3001/payment', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    userId: user._id,
                }),
            });
            const data = await response.json();

            this.setState({ checkoutSuccess: true });
        } catch(err) {
            console.error(err);
        }
    }

    calculateTotalPrice(cartItems) {
        let totalPrice = 0;
        cartItems.forEach((item) => {
            totalPrice += item.price * item.q;
        });
        return totalPrice;
    }

    async deleteCartItem(p) {
        const { user, products } = this.props;
        try {
            const response = await fetch(`http://localhost:3001/cart/${p._id}`, {
                method: 'DELETE',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    userId: user._id,
                }),
            });
            const data = await response.json();
            const items = data.cart.map((i) => {
                return ({
                    ...products.filter((item) => i.product === item._id)[0],
                    q: i.quantity,
                });
            });

            this.setState({ cartItems: items }, () => {
                this.setState({ totalPrice: this.calculateTotalPrice(items) });
            });

        } catch(err) {
            console.error(err);
        }
    }

    handleQuantityInputChange(e) {
        this.setState({ selectedQuantity: e.target.value });
    }

    handleItemQuantityChange(e, p) {
        if (e.value === 10) {
            p.q = 10;
            this.setState({ selectedQuantity: 10 });
        } 
        
        this.updateCartItemQuantity(p._id, e.value);
        
    }

    async updateCartItemQuantity(id, newQuantity) {
        const { user } = this.props;
        try {
            const response = await fetch(`http://localhost:3001/cart/${id}`, {
                method: 'PUT',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    userId: user._id,
                    quantity: newQuantity,
                }),
            })
            this.getCartItems();
        } catch(err) {
            console.error(err);
        }
    }

    async getCartItems() {
        const { user, products } = this.props;
        try {
            const response = await fetch(`http://localhost:3001/cart?userId=${user._id}`);
            const data = await response.json();
            const items = data.cart.map((i) => {
                return ({
                    ...products.filter((item) => i.product === item._id)[0],
                    q: i.quantity,
                });
            });

            this.setState({ totalPrice: this.calculateTotalPrice(items), cartItems: items });
        } catch(err) {
            console.error(err);
        }
    }

    componentDidMount() {
        this.getCartItems();
    }

    render() {
        let { itemQuantity, totalPrice, cartItems, selectedQuantity, checkoutSuccess } = this.state;
        const { item, user } = this.props;
        const options = [
            { value: 1, label: '1' },
            { value: 2, label: '2' },
            { value: 3, label: '3' },
            { value: 4, label: '4' },
            { value: 5, label: '5' },
            { value: 6, label: '6' },
            { value: 7, label: '7' },
            { value: 8, label: '8' },
            { value: 9, label: '9' },
            { value: 10, label: '10+' },
          ]
        return (
            <div>
                { checkoutSuccess && <Navigate to="/" />}
                Shopping Cart
                <div className="cart-view">
                    <div>
                        { cartItems.map((product, index) => (
                            <div key={index} className="cart-item">
                                <div className="image-picture">
                                    <img style={{
                                        width: '100%',
                                        objectFit: 'contain',
                                    }} src={imageDictionary[product.picture]} />
                                </div>
                                <div className="cart-product-info">
                                    {product.name}

                                    <div>
                                        QTY
                                        {console.log(product.q)}
                                        { product.q !== 10 ? (
                                            <Select
                                                defaultValue={{
                                                    value: product.q,
                                                    label: `${product.q}`
                                                }}
                                                onChange={(e) => this.handleItemQuantityChange(e, product)}
                                                options={options}
                                            />
                                        ) : (
                                            <>
                                            <TextField onChange={this.handleQuantityInputChange} defaultValue={product.q} />
                                            <Button onClick={() => this.updateCartItemQuantity(product._id, selectedQuantity)}>Update Quantity</Button>
                                            </>
                                        )}
                                        
                                        {/* <Button disabled={product.q <= 0} onClick={() => this.setState({ itemQuantity: product.q -= 1})}>-</Button>
                                        {product.q}
                                        <Button onClick={() => this.setState({ itemQuantity: product.q += 1})}>+</Button> */}
                                    </div>
                                </div>
                                <div className="cart-product-info">
                                    {product.price}
                                    <ButtonBase onClick={() => this.deleteCartItem(product)}>
                                        <DeleteForeverIcon />
                                    </ButtonBase>
                                </div>
                                
                            </div>
                        ))}
                        {/* { item.map((product) => (
                            <div className="cart-item">
                                <div className="image-picture">
                                    <img style={{
                                        width: '100%',
                                        objectFit: 'contain',
                                    }} src={product[0]} />
                                </div>
                                <div className="cart-product-info">
                                    Product Name: {product[1]}
                                    <div>
                                        QTY
                                        <Button disabled={itemQuantity <= 0} onClick={() => this.setState({ itemQuantity: itemQuantity -= 1})}>-</Button>
                                        {itemQuantity}
                                        <Button onClick={() => this.setState({ itemQuantity: itemQuantity += 1})}>+</Button>
                                    </div>
                                </div>
                                <div className="cart-product-info">
                                    Product Price: {product[2]}
                                    <ButtonBase>
                                        <DeleteForeverIcon />
                                    </ButtonBase>
                                </div>
                                
                            </div>
                        ))} */}
                    </div>
                    <div className="checkout-box">
                        <p>
                            Proceed to checkout
                            <br/>
                            Subtotal ({cartItems.length} item(s)): ${totalPrice}
                        </p>
                        <Button onClick={this.handleCheckout}>Checkout</Button>
                    </div>
                </div>
            </div>
        );
    }

}

export default CartPage;