CREATE PROCEDURE [dbo].[SP_SearchEnterprises] 
	@Name NVARCHAR(255) = NULL, 
	@Email NVARCHAR(100) = NULL,
	@Phone NVARCHAR(100) = NULL,
	@Address NVARCHAR(100) = NULL,
	@Status INT = NULL,
	@SortOrder NVARCHAR(100),
	@SortField NVARCHAR(100),
	@PageNumber INT,
	@PageSize INT,
	@TotalCount INT OUTPUT
AS
BEGIN

    SELECT @Name = CASE WHEN @Name = '' THEN NULL ELSE @Name END;
	SELECT @Email = CASE WHEN @Email = '' THEN NULL ELSE @Email END;
	SELECT @Phone = CASE WHEN @Phone = '' THEN NULL ELSE @Phone END;
	SELECT @Address = CASE WHEN @Address = '' THEN NULL ELSE @Address END;
	
	SELECT @TotalCount = COUNT(1)
	FROM Enterprises e (NOLOCK)

	WHERE    ((@Name IS NULL AND @Email IS NULL AND @Phone IS NULL AND @Address IS NULL) 
				OR (@Name IS NOT NULL AND e.Name LIKE N'%' + @Name+ '%') 
				OR (@Email IS NOT NULL AND e.Email LIKE N'%' + @Email + '%')
				OR (@Phone IS NOT NULL AND e.Phone LIKE N'%' + @Phone + '%')
				OR (@Address IS NOT NULL AND e.Address LIKE N'%' + @Address + '%'))
			AND (@Status IS NULL OR e.Status = @Status)

	SELECT e.*
	FROM Enterprises e (NOLOCK)

	WHERE    ((@Name IS NULL AND @Email IS NULL AND @Phone IS NULL AND @Address IS NULL) 
				OR (@Name IS NOT NULL AND e.Name LIKE N'%' + @Name+ '%') 
				OR (@Email IS NOT NULL AND e.Email LIKE N'%' + @Email + '%')
				OR (@Phone IS NOT NULL AND e.Phone LIKE N'%' + @Phone + '%')
				OR (@Address IS NOT NULL AND e.Address LIKE N'%' + @Address + '%'))
			AND (@Status IS NULL OR e.Status = @Status)


	ORDER BY 
		CASE WHEN @SortField = 'name' AND @SortOrder ='asc' THEN e.Name END ,
		CASE WHEN @SortField = 'name' AND @SortOrder ='desc' THEN e.Name END DESC,
		CASE WHEN @SortField = 'email' AND @SortOrder ='asc' THEN e.Email END ,
		CASE WHEN @SortField = 'email' AND @SortOrder ='desc' THEN e.Email END DESC,
		CASE WHEN @SortField = 'phone' AND @SortOrder ='asc' THEN e.Phone END ,
		CASE WHEN @SortField = 'phone' AND @SortOrder ='desc' THEN e.Phone END DESC,
		CASE WHEN @SortField = 'address' AND @SortOrder ='asc' THEN e.Address END ,
		CASE WHEN @SortField = 'address' AND @SortOrder ='desc' THEN e.Address END DESC,
		CASE WHEN @SortField = 'status' AND @SortOrder ='asc' THEN e.Status END,
		CASE WHEN @SortField = 'status' AND @SortOrder ='desc' THEN e.Status END DESC
		

	OFFSET (@PageNumber-1)*@PageSize ROWS
	FETCH NEXT @PageSize ROWS ONLY
END