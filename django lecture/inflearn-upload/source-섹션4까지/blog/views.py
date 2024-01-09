import json

from django.views.generic import DetailView, TemplateView

from api.utils import obj_to_post, prev_next_post, obj_to_comment
from blog.models import Post, Category, Tag


class PostDV(TemplateView):
    template_name = 'blog/post_detail.html'
