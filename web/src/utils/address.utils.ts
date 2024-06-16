export const extractAddressComponents = (addressComponents: Array<any>) => {
  let address = {
    street: "",
    city: "",
    postalCode: "",
    country: ""
  };
  addressComponents.map((item: any) => {
    if(item.types.includes("route")) {
      address.street = item.long_name;
    } else if(item.types.includes("locality")) {
      address.city = item.long_name;
    } else if(item.types.includes("postal_code")) {
      address.postalCode = item.long_name;
    } else if(item.types.includes("country")) {
      address.country = item.long_name;
    }
  });
  return address;
};
