// ----------------------------
// Gestion du local storage
// ----------------------------

export const setItemStorage = (add) => {
  localStorage.setItem("userToken", JSON.stringify(add));
};

export const getItemStorage = () => {
  return JSON.parse(localStorage.getItem("userToken"));
};

export const removeItemStorage = () => {
  localStorage.removeItem("userToken");
};

// ----------------------------
// Fonction vérification de présence et d'intégrité du token.
// Un mauvais token dans le localStorage sera écrasé/nettoyé.
// ----------------------------

export const isTokenValid = () => {
  const userToken = localStorage.getItem("userToken");

  if (!userToken || userToken.trim() === "") {
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
    removeItemStorage();
    console.error(
      "Error parsing token from local storage: token has been removed from localHost"
    );
    return false;
  }
};

// ----------------------------------------------------
// Fonction echappement caractères non-alphabetique (tiret autorisé)
// ----------------------------------------------------

export const filterNonAlphabeticCharacters = (input) => {
  return input.replace(/[^a-zA-ZÀ-ÖØ-öø-ÿ-'     ]/g, "");
};
