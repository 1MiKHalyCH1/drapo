from django.conf.urls import url

from . import views

urlpatterns = [
    url(r'^(?P<user_id>\d+)/$', views.profile, name='profile'),
    url(r'^login/$', views.login, name='login'),
    url(r'^confirm/(?P<token>\w+)/$', views.confirm, name='confirm'),
    url(r'^logout/$', views.logout, name='logout'),
]
