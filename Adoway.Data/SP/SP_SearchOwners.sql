CREATE PROCEDURE [dbo].[SP_SearchOwners] 
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
	FROM Owners o (NOLOCK)

	WHERE    ((@Name IS NULL AND @ContactName IS NULL AND @ContactPhone IS NULL AND @ContactEmail IS NULL) 
				OR (@Name IS NOT NULL AND o.Name LIKE N'%' + @Name+ '%') 
				OR (@ContactName IS NOT NULL AND o.ContactName LIKE N'%' + @ContactName + '%')
				OR (@ContactPhone IS NOT NULL AND o.ContactPhone LIKE N'%' + @ContactPhone + '%')
				OR (@ContactEmail IS NOT NULL AND o.ContactEmail LIKE N'%' + @ContactEmail + '%'))
			AND (@Status IS NULL OR o.Status = @Status)
			AND o.EnterpriseId = @EnterpriseId

	SELECT o.*
	FROM Owners o (NOLOCK)

	WHERE    ((@Name IS NULL AND @ContactName IS NULL AND @ContactPhone IS NULL AND @ContactEmail IS NULL) 
				OR (@Name IS NOT NULL AND o.Name LIKE N'%' + @Name+ '%') 
				OR (@ContactName IS NOT NULL AND o.ContactName LIKE N'%' + @ContactName + '%')
				OR (@ContactPhone IS NOT NULL AND o.ContactPhone LIKE N'%' + @ContactPhone + '%')
				OR (@ContactEmail IS NOT NULL AND o.ContactEmail LIKE N'%' + @ContactEmail + '%'))
			AND (@Status IS NULL OR o.Status = @Status)
			AND o.EnterpriseId = @EnterpriseId


	ORDER BY 
		CASE WHEN @SortField = 'name' AND @SortOrder ='asc' THEN o.Name END ,
		CASE WHEN @SortField = 'name' AND @SortOrder ='desc' THEN o.Name END DESC,
		CASE WHEN @SortField = 'contactName' AND @SortOrder ='asc' THEN o.ContactName END ,
		CASE WHEN @SortField = 'contactName' AND @SortOrder ='desc' THEN o.ContactName END DESC,
		CASE WHEN @SortField = 'contactPhone' AND @SortOrder ='asc' THEN o.ContactPhone END ,
		CASE WHEN @SortField = 'contactPhone' AND @SortOrder ='desc' THEN o.ContactPhone END DESC,
		CASE WHEN @SortField = 'contactEmail' AND @SortOrder ='asc' THEN o.ContactEmail END ,
		CASE WHEN @SortField = 'contactEmail' AND @SortOrder ='desc' THEN o.ContactEmail END DESC,
		CASE WHEN @SortField = 'status' AND @SortOrder ='asc' THEN o.Status END ,
		CASE WHEN @SortField = 'status' AND @SortOrder ='desc' THEN o.Status END DESC

	OFFSET (@PageNumber-1)*@PageSize ROWS
	FETCH NEXT @PageSize ROWS ONLY
END