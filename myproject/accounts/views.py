from django.contrib.auth.models import User
from django.contrib.auth.tokens import PasswordResetTokenGenerator
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from django.utils.encoding import force_bytes, force_str
from django.core.mail import send_mail

from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken
from.serializers import RegisterSerializer

import urllib.parse

#User Registration
@api_view(["POST"])
def register(request):
    serializer = RegisterSerializer(data=request.data)
    if serializer.is_valid():
        user = serializer.save()
        refresh = RefreshToken.for_user(user)

        return Response(
          {
              "token": str(refresh.access_token),
              "username": user.username,
              "email": user.email,
          },
          status=status.HTTP_201_CREATED,
        )
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

#User Profile
@api_view(["GET"])
@permission_classes([IsAuthenticated])
def profile(request):
    return Response({
        "username": request.user.username,
        "email": request.user.email,
    })

#Password Reset Request
class PasswordResetRequestView(APIView):
    def post(self, request):
        email = request.data.get("email")

        if not email:
            return Response(
                {"error": "Email is required"},
                status=status.HTTP_400_BAD_REQUEST,
            )
        user = User.objects.filter(email=email).first()

        if user:
            import urllib.parse

            uid = urlsafe_base64_encode(force_bytes(user.pk))
            token = PasswordResetTokenGenerator().make_token(user)

            reset_link = f"http://localhost:5173/reset-password-confirm?uid={uid}&token={(token)}"

            #Print to console for testing
            print("Password reset link:", reset_link)
            
            send_mail(
                subject="Password Reset Request",
                message=f"Click the link to reset your password:\n{reset_link}",
                from_email="noreply@rot8te.com",
                recipient_list=[email],
            )

            return Response(
                {"message": "If the email exists, a reset link has been sent."},
                status=status.HTTP_200_OK,
            )

#Password Reset Confirm
class PasswordResetConfirmView(APIView):
    def post(self, request):
        print("Recieved data:", request.data)
        uid = request.data.get("uid")
        token = request.data.get("token")
        password = request.data.get("password")

        if not all ([uid, token, password]):
            return Response(
                 {"error": "All fields are required"},
                 status=status.HTTP_400_BAD_REQUEST,
            )

        try:
            #Decode UID
            user_pk = force_str(urlsafe_base64_decode(uid))
            #Get user
            user = User.objects.get(pk=user_pk)

        except(User.DoesNotExist, ValueError, TypeError):
            return Response(
                {"error": "Invalid user"},
                status=status.HTTP_400_BAD_REQUEST,
            )
            
        #Validate token
        if not PasswordResetTokenGenerator().check_token(user, token):
            return Response(
                {"error": "Invalid or expired token"},
                    status=status.HTTP_400_BAD_REQUEST,
            )

        #Set new password
        user.set_password(password)
        user.save()

        return Response(
            {"message": "Password reset successful"},
            status=status.HTTP_200_OK,
            )