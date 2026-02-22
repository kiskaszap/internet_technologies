from django.urls import path
from rest_framework.routers import DefaultRouter
from .views import (
    CategoryViewSet,
    ListingViewSet,
    CommentViewSet,
    RegisterView,
)

from .views import VerifyOTPView


router = DefaultRouter()
router.register("categories", CategoryViewSet)
router.register("listings", ListingViewSet)
router.register("comments", CommentViewSet)

urlpatterns = router.urls + [
    path("register/", RegisterView.as_view(), name="register"),
      path("verify-otp/", VerifyOTPView.as_view(), name="verify_otp"),
]
