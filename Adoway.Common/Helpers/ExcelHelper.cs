using Adoway.Common.Extensions;
using OfficeOpenXml;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Text.RegularExpressions;
using System.Globalization;

namespace Adoway.Common.Helpers
{
	public class ExcelHelper
	{
		public static List<T> ExcelImportFPT<T>(Stream inputFileStream, ref string errorMessage)
		{
			if (inputFileStream.IsNull())
			{
				errorMessage = "Xin hãy chọn đúng file mẫu để Import dữ liệu.";
				return null;
			}
			try
			{
				ExcelPackage.LicenseContext = OfficeOpenXml.LicenseContext.NonCommercial;
				using (ExcelPackage package = new ExcelPackage(inputFileStream))
				{
					ExcelWorksheet worksheet = package.Workbook.Worksheets.FirstOrDefault(); 
                    //var columnConfig = GetExcelConfig(package, out worksheet, out indexsheet);
                    var columnConfig = FPTConfig;

                    if (columnConfig.IsNull())
					{
						errorMessage = "Không tìm thấy sheet: Index. Xin hãy chọn đúng file mẫu để Import dữ liệu.";
						return null;
					}
					//Import data from worksheet
					if (worksheet.IsNull() || columnConfig.IsNull() || columnConfig.Count == 0)
					{
						errorMessage = "Không tìm thấy sheet chứa dữ liệu, hoặc dữ liệu khai báo trong sheet index không đúng. Xin hãy chọn đúng file mẫu để Import dữ liệu.";
						return null;
					}
					int rowcount = 1;
					bool checksum = false;
					foreach (var x in columnConfig)
					{
						if (!worksheet.GetValue(x.ExcelStartRow + rowcount, x.ExcelStartColumn).IsNull())
						{
							checksum = true;
							break;
						}
					}

					var resultlist = new List<T>();
					while (checksum)
					{
						checksum = false;
						var objectT = Activator.CreateInstance(typeof(T));
						columnConfig.ForEach(x =>
						{
							var guidValue = Guid.Empty;
							if (Guid.TryParse(x.PropertyName, out guidValue))
							{
								var cellvalue = worksheet.GetValue(x.ExcelStartRow + rowcount, x.ExcelStartColumn);
								(objectT as BaseObjectImport).Dictionary.Add(x.PropertyName, cellvalue.IsNull() ? string.Empty : cellvalue.ToString());
								if (!cellvalue.IsNull())
								{
									checksum = true;
								}

							}
							else
							{
								var cellvalue = worksheet.GetValue(x.ExcelStartRow + rowcount, x.ExcelStartColumn);
								SetPropertyValue(objectT, x.PropertyName, cellvalue);
								if (!cellvalue.IsNull())
									checksum = true;
							}
						});
						if (checksum)
						{
							resultlist.Add((T)objectT);
						}
						rowcount++;
					}
					return resultlist;
				}
			}
			catch (Exception ex)
			{
				//Logger.Error("ExcelImport", ex);
				errorMessage = "Đã xảy ra lỗi khi đọc file dữ liệu. Xin hãy kiểm tra và chọn đúng file mẫu để Import dữ liệu.";
				return null;
			}

		}
		public static List<T> ExcelImportViettel<T>(Stream inputFileStream, ref string errorMessage)
		{
			if (inputFileStream.IsNull())
			{
				errorMessage = "Xin hãy chọn đúng file mẫu để Import dữ liệu.";
				return null;
			}
			try
			{
				ExcelPackage.LicenseContext = OfficeOpenXml.LicenseContext.NonCommercial;
				using (ExcelPackage package = new ExcelPackage(inputFileStream))
				{
					ExcelWorksheet worksheet = package.Workbook.Worksheets.FirstOrDefault();
					//var columnConfig = GetExcelConfig(package, out worksheet, out indexsheet);
					var columnConfig = ViettelConfig;

					if (columnConfig.IsNull())
					{
						errorMessage = "Không tìm thấy sheet: Index. Xin hãy chọn đúng file mẫu để Import dữ liệu.";
						return null;
					}
					//Import data from worksheet
					if (worksheet.IsNull() || columnConfig.IsNull() || columnConfig.Count == 0)
					{
						errorMessage = "Không tìm thấy sheet chứa dữ liệu, hoặc dữ liệu khai báo trong sheet index không đúng. Xin hãy chọn đúng file mẫu để Import dữ liệu.";
						return null;
					}
					int rowcount = 1;
					bool checksum = false;
					foreach (var x in columnConfig)
					{
						if (!worksheet.GetValue(x.ExcelStartRow + rowcount, x.ExcelStartColumn).IsNull())
						{
							checksum = true;
							break;
						}
					}

					var resultlist = new List<T>();
					while (checksum)
					{
						checksum = false;
						var objectT = Activator.CreateInstance(typeof(T));
						var date1 = DateTime.Now;
						var date2 = DateTime.Now;
						var date3 = DateTime.Now;

						DateTime.TryParse(worksheet.GetValue(20, 7).ToString().Remove(0,1), out date1);
						DateTime.TryParse(worksheet.GetValue(20, 8).ToString().Remove(0, 1), out date2);
						DateTime.TryParse(worksheet.GetValue(20, 9).ToString().Remove(0, 1), out date3);

						columnConfig.ForEach(x =>
						{
						
							var cellvalue = worksheet.GetValue(x.ExcelStartRow + rowcount, x.ExcelStartColumn);
                            if (x.ExcelStartColumn == 7)
                            {
								SetPropertyValue(objectT, "StartDate", date1);
								SetPropertyValue(objectT, "SalesPrice", cellvalue);
								resultlist.Add((T)objectT);
							}
							else if (x.ExcelStartColumn == 8)
                            {
								SetPropertyValue(objectT, "StartDate", date2);
								SetPropertyValue(objectT, "SalesPrice", cellvalue);
								resultlist.Add((T)objectT);
							}
							else if (x.ExcelStartColumn == 9)
							{
								SetPropertyValue(objectT, "StartDate", date3);
								SetPropertyValue(objectT, "SalesPrice", cellvalue);
								resultlist.Add((T)objectT);
							}
							else if (!cellvalue.IsNull())
							{
								checksum = true;
								SetPropertyValue(objectT, x.PropertyName, cellvalue);
							}
							
						});
						//if (checksum)
						//{
						//	resultlist.Add((T)objectT);
						//}
						rowcount++;
					}
					return resultlist;
				}
			}
			catch (Exception ex)
			{
				//Logger.Error("ExcelImport", ex);
				errorMessage = "Đã xảy ra lỗi khi đọc file dữ liệu. Xin hãy kiểm tra và chọn đúng file mẫu để Import dữ liệu.";
				return null;
			}

		}
		public static List<T> ExcelImportCMC<T>(Stream inputFileStream, ref string errorMessage)
		{
			if (inputFileStream.IsNull())
			{
				errorMessage = "Xin hãy chọn đúng file mẫu để Import dữ liệu.";
				return null;
			}
			try
			{
				ExcelPackage.LicenseContext = OfficeOpenXml.LicenseContext.NonCommercial;
				using (ExcelPackage package = new ExcelPackage(inputFileStream))
				{
					ExcelWorksheet worksheet = package.Workbook.Worksheets.FirstOrDefault();
					//var columnConfig = GetExcelConfig(package, out worksheet, out indexsheet);
					var columnConfig = CMCConfig;

					if (columnConfig.IsNull())
					{
						errorMessage = "Không tìm thấy sheet: Index. Xin hãy chọn đúng file mẫu để Import dữ liệu.";
						return null;
					}
					//Import data from worksheet
					if (worksheet.IsNull() || columnConfig.IsNull() || columnConfig.Count == 0)
					{
						errorMessage = "Không tìm thấy sheet chứa dữ liệu, hoặc dữ liệu khai báo trong sheet index không đúng. Xin hãy chọn đúng file mẫu để Import dữ liệu.";
						return null;
					}
					int rowcount = 1;
					bool checksum = false;
					foreach (var x in columnConfig)
					{
						if (!worksheet.GetValue(x.ExcelStartRow + rowcount, x.ExcelStartColumn).IsNull())
						{
							checksum = true;
							break;
						}
					}

					var resultlist = new List<T>();
					var date1 = DateTime.Now;
					var group = new List<DateTime>();
					for (int i = 24; i < 35; i++)
					{
						DateTime.TryParseExact(worksheet.GetValue(i, 7).ToString(), "dd/MM/yyyy", CultureInfo.InvariantCulture, DateTimeStyles.None,out date1);
						date1 = new DateTime(date1.Year, date1.Month, 1);
						group.Add(date1);
					}
					group = group.Distinct().ToList();
					group.Sort((x, y) => y.CompareTo(x));
					var firstMonth = group[2];
					while (checksum)
					{
						checksum = false;
						var objectT = Activator.CreateInstance(typeof(T));
						columnConfig.ForEach(x =>
						{
							var cellvalue = worksheet.GetValue(x.ExcelStartRow + rowcount, x.ExcelStartColumn);
						
                            if(x.ExcelStartColumn == 7)
                            {
                                if (!cellvalue.IsNull()) {
									DateTime.TryParseExact(cellvalue.ToString(), "dd/MM/yyyy", CultureInfo.InvariantCulture, DateTimeStyles.None, out date1);
									if (date1.CompareTo(firstMonth) < 0)
									{
										SetPropertyValue(objectT, x.PropertyName, firstMonth);
									}
									else
									{
										SetPropertyValue(objectT, x.PropertyName, date1);
									}
								}
                                else
                                {
									checksum = false;
								}
							}
							else if (!cellvalue.IsNull())
							{
								checksum = true;
								SetPropertyValue(objectT, x.PropertyName, cellvalue);
							}
							else
                            {
								SetPropertyValue(objectT, x.PropertyName, cellvalue);
							}
						
							
						});
						if (checksum)
						{
							resultlist.Add((T)objectT);
						}
						rowcount++;
					}
					return resultlist;
				}
			}
			catch (Exception ex)
			{
				//Logger.Error("ExcelImport", ex);
				errorMessage = "Đã xảy ra lỗi khi đọc file dữ liệu. Xin hãy kiểm tra và chọn đúng file mẫu để Import dữ liệu.";
				return null;
			}

		}
		public static List<T> ExcelImportVNPT<T>(Stream inputFileStream, ref string errorMessage)
		{
			if (inputFileStream.IsNull())
			{
				errorMessage = "Xin hãy chọn đúng file mẫu để Import dữ liệu.";
				return null;
			}
			try
			{
				ExcelPackage.LicenseContext = OfficeOpenXml.LicenseContext.NonCommercial;
				using (ExcelPackage package = new ExcelPackage(inputFileStream))
				{
					ExcelWorksheet worksheet = package.Workbook.Worksheets.FirstOrDefault();
					//var columnConfig = GetExcelConfig(package, out worksheet, out indexsheet);
					var columnConfig = VNPTConfig;
					int rowcount = 1;
					int rcount = 13;
					int ccount = 1;
					bool checksum =true;
					var VNPTCheckPoint = new List<VNPTCheckPoint>();
					while (checksum)
					{
						var mergedAddress = worksheet.MergedCells[rcount, 2];
                        if (mergedAddress!=null)
                        {
							var mergedValue = worksheet.Cells[mergedAddress].Text;
							var dateString= mergedValue.ToString().Split(new[] { "tháng " }, StringSplitOptions.None)[1];
							var salesDate = DateTime.Now;
							DateTime.TryParse(dateString, out salesDate);
							if (mergedValue != null)
							{
								VNPTCheckPoint.Add(new VNPTCheckPoint
								{
									MonthNo = ccount,
									Position = rcount,
									SalesDate= salesDate
								});
								ccount++;
								if (ccount == 4)
								{
									checksum = false;
								}
							}
						}
						rcount++;
					}
					
					var resultlist = new List<T>();
					var VNPTCheckPoint1 = VNPTCheckPoint[0];
					var VNPTCheckPoint2 = VNPTCheckPoint[1];
					var VNPTCheckPoint3 = VNPTCheckPoint[2];
					for (int i = 13; i < VNPTCheckPoint1.Position; i++)
                    {
						var objectT = Activator.CreateInstance(typeof(T));
						SetPropertyValue(objectT, "ContractCode", worksheet.GetValue(i,2));
						SetPropertyValue(objectT, "StartDate", VNPTCheckPoint1.SalesDate);
						SetPropertyValue(objectT, "SalesPrice", worksheet.GetValue(i, 12));
						resultlist.Add((T)objectT);
					}

					for (int i = VNPTCheckPoint1.Position+1; i < VNPTCheckPoint2.Position; i++)
					{
						var objectT = Activator.CreateInstance(typeof(T));
						SetPropertyValue(objectT, "ContractCode", worksheet.GetValue(i, 2));
						SetPropertyValue(objectT, "StartDate", VNPTCheckPoint2.SalesDate);
						SetPropertyValue(objectT, "SalesPrice", worksheet.GetValue(i, 12));
						resultlist.Add((T)objectT);
					}

					for (int i = VNPTCheckPoint2.Position + 1; i < VNPTCheckPoint3.Position; i++)
					{
						var objectT = Activator.CreateInstance(typeof(T));
						SetPropertyValue(objectT, "ContractCode", worksheet.GetValue(i, 2));
						SetPropertyValue(objectT, "StartDate", VNPTCheckPoint3.SalesDate);
						SetPropertyValue(objectT, "SalesPrice", worksheet.GetValue(i, 12));
						resultlist.Add((T)objectT);
					}
					return resultlist;
				}
			}
			catch (Exception ex)
			{
				//Logger.Error("ExcelImport", ex);
				errorMessage = "Đã xảy ra lỗi khi đọc file dữ liệu. Xin hãy kiểm tra và chọn đúng file mẫu để Import dữ liệu.";
				return null;
			}

		}

		public static byte[] ExcelExport(string templateFile, IEnumerable<object> dataExport, List<ExcelParameter> parameters = null)
		{
		
			try
			{
				var fileTpl = new FileInfo(templateFile);
				if (fileTpl.IsNull())
					return null;
				ExcelPackage.LicenseContext = OfficeOpenXml.LicenseContext.NonCommercial;
				using (ExcelPackage package = new ExcelPackage(fileTpl))
				{
					ExcelWorksheet worksheet = package.Workbook.Worksheets.FirstOrDefault();
					var ColumnConfig = ExportConfig;
					if (ColumnConfig.IsNull())
						return null;
					var STTColumnName = "STT";
					//Export data to worksheet
					int firstRowIndex = ColumnConfig.Min(x => x.ExcelStartRow);
					int lastColumnIndex = ColumnConfig.Max(x => x.ExcelStartColumn);
					int rowcount = 1;
					foreach (var item in dataExport)
					{
						worksheet.Cells[firstRowIndex + 1, 1, firstRowIndex + 1, lastColumnIndex]
						.Copy(worksheet.Cells[firstRowIndex + rowcount + 1, 1, firstRowIndex + rowcount + 1, lastColumnIndex]);
						//worksheet.Row(firstRowIndex+ 1).
						foreach (var excelconfig in ColumnConfig)
						{
							try
							{
								if (excelconfig.PropertyName.Equals(STTColumnName, StringComparison.OrdinalIgnoreCase)) //Export STT
								{
									worksheet.SetValue(excelconfig.ExcelStartRow + rowcount, excelconfig.ExcelStartColumn, rowcount);
								}
								else
								{
									var propertyinfo = item.GetType().GetProperties().FirstOrDefault(proc => proc.Name.Equals(excelconfig.PropertyName, StringComparison.OrdinalIgnoreCase));
									if (!propertyinfo.IsNull() && propertyinfo.CanRead)
									{
										if (rowcount == 1 && (propertyinfo.PropertyType == typeof(DateTime?) || propertyinfo.PropertyType == typeof(DateTime)))
											worksheet.Column(excelconfig.ExcelStartColumn).Style.Numberformat.Format = System.Globalization.CultureInfo.CurrentCulture.DateTimeFormat.ShortDatePattern;
										worksheet.SetValue(excelconfig.ExcelStartRow + rowcount, excelconfig.ExcelStartColumn, propertyinfo.GetValue(item, null));
									}

									else//overwrite gia tri null neu khong set cell value (do copy style)
										worksheet.SetValue(excelconfig.ExcelStartRow + rowcount, excelconfig.ExcelStartColumn, null);
								}
							}
							catch (Exception ex)
							{
								
							}
						}
						rowcount++;
					}
					if (rowcount > 1)
						worksheet.DeleteRow(firstRowIndex + rowcount);
					return package.GetAsByteArray();
				}
			}
			catch (Exception ex)
			{
				
			}
			return null;
		}
		public class ExcelParameter
		{
			public string key { get; set; }
			public string value { get; set; }
		}
		public static void SetPropertyValue(object obj, string propertyName, object value)
		{
			try
			{
				var propertyinfo = obj.GetType().GetProperties().FirstOrDefault(proc => proc.Name.Equals(propertyName, StringComparison.OrdinalIgnoreCase));
				if (!propertyinfo.IsNull() && propertyinfo.CanWrite)
				{
					if ((propertyinfo.PropertyType == typeof(Int32) || propertyinfo.PropertyType == typeof(Int32?)) && !value.IsNull())
						propertyinfo.SetValue(obj, Convert.ToInt32(value), null);
					if ((propertyinfo.PropertyType == typeof(Decimal) || propertyinfo.PropertyType == typeof(Decimal?)) && !value.IsNull())
						propertyinfo.SetValue(obj, Convert.ToDecimal(value), null);
					else if ((propertyinfo.PropertyType == typeof(DateTime) || propertyinfo.PropertyType == typeof(DateTime?)) && !value.IsNull())
					{
						if (value.GetType().UnderlyingSystemType == typeof(DateTime))
							propertyinfo.SetValue(obj, (DateTime)value, null);
						else if (value.GetType().UnderlyingSystemType == typeof(double))
							propertyinfo.SetValue(obj, DateTime.FromOADate((double)value), null);
						else
							propertyinfo.SetValue(obj, value.ToString().ConvertToDateTimeGB(), null);
					}
					else if ((propertyinfo.PropertyType == typeof(Guid) || propertyinfo.PropertyType == typeof(Guid?)) && !value.IsNull())
						propertyinfo.SetValue(obj, new Guid(value.ToString()), null);
					else if ((propertyinfo.PropertyType == typeof(bool) || propertyinfo.PropertyType == typeof(bool?)) && !value.IsNull())
					{
						if (value.ToString().ToLower() == "yes" || value.ToString().ToLower() == "có")
							propertyinfo.SetValue(obj, true, null);
						else propertyinfo.SetValue(obj, Convert.ToBoolean(value), null);
					}
					else if (propertyinfo.PropertyType.IsEnum)
					{
						foreach (var field in propertyinfo.PropertyType.GetFields())
						{
							var attribute = Attribute.GetCustomAttribute(field, typeof(DescriptionAttribute)) as DescriptionAttribute;
							if (attribute != null)
							{
								if (attribute.Description.Equals(value.ToString(), StringComparison.OrdinalIgnoreCase))
								{
									propertyinfo.SetValue(obj, field.GetValue(null), null);
									break;
								}

							}
							if (field.Name.Equals(value.ToString(), StringComparison.OrdinalIgnoreCase))
							{
								propertyinfo.SetValue(obj, field.GetValue(null), null);
								break;
							}
						}
					}
					else if (!value.IsNull())
						propertyinfo.SetValue(obj, value.ToString(), null);

				}
			}
			catch (Exception ex)
			{
				//Logger.Error(ex.Message, ex);
			}
		}
		public static string IndexSheetName = "Index";
		public static int MaxRowColumnScan = 20;
		public static string PropertyColumnName = "Property Name";
		public static object ConfigurationManager { get; private set; }

		public static List<ExcelConfiguration> GetExcelConfig(ExcelPackage package, out ExcelWorksheet worksheet, out ExcelWorksheet indexsheet)
		{
			var columnConfig = new List<ExcelConfiguration>(); //Property name. ExcelConfiguration
			worksheet = null;
			indexsheet = null;
			//1. Search Index sheet for property mapping 
			indexsheet = package.Workbook.Worksheets.FirstOrDefault(x => x.Name.Equals(IndexSheetName, StringComparison.OrdinalIgnoreCase));
			if (indexsheet.IsNull())
				return null;
			//Scan first 20 col, 20 row get start of config
			for (int row = 1; row <= MaxRowColumnScan; row++)
			{
				int col = 1;
				for (col = 1; col <= MaxRowColumnScan; col++)
				{
					if (indexsheet.Cells[row, col].Value.ConvertToString() == PropertyColumnName)
						break;
				}

				var procName = indexsheet.Cells[row, col].Value.ConvertToString();
				while (!string.IsNullOrEmpty(procName))
				{
					var headerName = indexsheet.Cells[row, col + 1].Value.ConvertToString();
					if (!string.IsNullOrEmpty(headerName))
					{
						columnConfig.Add(new ExcelConfiguration() { PropertyName = procName, ExcelColumnHeader = headerName });
					}
					row++;
					procName = indexsheet.Cells[row, col].Value.ConvertToString();
				}
				//Break loop if found the first config column
				if (col < MaxRowColumnScan)
					break;
			}
			if (columnConfig.Count == 0)
				return null;

			//Open working worksheet 
			worksheet = package.Workbook.Worksheets.FirstOrDefault(x => !x.Name.Equals(IndexSheetName, StringComparison.OrdinalIgnoreCase));
			if (worksheet.IsNull())
				return null;
			//Scan for first exist cell value, and compare column header
			for (int firstCol = 1; firstCol <= MaxRowColumnScan; firstCol++)
			{
				int firstRow = 1;
				for (firstRow = 1; firstRow <= MaxRowColumnScan; firstRow++)
				{
					var firstcellvalue = worksheet.Cells[firstRow, firstCol].Value.ConvertToString();
					if (!string.IsNullOrEmpty(firstcellvalue))
					{
						//Check for first header column
						var firstcolumn = columnConfig.FirstOrDefault(x => x.ExcelColumnHeader.Equals(firstcellvalue, StringComparison.OrdinalIgnoreCase));
						if (!firstcolumn.IsNull())
							break;
					}
				}
				//Scan 100 columns and 5 rows, begin at startRow,firstcolumn
				var checkFound = false;
				for (int row_ = firstRow; row_ < firstRow + 5; row_++)
				{
					for (int col_ = firstCol; col_ < firstCol + 100; col_++)
					{
						var columnheader = worksheet.Cells[row_, col_].Value.ConvertToString();
						if (!string.IsNullOrEmpty(columnheader))
						{
							var excelcolumn = columnConfig.FirstOrDefault(x => x.ExcelColumnHeader.Equals(columnheader, StringComparison.OrdinalIgnoreCase));
							if (excelcolumn.IsNotNull()) //Update first cell for this column header
							{
								excelcolumn.ExcelStartRow = row_;
								excelcolumn.ExcelStartColumn = col_;
								checkFound = true;
							}
						}
					}
					if (checkFound)
						break;
				}
				//break loop if found the first column header
				if (firstRow < MaxRowColumnScan)
					break;
			}
			var maxRowStart = columnConfig.Max(x => x.ExcelStartRow);
			columnConfig.ForEach(x => x.ExcelStartRow = maxRowStart);//Update start row to max row
			return columnConfig.Where(x => x.ExcelStartColumn > 0 & x.ExcelStartRow > 0).ToList();
		}

		public static byte[] SetupTemplate(string templateFile, Dictionary<string, string> configs, Dictionary<string, string> heading)
		{
			if (templateFile.IsNull() || configs.IsNull())
				return null;
			try
			{
				var fileTpl = new FileInfo(templateFile);
				if (fileTpl.IsNull())
					return null;

				using (ExcelPackage package = new ExcelPackage(fileTpl))
				{
					ExcelWorksheet worksheet;
					ExcelWorksheet indexsheet;

					var columnConfig = new List<ExcelConfiguration>(); //Property name. ExcelConfiguration
					indexsheet = package.Workbook.Worksheets.FirstOrDefault(x => x.Name.Equals(IndexSheetName, StringComparison.OrdinalIgnoreCase));
					if (indexsheet.IsNull())
						return null;

					//Scan first 20 col, 20 row get start of config
					for (int row = 1; row <= MaxRowColumnScan; row++)
					{
						int col = 1;
						for (col = 1; col <= MaxRowColumnScan; col++)
						{
							if (indexsheet.Cells[row, col].Value.ConvertToString() == PropertyColumnName)
								break;
						}
						var procName = indexsheet.Cells[row, col].Value.ConvertToString();
						while (!string.IsNullOrEmpty(procName))
						{
							var headerName = indexsheet.Cells[row, col + 1].Value.ConvertToString();
							if (!string.IsNullOrEmpty(headerName))
							{
								columnConfig.Add(new ExcelConfiguration() { PropertyName = procName, ExcelColumnHeader = headerName });
							}
							row++;
							procName = indexsheet.Cells[row, col].Value.ConvertToString();
						}
						//Break loop if found the first config column
						if (col < MaxRowColumnScan)
						{
							foreach (var item in configs)
							{
								indexsheet.Cells[row, col].Value = item.Key;
								indexsheet.Cells[row, col + 1].Value = item.Value;
								row++;
							}
							break;
						}
					}

					//Open working worksheet 
					worksheet = package.Workbook.Worksheets.FirstOrDefault(x => !x.Name.Equals(IndexSheetName, StringComparison.OrdinalIgnoreCase));
					if (worksheet.IsNull())
						return null;
					//Scan for first exist cell value, and compare column header
					for (int firstCol = 1; firstCol <= MaxRowColumnScan; firstCol++)
					{
						int firstRow = 1;
						for (firstRow = 1; firstRow <= MaxRowColumnScan; firstRow++)
						{
							var firstcellvalue = worksheet.Cells[firstRow, firstCol].Value.ConvertToString();
							if (!string.IsNullOrEmpty(firstcellvalue))
							{
								//Check for first header column
								var firstcolumn = columnConfig.FirstOrDefault(x => x.ExcelColumnHeader.Equals(firstcellvalue, StringComparison.OrdinalIgnoreCase));
								if (!firstcolumn.IsNull())
									break;
							}
						}

						//break loop if found the first column header
						if (firstRow < MaxRowColumnScan)
						{
							int i;
							for (i = firstCol; i < 100; i++)
							{
								var firstcellvalue = worksheet.Cells[firstRow, i].Value.ConvertToString();
								if (string.IsNullOrEmpty(firstcellvalue))
									break;
							}
							foreach (var item in configs)
							{
								worksheet.Cells[firstRow, i].Value = item.Value;
								i++;
							}
							break;
						}
					}
					if (heading.IsNotNull())
						ExportParamaters(worksheet, 1, 100, 100, heading);

					return package.GetAsByteArray();
				}
			}
			catch (Exception ex)
			{
				//Logger.Error("ExcelExport: " + templateFile, ex);
			}
			return null;
		}
		public static void ExportParamaters(ExcelWorksheet excelSheet, int firstRowIndex, int lastColumnIndex, int lastRowIndex, Dictionary<string, string> heading = null)
		{

			var dimension = excelSheet.Dimension;
			if (dimension == null) { return; }
			var cells = from row in Enumerable.Range(dimension.Start.Row, dimension.End.Row)
						from column in Enumerable.Range(dimension.Start.Column, dimension.End.Column)
						select excelSheet.Cells[row, column];
			try
			{
				foreach (var excelCell in cells)
				{
					try
					{
						var cellValue = excelCell.Value as string;
						if (cellValue.IsNotNull())
						{
							heading.ToList().ForEach(x =>
							{
								cellValue = cellValue.Replace(x.Key, x.Value);
							});
							excelCell.Value = cellValue;
						}

					}
					catch (Exception) { }
				}

			}
			catch (Exception ex) { /*Logger.Error(ex);*/ }
		}

		public static readonly List<ExcelConfiguration> VNPTConfig = new List<ExcelConfiguration>{
			new ExcelConfiguration{PropertyName="ContractCode",ExcelColumnHeader="",ExcelStartRow=12,ExcelStartColumn=2},
			new ExcelConfiguration{PropertyName="SalesPrice",ExcelColumnHeader="",ExcelStartRow=12,ExcelStartColumn=12},
		};
		public static readonly List<ExcelConfiguration> FPTConfig = new List<ExcelConfiguration>{
			new ExcelConfiguration{PropertyName="ContractCode",ExcelColumnHeader="",ExcelStartRow=14,ExcelStartColumn=2},
			new ExcelConfiguration{PropertyName="StartDate",ExcelColumnHeader="",ExcelStartRow=14,ExcelStartColumn=7},
			new ExcelConfiguration{PropertyName="StartDate",ExcelColumnHeader="",ExcelStartRow=14,ExcelStartColumn=8},
			new ExcelConfiguration{PropertyName="StartDate",ExcelColumnHeader="",ExcelStartRow=14,ExcelStartColumn=9},
			new ExcelConfiguration{PropertyName="SalesPrice",ExcelColumnHeader="",ExcelStartRow=14,ExcelStartColumn=11},
		};
		public static readonly List<ExcelConfiguration> ViettelConfig = new List<ExcelConfiguration>{
			new ExcelConfiguration{PropertyName="ContractCode",ExcelColumnHeader="",ExcelStartRow=20,ExcelStartColumn=2},
			new ExcelConfiguration{PropertyName="StartDate",ExcelColumnHeader="",ExcelStartRow=20,ExcelStartColumn=7},
			new ExcelConfiguration{PropertyName="StartDate",ExcelColumnHeader="",ExcelStartRow=20,ExcelStartColumn=8},
			new ExcelConfiguration{PropertyName="StartDate",ExcelColumnHeader="",ExcelStartRow=20,ExcelStartColumn=9},
		};
		public static readonly List<ExcelConfiguration> CMCConfig = new List<ExcelConfiguration>{
			new ExcelConfiguration{PropertyName="ContractCode",ExcelColumnHeader="",ExcelStartRow=23,ExcelStartColumn=2},
			new ExcelConfiguration{PropertyName="StartDate",ExcelColumnHeader="",ExcelStartRow=23,ExcelStartColumn=7},
			new ExcelConfiguration{PropertyName="SalesPrice",ExcelColumnHeader="",ExcelStartRow=23,ExcelStartColumn=12},
		};
		public static readonly List<ExcelConfiguration> ExportConfig = new List<ExcelConfiguration>{
			new ExcelConfiguration{PropertyName="STT",ExcelColumnHeader="STT",ExcelStartRow=1,ExcelStartColumn=1},
			new ExcelConfiguration{PropertyName="ContractCode",ExcelColumnHeader="Mã thuê bao",ExcelStartRow=1,ExcelStartColumn=2},
			new ExcelConfiguration{PropertyName="CustomerName",ExcelColumnHeader="Tên KH",ExcelStartRow=1,ExcelStartColumn=3},
			new ExcelConfiguration{PropertyName="CustomerAddress",ExcelColumnHeader="Địa chỉ",ExcelStartRow=1,ExcelStartColumn=4},
			new ExcelConfiguration{PropertyName="Description",ExcelColumnHeader="Ghi chú",ExcelStartRow=1,ExcelStartColumn=5},
			new ExcelConfiguration{PropertyName="Jan",ExcelColumnHeader="T1",ExcelStartRow=1,ExcelStartColumn=6},
			new ExcelConfiguration{PropertyName="Feb",ExcelColumnHeader="T2",ExcelStartRow=1,ExcelStartColumn=7},
			new ExcelConfiguration{PropertyName="Mar",ExcelColumnHeader="T3",ExcelStartRow=1,ExcelStartColumn=8},
			new ExcelConfiguration{PropertyName="Apr",ExcelColumnHeader="T4",ExcelStartRow=1,ExcelStartColumn=9},
			new ExcelConfiguration{PropertyName="May",ExcelColumnHeader="T5",ExcelStartRow=1,ExcelStartColumn=10},
			new ExcelConfiguration{PropertyName="Jun",ExcelColumnHeader="T6",ExcelStartRow=1,ExcelStartColumn=11},
			new ExcelConfiguration{PropertyName="Jul",ExcelColumnHeader="T7",ExcelStartRow=1,ExcelStartColumn=12},
			new ExcelConfiguration{PropertyName="Aug",ExcelColumnHeader="T8",ExcelStartRow=1,ExcelStartColumn=13},
			new ExcelConfiguration{PropertyName="Sep",ExcelColumnHeader="T9",ExcelStartRow=1,ExcelStartColumn=14},
			new ExcelConfiguration{PropertyName="Oct",ExcelColumnHeader="T10",ExcelStartRow=1,ExcelStartColumn=15},
			new ExcelConfiguration{PropertyName="Nov",ExcelColumnHeader="T11",ExcelStartRow=1,ExcelStartColumn=16},
			new ExcelConfiguration{PropertyName="Dec",ExcelColumnHeader="T12",ExcelStartRow=1,ExcelStartColumn=17},
		};
		public class ExcelConfiguration
		{
			public string PropertyName
			{ get; set; }
			public string ExcelColumnHeader
			{ get; set; }
			public int ExcelStartRow
			{ get; set; }
			public int ExcelStartColumn
			{ get; set; }
		}
		public class VNPTCheckPoint
		{
			public int MonthNo
			{ get; set; }
			public DateTime SalesDate
			{ get; set; }
			public int Position
			{ get; set; }
		}
	}

	public class BaseObjectImport
	{
		public Dictionary<string, string> Dictionary { get; set; }
	}
}
