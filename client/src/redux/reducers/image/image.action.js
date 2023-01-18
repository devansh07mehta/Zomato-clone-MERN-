import axios from "axios";

// redux type
import { GET_IMAGE } from "./image.type";

export const getImage = (_id) => async (dispatch) => {
  try {
    const image = await axios({
      method: "GET",
      url: `${process.env.REACT_APP_CLIENT_URL}image/${_id}`,
    });

    return dispatch({ type: GET_IMAGE, payload: image.data.image });
  } catch (error) {
    return dispatch({ type: "ERROR", payload: error });
  }
};

export default getImage;
