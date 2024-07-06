import {
  userLogin,
  userRegister,
} from "../redux/features/reduxAuth/authActions";
import store from "../redux/store";

export const HandleLogin = (e, email, password, role) => {
  e.preventDefault();
  try {
    if (!role || !email || !password) {
      return alert("Please provide all inputs");
    }

    store.dispatch(userLogin({ email, password, role }));
  } catch (error) {
    console.log(error);
  }
};

export const HandleRegister = (
  e,
  role,
  name,
  email,
  password,
  phone,
  address,
  hospital,
  organisation
) => {
  e.preventDefault();
  try {
    store.dispatch(
      userRegister({
        role,
        name,
        email,
        password,
        phone,
        address,
        hospital,
        organisation,
      })
    );
  } catch (error) {
    console.log(error);
  }
};
