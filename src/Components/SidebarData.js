import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';

export const SidebarData = [
  {
    title: 'Home',
    path: '/',
    icon: <AiIcons.AiFillHome  id="iconColor"/>,
    Name: 'sidebar-text'
  },
  {
    title: 'Wishlist',
    path: '/wishlist',
    icon: <FaIcons.FaHeart id="iconColor"/>,
    Name: 'sidebar-text'
  },
  {
    title: 'Cart',
    path: '/cart',
    icon: <FaIcons.FaCartPlus id="iconColor"/>,
    Name: 'sidebar-text'
  },
  {
    title: 'Checkout',
    path: '/buynow',
    icon: <FaIcons.FaCashRegister id="iconColor"/>,
    Name: 'sidebar-text'
  },
  {
    title: 'Support',
    path: '#',
    icon: <IoIcons.IoMdHelpCircle id="iconColor"/>,
    Name: 'sidebar-text'
  } 
];