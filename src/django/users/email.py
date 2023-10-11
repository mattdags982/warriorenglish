from djoser.email import (
    PasswordChangedConfirmationEmail as DjoserPasswordChangedConfirmationEmail,
)
from djoser.email import PasswordResetEmail as DjoserPasswordResetEmail


class CustomPasswordResetEmail(DjoserPasswordResetEmail):
    def send(self, to, *args, **kwargs):
        # Extract the language code from the context
        language_code = self.context.get("language_code", "es")

        # Modify the template name based on the language code
        self.template_name = f"password_reset_{language_code}.html"

        # You can add a print statement for debugging if you wish
        print("custom password reset email", self.template_name)

        # Call the original send method to actually send the email
        super().send(to, *args, **kwargs)


class CustomPasswordChangedConfirmationEmail(DjoserPasswordChangedConfirmationEmail):
    def send(self, to, *args, **kwargs):
        language_code = self.context.get("language_code", "es")

        self.template_name = f"password_changed_confirmation_{language_code}.html"

        print("custom password changed confirmation email", self.template_name)

        super().send(to, *args, **kwargs)
