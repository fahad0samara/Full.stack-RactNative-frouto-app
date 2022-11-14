/* Importing the createServer function from the miragejs library. */
import {createServer} from "miragejs";

import { listCategory, listProducts } from "./Data";


/* Checking if the server is already running, if it is, it will shut it down. */

if (window.server) {
  window.server.shutdown();

  // if there is internat and send message internat
}

// update backend
/* Creating a server that will return the list of products. */
window.server = createServer({
  routes() {
    /* Mapping the listProducts array to a new array with the categoryName property added. */
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

    this.get("/api/category", () => {
      return listCategory;
    });
  },
});
