from enum import auto
from api.models import Todo
from django.db.models import fields
from rest_framework import serializers

class SerializerTodo(serializers.Serializer):
    id=serializers.ReadOnlyField()
    title=serializers.CharField(max_length=200)
    active=serializers.BooleanField(default=False)
    class Meta:
        model=Todo
        fields='__all__'
    def create(self, validated_data):
        return Todo.objects.create(**validated_data)
    def update(self, instance, validated_data):
        instance.title=validated_data.get('title',instance.title)
        instance.active=validated_data.get('active',instance.active)
        instance.save()
        return instance
