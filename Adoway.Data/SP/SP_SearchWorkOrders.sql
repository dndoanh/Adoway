CREATE PROCEDURE [dbo].[SP_SearchWorkOrders] 
	@Code NVARCHAR(255) = NULL, 
	@ProjectName NVARCHAR(255) = NULL, 
	@SupplierName NVARCHAR(255) = NULL, 
	@RequesterName NVARCHAR(255) = NULL, 
	@FromDate DATETIME = NULL, 
	@ToDate DATETIME = NULL, 
	@EnterpriseId  UNIQUEIDENTIFIER,
	@WorkOrderType INT = NULL,
	@WorkOrderCategory INT = NULL,
	@ProjectId  UNIQUEIDENTIFIER = NULL,
	@SupplierId  UNIQUEIDENTIFIER = NULL,
	@Status INT = NULL,
	@SortOrder NVARCHAR(100),
	@SortField NVARCHAR(100),
	@PageNumber INT,
	@PageSize INT,
	@TotalCount INT OUTPUT
AS
BEGIN

	SELECT @Code = CASE WHEN @Code = '' THEN NULL ELSE @Code END;
	SELECT @SupplierName = CASE WHEN @SupplierName = '' THEN NULL ELSE @SupplierName END;
	SELECT @ProjectName = CASE WHEN @ProjectName = '' THEN NULL ELSE @ProjectName END;
	SELECT @RequesterName = CASE WHEN @RequesterName = '' THEN NULL ELSE @RequesterName END;

	
	SELECT @TotalCount = COUNT(1)
	FROM WorkOrders w (NOLOCK)
		INNER JOIN Users u (NOLOCK) ON w.RequesterId = u.Id
		LEFT JOIN Projects p (NOLOCK) ON w.ProjectId = p.Id
		LEFT JOIN Suppliers s (NOLOCK) ON w.SupplierId = s.Id

	WHERE    ((@Code IS NULL AND @ProjectName IS NULL AND @SupplierName IS NULL AND @RequesterName IS NULL) 
				OR (@Code IS NOT NULL AND w.Code LIKE N'%' + @Code + '%') 
				OR (@ProjectName IS NOT NULL AND p.Name LIKE N'%' + @ProjectName+ '%')
				OR (@SupplierName IS NOT NULL AND s.Name LIKE N'%' + @SupplierName+ '%')
				OR (@RequesterName IS NOT NULL AND u.Name LIKE N'%' + @RequesterName+ '%') )
			AND p.EnterpriseId = @EnterpriseId
			AND (@FromDate IS NULL OR CONVERT(VARCHAR, @FromDate, 112) <= CONVERT(VARCHAR, w.CreatedAt, 112))
			AND (@ToDate IS NULL OR CONVERT(VARCHAR, @ToDate, 112) >= CONVERT(VARCHAR, w.CreatedAt, 112))
			AND (@WorkOrderType IS NULL OR w.WorkOrderType = @WorkOrderType)
			AND (@WorkOrderCategory IS NULL OR w.WorkOrderCategory = @WorkOrderCategory)
			AND (@ProjectId IS NULL OR w.ProjectId = @ProjectId)
			AND (@SupplierId IS NULL OR w.SupplierId = @SupplierId)
			AND (@Status IS NULL OR p.Status = @Status)

	SELECT w.*, ISNULL(p.Name, '') AS 'ProjectName', ISNULL(s.Name, '') AS 'SupplierName', ISNULL(u.Name, '') AS 'RequesterName'
	FROM WorkOrders w (NOLOCK)
		INNER JOIN Users u (NOLOCK) ON w.RequesterId = u.Id
		LEFT JOIN Projects p (NOLOCK) ON w.ProjectId = p.Id
		LEFT JOIN Suppliers s (NOLOCK) ON w.SupplierId = s.Id

	WHERE    ((@Code IS NULL AND @ProjectName IS NULL AND @SupplierName IS NULL AND @RequesterName IS NULL) 
				OR (@Code IS NOT NULL AND w.Code LIKE N'%' + @Code + '%') 
				OR (@ProjectName IS NOT NULL AND p.Name LIKE N'%' + @ProjectName+ '%')
				OR (@SupplierName IS NOT NULL AND s.Name LIKE N'%' + @SupplierName+ '%')
				OR (@RequesterName IS NOT NULL AND u.Name LIKE N'%' + @RequesterName+ '%') )
			AND p.EnterpriseId = @EnterpriseId
			AND (@FromDate IS NULL OR CONVERT(VARCHAR, @FromDate, 112) <= CONVERT(VARCHAR, w.CreatedAt, 112))
			AND (@ToDate IS NULL OR CONVERT(VARCHAR, @ToDate, 112) >= CONVERT(VARCHAR, w.CreatedAt, 112))
			AND (@WorkOrderType IS NULL OR w.WorkOrderType = @WorkOrderType)
			AND (@WorkOrderCategory IS NULL OR w.WorkOrderCategory = @WorkOrderCategory)
			AND (@ProjectId IS NULL OR w.ProjectId = @ProjectId)
			AND (@SupplierId IS NULL OR w.SupplierId = @SupplierId)
			AND (@Status IS NULL OR p.Status = @Status)


	ORDER BY 
		CASE WHEN @SortField = 'projectName' AND @SortOrder ='asc' THEN p.Name END ,
		CASE WHEN @SortField = 'projectName' AND @SortOrder ='desc' THEN p.Name END DESC,
		CASE WHEN @SortField = 'supplierName' AND @SortOrder ='asc' THEN s.Name END ,
		CASE WHEN @SortField = 'supplierName' AND @SortOrder ='desc' THEN s.Name END DESC,
		CASE WHEN @SortField = 'requesterName' AND @SortOrder ='asc' THEN u.Name END ,
		CASE WHEN @SortField = 'requesterName' AND @SortOrder ='desc' THEN u.Name END DESC,
		CASE WHEN @SortField = 'code' AND @SortOrder ='asc' THEN w.Code END ,
		CASE WHEN @SortField = 'code' AND @SortOrder ='desc' THEN w.Code END DESC,
		CASE WHEN @SortField = 'createdAt' AND @SortOrder ='asc' THEN w.CreatedAt END ,
		CASE WHEN @SortField = 'createdAt' AND @SortOrder ='desc' THEN w.CreatedAt END DESC,
		CASE WHEN @SortField = 'workOrderType' AND @SortOrder ='asc' THEN w.WorkOrderType END ,
		CASE WHEN @SortField = 'workOrderType' AND @SortOrder ='desc' THEN w.WorkOrderType END DESC,
		CASE WHEN @SortField = 'workOrderCategory' AND @SortOrder ='asc' THEN w.WorkOrderCategory END ,
		CASE WHEN @SortField = 'workOrderCategory' AND @SortOrder ='desc' THEN w.WorkOrderCategory END DESC,
		CASE WHEN @SortField = 'status' AND @SortOrder ='asc' THEN w.Status END ,
		CASE WHEN @SortField = 'status' AND @SortOrder ='desc' THEN w.Status END DESC

	OFFSET (@PageNumber-1)*@PageSize ROWS
	FETCH NEXT @PageSize ROWS ONLY

END