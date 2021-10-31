CREATE PROCEDURE [dbo].[SP_SearchCustomers] 
	@Name NVARCHAR(255) = NULL, 
	@Phone NVARCHAR(100) = NULL,
	@Email NVARCHAR(100) = NULL,
	@Address NVARCHAR(100) = NULL,
	@EnterpriseId  UNIQUEIDENTIFIER,
	@CustomerType INT = NULL,
	@Status INT = NULL,
	@SortOrder NVARCHAR(100),
	@SortField NVARCHAR(100),
	@PageNumber INT,
	@PageSize INT,
	@TotalCount INT OUTPUT
AS
BEGIN

    SELECT @Name = CASE WHEN @Name = '' THEN NULL ELSE @Name END;
	SELECT @Phone = CASE WHEN @Phone = '' THEN NULL ELSE @Phone END;
	SELECT @Email = CASE WHEN @Email = '' THEN NULL ELSE @Email END;
	SELECT @Address = CASE WHEN @Address = '' THEN NULL ELSE @Address END;
	
	SELECT @TotalCount = COUNT(1)
	FROM Customers c (NOLOCK)

	WHERE    ((@Name IS NULL AND @Phone IS NULL AND @Email IS NULL AND @Address IS NULL) 
				OR (@Name IS NOT NULL AND c.Name LIKE N'%' + @Name+ '%') 
				OR (@Phone IS NOT NULL AND c.Phone LIKE N'%' + @Phone + '%')
				OR (@Email IS NOT NULL AND c.Email LIKE N'%' + @Email + '%')
				OR (@Address IS NOT NULL AND c.Address LIKE N'%' + @Address + '%'))
			AND (@CustomerType IS NULL OR c.CustomerType = @CustomerType)
			AND (@Status IS NULL OR c.Status = @Status)
			AND c.EnterpriseId = @EnterpriseId

	SELECT c.*
	FROM Customers c (NOLOCK)

	WHERE    ((@Name IS NULL AND @Phone IS NULL AND @Email IS NULL AND @Address IS NULL) 
				OR (@Name IS NOT NULL AND c.Name LIKE N'%' + @Name+ '%') 
				OR (@Phone IS NOT NULL AND c.Phone LIKE N'%' + @Phone + '%')
				OR (@Email IS NOT NULL AND c.Email LIKE N'%' + @Email + '%')
				OR (@Address IS NOT NULL AND c.Address LIKE N'%' + @Address + '%'))
			AND (@CustomerType IS NULL OR c.CustomerType = @CustomerType)
			AND (@Status IS NULL OR c.Status = @Status)
			AND c.EnterpriseId = @EnterpriseId


	ORDER BY 
		CASE WHEN @SortField = 'name' AND @SortOrder ='asc' THEN c.Name END ,
		CASE WHEN @SortField = 'name' AND @SortOrder ='desc' THEN c.Name END DESC,
		CASE WHEN @SortField = 'phone' AND @SortOrder ='asc' THEN c.Phone END ,
		CASE WHEN @SortField = 'phone' AND @SortOrder ='desc' THEN c.Phone END DESC,
		CASE WHEN @SortField = 'email' AND @SortOrder ='asc' THEN c.Email END ,
		CASE WHEN @SortField = 'email' AND @SortOrder ='desc' THEN c.Email END DESC,
		CASE WHEN @SortField = 'address' AND @SortOrder ='asc' THEN c.Address END ,
		CASE WHEN @SortField = 'address' AND @SortOrder ='desc' THEN c.Address END DESC,
		CASE WHEN @SortField = 'customerType' AND @SortOrder ='asc' THEN c.CustomerType END ,
		CASE WHEN @SortField = 'customerType' AND @SortOrder ='desc' THEN c.CustomerType END DESC,
		CASE WHEN @SortField = 'status' AND @SortOrder ='asc' THEN c.Status END ,
		CASE WHEN @SortField = 'status' AND @SortOrder ='desc' THEN c.Status END DESC

	OFFSET (@PageNumber-1)*@PageSize ROWS
	FETCH NEXT @PageSize ROWS ONLY
END