CREATE PROCEDURE [dbo].[SP_SearchSuppliers] 
	@Name NVARCHAR(255) = NULL, 
	@ContactName NVARCHAR(100) = NULL,
	@ContactPhone NVARCHAR(100) = NULL,
	@ContactEmail NVARCHAR(100) = NULL,
	@EnterpriseId  UNIQUEIDENTIFIER,
	@Status INT = NULL,
	@SortOrder NVARCHAR(100),
	@SortField NVARCHAR(100),
	@PageNumber INT,
	@PageSize INT,
	@TotalCount INT OUTPUT
AS
BEGIN

    SELECT @Name = CASE WHEN @Name = '' THEN NULL ELSE @Name END;
	SELECT @ContactName = CASE WHEN @ContactName = '' THEN NULL ELSE @ContactName END;
	SELECT @ContactPhone = CASE WHEN @ContactPhone = '' THEN NULL ELSE @ContactPhone END;
	SELECT @ContactEmail = CASE WHEN @ContactEmail = '' THEN NULL ELSE @ContactEmail END;
	
	SELECT @TotalCount = COUNT(1)
	FROM Suppliers s (NOLOCK)

	WHERE    ((@Name IS NULL AND @ContactName IS NULL AND @ContactPhone IS NULL AND @ContactEmail IS NULL) 
				OR (@Name IS NOT NULL AND s.Name LIKE N'%' + @Name+ '%') 
				OR (@ContactName IS NOT NULL AND s.ContactName LIKE N'%' + @ContactName + '%')
				OR (@ContactPhone IS NOT NULL AND s.ContactPhone LIKE N'%' + @ContactPhone + '%')
				OR (@ContactEmail IS NOT NULL AND s.ContactEmail LIKE N'%' + @ContactEmail + '%'))
			AND (@Status IS NULL OR s.Status = @Status)
			AND s.EnterpriseId = @EnterpriseId

	SELECT s.*
	FROM Suppliers s (NOLOCK)

	WHERE    ((@Name IS NULL AND @ContactName IS NULL AND @ContactPhone IS NULL AND @ContactEmail IS NULL) 
				OR (@Name IS NOT NULL AND s.Name LIKE N'%' + @Name+ '%') 
				OR (@ContactName IS NOT NULL AND s.ContactName LIKE N'%' + @ContactName + '%')
				OR (@ContactPhone IS NOT NULL AND s.ContactPhone LIKE N'%' + @ContactPhone + '%')
				OR (@ContactEmail IS NOT NULL AND s.ContactEmail LIKE N'%' + @ContactEmail + '%'))
			AND (@Status IS NULL OR s.Status = @Status)
			AND s.EnterpriseId = @EnterpriseId


	ORDER BY 
		CASE WHEN @SortField = 'name' AND @SortOrder ='asc' THEN s.Name END ,
		CASE WHEN @SortField = 'name' AND @SortOrder ='desc' THEN s.Name END DESC,
		CASE WHEN @SortField = 'contactName' AND @SortOrder ='asc' THEN s.ContactName END ,
		CASE WHEN @SortField = 'contactName' AND @SortOrder ='desc' THEN s.ContactName END DESC,
		CASE WHEN @SortField = 'contactPhone' AND @SortOrder ='asc' THEN s.ContactPhone END ,
		CASE WHEN @SortField = 'contactPhone' AND @SortOrder ='desc' THEN s.ContactPhone END DESC,
		CASE WHEN @SortField = 'contactEmail' AND @SortOrder ='asc' THEN s.ContactEmail END ,
		CASE WHEN @SortField = 'contactEmail' AND @SortOrder ='desc' THEN s.ContactEmail END DESC,
		CASE WHEN @SortField = 'status' AND @SortOrder ='asc' THEN s.Status END ,
		CASE WHEN @SortField = 'status' AND @SortOrder ='desc' THEN s.Status END DESC

	OFFSET (@PageNumber-1)*@PageSize ROWS
	FETCH NEXT @PageSize ROWS ONLY
END