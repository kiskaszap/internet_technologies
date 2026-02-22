# from rest_framework import viewsets, permissions, status
# from rest_framework.permissions import AllowAny, IsAuthenticated
# from rest_framework.views import APIView
# from rest_framework.response import Response
# from django.contrib.auth import get_user_model

# from .models import Category, Listing, Comment
# from .serializers import CategorySerializer, ListingSerializer, CommentSerializer


# User = get_user_model()

# from django.core.mail import send_mail
# from .models import EmailOTP
# import random


# # ----------------------------
# # Custom Permission
# # ----------------------------

# class IsOwnerOrReadOnly(permissions.BasePermission):
#     """
#     Allow read for everyone.
#     Allow write only for owner.
#     """

#     def has_object_permission(self, request, view, obj):
#         if request.method in permissions.SAFE_METHODS:
#             return True
#         return obj.user == request.user


# # ----------------------------
# # Category
# # ----------------------------

# class CategoryViewSet(viewsets.ModelViewSet):
#     queryset = Category.objects.all()
#     serializer_class = CategorySerializer
#     permission_classes = [AllowAny]


# # ----------------------------
# # Listing
# # ----------------------------

# class ListingViewSet(viewsets.ModelViewSet):
#     queryset = Listing.objects.all().order_by("-created_at")
#     serializer_class = ListingSerializer

#     def get_permissions(self):
#         if self.request.method == "POST":
#             return [IsAuthenticated()]
#         elif self.request.method in ["PUT", "PATCH", "DELETE"]:
#             return [IsAuthenticated(), IsOwnerOrReadOnly()]
#         return [AllowAny()]

#     def perform_create(self, serializer):
#         serializer.save(user=self.request.user)


# # ----------------------------
# # Comment
# # ----------------------------

# class CommentViewSet(viewsets.ModelViewSet):
#     queryset = Comment.objects.all().order_by("-created_at")
#     serializer_class = CommentSerializer

#     def get_permissions(self):
#         if self.request.method == "POST":
#             return [IsAuthenticated()]
#         return [AllowAny()]

#     def perform_create(self, serializer):
#         serializer.save(user=self.request.user)


# # ----------------------------
# # Register
# # ----------------------------

# class RegisterView(APIView):
#     permission_classes = [AllowAny]

#     def post(self, request):
#         raw_email = request.data.get("email")
#         password = request.data.get("password")

#         if not raw_email or not password:
#             return Response(
#                 {"message": "Email and password required"},
#                 status=status.HTTP_400_BAD_REQUEST,
#             )

#         email = raw_email.strip()

#         # Case-insensitive domain check
#         email_lower = email.lower()

#         # ---------------------------
#         # DOMAIN VALIDATION
#         # ---------------------------
#         if email_lower.endswith("@student.gla.ac.uk"):
#             local_part, domain = email.split("@")

#             # Student ID utolsó betű legyen nagybetű
#             if local_part and local_part[-1].isalpha():
#                 local_part = local_part[:-1] + local_part[-1].upper()

#             email = f"{local_part}@student.gla.ac.uk"

#         elif email_lower.endswith("@glasgow.ac.uk"):
#             local_part, _ = email.split("@")

#             # Staff email domain normalizálása
#             email = f"{local_part}@glasgow.ac.uk"

#         else:
#             return Response(
#                 {"message": "Only University of Glasgow emails are allowed"},
#                 status=status.HTTP_400_BAD_REQUEST,
#             )

#         # ---------------------------
#         # CASE-INSENSITIVE DUPLICATE CHECK
#         # ---------------------------
#         if User.objects.filter(username__iexact=email).exists():
#             return Response(
#                 {"message": "This email is already registered"},
#                 status=status.HTTP_400_BAD_REQUEST,
#             )

#         # ---------------------------
#         # CREATE INACTIVE USER
#         # ---------------------------
#         user = User.objects.create_user(
#             username=email,
#             password=password,
#             is_active=False,
#         )

#         # ---------------------------
#         # GENERATE OTP
#         # ---------------------------
#         otp_code = str(random.randint(100000, 999999))

#         EmailOTP.objects.create(
#             user=user,
#             otp=otp_code,
#         )

#         send_mail(
#             "UofG Marketplace Verification Code",
#             f"Your verification code is: {otp_code}",
#             "no-reply@uofgmarketplace.com",
#             [email],
#             fail_silently=False,
#         )

#         return Response(
#             {"message": "OTP has been sent to your university email"},
#             status=status.HTTP_201_CREATED,
#         )


# class VerifyOTPView(APIView):
#     permission_classes = [AllowAny]

#     def post(self, request):
#         email = request.data.get("email")
#         otp = request.data.get("otp")

#         try:
#             user = User.objects.get(username=email)
#             otp_obj = EmailOTP.objects.filter(user=user).latest("created_at")
#         except:
#             return Response(
#                 {"message": "Invalid request"},
#                 status=status.HTTP_400_BAD_REQUEST,
#             )

#         if otp_obj.otp != otp:
#             return Response(
#                 {"message": "Invalid OTP"},
#                 status=status.HTTP_400_BAD_REQUEST,
#             )

#         if not otp_obj.is_valid():
#             return Response(
#                 {"message": "OTP expired"},
#                 status=status.HTTP_400_BAD_REQUEST,
#             )

#         user.is_active = True
#         user.save()

#         return Response(
#             {"message": "Account verified successfully"},
#             status=status.HTTP_200_OK,
#         )


from rest_framework import viewsets, permissions, status
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.exceptions import AuthenticationFailed
from django.contrib.auth import get_user_model
from django.core.mail import send_mail

from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

from .models import Category, Listing, Comment, EmailOTP
from .serializers import CategorySerializer, ListingSerializer, CommentSerializer

import random


User = get_user_model()


# =====================================================
# Custom Permission
# =====================================================

class IsOwnerOrReadOnly(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        if request.method in permissions.SAFE_METHODS:
            return True
        return obj.user == request.user


# =====================================================
# Category
# =====================================================

class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    permission_classes = [AllowAny]


# =====================================================
# Listing
# =====================================================

class ListingViewSet(viewsets.ModelViewSet):
    queryset = Listing.objects.all().order_by("-created_at")
    serializer_class = ListingSerializer

    def get_queryset(self):
        queryset = Listing.objects.all().order_by("-created_at")

        # csak saját listingek ha my paraméter van
        if self.request.query_params.get("my") == "true":
            return queryset.filter(user=self.request.user)

        return queryset

    def get_permissions(self):
        if self.request.method == "POST":
            return [IsAuthenticated()]
        elif self.request.method in ["PUT", "PATCH", "DELETE"]:
            return [IsAuthenticated(), IsOwnerOrReadOnly()]
        return [AllowAny()]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


# =====================================================
# Comment
# =====================================================

class CommentViewSet(viewsets.ModelViewSet):
    queryset = Comment.objects.all()   # <<< EZT ADD VISSZA
    serializer_class = CommentSerializer

    def get_queryset(self):
        queryset = Comment.objects.all().order_by("-created_at")
        listing_id = self.request.query_params.get("listing")

        if listing_id:
            queryset = queryset.filter(listing_id=listing_id)

        return queryset

    def get_permissions(self):
        if self.request.method == "POST":
            return [IsAuthenticated()]
        return [AllowAny()]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

# =====================================================
# Register
# =====================================================

class RegisterView(APIView):
    authentication_classes = []
    permission_classes = [AllowAny]

    def post(self, request):
        raw_email = request.data.get("email")
        password = request.data.get("password")

        if not raw_email or not password:
            return Response(
                {"message": "Email and password required"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        email = raw_email.strip()
        email_lower = email.lower()

        # ---------------------------
        # DOMAIN VALIDATION + NORMALIZATION
        # ---------------------------
        if email_lower.endswith("@student.gla.ac.uk"):
            local_part, _ = email.split("@")

            # Student ID utolsó betű legyen nagybetű
            if local_part and local_part[-1].isalpha():
                local_part = local_part[:-1] + local_part[-1].upper()

            email = f"{local_part}@student.gla.ac.uk"

        elif email_lower.endswith("@glasgow.ac.uk"):
            local_part, _ = email.split("@")
            email = f"{local_part}@glasgow.ac.uk"

        else:
            return Response(
                {"message": "Only University of Glasgow emails are allowed"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        # Case-insensitive duplicate check
        if User.objects.filter(username__iexact=email).exists():
            return Response(
                {"message": "This email is already registered"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        # Create inactive user
        user = User.objects.create_user(
            username=email,
            password=password,
            is_active=False,
        )

        # Generate OTP
        otp_code = str(random.randint(100000, 999999))

        EmailOTP.objects.create(
            user=user,
            otp=otp_code,
        )

        send_mail(
            "UofG Marketplace Verification Code",
            f"Your verification code is: {otp_code}",
            None,
            [email],
            fail_silently=False,
        )

        return Response(
            {"message": "OTP has been sent to your university email"},
            status=status.HTTP_201_CREATED,
        )


# =====================================================
# Verify OTP
# =====================================================

class VerifyOTPView(APIView):
    authentication_classes = []
    permission_classes = [AllowAny]

    def post(self, request):
        raw_email = request.data.get("email")
        otp = request.data.get("otp")

        if not raw_email or not otp:
            return Response(
                {"message": "Email and OTP required"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        email = raw_email.strip()

        try:
            user = User.objects.get(username__iexact=email)
            otp_obj = EmailOTP.objects.filter(user=user).latest("created_at")
        except:
            return Response(
                {"message": "Invalid request"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        if otp_obj.otp != otp:
            return Response(
                {"message": "Invalid OTP"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        if not otp_obj.is_valid():
            return Response(
                {"message": "OTP expired"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        user.is_active = True
        user.save()

        otp_obj.delete()  # OTP reuse prevention

        return Response(
            {"message": "Account verified successfully"},
            status=status.HTTP_200_OK,
        )


# =====================================================
# Custom Login (JWT)
# =====================================================

class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        raw_email = attrs.get("username")
        password = attrs.get("password")

        if not raw_email or not password:
            raise AuthenticationFailed("Email and password required")

        email = raw_email.strip()
        email_lower = email.lower()

        # Normalize domain
        if email_lower.endswith("@student.gla.ac.uk"):
            local_part, _ = email.split("@")
            if local_part and local_part[-1].isalpha():
                local_part = local_part[:-1] + local_part[-1].upper()
            email = f"{local_part}@student.gla.ac.uk"

        elif email_lower.endswith("@glasgow.ac.uk"):
            local_part, _ = email.split("@")
            email = f"{local_part}@glasgow.ac.uk"

        else:
            raise AuthenticationFailed("Invalid university email")

        try:
            user = User.objects.get(username__iexact=email)
        except User.DoesNotExist:
            raise AuthenticationFailed("Invalid credentials")

        if not user.is_active:
            raise AuthenticationFailed("Please verify your email first")

        attrs["username"] = user.username

        return super().validate(attrs)


class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer
