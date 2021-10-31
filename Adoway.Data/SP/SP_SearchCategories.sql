CREATE PROCEDURE [dbo].[SP_SearchCategories] 
	@ParentName NVARCHAR(255) = NULL, 
	@Name NVARCHAR(255) = NULL, 
	@Description NVARCHAR(100) = NULL,
	@EnterpriseId  UNIQUEIDENTIFIER,
	@SortOrder NVARCHAR(100),
	@SortField NVARCHAR(100),
	@PageNumber INT,
	@PageSize INT,
	@TotalCount INT OUTPUT
AS
BEGIN

    SELECT @ParentName = CASE WHEN @ParentName = '' THEN NULL ELSE @ParentName END;
	SELECT @Name = CASE WHEN @Name = '' THEN NULL ELSE @Name END;
	SELECT @Description = CASE WHEN @Description = '' THEN NULL ELSE @Description END;
	
	SELECT @TotalCount = COUNT(1)
	FROM Categoies c (NOLOCK)
		LEFT JOIN Categoies p (NOLOCK) ON c.ParentId = p.Id

	WHERE    ((@ParentName IS NULL AND @Name IS NULL AND @Description IS NULL) 
				OR (@ParentName IS NOT NULL AND p.Name LIKE N'%' + @ParentName+ '%') 
				OR (@Name IS NOT NULL AND c.Name LIKE N'%' + @Name+ '%') 
				OR (@Description IS NOT NULL AND c.Description LIKE N'%' + @Description + '%'))
			AND ((@EnterpriseId IS NULL AND c.EnterpriseId IS NULL) OR  c.EnterpriseId = @EnterpriseId)

	SELECT c.*, ISNULL(p.Name, '') AS 'ParentName'
	FROM Categoies c (NOLOCK)
		LEFT JOIN Categoies p (NOLOCK) ON c.ParentId = p.Id

	WHERE    ((@ParentName IS NULL AND @Name IS NULL AND @Description IS NULL) 
				OR (@ParentName IS NOT NULL AND p.Name LIKE N'%' + @ParentName+ '%') 
				OR (@Name IS NOT NULL AND c.Name LIKE N'%' + @Name+ '%') 
				OR (@Description IS NOT NULL AND c.Description LIKE N'%' + @Description + '%'))
			AND ((@EnterpriseId IS NULL AND c.EnterpriseId IS NULL) OR  c.EnterpriseId = @EnterpriseId)


	ORDER BY 
		CASE WHEN @SortField = 'parentName' AND @SortOrder ='asc' THEN p.Name END ,
		CASE WHEN @SortField = 'parentName' AND @SortOrder ='desc' THEN p.Name END DESC,
		CASE WHEN @SortField = 'name' AND @SortOrder ='asc' THEN c.Name END ,
		CASE WHEN @SortField = 'name' AND @SortOrder ='desc' THEN c.Name END DESC,
		CASE WHEN @SortField = 'description' AND @SortOrder ='asc' THEN c.Description END ,
		CASE WHEN @SortField = 'description' AND @SortOrder ='desc' THEN c.Description END DESC

	OFFSET (@PageNumber-1)*@PageSize ROWS
	FETCH NEXT @PageSize ROWS ONLY
END