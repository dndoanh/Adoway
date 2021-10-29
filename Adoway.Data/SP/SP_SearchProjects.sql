CREATE PROCEDURE [dbo].[SP_SearchProjects] 
	@OwnerName NVARCHAR(255) = NULL, 
	@Code NVARCHAR(255) = NULL, 
	@Name NVARCHAR(255) = NULL, 
	@SalesName NVARCHAR(255) = NULL, 
	@EnterpriseId  UNIQUEIDENTIFIER,
	@OwnerId  UNIQUEIDENTIFIER = NULL,
	@ProjectType INT = NULL,
	@AreaType INT = NULL,
	@Status INT = NULL,
	@SortOrder NVARCHAR(100),
	@SortField NVARCHAR(100),
	@PageNumber INT,
	@PageSize INT,
	@TotalCount INT OUTPUT
AS
BEGIN

    SELECT @OwnerName = CASE WHEN @OwnerName = '' THEN NULL ELSE @OwnerName END;
	SELECT @Code = CASE WHEN @Code = '' THEN NULL ELSE @Code END;
	SELECT @Name = CASE WHEN @Name = '' THEN NULL ELSE @Name END;
	SELECT @SalesName = CASE WHEN @SalesName = '' THEN NULL ELSE @SalesName END;
	
	SELECT @TotalCount = COUNT(1)
	FROM Projects p (NOLOCK)
		LEFT JOIN Owners o (NOLOCK) ON p.OwnerId = o.Id
		LEFT JOIN Users u (NOLOCK) ON p.SalesUserId = u.Id

	WHERE    ((@OwnerName IS NULL AND @Code IS NULL AND @Name IS NULL AND @SalesName IS NULL) 
				OR (@OwnerName IS NOT NULL AND o.Name LIKE N'%' + @OwnerName + '%') 
				OR (@Code IS NOT NULL AND p.Code LIKE N'%' + @Code + '%') 
				OR (@Name IS NOT NULL AND p.Name LIKE N'%' + @Name+ '%') 
				OR (@SalesName IS NOT NULL AND u.Name LIKE N'%' + @SalesName+ '%') )
			AND p.EnterpriseId = @EnterpriseId
			AND (@OwnerId IS NULL OR p.OwnerId = @OwnerId)
			AND (@ProjectType IS NULL OR p.ProjectType = @ProjectType)
			AND (@AreaType IS NULL OR p.AreaType = @AreaType)
			AND (@Status IS NULL OR p.Status = @Status)

	SELECT p.*, ISNULL(o.Name, '') AS 'OwnerName', ISNULL(u.Name, '') AS 'SalesName'
	FROM Projects p (NOLOCK)
		LEFT JOIN Owners o (NOLOCK) ON p.OwnerId = o.Id
		LEFT JOIN Users u (NOLOCK) ON p.SalesUserId = u.Id

	WHERE    ((@OwnerName IS NULL AND @Code IS NULL AND @Name IS NULL AND @SalesName IS NULL) 
				OR (@OwnerName IS NOT NULL AND o.Name LIKE N'%' + @OwnerName + '%') 
				OR (@Code IS NOT NULL AND p.Code LIKE N'%' + @Code + '%') 
				OR (@Name IS NOT NULL AND p.Name LIKE N'%' + @Name+ '%') 
				OR (@SalesName IS NOT NULL AND u.Name LIKE N'%' + @SalesName+ '%') )
			AND p.EnterpriseId = @EnterpriseId
			AND (@OwnerId IS NULL OR p.OwnerId = @OwnerId)
			AND (@ProjectType IS NULL OR p.ProjectType = @ProjectType)
			AND (@AreaType IS NULL OR p.AreaType = @AreaType)
			AND (@Status IS NULL OR p.Status = @Status)


	ORDER BY 
		CASE WHEN @SortField = 'ownerName' AND @SortOrder ='asc' THEN o.Name END ,
		CASE WHEN @SortField = 'ownerName' AND @SortOrder ='desc' THEN o.Name END DESC,
		CASE WHEN @SortField = 'salesName' AND @SortOrder ='asc' THEN u.Name END ,
		CASE WHEN @SortField = 'salesName' AND @SortOrder ='desc' THEN u.Name END DESC,
		CASE WHEN @SortField = 'code' AND @SortOrder ='asc' THEN p.Code END ,
		CASE WHEN @SortField = 'code' AND @SortOrder ='desc' THEN p.Code END DESC,
		CASE WHEN @SortField = 'name' AND @SortOrder ='asc' THEN p.Name END ,
		CASE WHEN @SortField = 'name' AND @SortOrder ='desc' THEN p.Name END DESC,
		CASE WHEN @SortField = 'activeDate' AND @SortOrder ='asc' THEN p.ActiveDate END ,
		CASE WHEN @SortField = 'activeDate' AND @SortOrder ='desc' THEN p.ActiveDate END DESC,
		CASE WHEN @SortField = 'projectType' AND @SortOrder ='asc' THEN p.ProjectType END ,
		CASE WHEN @SortField = 'projectType' AND @SortOrder ='desc' THEN p.ProjectType END DESC,
		CASE WHEN @SortField = 'areaType' AND @SortOrder ='asc' THEN p.AreaType END ,
		CASE WHEN @SortField = 'areaType' AND @SortOrder ='desc' THEN p.AreaType END DESC,
		CASE WHEN @SortField = 'apartmentCount' AND @SortOrder ='asc' THEN p.ApartmentCount END ,
		CASE WHEN @SortField = 'apartmentCount' AND @SortOrder ='desc' THEN p.ApartmentCount END DESC,
		CASE WHEN @SortField = 'status' AND @SortOrder ='asc' THEN p.Status END ,
		CASE WHEN @SortField = 'status' AND @SortOrder ='desc' THEN p.Status END DESC

	OFFSET (@PageNumber-1)*@PageSize ROWS
	FETCH NEXT @PageSize ROWS ONLY

END