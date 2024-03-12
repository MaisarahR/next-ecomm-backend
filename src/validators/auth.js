export function validateLogin(input) {
  const validationErrors = {};

  if (!("email" in input) || input["email"].length === 0) {
    validationErrors["email"] = "cannot be blank";
  } else if (!input["email"].match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)) {
    validationErrors["email"] = "is invalid";
  }

  if (!("password" in input) || input["password"].length === 0) {
    validationErrors["password"] = "cannot be blank";
  } else if (input["password"].length < 8) {
    validationErrors["password"] = "must be at least 8 characters long";
    
  }

  return validationErrors;
}


