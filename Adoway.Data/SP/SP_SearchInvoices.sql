CREATE PROCEDURE [dbo].[SP_SearchInvoices] 
	@InvoiceNo NVARCHAR(255) = NULL, 
	@CustomerName NVARCHAR(255) = NULL, 
	@SupplierName NVARCHAR(100) = NULL,
	@ProjectName NVARCHAR(100) = NULL,
	@EnterpriseId  UNIQUEIDENTIFIER,
	@SupplierId  UNIQUEIDENTIFIER = NULL,
	@ProjectId  UNIQUEIDENTIFIER = NULL,
	@PaymentStatus INT = NULL,
	@SortOrder NVARCHAR(100),
	@SortField NVARCHAR(100),
	@PageNumber INT,
	@PageSize INT,
	@TotalCount INT OUTPUT
AS
BEGIN

    SELECT @InvoiceNo = CASE WHEN @InvoiceNo = '' THEN NULL ELSE @InvoiceNo END;
	SELECT @CustomerName = CASE WHEN @CustomerName = '' THEN NULL ELSE @CustomerName END;
	SELECT @SupplierName = CASE WHEN @SupplierName = '' THEN NULL ELSE @SupplierName END;
	SELECT @ProjectName = CASE WHEN @ProjectName = '' THEN NULL ELSE @ProjectName END;
	
	SELECT @TotalCount = COUNT(1)
	FROM Invoices i (NOLOCK)
		INNER JOIN Customers c (NOLOCK) ON i.CustomerId = c.Id
		LEFT JOIN Suppliers s (NOLOCK) ON i.SupplierId = s.Id
		LEFT JOIN Projects p (NOLOCK) ON i.ProjectId = p.Id

	WHERE    ((@InvoiceNo IS NULL AND @CustomerName IS NULL AND @SupplierName IS NULL AND @ProjectName IS NULL) 
				OR (@InvoiceNo IS NOT NULL AND i.InvoiceNo LIKE N'%' + @InvoiceNo+ '%') 
				OR (@CustomerName IS NOT NULL AND c.Name LIKE N'%' + @CustomerName+ '%') 
				OR (@SupplierName IS NOT NULL AND s.Name LIKE N'%' + @SupplierName + '%')
				OR (@ProjectName IS NOT NULL AND p.Name LIKE N'%' + @ProjectName + '%'))
			AND (@PaymentStatus IS NULL OR i.PaymentStatus = @PaymentStatus)
			AND i.EnterpriseId = @EnterpriseId
			AND ((@SupplierId IS NULL AND i.SupplierId IS NULL) OR i.SupplierId = @SupplierId)
			AND ((@ProjectId IS NULL AND i.ProjectId IS NULL) OR i.ProjectId = @ProjectId)

	SELECT i.*,  ISNULL(c.Name, '') AS 'CustomerName', ISNULL(s.Name, '') AS 'SupplierName', ISNULL(p.Name, '') AS 'ProjectName' 
	FROM Invoices i (NOLOCK)
		INNER JOIN Customers c (NOLOCK) ON i.CustomerId = c.Id
		LEFT JOIN Suppliers s (NOLOCK) ON i.SupplierId = s.Id
		LEFT JOIN Projects p (NOLOCK) ON i.ProjectId = p.Id

	WHERE    ((@InvoiceNo IS NULL AND @CustomerName IS NULL AND @SupplierName IS NULL AND @ProjectName IS NULL) 
				OR (@InvoiceNo IS NOT NULL AND i.InvoiceNo LIKE N'%' + @InvoiceNo+ '%') 
				OR (@CustomerName IS NOT NULL AND c.Name LIKE N'%' + @CustomerName+ '%') 
				OR (@SupplierName IS NOT NULL AND s.Name LIKE N'%' + @SupplierName + '%')
				OR (@ProjectName IS NOT NULL AND p.Name LIKE N'%' + @ProjectName + '%'))
			AND (@PaymentStatus IS NULL OR i.PaymentStatus = @PaymentStatus)
			AND i.EnterpriseId = @EnterpriseId
			AND ((@SupplierId IS NULL AND i.SupplierId IS NULL) OR i.SupplierId = @SupplierId)
			AND ((@ProjectId IS NULL AND i.ProjectId IS NULL) OR i.ProjectId = @ProjectId)

	ORDER BY 
		CASE WHEN @SortField = 'customerName' AND @SortOrder ='asc' THEN c.Name END ,
		CASE WHEN @SortField = 'customerName' AND @SortOrder ='desc' THEN c.Name END DESC,
		CASE WHEN @SortField = 'supplierName' AND @SortOrder ='asc' THEN s.Name END ,
		CASE WHEN @SortField = 'supplierName' AND @SortOrder ='desc' THEN s.Name END DESC,
		CASE WHEN @SortField = 'projectName' AND @SortOrder ='asc' THEN p.Name END ,
		CASE WHEN @SortField = 'projectName' AND @SortOrder ='desc' THEN p.Name END DESC,
		CASE WHEN @SortField = 'invoiceNo' AND @SortOrder ='asc' THEN i.InvoiceNo END ,
		CASE WHEN @SortField = 'invoiceNo' AND @SortOrder ='desc' THEN i.InvoiceNo END DESC,
		CASE WHEN @SortField = 'invoicedDate' AND @SortOrder ='asc' THEN i.InvoicedDate END ,
		CASE WHEN @SortField = 'invoicedDate' AND @SortOrder ='desc' THEN i.InvoicedDate END DESC,
		CASE WHEN @SortField = 'dueDate' AND @SortOrder ='asc' THEN i.DueDate END ,
		CASE WHEN @SortField = 'dueDate' AND @SortOrder ='desc' THEN i.DueDate END DESC,
		CASE WHEN @SortField = 'paymentStatus' AND @SortOrder ='asc' THEN i.PaymentStatus END ,
		CASE WHEN @SortField = 'paymentStatus' AND @SortOrder ='desc' THEN i.PaymentStatus END DESC,
		CASE WHEN @SortField = 'amount' AND @SortOrder ='asc' THEN i.Amount END ,
		CASE WHEN @SortField = 'amount' AND @SortOrder ='desc' THEN i.Amount END DESC

	OFFSET (@PageNumber-1)*@PageSize ROWS
	FETCH NEXT @PageSize ROWS ONLY
END