import json

from django.utils.decorators import method_decorator
from django.views.decorators.csrf import ensure_csrf_cookie
from django.views.generic import TemplateView, ListView

from api.utils import obj_to_post
from blog.models import Post


class HomeView(TemplateView):
    template_name = 'home.html'
