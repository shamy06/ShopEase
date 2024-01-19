import { createContext, useContext, useState } from 'react';
import { useQueryClient } from 'react-query';

export const CartContext = createContext();

export const CartProvider = ({ children })=> {
  const [cartItems, setCartItems] = useState([]); 
  const [wishListItems, setWishListItems] = useState([]);  
  const [buynowItems, setBuynowItems] = useState();
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("success");
  const [snackbarType,setSnackbarType] = useState("");
  const [search, setSearch] = useState([]);
  const [dataList, setDataList] = useState([]);
  const queryClient = useQueryClient();
  
  const addItem=(item)=> {
     const {data} = queryClient.getQueryData('elements');
      const cartData=data.find(
        (items) => items.id === item.id
      );
      setCartItems([...cartItems, cartData]);
  }
  
  const removeItem = (item)=> {
    const updatedCartItems = cartItems.filter((i) => i.id !== item.id);
    setCartItems(updatedCartItems);  

  }

  const addWishListItem=(item)=> {
    const {data} = queryClient.getQueryData('elements');
      const wishListData=data.find(
        (items) => items.id === item.id
      );
      setWishListItems([...wishListItems, wishListData]);
  }

  const removeWishListItem = (item)=> {
    const updatedWishListItems = wishListItems.filter((i) => i.id !== item.id);
    setWishListItems(updatedWishListItems);
  }

  const addBuynowItem=(item)=> {    
    if (typeof item.id === "object") {  
      setBuynowItems(item.id);
      setCartItems([]);
    } else {
     const {data} = queryClient.getQueryData('elements');
      const buynowData=data.find(
        (items) => items.id === item.id
      );
      setBuynowItems([buynowData]);
    }
  }

  const removeBuynowItem = (item)=> {
    const updatedbuynowList = buynowItems.filter((i) => i.id !== item.id);
    setBuynowItems(updatedbuynowList);
  }
  
  const addSnackbarItem =(snackOpen,sanckMessage,snackType)=>{
    setSnackbarOpen(snackOpen);
    setSnackbarMessage(sanckMessage);
    setSnackbarType(snackType);
  }

  const searchByDataList =(dataListItem)=>{
    if (dataListItem.length > 0) {
     const {data} = queryClient.getQueryData('elements');

      const product = data.filter((item) =>
        item.title.toLowerCase().startsWith(dataListItem.toLowerCase())
      );
        setDataList(product);
    }
     else { 
      setDataList([]);
    }
  }

  const searchFilter =(searchText)=>{
    if (searchText.length > 0) {
      const product = dataList.filter((item) =>
        item.title.toLowerCase().startsWith(searchText.toLowerCase())
      );
      if (product.length <= 0 && dataList.length <= 0) {       
          setSearch( "Product Not Found" )
      } else if (dataList.title !== "Product not Found") {
          setSearch(product);
        };
    }
     else {
        setSearch([]);
      };
  }

  const searchWishList = (searchWishListext) =>{
    if (searchWishListext.length > 0) {
      const wishlist_search_product = wishListItems.filter((item) =>
        item.title.toLowerCase().startsWith(searchWishListext.toLowerCase())
      );
      if (
        wishlist_search_product.length === 0 &&
        dataList.length <= 0
      ) { setDataList([{ title: "Product not Found" }])
        
      } else {
        setDataList(wishlist_search_product)
    }
   } else {
      setDataList([]);
    }
  }

  const searchCarts = (searchCarttext) =>{
    if (searchCarttext.length > 0) {
      const cartlist_search_product = cartItems.filter((item) =>
          item.title.toLowerCase().startsWith(searchCarttext.toLowerCase())
        );
        if (
          cartlist_search_product.length === 0 &&
          dataList.length <= 0
        ) {
            setDataList([{ title: "Product not Found" }])
          }
         else {
          setDataList(cartlist_search_product)
        }
    }
       else {
        setDataList([])
      }
  }
  
  const searchCategories =(searchCategoryText, categories)=>{
    if (searchCategoryText.length > 0) {
     const {data} = queryClient.getQueryData('elements');  
    const category_product = data.filter((item) =>
    item.category.toLowerCase().includes(categories.toLowerCase())
  );
      const category_search_product = category_product.filter((item) =>
        item.title.toLowerCase().startsWith(searchCategoryText.toLowerCase())
      );
      if (
        category_search_product.length === 0 &&
        dataList.length <= 0
      ) { setDataList([{ title: "Product not Found" }])}
       else {
          setDataList(category_search_product)
        }
      }
       else {
        setDataList([])
    }
  }

  const value = {
    cartItems,
    addItem,
    removeItem,
    wishListItems,
    removeWishListItem,
    search,
    buynowItems,
    addWishListItem,
    addBuynowItem,
    removeBuynowItem,
    snackbarOpen,
    snackbarMessage,
    snackbarType,
    addSnackbarItem,
    searchByDataList,
    dataList,
    searchFilter,
    searchWishList,
    searchCarts,
    searchCategories
  };
  
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export const useCart =()=> {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  const { cartItems, addItem, removeItem,search } = context;
  const totalPrices = cartItems.reduce((total, item) => total + item.price * item.qnty, 0 );

  return {
    cartItems,
    addItem,
    removeItem,
    search,
    totalPrices,
  };
}

export const useWishList =()=> {
    const context = useContext(CartContext);
  
    if (!context) {
      throw new Error('useWishList must be used within a CartProvider');
    }
    const { wishListItems, addWishListItem, removeWishListItem, search } = context;
    return {
        wishListItems,
        addWishListItem,
        search,
        removeWishListItem
    };
  }  

export const useBuynow =()=> {
    const context = useContext(CartContext);
  
    if (!context) {
      throw new Error('useBuynow must be used within a CartProvider');
    }
    const { buynowItems, addBuynowItem, removeBuynowItem } = context;
    
    return {
        buynowItems,
        addBuynowItem,
        removeBuynowItem
    };  
  }

  export const useSnackBar =()=> {
    const context = useContext(CartContext);
  
    if (!context) {
      throw new Error('Snackbar must be used within a CartProvider');
    }
    const { snackbarMessage, addSnackbarItem, snackbarOpen,snackbarType } = context;
    
    return {
        snackbarMessage,
        addSnackbarItem,
        snackbarOpen,
        snackbarType
    };
  }

  export const useSearchbyDataList = () =>{
    const context = useContext(CartContext);

    if (!context) {
      throw new Error('useSearchByDataList must be used within a CartProvider');
    }
    const { searchByDataList, dataList } = context;

    return {
      searchByDataList, 
      dataList
    };
  }

  export const useSearchProducts = () =>{
    const context = useContext(CartContext);

    if (!context) {
      throw new Error('useSearchProducts must be used within a CartProvider');
    }
    const { searchFilter, search } = context;

    return {
      searchFilter, 
      search
    };
  }

  export const useSearchByWishList = () =>{
    const context = useContext(CartContext);

    if (!context) {
      throw new Error('useSearchByWishList must be used within a CartProvider');
    }
    const { searchWishList, dataList } = context;

    return {
      searchWishList, dataList
    };
  }

  export const useSearchByCart = () =>{
    const context = useContext(CartContext);

    if (!context) {
      throw new Error('useSearchByCart must be used within a CartProvider');
    }
    const { searchCarts, dataList } = context;

    return {
      searchCarts, dataList
    };
  }
  
  export const useSearchByCategory = () =>{
    const context = useContext(CartContext);

    if (!context) {
      throw new Error('useSearchByCategory must be used within a CartProvider');
    }
    const { searchCategories, dataList,search } = context;

    return {
      searchCategories, dataList, search
    };
  }