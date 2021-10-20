CREATE PROCEDURE [dbo].[SP_SearchRoles] 
	@Name NVARCHAR(255) = NULL, 
	@Description NVARCHAR(100) = NULL,
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
	SELECT @Description = CASE WHEN @Description = '' THEN NULL ELSE @Description END;
	
	SELECT @TotalCount = COUNT(1)
	FROM Roles r (NOLOCK)

	WHERE    ((@Name IS NULL AND @Description IS NULL) 
				OR (@Name IS NOT NULL AND r.Name LIKE N'%' + @Name+ '%') 
				OR (@Description IS NOT NULL AND r.Description LIKE N'%' + @Description + '%'))
			AND (@Status IS NULL OR r.Status = @Status)
			AND ((@EnterpriseId IS NULL AND r.EnterpriseId IS NULL) OR  r.EnterpriseId = @EnterpriseId)

	SELECT r.*
	FROM Roles r (NOLOCK)

	WHERE    ((@Name IS NULL AND @Description IS NULL) 
				OR (@Name IS NOT NULL AND r.Name LIKE N'%' + @Name+ '%') 
				OR (@Description IS NOT NULL AND r.Description LIKE N'%' + @Description + '%'))
			AND (@Status IS NULL OR r.Status = @Status)
			AND ((@EnterpriseId IS NULL AND r.EnterpriseId IS NULL) OR  r.EnterpriseId = @EnterpriseId)


	ORDER BY 
		CASE WHEN @SortField = 'name' AND @SortOrder ='asc' THEN r.Name END ,
		CASE WHEN @SortField = 'name' AND @SortOrder ='desc' THEN r.Name END DESC,
		CASE WHEN @SortField = 'description' AND @SortOrder ='asc' THEN r.Description END ,
		CASE WHEN @SortField = 'description' AND @SortOrder ='desc' THEN r.Description END DESC,
		CASE WHEN @SortField = 'status' AND @SortOrder ='asc' THEN r.Status END ,
		CASE WHEN @SortField = 'status' AND @SortOrder ='desc' THEN r.Status END DESC

	OFFSET (@PageNumber-1)*@PageSize ROWS
	FETCH NEXT @PageSize ROWS ONLY
END