from django.urls import path
from .views import (
    register, 
    profile,
    delete_account,
    PasswordResetRequestView,
    PasswordResetConfirmView,
)
from rest_framework_simplejwt.views import (
TokenObtainPairView, 
TokenRefreshView,

)

urlpatterns = [
    # User registration
    path('register/', register, name='register'),

    #JWT authentication
    path('login/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    
    #Protected route
    path('profile/', profile, name='profile'),
    path('delete-account/', delete_account, name='delete_account'),
    
    #Password reset
    path(
        'password-reset/',
        PasswordResetRequestView.as_view(),
        name="password_reset",
    ),
    path(
        'password-reset-confirm/',
        PasswordResetConfirmView.as_view(),
        name="password_reset_confirm",
    ),
]