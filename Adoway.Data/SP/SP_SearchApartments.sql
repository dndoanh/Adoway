CREATE PROCEDURE [dbo].[SP_SearchApartments] 
	@ProjectName NVARCHAR(255) = NULL, 
	@OwnerName NVARCHAR(255) = NULL, 
	@Name NVARCHAR(255) = NULL, 
	@Floor NVARCHAR(255) = NULL, 
	@Block NVARCHAR(255) = NULL, 
	@InternetLine NVARCHAR(255) = NULL, 
	@TvLine NVARCHAR(255) = NULL, 
	@EnterpriseId  UNIQUEIDENTIFIER,
	@PrjectId  UNIQUEIDENTIFIER = NULL,
	@SortOrder NVARCHAR(100),
	@SortField NVARCHAR(100),
	@PageNumber INT,
	@PageSize INT,
	@TotalCount INT OUTPUT
AS
BEGIN

    SELECT @ProjectName = CASE WHEN @ProjectName = '' THEN NULL ELSE @ProjectName END;
	SELECT @OwnerName = CASE WHEN @OwnerName = '' THEN NULL ELSE @OwnerName END;
	SELECT @Name = CASE WHEN @Name = '' THEN NULL ELSE @Name END;
	SELECT @Floor = CASE WHEN @Floor = '' THEN NULL ELSE @Floor END;
	SELECT @Block = CASE WHEN @Block = '' THEN NULL ELSE @Block END;
	SELECT @InternetLine = CASE WHEN @InternetLine = '' THEN NULL ELSE @InternetLine END;
	SELECT @TvLine = CASE WHEN @TvLine = '' THEN NULL ELSE @TvLine END;
	
	SELECT @TotalCount = COUNT(1)
	FROM Apartments a (NOLOCK)
		INNER JOIN Projects p (NOLOCK) ON a.ProjectId = p.Id
		LEFT JOIN Customers c (NOLOCK) ON a.OwnerId = c.Id

	WHERE    ((@ProjectName IS NULL AND @OwnerName IS NULL AND @Name IS NULL AND @Floor IS NULL AND @Block IS NULL AND @InternetLine IS NULL AND @TvLine IS NULL) 
				OR (@ProjectName IS NOT NULL AND p.Name LIKE N'%' + @ProjectName + '%') 
				OR (@OwnerName IS NOT NULL AND c.Name LIKE N'%' + @OwnerName + '%') 
				OR (@Name IS NOT NULL AND a.Name LIKE N'%' + @Name+ '%') 
				OR (@Floor IS NOT NULL AND a.Floor LIKE N'%' + @Floor+ '%') 
				OR (@Block IS NOT NULL AND a.Block LIKE N'%' + @Block+ '%') 
				OR (@InternetLine IS NOT NULL AND a.InternetLine LIKE N'%' + @InternetLine+ '%') 
				OR (@TvLine IS NOT NULL AND a.TvLine LIKE N'%' + @TvLine+ '%') )
			AND (p.EnterpriseId = @EnterpriseId)
			AND (@PrjectId IS NULL OR  a.ProjectId = @PrjectId)

	SELECT a.*, ISNULL(p.Name, '') AS 'ProjectName', ISNULL(c.Name, '') AS 'OwnerName'
	FROM Apartments a (NOLOCK)
		INNER JOIN Projects p (NOLOCK) ON a.ProjectId = p.Id
		LEFT JOIN Customers c (NOLOCK) ON a.OwnerId = c.Id

	WHERE    ((@ProjectName IS NULL AND @OwnerName IS NULL AND @Name IS NULL AND @Floor IS NULL AND @Block IS NULL AND @InternetLine IS NULL AND @TvLine IS NULL) 
				OR (@ProjectName IS NOT NULL AND p.Name LIKE N'%' + @ProjectName + '%') 
				OR (@OwnerName IS NOT NULL AND c.Name LIKE N'%' + @OwnerName + '%') 
				OR (@Name IS NOT NULL AND a.Name LIKE N'%' + @Name+ '%') 
				OR (@Floor IS NOT NULL AND a.Floor LIKE N'%' + @Floor+ '%') 
				OR (@Block IS NOT NULL AND a.Block LIKE N'%' + @Block+ '%') 
				OR (@InternetLine IS NOT NULL AND a.InternetLine LIKE N'%' + @InternetLine+ '%') 
				OR (@TvLine IS NOT NULL AND a.TvLine LIKE N'%' + @TvLine+ '%') )
			AND (p.EnterpriseId = @EnterpriseId)
			AND (@PrjectId IS NULL OR  a.ProjectId = @PrjectId)


	ORDER BY 
		CASE WHEN @SortField = 'projectName' AND @SortOrder ='asc' THEN p.Name END ,
		CASE WHEN @SortField = 'projectName' AND @SortOrder ='desc' THEN p.Name END DESC,
		CASE WHEN @SortField = 'ownerName' AND @SortOrder ='asc' THEN c.Name END ,
		CASE WHEN @SortField = 'ownerName' AND @SortOrder ='desc' THEN c.Name END DESC,
		CASE WHEN @SortField = 'name' AND @SortOrder ='asc' THEN a.Name END ,
		CASE WHEN @SortField = 'name' AND @SortOrder ='desc' THEN a.Name END DESC,
		CASE WHEN @SortField = 'block' AND @SortOrder ='asc' THEN a.Block END ,
		CASE WHEN @SortField = 'block' AND @SortOrder ='desc' THEN a.Block END DESC,
		CASE WHEN @SortField = 'floor' AND @SortOrder ='asc' THEN a.Floor END ,
		CASE WHEN @SortField = 'floor' AND @SortOrder ='desc' THEN a.Floor END DESC,
		CASE WHEN @SortField = 'internetLine' AND @SortOrder ='asc' THEN a.InternetLine END ,
		CASE WHEN @SortField = 'internetLine' AND @SortOrder ='desc' THEN a.InternetLine END DESC,
		CASE WHEN @SortField = 'tvLine' AND @SortOrder ='asc' THEN a.TvLine END ,
		CASE WHEN @SortField = 'tvLine' AND @SortOrder ='desc' THEN a.TvLine END DESC

	OFFSET (@PageNumber-1)*@PageSize ROWS
	FETCH NEXT @PageSize ROWS ONLY

END