ALTER PROCEDURE [dbo].[SP_SearchUsers] 
	@Name NVARCHAR(255) = NULL, 
	@Email NVARCHAR(100) = NULL,
	@EnterpriseId  UNIQUEIDENTIFIER = NULL,
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
	
	SELECT @TotalCount = COUNT(1)
	FROM Users u (NOLOCK)

	WHERE    ((@Name IS NULL AND @Email IS NULL) 
				OR (@Name IS NOT NULL AND u.Name LIKE N'%' + @Name+ '%') 
				OR (@Email IS NOT NULL AND u.Email LIKE N'%' + @Email + '%'))
			AND (@Status IS NULL OR u.Status = @Status)
			AND ((@EnterpriseId IS NULL AND u.EnterpriseId IS NULL) OR  u.EnterpriseId = @EnterpriseId)

	SELECT u.*
	FROM Users u (NOLOCK)

	WHERE    ((@Name IS NULL AND @Email IS NULL) 
				OR (@Name IS NOT NULL AND u.Name LIKE N'%' + @Name+ '%') 
				OR (@Email IS NOT NULL AND u.Email LIKE N'%' + @Email + '%'))
			AND (@Status IS NULL OR u.Status = @Status)
			AND ((@EnterpriseId IS NULL AND u.EnterpriseId IS NULL) OR  u.EnterpriseId = @EnterpriseId)


	ORDER BY 
		CASE WHEN @SortField = 'name' AND @SortOrder ='asc' THEN u.Name END ,
		CASE WHEN @SortField = 'name' AND @SortOrder ='desc' THEN u.Name END DESC,
		CASE WHEN @SortField = 'email' AND @SortOrder ='asc' THEN u.Email END ,
		CASE WHEN @SortField = 'email' AND @SortOrder ='desc' THEN u.Email END DESC,
		CASE WHEN @SortField = 'status' AND @SortOrder ='asc' THEN u.Status END ,
		CASE WHEN @SortField = 'status' AND @SortOrder ='desc' THEN u.Status END DESC

	OFFSET (@PageNumber-1)*@PageSize ROWS
	FETCH NEXT @PageSize ROWS ONLY
END