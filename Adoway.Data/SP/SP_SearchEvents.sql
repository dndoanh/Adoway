CREATE PROCEDURE [dbo].[SP_SearchEvents] 
	@Title NVARCHAR(255) = NULL, 
	@MeetingRoomName NVARCHAR(255) = NULL, 
	@FromDate DATETIME = NULL, 
	@ToDate DATETIME = NULL, 
	@EnterpriseId  UNIQUEIDENTIFIER,
	@Status INT = NULL,
	@SortOrder NVARCHAR(100),
	@SortField NVARCHAR(100),
	@PageNumber INT,
	@PageSize INT,
	@TotalCount INT OUTPUT
AS
BEGIN

	SELECT @Title = CASE WHEN @Title = '' THEN NULL ELSE @Title END;
	SELECT @MeetingRoomName = CASE WHEN @MeetingRoomName = '' THEN NULL ELSE @MeetingRoomName END;

	
	SELECT @TotalCount = COUNT(1)
	FROM Events e (NOLOCK)
		INNER JOIN MeetingRooms m (NOLOCK) ON e.MeetingRoomId = m.Id

	WHERE    ((@Title IS NULL AND @MeetingRoomName IS NULL) 
				OR (@Title IS NOT NULL AND e.Title LIKE N'%' + @Title + '%') 
				OR (@MeetingRoomName IS NOT NULL AND m.Name LIKE N'%' + @MeetingRoomName+ '%') )
			AND e.EnterpriseId = @EnterpriseId
			AND (@FromDate IS NULL OR CONVERT(VARCHAR, @FromDate, 112) <= CONVERT(VARCHAR, e.StartDate, 112))
			AND (@ToDate IS NULL OR CONVERT(VARCHAR, @ToDate, 112) >= CONVERT(VARCHAR, e.StartDate, 112))
			AND (@Status IS NULL OR e.Status = @Status)

	SELECT e.*, ISNULL(m.Name, '') AS 'MeetingRoomName' 
	FROM Events e (NOLOCK)
		INNER JOIN MeetingRooms m (NOLOCK) ON e.MeetingRoomId = m.Id

	WHERE    ((@Title IS NULL AND @MeetingRoomName IS NULL) 
				OR (@Title IS NOT NULL AND e.Title LIKE N'%' + @Title + '%') 
				OR (@MeetingRoomName IS NOT NULL AND m.Name LIKE N'%' + @MeetingRoomName+ '%') )
			AND e.EnterpriseId = @EnterpriseId
			AND (@FromDate IS NULL OR CONVERT(VARCHAR, @FromDate, 112) <= CONVERT(VARCHAR, e.StartDate, 112))
			AND (@ToDate IS NULL OR CONVERT(VARCHAR, @ToDate, 112) >= CONVERT(VARCHAR, e.StartDate, 112))
			AND (@Status IS NULL OR e.Status = @Status)

	ORDER BY 
		CASE WHEN @SortField = 'meetingRoomName' AND @SortOrder ='asc' THEN m.Name END ,
		CASE WHEN @SortField = 'meetingRoomName' AND @SortOrder ='desc' THEN m.Name END DESC,
		CASE WHEN @SortField = 'title' AND @SortOrder ='asc' THEN e.Title END ,
		CASE WHEN @SortField = 'title' AND @SortOrder ='desc' THEN e.Title END DESC,
		CASE WHEN @SortField = 'startDate' AND @SortOrder ='asc' THEN e.StartDate END ,
		CASE WHEN @SortField = 'startDate' AND @SortOrder ='desc' THEN e.StartDate END DESC,
		CASE WHEN @SortField = 'status' AND @SortOrder ='asc' THEN e.Status END ,
		CASE WHEN @SortField = 'status' AND @SortOrder ='desc' THEN e.Status END DESC

	OFFSET (@PageNumber-1)*@PageSize ROWS
	FETCH NEXT @PageSize ROWS ONLY

END