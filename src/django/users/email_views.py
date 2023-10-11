from djoser.compat import get_user_email
from djoser.conf import settings
from djoser.views import UserViewSet as DjoserUserViewSet
from rest_framework import status
from rest_framework.decorators import action
from rest_framework.response import Response


class CustomUserViewSet(DjoserUserViewSet):
    @action(["post"], detail=False)
    def reset_password(self, request, *args, **kwargs):
        print("custom reset password")
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.get_user()
        # added
        language_code = request.data.get("language_code", "es")

        if user:
            context = {"user": user, "language_code": language_code}
            to = [get_user_email(user)]
            settings.EMAIL.password_reset(self.request, context).send(to)

        return Response(status=status.HTTP_204_NO_CONTENT)
