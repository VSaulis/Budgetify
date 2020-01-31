using System;

namespace Budget.System.Exceptions
{
    [Serializable]
    public class OptimisticLockException : Exception
    {
        public OptimisticLockException() : base("Data is outdated")
        {
        }

        public OptimisticLockException(string message) : base(message)
        {
        }
    }
}