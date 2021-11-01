export const SupplierStatusCssClasses = ["danger", "success", "info", ""];
export const SupplierStatusTitles = ["Inactive", "Active", ""];
export const defaultSorted = [{ dataField: "name", order: "asc" }];
export const sizePerPageList = [
  { text: "3", value: 3 },
  { text: "5", value: 5 },
  { text: "10", value: 10 }
];
export const initialFilter = {
  filter: {
    name: "",
    enterpriseId: "1b759bb9-743b-4e7d-a831-70f3f667c824",
    address:"",
    contactName: "",
    contactEmail: "",
    contactPhone: "",
  },
  sortOrder: "asc", // asc||desc
  sortField: "name",
  pageNumber: 1,
  pageSize: 10
};
