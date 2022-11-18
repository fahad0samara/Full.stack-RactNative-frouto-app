/* Importing the createServer function from the miragejs library. */
import {createServer, Model} from "miragejs";

import { listCategory, listProducts } from "./Data";


window.server = createServer({
  routes() {
    this.namespace = "api";



    


    this.get("/api/product", (schema, req) => {
      return listProducts
        .map(item => ({
          ...item,
          categoryName: listCategory.find(cat => cat.id == item.type).name,
          /* Filtering the list of products based on the type of product. */
        }))
        .filter(item => {
          if (req.queryParams.type > 0) {
            return item.type == req.queryParams.type;
          }

          return true;
        })
        .filter(item =>
          item.name
            .toLowerCase()
            .includes((req.queryParams.s || "").toLowerCase())
        );
    });


         
  
   
              
       

   /* Returning the list of categories. */
    this.get("/api/category", () => {
      return listCategory;
    });
  },
});
