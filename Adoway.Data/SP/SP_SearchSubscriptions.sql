CREATE PROCEDURE [dbo].[SP_SearchSubscriptions] 
	@ContractCode NVARCHAR(255) = NULL, 
	@CustomerCode NVARCHAR(100) = NULL,
	@CustomerName NVARCHAR(100) = NULL,
	@ApartmentName NVARCHAR(100) = NULL,
	@EnterpriseId  UNIQUEIDENTIFIER,
	@ProjectId  UNIQUEIDENTIFIER = NULL,
	@ProductId  UNIQUEIDENTIFIER = NULL,
	@Status INT = NULL,
	@SortOrder NVARCHAR(100),
	@SortField NVARCHAR(100),
	@PageNumber INT,
	@PageSize INT,
	@TotalCount INT OUTPUT
AS
BEGIN

    SELECT @ContractCode = CASE WHEN @ContractCode = '' THEN NULL ELSE @ContractCode END;
	SELECT @CustomerCode = CASE WHEN @CustomerCode = '' THEN NULL ELSE @CustomerCode END;
	SELECT @CustomerName = CASE WHEN @CustomerName = '' THEN NULL ELSE @CustomerName END;
	SELECT @ApartmentName = CASE WHEN @ApartmentName = '' THEN NULL ELSE @ApartmentName END;
	
	SELECT @TotalCount = COUNT(1)
	FROM Subscriptions s (NOLOCK)
		INNER JOIN Products p (NOLOCK) on s.ProductId = p.Id
		INNER JOIN Customers c (NOLOCK) on s.CustomerId = c.Id
		LEFT JOIN Apartments a (NOLOCK) on s.ApartmentId = a.Id
		LEFT JOIN Projects t (NOLOCK) on a.ProjectId = t.Id

	WHERE    ((@ContractCode IS NULL AND @CustomerCode IS NULL AND @CustomerName IS NULL AND @ApartmentName IS NULL) 
				OR (@ContractCode IS NOT NULL AND s.ContractCode LIKE N'%' + @ContractCode+ '%') 
				OR (@CustomerCode IS NOT NULL AND s.CustomerCode LIKE N'%' + @CustomerCode + '%')
				OR (@CustomerName IS NOT NULL AND c.Name LIKE N'%' + @CustomerName + '%')
				OR (@ApartmentName IS NOT NULL AND a.Name LIKE N'%' + @ApartmentName + '%'))
			AND s.EnterpriseId = @EnterpriseId
			AND (@ProjectId IS NULL OR t.Id = @ProjectId)
			AND (@ProductId IS NULL OR s.ProductId = @ProductId)
			AND (@Status IS NULL OR s.Status = @Status)

	SELECT s.*, ISNULL(p.Name, '') AS 'ProductName', ISNULL(c.Name, '') AS 'CustomerName', ISNULL(a.Name, '') AS 'ApartmentName', ISNULL(t.Name, '') AS 'ProjectName'
	FROM Subscriptions s (NOLOCK)
		INNER JOIN Products p (NOLOCK) on s.ProductId = p.Id
		INNER JOIN Customers c (NOLOCK) on s.CustomerId = c.Id
		LEFT JOIN Apartments a (NOLOCK) on s.ApartmentId = a.Id
		LEFT JOIN Projects t (NOLOCK) on a.ProjectId = t.Id

	WHERE    ((@ContractCode IS NULL AND @CustomerCode IS NULL AND @CustomerName IS NULL AND @ApartmentName IS NULL) 
				OR (@ContractCode IS NOT NULL AND s.ContractCode LIKE N'%' + @ContractCode+ '%') 
				OR (@CustomerCode IS NOT NULL AND s.CustomerCode LIKE N'%' + @CustomerCode + '%')
				OR (@CustomerName IS NOT NULL AND c.Name LIKE N'%' + @CustomerName + '%')
				OR (@ApartmentName IS NOT NULL AND a.Name LIKE N'%' + @ApartmentName + '%'))
			AND s.EnterpriseId = @EnterpriseId
			AND (@ProjectId IS NULL OR t.Id = @ProjectId)
			AND (@ProductId IS NULL OR s.ProductId = @ProductId)
			AND (@Status IS NULL OR s.Status = @Status)


	ORDER BY 
		CASE WHEN @SortField = 'contractCode' AND @SortOrder ='asc' THEN s.ContractCode END ,
		CASE WHEN @SortField = 'contractCode' AND @SortOrder ='desc' THEN s.ContractCode END DESC,
		CASE WHEN @SortField = 'customerCode' AND @SortOrder ='asc' THEN s.CustomerCode END ,
		CASE WHEN @SortField = 'customerCode' AND @SortOrder ='desc' THEN s.CustomerCode END DESC,
		CASE WHEN @SortField = 'productName' AND @SortOrder ='asc' THEN p.Name END ,
		CASE WHEN @SortField = 'productName' AND @SortOrder ='desc' THEN p.Name END DESC,
		CASE WHEN @SortField = 'customerName' AND @SortOrder ='asc' THEN c.Name END ,
		CASE WHEN @SortField = 'customerName' AND @SortOrder ='desc' THEN c.Name END DESC,
		CASE WHEN @SortField = 'apartmentName' AND @SortOrder ='asc' THEN a.Name END ,
		CASE WHEN @SortField = 'apartmentName' AND @SortOrder ='desc' THEN a.Name END DESC,
		CASE WHEN @SortField = 'projectName' AND @SortOrder ='asc' THEN t.Name END ,
		CASE WHEN @SortField = 'projectName' AND @SortOrder ='desc' THEN t.Name END DESC,
		CASE WHEN @SortField = 'subscriptionPeriod' AND @SortOrder ='asc' THEN s.SubscriptionPeriod END ,
		CASE WHEN @SortField = 'subscriptionPeriod' AND @SortOrder ='desc' THEN s.SubscriptionPeriod END DESC,
		CASE WHEN @SortField = 'status' AND @SortOrder ='asc' THEN s.Status END ,
		CASE WHEN @SortField = 'status' AND @SortOrder ='desc' THEN s.Status END DESC

	OFFSET (@PageNumber-1)*@PageSize ROWS
	FETCH NEXT @PageSize ROWS ONLY
END