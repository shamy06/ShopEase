import React from 'react';
import FavoriteIcon from '@mui/icons-material/Favorite';
import HomeIcon from '@mui/icons-material/Home';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PointOfSaleIcon from '@mui/icons-material/PointOfSale';
import ContactSupportIcon from '@mui/icons-material/ContactSupport';

export const SidebarData = [
  {
    title: 'Home',
    path: '/',
    icon: <HomeIcon fontSize='large'/>,
    Name: 'sidebar-text'
  },
  {
    title: 'Wishlist',
    path: '/wishlist',
    icon: <FavoriteIcon fontSize='large'/>,
    Name: 'sidebar-text'
  },
  {
    title: 'Cart',
    path: '/cart',
    icon: <ShoppingCartIcon fontSize='large'/>,
    Name: 'sidebar-text'
  },
  {
    title: 'Checkout',
    path: '/buynow',
    icon: <PointOfSaleIcon fontSize='large'/>,
    Name: 'sidebar-text'
  },
  {
    title: 'Support',
    path: '#',
    icon:<ContactSupportIcon fontSize='large'/>,
    Name: 'sidebar-text'
  } 
];