using System;
using Application.DTOs.Auth;
using FluentValidation;

namespace Application.Validators.Auth;

public class BaseAuthValidator<T> : AbstractValidator<T> where T : BaseAuthDto
{
    public BaseAuthValidator()
    {
        RuleFor(x => x.Email)
            .Cascade(CascadeMode.Stop)
            .NotEmpty().WithMessage("Email is required")
            .EmailAddress().WithMessage("Invalid email format")
            .Custom((email, context) =>
            {
                var normalized = NormalizeEmail(email);
                context.InstanceToValidate.Email = normalized;
            });
    }

    private static string NormalizeEmail(string? email)
    {
        if (string.IsNullOrWhiteSpace(email))
            return string.Empty;

        email = email.Trim().ToLowerInvariant();

        var parts = email.Split('@');
        if (parts.Length == 2 && (parts[1] == "gmail.com" || parts[1] == "googlemail.com"))
        {
            parts[0] = parts[0].Replace(".", ""); // quitamos puntos del username
            email = $"{parts[0]}@{parts[1]}";
        }

        return email;
    }
}
