﻿namespace Budget.Models.Services
{
    public interface IEncryptionService
    {
        byte[] CreateSalt();
        byte[] CreateHash(string text, byte[] salt);
        bool VerifyHash(string text, byte[] hash, byte[] salt);
    }
}