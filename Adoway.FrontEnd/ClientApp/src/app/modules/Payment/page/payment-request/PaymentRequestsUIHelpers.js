export const PaymentRequestStatusCssClasses = ["danger", "success", "info", "primary","secondary","warning"];
export const PaymentRequestStatusTitles = ["", "Develop", "Return", "Active ", "Over"];
export const PaymentRequestAreaTitles = ["", "EastArea", "WestArea"];
export const PaymentRequestTypeTitles = ["", " Draft", "Confirmed", "Verified", "Approved", "Paying", "Done","Canceled"];
export const defaultSorted = [{ dataField: "name", order: "asc" }];
export const PaymentRequestConditionTitles = ["New", "Used"];
export const sizePerPageList = [
  { text: "3", value: 3 },
  { text: "5", value: 5 },
  { text: "10", value: 10 }
];
export const initialFilter = {
  filter: {
    paymentRequestNo: "",
    supplierId:"",
    projectId:""
  },
  sortOrder: "asc", // asc||desc
  sortField: "name",
  pageNumber: 1,
  pageSize: 10
};
export const AVAILABLE_COLORS = [
    "Red",
    "CadetBlue",
    "Eagle",
    "Gold",
    "LightSlateGrey",
    "RoyalBlue",
    "Crimson",
    "Blue",
    "Sienna",
    "Indigo",
    "Green",
    "Violet",
    "GoldenRod",
    "OrangeRed",
    "Khaki",
    "Teal",
    "Purple",
    "Orange",
    "Pink",
    "Black",
    "DarkTurquoise"
];

export const AVAILABLE_MANUFACTURES = [
    "Pontiac",
    "Kia",
    "Lotus",
    "Subaru",
    "Jeep",
    "Isuzu",
    "Mitsubishi",
    "Oldsmobile",
    "Chevrolet",
    "Chrysler",
    "Audi",
    "Suzuki",
    "GMC",
    "Cadillac",
    "Infinity",
    "Mercury",
    "Dodge",
    "Ram",
    "Lexus",
    "Lamborghini",
    "Honda",
    "Nissan",
    "Ford",
    "Hyundai",
    "Saab",
    "Toyota"
];
