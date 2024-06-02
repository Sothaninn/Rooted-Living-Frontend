import one from './images/one.png';
import two from './images/two.png';
import three from './images/three.png';
import four from './images/four.png';
import five from './images/five.png';
import six from './images/six.png';
import navone from './navigation-Img/image1.png';
import navtwo from './navigation-Img/image2.png';
import navthree from './navigation-Img/image3.png';
import navfour from './navigation-Img/image4.png';
import navfive from './navigation-Img/image5.png';

import rose from './productImages/rose.png';
import cactus from './productImages/cactus.png';
import flower from './productImages/flower.png';
import venusflytrap from './productImages/venus_fly_trap.png';


const images = [ 
    [one, 'one', 1], [two, 'two', 2], [three, 'three', 3], [four, 'four', 4], [five, 'five', 5], [six, 'six', 6],
    [one, 'one', 1], [two, 'two', 2], [three, 'three', 3], [four, 'four', 4], [five, 'five', 5], [six, 'six', 6],
    [one, 'one', 1], [two, 'two', 2], [three, 'three', 3], [four, 'four', 4], [five, 'five', 5], [six, 'six', 6],
 ];

 const tabs = [
    {name: 'categories', label: 'Categories'},
    {name: 'plans', label: 'Our Plans'},
    {name: 'menus', label: 'Our Menus'},
    {name: 'sustainability', label: 'Sustainability'},
  ];

  const items = [
    {title: 'Most Popular', image: navone},
    {title: 'Tools', image: navtwo},
    {title: 'Plants & Seeds', image: navthree},
    {title: 'Planters', image: navfour},
    {title: 'Sales', image: navfive},
  ];

  const imageDictionary = {rose: rose, cactus:cactus, flower:flower, venus_fly_trap:venusflytrap};
  

export {images, tabs, items, imageDictionary};
