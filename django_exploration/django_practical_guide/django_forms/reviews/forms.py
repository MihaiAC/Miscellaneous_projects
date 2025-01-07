from django import forms

class ReviewForm(forms.Form):
    user_name = forms.CharField(label="Your Name", max_length=100, error_messages= {
        "max_length": "Please enter a shorter name.",
        "required": "Your name should not be empty"
    })

    review_text = forms.CharField(label="Your Feedback", widget=forms.Textarea, max_length=250)
    rating = forms.IntegerField(label="Your rating", min_value=1, max_value=5)
