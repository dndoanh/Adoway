using System;
using System.Collections.Generic;
using System.Data;
using Microsoft.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Adoway.Common.Extensions
{
    public static class SqlParameterHelper
    {
        public static SqlParameter AddNullableStringParameter(string name, string value)
        {
            return new SqlParameter(name, SqlDbType.NVarChar)
            {
                Value = value == null ? DBNull.Value : (object)value
            };
        }
        public static SqlParameter AddNullableDateTimeParameter(string name, DateTime? datetTimeValue)
        {
            return new SqlParameter(name, SqlDbType.DateTime)
            {
                Value = datetTimeValue.HasValue ? (object)datetTimeValue.Value : DBNull.Value
            };
        }

        public static SqlParameter AddNullableBooleanParameter(string name, bool? boolValue)
        {
            return new SqlParameter(name, SqlDbType.Bit)
            {
                Value = boolValue.HasValue ? (object)boolValue.Value : DBNull.Value
            };
        }

        public static SqlParameter AddNullableGuid(string name, Guid? guidValue)
        {
            return new SqlParameter(name, SqlDbType.UniqueIdentifier)
            {
                Value = (guidValue.HasValue && guidValue.Value != Guid.Empty) ? (object)guidValue.Value : DBNull.Value
            };
        }

        public static SqlParameter AddNullableInt(string name, int? intValue)
        {
            return new SqlParameter(name, SqlDbType.Int)
            {
                Value = intValue.HasValue ? (object)intValue.Value : DBNull.Value
            };
        }

        public static SqlParameter AddNullableLong(string name, long? longValue)
        {
            return new SqlParameter(name, SqlDbType.BigInt)
            {
                Value = longValue.HasValue ? (object)longValue.Value : DBNull.Value
            };
        }

        public static SqlParameter AddNullableDecimal(string name, Decimal? decimalValue)
        {
            return new SqlParameter(name, SqlDbType.Decimal)
            {
                Value = decimalValue.HasValue ? (object)decimalValue.Value : DBNull.Value
            };
        }

        public static SqlParameter AddNullableDouble(string name, double? decimalValue)
        {
            return new SqlParameter(name, SqlDbType.Float)
            {
                Value = decimalValue.HasValue ? (object)decimalValue.Value : DBNull.Value
            };
        }
        public static SqlParameter AddNullableBoolean(string name, bool? boolValue)
        {
            return new SqlParameter(name, SqlDbType.Bit)
            {
                Value = boolValue.HasValue ? (object)boolValue.Value : DBNull.Value
            };
        }
    }
}
