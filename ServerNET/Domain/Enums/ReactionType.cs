using System.Runtime.Serialization;

namespace Domain.Enums;

public enum ReactionType
{
    [EnumMember(Value = "love")]
    love,

    [EnumMember(Value = "like")]
    like,

    [EnumMember(Value = "dislike")]
    dislike
}
