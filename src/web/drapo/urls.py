"""Drapo URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.9/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.conf.urls import url, include
    2. Add a URL to urlpatterns:  url(r'^blog/', include('blog.urls'))
"""
from django.conf.urls import url, include
from django.contrib import admin

import contests.views

urlpatterns = [
    url(r'^$', contests.views.qctf_tasks, name='home'),
    url(r'^rules/$', contests.views.qctf_rules, name='qctf_rules'),
    url(r'^scoreboard/$', contests.views.qctf_scoreboard, name='qctf_scoreboard'),
    url(r'^notifications/$', contests.views.qctf_notifications, name='qctf_notifications'),
    url(r'^api/unread_notifications_count/$', contests.views.qctf_unread_notifications_count, name='qctf_unread_notifications_count'),

    # Non-QCTF URLs

    url(r'^contests/', include('contests.urls', namespace='contests')),
    url(r'^users/', include('users.urls', namespace='users')),
    url(r'^teams/', include('teams.urls', namespace='teams')),

    url(r'^admin/', admin.site.urls),
    url(r'^hijack/', include('hijack.urls')),

    url(r'^i18n/', include('django.conf.urls.i18n')),
]
