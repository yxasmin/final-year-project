from django.contrib.auth.models import User
from django.contrib.auth.tokens import PasswordResetTokenGenerator
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from django.utils.encoding import force_bytes, force_str
from django.core.mail import EmailMultiAlternatives
from django.conf import settings
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken
from .serializers import RegisterSerializer
from .models import ChallengeProgress, Favourite
import os
import urllib.parse

FRONTEND_URL = os.getenv("FRONTEND_URL", "http://localhost:5173")

#User Registration
@api_view(["POST"])
def register(request):
    serializer = RegisterSerializer(data=request.data)
    if serializer.is_valid():
        user = serializer.save()
        refresh = RefreshToken.for_user(user)

# Confirmation email after successful registration
        subject = "Welcome to Rot8te!"
        text_content = f"""
Hi {user.username},
Thank you for registering with Rot8te.

Your account has been successfully created.
You can now login and start saving your favourite ethical and sustainable pieces.

Welcome aboard!

The Rot8te Team
"""
        html_content = f"""
<html>
  <body style="font-family: Arial; background:#f8f8f8; padding:20px;">
    <div style="max-width:500px; margin:auto; background:white; padding:25px; border-radius:10px;">
      <h2 style="color:#2e7d32;">Welcome to Rot8te 👋</h2>
      <p>Hi <strong>{user.username}</strong>,</p>
      <p>Thank you for registering with <strong>Rot8te</strong>.</p>
      <p>
        Your account has been successfully created.
        You can now login and start saving your favourite ethical and sustainable pieces.
      </p>
      <p style="margin-top:25px;">Welcome aboard!</p>
      <p><strong>The Rot8te Team</strong></p>
    </div>
  </body>
</html>
"""
        msg = EmailMultiAlternatives(
            subject,
            text_content,
            settings.DEFAULT_FROM_EMAIL,
            [user.email],
        )
        msg.attach_alternative(html_content, "text/html")

        # Send emails safely
        try:
           msg.send()
        except Exception as e:
            print("Registration email failed:", e)
        
                                  
            

        return Response(
          {
              "access": str(refresh.access_token),
              "refresh": str(refresh),
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
        "date_joined": request.user.date_joined,
    })

#Delete Account
@api_view(["DELETE"])
@permission_classes([IsAuthenticated])
def delete_account(request):
    user = request.user
    user.delete()
    return Response(
        {"message": "Account deleted successfully."},
        status=status.HTTP_200_OK,
    )
#Challenges
@api_view(["GET", "POST", "DELETE"])
@permission_classes([IsAuthenticated])
def challenges(request):
    if request.method == "GET":
        # Return all completed challenges for this user
        progress = ChallengeProgress.objects.filter(user=request.user)
        return Response([{"challenge_id": p.challenge_id, "task_index": p.task_index}
                         for p in progress
        ])
    
    elif request.method == "POST":
        # Mark a challenge as complete
        challenge_id = request.data.get("challenge_id")
        task_index = request.data.get("task_index")
        if challenge_id is None or task_index is None:
            return Response({"error": "challenge_id and task_index are required"}, status=status.HTTP_400_BAD_REQUEST)
        ChallengeProgress.objects.get_or_create(user=request.user, challenge_id=challenge_id, task_index=task_index)
        return Response({"message": "Task marked as complete"}, status=status.HTTP_201_CREATED)
    
    elif request.method == "DELETE":
        challenge_id = request.data.get("challenge_id")
        task_index = request.data.get("task_index")
        if challenge_id is None or task_index is None:
            return Response({"error": "challenge_id and task_index are required"}, status=status.HTTP_400_BAD_REQUEST)
        ChallengeProgress.objects.filter(user=request.user, challenge_id=challenge_id, task_index=task_index).delete()
        return Response({"message": "Task marked as incomplete"}, status=status.HTTP_200_OK)
    
#Favourites
@api_view(["GET", "POST", "DELETE"])
@permission_classes([IsAuthenticated])
def favourites(request):
    if request.method == "GET":
        ids = Favourite.objects.filter(user=request.user).values_list("product_id", flat=True)
        return Response(list(ids))
        
    elif request.method == "POST":
        product_id = request.data.get("product_id")
        if product_id is None:
            return Response({"error": "product_id is required"}, status=status.HTTP_400_BAD_REQUEST)
        Favourite.objects.get_or_create(user=request.user, product_id=product_id)
        return Response({"message": "Favourite added"}, status=status.HTTP_201_CREATED)
        
    elif request.method == "DELETE":
        product_id = request.data.get("product_id")
        if product_id is None:
            return Response({"error": "product_id is required"}, status=status.HTTP_400_BAD_REQUEST)
        Favourite.objects.filter(user=request.user, product_id=product_id).delete()
        return Response({"message": "Favourite removed"}, status=status.HTTP_200_OK)

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

            uid = urlsafe_base64_encode(force_bytes(user.pk))
            token = PasswordResetTokenGenerator().make_token(user)

            reset_link = (
                f"{FRONTEND_URL}/reset-password-confirm"
                f"?uid={uid}&token={urllib.parse.quote(token)}"
            )

           
            
            text_content = f"""
  Hi {user.username},

  You requested a password reset.

  Use the link below:
  {reset_link}

  If you did not request this, ignore this email.

  The Rot8te Team
  """
            html_content = f"""
                
  <html>
    <body style="font-family: Arial; background: #f8f8f8; padding:20px;">
      <div style="max-width:500px; margin:auto; background: white; padding: 25px; border-radius:10px;">
        
      <h2 style="color:#2e7d32;">Reset Your Password</h2>

      <p>Hi <strong>{user.username}</strong>,</p>

      <p>You requested a password reset for your Rot8te account.</p>

      <p>
        <a href="{reset_link}"
        style="
          display:inline-block;
          padding: 12px 18px;
          background:#237d32;
          color:white;
          text-decoration:none;
          border-radius:6px;
           ">
        Reset Password
      </a>
    </p>
    <p style="font-size:13px; color:#666;">
      If you didn't request this, you can safely ignore this email.
      <p><strong>The Rot8te Team</strong></p>

     </div>
   </body>
  </html>
  """
            
            msg = EmailMultiAlternatives(
                "Password Reset Request",
                text_content,
                settings.DEFAULT_FROM_EMAIL,
                [email],
            )
            msg.attach_alternative(html_content, "text/html")
            try:
               msg.send()
            except Exception as e:
                print("Password reset email failed:", e)

        return Response(
            {"message": "If the email exists, a reset link has been sent."},
          status=status.HTTP_200_OK,
        )





#Password Reset Confirm
class PasswordResetConfirmView(APIView):
    def post(self, request):
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