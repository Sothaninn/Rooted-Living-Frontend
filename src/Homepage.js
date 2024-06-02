import React from 'react';
import './App.css';
import Slideshow from './Slideshow';
import ProductTable from './productTable';
import {
  TextField,
  ButtonBase,
  Button,
} from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PersonIcon from '@mui/icons-material/Person';
import LoginPage from './LoginPage';
import ProfilePage from './ProfilePage';
import ProductInfoPage from "./ProductInfoPage";
import CartPage from "./CartPage";
//admin
import AddItemModal from './AddItemModal';

import {images, tabs, items} from './data';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link,
  Navigate,
} from "react-router-dom";

class Homepage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false,
      openLoginPage: false,
      openProfilePage: false,
      selectedItem: null,
      openCartPage: false,
      selectedTab : 'categories',
      loggedInUser: {},
      products: [],
      filteredProducts: [],
      searchWord: '',
      openAddItemModal: false,
      editProductData: null,
    };

    this.handleItemClick = this.handleItemClick.bind(this);
    this.handleCartClicked = this.handleCartClicked.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    this.handleSearchChange = this.handleSearchChange.bind(this);
    this.debounce = this.debounce.bind(this);
    this.addItemToCart = this.addItemToCart.bind(this);
    this.handleOpenEditItemModal = this.handleOpenEditItemModal.bind(this);
    this.updateProducts = this.updateProducts.bind(this);
  }

  debounce(fn, delay = 1000) { 
    let timerId = null; 
    return (...args) => { 
        clearTimeout(timerId); 
        timerId = setTimeout(() => fn(...args), delay); 
    }; 
  };

  handleSearchChange(value) {
    const { products } = this.state;
    if (value.trim() === '') {
        this.setState({ filteredProducts: products, searchWord:  value });
        return;
    }
    const filteredProducts = products.filter((r) => r.name.toLowerCase().includes(value));
    this.setState({ filteredProducts: filteredProducts, searchWord:  value });
  }

  async getAllProducts() {
    try {
      const response = await fetch('http://localhost:3001/products');
      const data = await response.json();

      this.setState({ filteredProducts: data.products, products: data.products });

    } catch(err) {
      console.error(err);
    }
  }

  updateProducts(productId) {
    this.setState(prevState => ({
        products: prevState.products.filter(product => product._id !== productId),
        filteredProducts: prevState.filteredProducts.filter(product => product._id !== productId),
    }));
  }

  async handleLogin(b) {
    try {
      const response = await fetch('http://localhost:3001/auth', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(b),
      });
      const data = await response.json();

      this.setState({ loggedInUser: data.user, loggedIn: true });
    } catch (err) {
      console.error(err);
    }
  }

  async addItemToCart(item, amount) {
    try {
        if (!amount) amount = 1;
        const response = await fetch('http://localhost:3001/cart', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                productId: item._id,
                quantity: amount,
                userId: this.state.loggedInUser._id,
            })
        });
        const data = await response.json();
        console.log(data);
    } catch(err) {
        console.error(err);
    }
  }

  handleItemClick(item) {
    this.setState({ selectedItem: item });
  }

  handleCartClicked() {
    this.setState({ openCartPage: true });
  }

  handleTabClick(item) {
    this.setState({ selectedTab: item });
  }

  componentDidMount() {
    this.getAllProducts();
  }

  //admin functionality
  handleOpenAddItemModal = () => {
    this.setState({ openAddItemModal: true });
  };

  handleOpenEditItemModal = (product) => {
    this.setState({ openAddItemModal: true, editProductData: product });
  };

  handleCloseAddItemModal = () => {
    this.setState({ openAddItemModal: false, editProductData: null });
  };

  handleAddItem = async (itemData) => {
    try {
      const response = await fetch('http://localhost:3001/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...itemData,
          userId: this.state.loggedInUser._id,
        }),
      });
      const data = await response.json();
      console.log(data);

      // Update state with the new product
      this.setState(prevState => ({
        products: [...prevState.products, data],
        filteredProducts: [...prevState.filteredProducts, data],
      }));

    } catch (err) {
      console.error(err);
    }
  };

  handleSaveItem = async (itemData) => {
    if (this.state.editProductData) {
      try {
        const response = await fetch(`http://localhost:3001/products/${this.state.editProductData._id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            ...itemData,
            userId: this.state.loggedInUser._id,
          }),
        });
        const data = await response.json();
        console.log(data);

          // Update state with the edited product
          this.setState(prevState => ({
            products: prevState.products.map(product => product._id === data._id ? data : product),
            filteredProducts: prevState.filteredProducts.map(product => product._id === data._id ? data : product),
            editProductData: null, // Clear the editProductData state
          }));

      } catch (err) {
        console.error(err);
      }
    } else {
      // Add new product
      this.handleAddItem(itemData);
    }
  };
  
  render() {
    const {
      openLoginPage,
      openProfilePage,
      selectedItem,
      openCartPage,
      loggedIn,
      loggedInUser,
      products,
      filteredProducts,
      openAddItemModal,
      editProductData,
    } = this.state;

    console.log(loggedInUser, loggedIn);

    return (
      <div className="App">
        <header className='header-bar'>
            <div>
              <Link to={'/'} style={{color:'white'}}>
                Seamazon
              </Link>
            </div>
            <div className='search-box'>
              <TextField
                onChange={(e) => this.debounce(this.handleSearchChange(e.target.value))}
                id='search-bar'
                placeholder='Search Rooted Living'
                inputProps={{
                  style: {
                    height: 6,
                    fontSize: 'small'
                  }
                }} />
            </div>
            <div className='header-buttons'>
              <Link to={loggedIn ? '/profile' : '/login'}>
                <PersonIcon className='profile-icon' />
              </Link>
              <Link to={loggedIn ? '/cart' : '/login'}>
                <ShoppingCartIcon onClick={this.handleCartClicked} className='cart-icon' />
              </Link>
              {
                loggedInUser.role === 'admin' ? (
                  <Button style={{color:'white'}} onClick={this.handleOpenAddItemModal}> ADD ITEM </Button>
                ) : (
                  <></>
                )
              }
            </div>
          </header>
          <body>
            <Routes>
              <Route path="/" exact element={
                <>
                <nav className="tabs">
                  {tabs.map(tab => (
                    <div 
                      key={tab.name} 
                      className={`tab ${this.state.selectedTab === tab.name ? 'selected' : ''}`}
                      onClick={() => this.handleTabClick(tab.name)}
                    >
                      {tab.label}
                    </div>
                  ))}
                </nav>
                <div className="items">
                  {this.state.selectedTab === 'categories' && items.map(item => (
                    <div 
                    key={item.title} 
                    className="item"
                    >
                      <img src={item.image}  />
                      <div className="title">{item.title}</div>
                    </div>
                  ))}
                </div>
                <Slideshow products={products} handleItemClick={this.handleItemClick} />
                  <br />
                  <br />
                <ProductTable loggedIn = {loggedIn} user={loggedInUser} products={filteredProducts} handleItemClick={this.handleItemClick} handleAddToCart={this.addItemToCart} handleOpenEditItemModal={this.handleOpenEditItemModal} updateProducts={this.updateProducts}/>
                </>
              } />
              <Route path="/profile" exact element={<ProfilePage user={loggedInUser} handleLogout={() => this.setState({ loggedIn: false, loggedInUser: {} })} />} />
              <Route path="/cart" exact element={<CartPage products={products} user={loggedInUser} />} />
              <Route path="/login" exact element={<LoginPage handleLogin={this.handleLogin} />} />
              <Route path="/product" exact element={<ProductInfoPage item={selectedItem} handleAddToCart={this.addItemToCart}/>} />
              
            </Routes>
            <AddItemModal open={openAddItemModal} handleClose={this.handleCloseAddItemModal} handleSave={this.handleSaveItem} productData={editProductData}/>
          </body>
      </div>
    );
    // return (
    //   <div className="App">
    //     {
    //       openLoginPage === false ? (
    //       <>
    //       <header className='header-bar'>
    //         <div>
    //           <ButtonBase onClick={() => window.location.reload()}>
    //             LOGO
    //           </ButtonBase>
    //         </div>
    //         <div className='search-box'>
    //           <SearchIcon id='search-icon' />
    //           <TextField
    //             id='search-bar'
    //             placeholder='Search Rooted Living'
    //             inputProps={{
    //               style: {
    //                 height: 6,
    //                 fontSize: 'small'
    //               }
    //             }} />
    //         </div>
    //         <div className='header-buttons'>
    //           <ButtonBase>
    //             <PersonIcon onClick={this.handleProfileClicked} className='profile-icon' />
    //           </ButtonBase>
    //           <ButtonBase>
    //             <ShoppingCartIcon onClick={this.handleCartClicked} className='cart-icon' />
    //           </ButtonBase>
    //         </div>
    //       </header>
    //       <body>

    //         {/* Navigation tabs */}
    //         <nav className="tabs">
    //           {tabs.map(tab => (
    //             <div 
    //               key={tab.name} 
    //               className={`tab ${this.state.selectedTab === tab.name ? 'selected' : ''}`}
    //               onClick={() => this.handleTabClick(tab.name)}
    //             >
    //               {tab.label}
    //             </div>
    //           ))}
    //         </nav>
            
    //         <div className="items">
    //           {this.state.selectedTab === 'categories' && items.map(item => (
    //             <div 
    //             key={item.title} 
    //             className="item"
    //             >
    //               <img src={item.image}  />
    //               <div className="title">{item.title}</div>
    //             </div>
    //           ))}
    //         </div>

    //         {
    //           openCartPage ? <CartPage item={cartitems} /> : (
    //             <>
    //             {
    //               selectedItem ? (
    //                 <ProductInfoPage item={selectedItem} />
    //               ) : (
    //                 openProfilePage ? (
    //                   <ProfilePage />
    //                 ) : (
    //                   <>
    //                     <Slideshow handleItemClick={this.handleItemClick} />
    //                     <br />
    //                     <br />
    //                     <ProductTable handleItemClick={this.handleItemClick} />
    //                   </>
    //                 )
    //               )
    //             }
    //             </>
    //           )
    //         }
    //       </body>
    //       </>
    //       ) : ( <LoginPage
    //           handleLogin={this.handleLogin}
    //       /> )
    //     }
    //   </div>
    // );
  }
}
export default Homepage;