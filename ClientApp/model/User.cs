﻿using System;

public class User
{
    public int Id { get; set; }
    public string Username { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public string PasswordHash { get; set; } = string.Empty;
    public bool IsAdmin { get; set; } = false;     // 0 for PIC, 1 for Admin
    public bool IsApproved { get; set; } = false;  // approval status
}
