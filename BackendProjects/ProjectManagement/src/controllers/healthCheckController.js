import { api_response } from "../utils/api_response.js";
import { asyncHandler } from "../utils/async-handler.js";

/*  this is how try catch working. it's working fine but the higher order function are better they save time and we not need to handle the catch(errors) for each time. 
const healthCheck = (req, res) => {
  try {
    res 
      .status(200)
      .json(new api_response(200, { message: "Server is running" }));
  } catch (err) {
    console.error("server health issue ", err);
    process.exit(1);
  }
};

Higher order function as below
*/

const healthCheck = asyncHandler(async (req, res) => {
  res.status(200).json(new api_response(200, { message: "Server is Running" }));
});

export { healthCheck };
