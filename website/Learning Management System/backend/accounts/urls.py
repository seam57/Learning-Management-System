from django.urls import path
from .views import (
    RegisterView, ProfileView, ChangePasswordView, 
    RequestPasswordResetView, ConfirmPasswordResetView
)
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('profile/', ProfileView.as_view(), name='profile'),
    path('change-password/', ChangePasswordView.as_view(), name='change_password'),
    path('password-reset/', RequestPasswordResetView.as_view(), name='password_reset'),
    path('password-reset-confirm/<uidb64>/<token>/', ConfirmPasswordResetView.as_view(), name='password_reset_confirm'),
]