# -*- coding: utf-8 -*-
# Generated by Django 1.10.5 on 2018-02-23 22:33
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('contests', '0009_auto_20180218_1422'),
    ]

    operations = [
        migrations.AddField(
            model_name='contestregion',
            name='timezone',
            field=models.TextField(default='UTC', help_text='Timezone for the region'),
        ),
    ]
