export function validatePostUpload(input) {
  const validationErrors = {};

  if (!("title" in input) || input["title"].length == 0) {
    validationErrors["title"] = "Title cannot be blank";
  }

  if (!("description" in input) || input["description"].length == 0) {
    validationErrors["description"] = "Description cannot be blank";
  }

  // if (!("price" in input) || input["price"].length == 0) {
  //   validationErrors["price"] = "Price cannot be blank";
  // } 
  
  return validationErrors;
}
