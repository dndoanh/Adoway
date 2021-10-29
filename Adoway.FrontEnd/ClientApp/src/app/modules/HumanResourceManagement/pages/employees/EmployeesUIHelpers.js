export const EmployeeStatusCssClasses = ["danger", "success", "info", ""];
export const EmployeeStatusTitles = ["Inactive", "Active", ""];
export const defaultSorted = [{ dataField: "name", order: "asc" }];
export const sizePerPageList = [
  { text: "3", value: 3 },
  { text: "5", value: 5 },
  { text: "10", value: 10 }
];
export const initialFilter = {
  filter: {
    name: "",
    email: ""
  },
  sortOrder: "asc", // asc||desc
  sortField: "name",
  pageNumber: 1,
  pageSize: 10
};
