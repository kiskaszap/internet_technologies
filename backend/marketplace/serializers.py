from rest_framework import serializers
from .models import User, Category, Listing, Comment


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "username", "phone_number"]


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = "__all__"


class CommentSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)

    class Meta:
        model = Comment
        fields = ["id", "listing", "text", "created_at", "user"]
        read_only_fields = ["user", "created_at"]


class ListingSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    comments = CommentSerializer(many=True, read_only=True)

    class Meta:
        model = Listing
        fields = [
            "id",
            "title",
            "description",
            "price",
            "image",
            "status",
            "created_at",
            "phone_number",
            "user",
            "category",
            "comments",
        ]
