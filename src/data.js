import navone from './navigation-Img/image1.png';
import navtwo from './navigation-Img/image2.png';
import navthree from './navigation-Img/image3.png';
import navfour from './navigation-Img/image4.png';
import navfive from './navigation-Img/image5.png';
import navsix from './navigation-Img/image6.png';


import Cactus from './productImages/Cactus.png';
import Red_Roses from './productImages/Red_Roses.png';
import Venus_Fly_Traps from './productImages/Venus_Fly_Traps.png';

import Metal_Shovel from './productImages/Metal_Shovel.png';
import Plastic_Leaf_Rake from './productImages/Plastic_Leaf_Rake.png';
import Pruning_Shears from './productImages/Pruning_Shears.png';

import Tomato_Seeds from './productImages/Tomato_Seeds.png';
import Pumpkin_Seeds from './productImages/Pumpkin_Seeds.png';
import Dahlia_Seeds from './productImages/Dahlia_Seeds.png';

import Succulent_Stone_Planter from './productImages/Succulent_Stone_Planter.png';
import Wooden_Raised_Bed from './productImages/Wooden_Raised_Bed.png';
import Indoor_Vegetable_Planter from './productImages/Indoor_Vegetable_Planter.png';




 const tabs = [
    {name: 'categories', label: 'Categories'},
    {name: 'plans', label: 'Our Plans'},
    {name: 'menus', label: 'Our Menus'},
    {name: 'sustainability', label: 'Sustainability'},
  ];

  const typeFilter = [
    {title: 'Most Popular', image: navone},
    {title: 'Tools', image: navtwo},
    {title: 'Plants', image: navthree},
    {title: 'Seeds', image: navsix},
    {title: 'Planters', image: navfour},
    {title: 'Sales', image: navfive},
  ];

  const imageDictionary = {
    Cactus:Cactus, 
    Red_Roses:Red_Roses, 
    Venus_Fly_Traps:Venus_Fly_Traps, 

    Metal_Shovel:Metal_Shovel, 
    Plastic_Leaf_Rake:Plastic_Leaf_Rake, 
    Pruning_Shears:Pruning_Shears, 

    Tomato_Seeds: Tomato_Seeds, 
    Pumpkin_Seeds:Pumpkin_Seeds, 
    Dahlia_Seeds:Dahlia_Seeds, 
    
    Succulent_Stone_Planter:Succulent_Stone_Planter, 
    Wooden_Raised_Bed:Wooden_Raised_Bed, 
    Indoor_Vegetable_Planter:Indoor_Vegetable_Planter,
  };
  

export {tabs, typeFilter, imageDictionary};
