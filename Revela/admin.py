from django.contrib import admin
from .models import Post, UserProfile, Conversation, Message


# Register your models here.
admin.site.register(Post)
admin.site.register(UserProfile)
admin.site.register(Conversation)
admin.site.register(Message)
