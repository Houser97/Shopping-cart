using System;
using Application.DTOs.Auth;
using FluentValidation;

namespace Application.Validators.Auth;

public class RegisterUserValidator : BaseAuthValidator<RegisterUserDto>
{
    public RegisterUserValidator()
    {
        RuleFor(x => x.Name)
            .NotEmpty().WithMessage("Name is required")
            .MinimumLength(3).WithMessage("Name should have at least 3 characters");

        RuleFor(x => x.Password)
            .Cascade(CascadeMode.Stop)
            .NotEmpty().WithMessage("Password is required")
            .MinimumLength(5).WithMessage("Password should have at least 5 characters")
            .Matches(@"[A-Z]").WithMessage("Password must contain at least one uppercase letter")
            .Matches(@"\d").WithMessage("Password must contain at least one number")
            .Matches(@"[^\w\d\s]").WithMessage("Password must contain at least one special character");
    }
}
