from django.db import models
from django.contrib.auth.models import AbstractUser
import random
from django.utils import timezone

"""
    Custom user model extending Django's AbstractUser.

    Allows additional fields (e.g., phone_number)
    while preserving built-in authentication features.
    """

class User(AbstractUser):
    phone_number = models.CharField(max_length=20, blank=True, null=True)

    def __str__(self):
        return self.username

"""
    Categorisation model for listings.
    Keeps listing structure flexible and scalable.
    """
class Category(models.Model):
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name

 """
    Core marketplace entity.

    Includes:
    - Status control
    - Owner relationship
    - Optional image upload
    - Category classification
    """
class Listing(models.Model):
    STATUS_CHOICES = [
        ("available", "Available"),
        ("sold", "Sold"),
    ]

    title = models.CharField(max_length=255)
    description = models.TextField()
    price = models.DecimalField(max_digits=10, decimal_places=2)
    image = models.ImageField(upload_to="listings/", blank=True, null=True)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default="available")
    created_at = models.DateTimeField(auto_now_add=True)
    phone_number = models.CharField(max_length=20)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    category = models.ForeignKey(Category, on_delete=models.SET_NULL, null=True)

    def __str__(self):
        return self.title

"""
    Linked to both user and listing.

    related_name='comments' enables reverse access:
    listing.comments.all()
    """
class Comment(models.Model):
    text = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    user = models.ForeignKey(User, on_delete=models.CASCADE)
    listing = models.ForeignKey(Listing, on_delete=models.CASCADE, related_name="comments")

    def __str__(self):
        return f"Comment on {self.listing.title}"

 """
    Stores temporary OTP codes for account verification.

    Separated from User model to:
    - Allow expiration control
    - Support multiple OTP attempts
    - Improve security isolation
    """
class EmailOTP(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    otp = models.CharField(max_length=6)
    created_at = models.DateTimeField(auto_now_add=True)

    def is_valid(self):
        # OTP 10 percig érvényes
        return timezone.now() <= self.created_at + timezone.timedelta(minutes=10)

    def __str__(self):
        return f"{self.user.username} - {self.otp}"