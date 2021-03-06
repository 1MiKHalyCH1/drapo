# -*- coding: utf-8 -*-
# Generated by Django 1.9.6 on 2016-06-13 14:25
from __future__ import unicode_literals

from django.db import migrations, models
import django.db.models.deletion
import sortedm2m.fields


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('tasks', '0003_regexpchecker_flag_ignore_case'),
        ('contests', '0003_auto_20160613_1427'),
    ]

    operations = [
        migrations.CreateModel(
            name='Category',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(help_text='Public name of the category', max_length=100)),
                ('description', models.TextField(help_text='Public description of the category')),
                ('tasks', sortedm2m.fields.SortedManyToManyField(help_text=None, to='tasks.Task')),
            ],
        ),
        migrations.CreateModel(
            name='ContestCategories',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('categories', sortedm2m.fields.SortedManyToManyField(help_text=None, to='categories.Category')),
                ('contest', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, related_name='get_categories', to='contests.TaskBasedContest')),
            ],
        ),
    ]
