namespace Adoway.Common.Enums
{
    public enum PaymentRequestStatus
    {
        Draft = 1,
        Confirmed = 2,
        Verified = 3,
        Approved = 4,
        Paying = 5,
        Done = 6,
        Canceled = -1
    }
    public enum PaymentStatus
    {
        Unpaid = 1,
        Paid = 2
    }
    public enum PaymentMethod
    {
        Cash = 1,
        Bank = 2
    }
}
