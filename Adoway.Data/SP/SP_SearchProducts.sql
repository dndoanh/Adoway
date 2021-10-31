CREATE PROCEDURE [dbo].[SP_SearchProducts] 
	@CategoryName NVARCHAR(255) = NULL, 
	@SupplierName NVARCHAR(255) = NULL, 
	@Name NVARCHAR(255) = NULL, 
	@EnterpriseId  UNIQUEIDENTIFIER,
	@ProductType INT = NULL,
	@CategoryId  UNIQUEIDENTIFIER = NULL,
	@SupplierId  UNIQUEIDENTIFIER = NULL,
	@Status INT = NULL,
	@SortOrder NVARCHAR(100),
	@SortField NVARCHAR(100),
	@PageNumber INT,
	@PageSize INT,
	@TotalCount INT OUTPUT
AS
BEGIN

    SELECT @CategoryName = CASE WHEN @CategoryName = '' THEN NULL ELSE @CategoryName END;
	SELECT @SupplierName = CASE WHEN @SupplierName = '' THEN NULL ELSE @SupplierName END;
	SELECT @Name = CASE WHEN @Name = '' THEN NULL ELSE @Name END;
	
	SELECT @TotalCount = COUNT(1)
	FROM Products p (NOLOCK)
		INNER JOIN Categories c (NOLOCK) ON p.CategoryId = c.Id
		LEFT JOIN Suppliers s (NOLOCK) ON p.SupplierId = s.Id

	WHERE    ((@CategoryName IS NULL AND @SupplierName IS NULL AND @Name IS NULL) 
				OR (@CategoryName IS NOT NULL AND c.Name LIKE N'%' + @CategoryName + '%') 
				OR (@SupplierName IS NOT NULL AND s.Name LIKE N'%' + @SupplierName + '%') 
				OR (@Name IS NOT NULL AND p.Name LIKE N'%' + @Name+ '%') )
			AND ((@EnterpriseId IS NULL AND p.EnterpriseId IS NULL) OR  p.EnterpriseId = @EnterpriseId)
			AND (@ProductType IS NULL OR p.ProductType = @ProductType)
			AND ((@CategoryId IS NULL AND p.CategoryId IS NULL) OR  p.CategoryId = @CategoryId)
			AND ((@SupplierId IS NULL AND p.SupplierId IS NULL) OR  p.SupplierId = @SupplierId)
			AND (@Status IS NULL OR p.Status = @Status)

	SELECT p.*, ISNULL(c.Name, '') AS 'CategoryName', ISNULL(s.Name, '') AS 'SupplierName'
	FROM Products p (NOLOCK)
		INNER JOIN Categories c (NOLOCK) ON p.CategoryId = c.Id
		LEFT JOIN Suppliers s (NOLOCK) ON p.SupplierId = s.Id

	WHERE    ((@CategoryName IS NULL AND @SupplierName IS NULL AND @Name IS NULL) 
				OR (@CategoryName IS NOT NULL AND c.Name LIKE N'%' + @CategoryName + '%') 
				OR (@SupplierName IS NOT NULL AND s.Name LIKE N'%' + @SupplierName + '%') 
				OR (@Name IS NOT NULL AND p.Name LIKE N'%' + @Name+ '%') )
			AND ((@EnterpriseId IS NULL AND p.EnterpriseId IS NULL) OR  p.EnterpriseId = @EnterpriseId)
			AND (@ProductType IS NULL OR p.ProductType = @ProductType)
			AND ((@CategoryId IS NULL AND p.CategoryId IS NULL) OR  p.CategoryId = @CategoryId)
			AND ((@SupplierId IS NULL AND p.SupplierId IS NULL) OR  p.SupplierId = @SupplierId)
			AND (@Status IS NULL OR p.Status = @Status)


	ORDER BY 
		CASE WHEN @SortField = 'categoryName' AND @SortOrder ='asc' THEN c.Name END ,
		CASE WHEN @SortField = 'categoryName' AND @SortOrder ='desc' THEN c.Name END DESC,
		CASE WHEN @SortField = 'supplierName' AND @SortOrder ='asc' THEN s.Name END ,
		CASE WHEN @SortField = 'supplierName' AND @SortOrder ='desc' THEN s.Name END DESC,
		CASE WHEN @SortField = 'name' AND @SortOrder ='asc' THEN p.Name END ,
		CASE WHEN @SortField = 'name' AND @SortOrder ='desc' THEN p.Name END DESC,
		CASE WHEN @SortField = 'salesPrice' AND @SortOrder ='asc' THEN p.SalesPrice END ,
		CASE WHEN @SortField = 'salesPrice' AND @SortOrder ='desc' THEN p.SalesPrice END DESC,
		CASE WHEN @SortField = 'measureUnit' AND @SortOrder ='asc' THEN p.MeasureUnit END ,
		CASE WHEN @SortField = 'measureUnit' AND @SortOrder ='desc' THEN p.MeasureUnit END DESC,
		CASE WHEN @SortField = 'productType' AND @SortOrder ='asc' THEN p.ProductType END ,
		CASE WHEN @SortField = 'productType' AND @SortOrder ='desc' THEN p.ProductType END DESC,
		CASE WHEN @SortField = 'status' AND @SortOrder ='asc' THEN p.Status END ,
		CASE WHEN @SortField = 'status' AND @SortOrder ='desc' THEN p.Status END DESC

	OFFSET (@PageNumber-1)*@PageSize ROWS
	FETCH NEXT @PageSize ROWS ONLY

END