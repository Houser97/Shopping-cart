using System;
using MongoDB.Bson.Serialization;
using MongoDB.Bson.Serialization.Conventions;
using MongoDB.Bson.Serialization.Serializers;

using MongoDB.Bson;

namespace Persistence.Configurations;

public static class MongoDbConventions
{
    public static void Register()
    {
        var pack = new ConventionPack
        {
            new EnumRepresentationConvention(BsonType.String),
            new EnumSerializationConvention(),
            new IgnoreExtraElementsConvention(true) // Se ignoran campos no mapeados como __v
        };

        ConventionRegistry.Register("EnumAsString", pack, t => true);
    }
}

public class EnumSerializationConvention : ConventionBase, IClassMapConvention
{
    public void Apply(BsonClassMap classMap)
    {
        foreach (var memberMap in classMap.AllMemberMaps)
        {
            if (memberMap.MemberType.IsEnum)
            {
                var enumSerializerType = typeof(EnumSerializer<>).MakeGenericType(memberMap.MemberType);
                var serializer = (IBsonSerializer)Activator.CreateInstance(enumSerializerType, BsonType.String)!;
                memberMap.SetSerializer(serializer);
            }
        }
    }
}