const intialState = {
    products: [],
    loading: false,
    error: "",
    search: [],
    carts: [],
    wishList: [],
    dataList: [],
    categories: [],
    users: [],
    buynow: [],
  };
  
  export const productsReducer = (state = intialState, action) => {
    const userWishlist = JSON.parse(localStorage.getItem("userData") || "[]");
    const loginUsername = localStorage.getItem("signUp");
  
    switch (action.type) {
      case "FETCH_REQUEST":
        function getUniqueListById(arr, key) {
          return [...new Map(arr.map((item) => [item[key], item])).values()];
        }
        const localProduct = userWishlist?.find((productItem) => {
          if (productItem.userName === loginUsername) {
            let newCartArray = productItem.cartListId?.concat(state.carts) || [];
            const cartProductArrays = getUniqueListById(newCartArray, "id");
            productItem["cartListId"] = cartProductArrays;
            return productItem;
          }
        });
        localStorage.setItem("userData", JSON.stringify(userWishlist));
        const wishListId = localProduct?.wishListId || [];
        const cartListId = localProduct?.cartListId || [];
        if (loginUsername) {
          return {
            ...state,
            loading: true,
            wishList: [...wishListId],
            carts: [...cartListId],
          };
        } else {
          return {
            ...state,
            loading: true,
            wishList: [...wishListId],
            carts: [...state.carts, ...cartListId],
          };
        }
      case "FETCH_SUCCESS":
        return {
          ...state,
          loading: false,
          products: [...action.payload],
        };
      case "FETCH_ERROR":
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      case "PRODUCT_DETAIL":
        const singleProduct = state.products.find(
          (item) => item.id === action.payload
        );
        return {
          ...state,
          singleProductAdded: singleProduct,
        };
      case "SEARCH_BY_DATALIST":
        if (action.payload.length > 0) {
          const product = state.products.filter((item) =>
            item.title.toLowerCase().startsWith(action.payload.toLowerCase())
          );
          return {
            ...state,
            dataList: product,
          };
        } else if (action.payload.length > 0 && state.wishList.length > 0) {
          const product = state.wishList.filter((item) =>
            item.title.toLowerCase().startsWith(action.payload.toLowerCase())
          );
          return {
            ...state,
            dataList: product,
          };
        } else {
          return {
            ...state,
            dataList: [],
          };
        }
      case "FILTER_BY_SEARCH":
        if (action.payload.length > 0) {
          const product = state.products.filter((item) =>
            item.title.toLowerCase().startsWith(action.payload.toLowerCase())
          );
          if (product.length <= 0 && state.dataList.length <= 0) {
            return {
              ...state,
              search: "Product Not Found",
            };
          } else if (state.dataList.title !== "Product not Found") {
            return {
              ...state,
              search: product,
            };
          }
        } else if (action.payload.length > 0 && state.categories.length > 0) {
          const category_search_product = state.categories.filter((item) =>
            item.title.toLowerCase().includes(action.payload.toLowerCase())
          );
  
          return {
            ...state,
            search: category_search_product,
          };
        } else if (action.payload.length > 0 && state.wishList.length > 0) {
          const wishList_Search_Products = state.wishList.filter((item) =>
            item.title.toLowerCase().includes(action.payload.toLowerCase())
          );
          return {
            ...state,
            search: wishList_Search_Products,
          };
        } else if (action.payload.length > 0 && state.carts.length > 0) {
          const cartList_Search_Products = state.carts.filter((item) =>
            item.title.toLowerCase().includes(action.payload.toLowerCase())
          );
          return {
            ...state,
            search: cartList_Search_Products,
          };
        } else {
          return {
            ...state,
            search: [],
          };
        }
      case "CATEGORY_PRODUCTS":
        const category_product = state.products.filter((item) =>
          item.category.toLowerCase().includes(action.payload.toLowerCase())
        );
        return {
          ...state,
          categories: category_product,
        };
      case "SEARCH_BY_CATEGORY":
        if (action.payload.length > 0) {
          const category_search_product = state.categories.filter((item) =>
            item.title.toLowerCase().startsWith(action.payload.toLowerCase())
          );
          if (
            category_search_product.length === 0 &&
            state.dataList.length <= 0
          ) {
            return {
              ...state,
              dataList: [{ title: "Product not Found" }],
            };
          } else {
            return {
              ...state,
              dataList: category_search_product,
            };
          }
        } else {
          return {
            ...state,
            dataList: [],
          };
        }
      case "SEARCH_BY_WISHLIST":
        if (action.payload.length > 0) {
          const wishlist_search_product = state.wishList.filter((item) =>
            item.title.toLowerCase().startsWith(action.payload.toLowerCase())
          );
          if (
            wishlist_search_product.length === 0 &&
            state.dataList.length <= 0
          ) {
            return {
              ...state,
              dataList: [{ title: "Product not Found" }],
            };
          } else {
            return {
              ...state,
              dataList: wishlist_search_product,
            };
          }
        } else {
          return {
            ...state,
            dataList: [],
          };
        }
      case "SEARCH_BY_CART":
        if (action.payload.length > 0) {
          const cartlist_search_product = state.carts.filter((item) =>
            item.title.toLowerCase().startsWith(action.payload.toLowerCase())
          );
          if (
            cartlist_search_product.length === 0 &&
            state.dataList.length <= 0
          ) {
            return {
              ...state,
              dataList: [{ title: "Product not Found" }],
            };
          } else {
            return {
              ...state,
              dataList: cartlist_search_product,
            };
          }
        } else {
          return {
            ...state,
            dataList: [],
          };
        }
      case "ADD_PRODUCT_TO_CART":
        const cartProducts = state.products.find(
          (item) => item.id === action.payload.id
        );
        let cartLocal = userWishlist.map((productItem) => {
          if (productItem.userName === loginUsername) {
            if (
              !productItem.cartListId.some((el) => el.id === action.payload.id)
            ) {
              productItem["cartListId"].push(cartProducts);
            }
            return productItem.cartListId;
          }
        });
        localStorage.setItem("userData", JSON.stringify(userWishlist));
        let cartProductArray;
        function getUniqueListBy(arr, key) {
          return [...new Map(arr.map((item) => [item[key], item])).values()];
        }
  
        cartLocal = cartLocal.filter((e) => e !== undefined);
        if (loginUsername) {
          let newArray = cartLocal[0]?.concat(state.carts) || [state.carts];
          cartProductArray = getUniqueListBy(newArray, "id");
          cartProductArray = cartLocal[0];
          return {
            ...state,
            carts: [...cartProductArray],
          };
        } else {
          cartProductArray = [cartProducts];
          return {
            ...state,
            carts: [...state.carts, ...cartProductArray],
          };
        }
      case "DELETE_CART_PRODUCT":
        if (typeof action.payload === "object") {
          const localStorageProductUpdate = userWishlist.map((productItem) => {
            if (productItem.userName === loginUsername) {
              const updatedCartlist = productItem.wishListId.filter(
                (item) => item.id !== action.payload
              );
              productItem["cartListId"] = [];
            }
          });
          localStorage.setItem("userData", JSON.stringify(userWishlist));
          return {
            ...state,
            carts: [],
          };
        } else {
          const cartProducts = state.carts.indexOf(
            state.carts.find((item) => item.id === action.payload)
          );
         userWishlist.map((productItem) => {
            if (productItem.userName === loginUsername) {
              const updatedCartlist = productItem.cartListId.filter(
                (item) => item.id !== action.payload
              );
              productItem["cartListId"] = updatedCartlist;
            }
          });
          localStorage.setItem("userData", JSON.stringify(userWishlist));
          state.carts.splice(cartProducts, 1);
          return {
            ...state,
          };
        }
      case "SAVE_TO_WISHLIST":
        const wishListArray = state.products.find(
          (item) => item.id === action.payload.id
        );
        let wishListLocal = userWishlist.map((productItem) => {
          if (productItem.userName === loginUsername) {
            if (
              !productItem.wishListId.some((el) => el.id === action.payload.id)
            ) {
              productItem["wishListId"].push(wishListArray);
            }
            return productItem.wishListId;
          }
        });
        localStorage.setItem("userData", JSON.stringify(userWishlist));
  
        wishListLocal = wishListLocal.filter((e) => e !== undefined);
        const wishListArrays = wishListLocal[0];
        return {
          ...state,
          wishList: [...wishListArrays],
        };
      case "DELETE_WISHLIST_PRODUCT":
        const wishListProducts = state.wishList.indexOf(
          state.wishList.find((item) => item.id === action.payload)
        );
        userWishlist.map((productItem) => {
          if (productItem.userName === loginUsername) {
            const updatedWishlist = productItem.wishListId.filter(
              (item) => item.id !== action.payload
            );
            productItem["wishListId"] = updatedWishlist;
          }
        });
        localStorage.setItem("userData", JSON.stringify(userWishlist));
        state.wishList.splice(wishListProducts, 1);
        return {
          ...state,
        };
      case "BUYNOW_PRODUCTS":
        if (typeof action.payload.id === "object") {
          const buynow2 = state.buynow.concat(action.payload.id);
          let namesSet = new Set(buynow2.map((item) => item));
          var newBuynowProducts = [...namesSet];
          return {
            ...state,
            buynow: newBuynowProducts,
          };
        } else {
          const buynowProductsArray = state.products.find(
            (product) => product.id === action.payload.id
          );
          return {
            ...state,
            buynow: [buynowProductsArray],
          };
        }
      case "DELETE_BUYNOW_PRODUCTS":
        const buynowProducts = state.buynow.indexOf(
          state.buynow.find((item) => item.id === action.payload)
        );
        state.buynow.splice(buynowProducts, 1);
        return {
          ...state,
        };
      default:
        return state;
    }
  };