using System.Runtime.Serialization;

namespace Domain.Enums;

public enum ReactionType
{
    [EnumMember(Value = "love")]
    Love,

    [EnumMember(Value = "like")]
    Like,

    [EnumMember(Value = "dislike")]
    Dislike
}
