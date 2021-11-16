CREATE PROCEDURE [dbo].[SP_SearchMeetingRooms] 
	@Name NVARCHAR(255) = NULL, 
	@Description NVARCHAR(100) = NULL,
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
	SELECT @Description = CASE WHEN @Description = '' THEN NULL ELSE @Description END;
	
	SELECT @TotalCount = COUNT(1)
	FROM MeetingRooms m (NOLOCK)

	WHERE    ((@Name IS NULL AND @Description IS NULL) 
				OR (@Name IS NOT NULL AND m.Name LIKE N'%' + @Name+ '%') 
				OR (@Description IS NOT NULL AND m.Description LIKE N'%' + @Description+ '%'))
			AND (@Status IS NULL OR m.Status = @Status)
			AND m.EnterpriseId = @EnterpriseId

	SELECT m.*
	FROM MeetingRooms m (NOLOCK)

	WHERE    ((@Name IS NULL AND @Description IS NULL) 
				OR (@Name IS NOT NULL AND m.Name LIKE N'%' + @Name+ '%') 
				OR (@Description IS NOT NULL AND m.Description LIKE N'%' + @Description+ '%'))
			AND (@Status IS NULL OR m.Status = @Status)
			AND m.EnterpriseId = @EnterpriseId

	ORDER BY 
		CASE WHEN @SortField = 'name' AND @SortOrder ='asc' THEN m.Name END ,
		CASE WHEN @SortField = 'name' AND @SortOrder ='desc' THEN m.Name END DESC,
		CASE WHEN @SortField = 'description' AND @SortOrder ='asc' THEN m.Description END ,
		CASE WHEN @SortField = 'description' AND @SortOrder ='desc' THEN m.Description END DESC,
		CASE WHEN @SortField = 'allowOverlap' AND @SortOrder ='asc' THEN m.AllowOverlap END ,
		CASE WHEN @SortField = 'allowOverlap' AND @SortOrder ='desc' THEN m.AllowOverlap END DESC,
		CASE WHEN @SortField = 'status' AND @SortOrder ='asc' THEN m.Status END ,
		CASE WHEN @SortField = 'status' AND @SortOrder ='desc' THEN m.Status END DESC

	OFFSET (@PageNumber-1)*@PageSize ROWS
	FETCH NEXT @PageSize ROWS ONLY
END