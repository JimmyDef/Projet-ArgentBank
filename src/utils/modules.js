export const setItemStorage = (add) => {
  localStorage.setItem("userToken", JSON.stringify(add));
};

export const getItemStorage = () => {
  return JSON.parse(localStorage.getItem("userToken"));
};

export const removeItemStorage = () => {
  localStorage.removeItem("userToken");
};

export const checkTokenValidity = () => {
  const userToken = localStorage.getItem("userToken");

  if (!userToken || userToken.trim() === "") {
    console.error("Token missing or empty in local storage.");
    return false;
  }
  try {
    const parsedToken = JSON.parse(userToken);
    if (typeof parsedToken !== "string") {
      console.error("Token in local storage is not a string.");
      return false;
    }
    return true;
  } catch (error) {
    console.error("Error parsing token from local storage:", error);
    return false;
  }
};
