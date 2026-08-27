import { createClient } from "tinacms/dist/client";
import { queries } from "./types.js";
export const client = createClient({ url: 'http://localhost:4001/graphql', token: '5ab8ca96e86d6a1ada2af48199c76b2d482e7f6f', queries,  });
export default client;
  