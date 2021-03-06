CREATE PROCEDURE [dbo].[SP_SearchLanguages] 
	@Name NVARCHAR(255) = NULL, 
	@Locale NVARCHAR(255) = NULL,
	@Status INT = NULL,
	@SortOrder NVARCHAR(100),
	@SortField NVARCHAR(100),
	@PageNumber INT,
	@PageSize INT,
	@TotalCount INT OUTPUT
AS
BEGIN

    SELECT @Name = CASE WHEN @Name = '' THEN NULL ELSE @Name END;
	SELECT @Locale = CASE WHEN @Locale = '' THEN NULL ELSE @Locale END;
	
	SELECT @TotalCount = COUNT(1)
	FROM Languages l (NOLOCK)
	WHERE    ((@Name IS NULL AND @Locale IS NULL) OR (@Name IS NOT NULL AND l.Name LIKE N'%' + @Name+ '%') OR (@Locale IS NOT NULL AND l.Locale LIKE N'%' + @Locale + '%'))
							AND (@Status IS NULL OR l.Status = @Status)

	SELECT l.*
	FROM Languages l (NOLOCK)
	WHERE    ((@Name IS NULL AND @Locale IS NULL) OR (@Name IS NOT NULL AND l.Name LIKE N'%' + @Name+ '%') OR (@Locale IS NOT NULL AND l.Locale LIKE N'%' + @Locale + '%'))
							AND (@Status IS NULL OR l.Status = @Status)

	ORDER BY 
		CASE WHEN @SortField = 'name' AND @SortOrder ='asc' THEN Name END ,
		CASE WHEN @SortField = 'name' AND @SortOrder ='desc' THEN Name END DESC,
		CASE WHEN @SortField = 'locale' AND @SortOrder ='asc' THEN Locale END ,
		CASE WHEN @SortField = 'locale' AND @SortOrder ='desc' THEN Locale END DESC,
		CASE WHEN @SortField = 'status' AND @SortOrder ='asc' THEN Status END ,
		CASE WHEN @SortField = 'status' AND @SortOrder ='desc' THEN Status END DESC

	OFFSET (@PageNumber-1)*@PageSize ROWS
	FETCH NEXT @PageSize ROWS ONLY
END