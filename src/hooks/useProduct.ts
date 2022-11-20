import React, { useState } from 'react';

export const useProduct = () => {
  const [listProducts, setListProducts] = useState([]);
  const [isLoading, setLoading] = useState(false);

  /* A function that is called when the user types in the search bar. */
  const fetchProducts = React.useCallback(async (type: any, searchTerm: any) => {
    try {
      setLoading(true);
      // change api to search with category and search term
      const resp = await fetch(
        // show the products that are in the category and search term
        `http://10.0.2.2:2020/api/product?type=${type || ''}&search=${searchTerm || ''}`,

      );
      const data = await resp.json();


      setListProducts(data || []);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  }, []);

  const resetList = () => {
    setListProducts([]);
  };

  return [listProducts, isLoading, fetchProducts, resetList];
};
