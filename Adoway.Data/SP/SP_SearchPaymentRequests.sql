CREATE PROCEDURE [dbo].[SP_SearchPaymentRequests] 
	@RequestNo NVARCHAR(255) = NULL, 
	@RequesterName NVARCHAR(255) = NULL, 
	@CustomerName NVARCHAR(100) = NULL,
	@ProjectName NVARCHAR(100) = NULL,
	@EnterpriseId  UNIQUEIDENTIFIER,
	@ProjectId  UNIQUEIDENTIFIER = NULL,
	@PaymentRequestStatus INT = NULL,
	@PaymentMethod INT = NULL,
	@SortOrder NVARCHAR(100),
	@SortField NVARCHAR(100),
	@PageNumber INT,
	@PageSize INT,
	@TotalCount INT OUTPUT
AS
BEGIN

    SELECT @RequestNo = CASE WHEN @RequestNo = '' THEN NULL ELSE @RequestNo END;
	SELECT @RequesterName = CASE WHEN @RequesterName = '' THEN NULL ELSE @RequesterName END;
	SELECT @CustomerName = CASE WHEN @CustomerName = '' THEN NULL ELSE @CustomerName END;
	SELECT @ProjectName = CASE WHEN @ProjectName = '' THEN NULL ELSE @ProjectName END;
	
	SELECT @TotalCount = COUNT(1)
	FROM PaymentRequests p (NOLOCK)
		INNER JOIN Users u (NOLOCK) ON p.RequesterId = u.Id
		LEFT JOIN Customers c (NOLOCK) ON p.CustomerId = c.Id
		LEFT JOIN Projects pr (NOLOCK) ON p.ProjectId = pr.Id

	WHERE    ((@RequestNo IS NULL AND @RequesterName IS NULL AND @CustomerName IS NULL AND @ProjectName IS NULL) 
				OR (@RequestNo IS NOT NULL AND p.RequestNo LIKE N'%' + @RequestNo+ '%') 
				OR (@RequesterName IS NOT NULL AND u.Name LIKE N'%' + @RequesterName+ '%') 
				OR (@CustomerName IS NOT NULL AND c.Name LIKE N'%' + @CustomerName + '%')
				OR (@ProjectName IS NOT NULL AND pr.Name LIKE N'%' + @ProjectName + '%'))
			AND (@PaymentRequestStatus IS NULL OR p.Status = @PaymentRequestStatus)
			AND (@PaymentMethod IS NULL OR p.PaymentMethod = @PaymentMethod)
			AND p.EnterpriseId = @EnterpriseId
			AND ((@ProjectId IS NULL AND c.ProjectId IS NULL) OR c.ProjectId = @ProjectId)

	SELECT p.*,  ISNULL(u.Name, '') AS 'RequesterName', ISNULL(c.Name, '') AS 'CustomerName', ISNULL(pr.Name, '') AS 'ProjectName' 
	FROM PaymentRequests p (NOLOCK)
		INNER JOIN Users u (NOLOCK) ON p.RequesterId = u.Id
		LEFT JOIN Customers c (NOLOCK) ON p.CustomerId = c.Id
		LEFT JOIN Projects pr (NOLOCK) ON p.ProjectId = pr.Id

	WHERE    ((@RequestNo IS NULL AND @RequesterName IS NULL AND @CustomerName IS NULL AND @ProjectName IS NULL) 
				OR (@RequestNo IS NOT NULL AND p.RequestNo LIKE N'%' + @RequestNo+ '%') 
				OR (@RequesterName IS NOT NULL AND u.Name LIKE N'%' + @RequesterName+ '%') 
				OR (@CustomerName IS NOT NULL AND c.Name LIKE N'%' + @CustomerName + '%')
				OR (@ProjectName IS NOT NULL AND pr.Name LIKE N'%' + @ProjectName + '%'))
			AND (@PaymentRequestStatus IS NULL OR p.Status = @PaymentRequestStatus)
			AND (@PaymentMethod IS NULL OR p.PaymentMethod = @PaymentMethod)
			AND c.EnterpriseId = @EnterpriseId
			AND ((@ProjectId IS NULL AND c.ProjectId IS NULL) OR c.ProjectId = @ProjectId)

	ORDER BY 
		CASE WHEN @SortField = 'requesterName' AND @SortOrder ='asc' THEN u.Name END ,
		CASE WHEN @SortField = 'requesterName' AND @SortOrder ='desc' THEN u.Name END DESC,
		CASE WHEN @SortField = 'customerName' AND @SortOrder ='asc' THEN c.Name END ,
		CASE WHEN @SortField = 'customerName' AND @SortOrder ='desc' THEN c.Name END DESC,
		CASE WHEN @SortField = 'projectName' AND @SortOrder ='asc' THEN pr.Name END ,
		CASE WHEN @SortField = 'projectName' AND @SortOrder ='desc' THEN pr.Name END DESC,
		CASE WHEN @SortField = 'requestNo' AND @SortOrder ='asc' THEN p.RequestNo END ,
		CASE WHEN @SortField = 'requestNo' AND @SortOrder ='desc' THEN p.RequestNo END DESC,
		CASE WHEN @SortField = 'paymentMethod' AND @SortOrder ='asc' THEN p.PaymentMethod END ,
		CASE WHEN @SortField = 'paymentMethod' AND @SortOrder ='desc' THEN p.PaymentMethod END DESC,
		CASE WHEN @SortField = 'status' AND @SortOrder ='asc' THEN p.Status END ,
		CASE WHEN @SortField = 'status' AND @SortOrder ='desc' THEN p.Status END DESC,
		CASE WHEN @SortField = 'amount' AND @SortOrder ='asc' THEN p.Amount END ,
		CASE WHEN @SortField = 'amount' AND @SortOrder ='desc' THEN p.Amount END DESC

	OFFSET (@PageNumber-1)*@PageSize ROWS
	FETCH NEXT @PageSize ROWS ONLY
END