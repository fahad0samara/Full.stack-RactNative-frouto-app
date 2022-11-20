import React, {useContext, useState, createContext} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import LoderApp from "./src/configs/LoderApp";


const ContextLog = createContext(
  {} as {
    log: boolean;
    setLog: React.Dispatch<React.SetStateAction<boolean>>;
    profile: any;
    setProfile: React.Dispatch<React.SetStateAction<{}>>;
    loading: boolean;
    setLoading: React.Dispatch<React.SetStateAction<boolean>>;
    products: any;
    addProductToCard: (product: { id: any }) => void;
    removeProduct: (product: { id: any }) => void;
  }
);
const LogCheck = ({ children }:any) => {
   const [products, setProducts] = React.useState<any>([]);
  const [log, setLog] = useState(false);
  const [profile, setProfile] = useState({});
  const [loading, setLoading] = useState(false);

     const addProductToCard = (product: { id: any; }) => {
       // check product
       const existedProduct = products.find((item: { id: any; }) => item.id === product.id);
       if (existedProduct) {
         setProducts([
           ...products.filter((item: { id: any; }) => item.id !== product.id),
           {...existedProduct, quantity: (existedProduct.quantity || 0) + 1},
         ]);
       } else {
         setProducts([...products, {...product, quantity: 1}]);
       }
     };

     const removeProduct = (product: { id: any; }) => {
       const existedProduct = products.find((item: { id: any; }) => item.id === product.id);
       if (existedProduct && existedProduct.quantity === 1) {
         return setProducts([
           ...products.filter((item: { id: any; }) => item.id !== product.id),
         ]);
       }
       if (existedProduct) {
         setProducts([
           ...products.filter((item: { id: any; }) => item.id !== product.id),
           {...existedProduct, quantity: (existedProduct.quantity || 0) - 1},
         ]);
       }
     };

  // const checkLog = async () => {
  //   setLoading(true);
  //   const token = await AsyncStorage.getItem("token");
  //   if (token !== null) {
  //     try {
  //       const response = await axios.get(
  //         "https://firstauth.azurewebsites.net/auth/profile",
  //         {
  //           headers: {
  //             Authorization: `JWT ${token}`,
  //           },
  //         }
  //       );
  //       if (response.data.success) {
  //         setLoading(false);
  //         setLog(true);
  //         setProfile(response.data.mango);
  //       } else {
  //         setProfile({});
  //         setLoading(false);
  //       }
  //     } catch (error) {
  //       console.log(error);
  //       console.log(error);
  //       setLog(false);
  //       setLoading(false);
  //     }
  //   } else {
  //     setLoading(false);
  //   }
  // };

  // React.useEffect(() => {
  //   checkLog();
  // }, []);

  return (
    <ContextLog.Provider
      value={{
        log,
        setLog,
        profile,
        setProfile,
        loading,
        setLoading,

        products: products.sort((p1: { name: string; }, p2: { name: any; }) => p1.name.localeCompare(p2.name)),
        addProductToCard,
        removeProduct,
      }}
    >
      {loading ? <LoderApp /> : children}
    </ContextLog.Provider>
  );
};

export const useLogIN = () => useContext(ContextLog);

export default LogCheck;
