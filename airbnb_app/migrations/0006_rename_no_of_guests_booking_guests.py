# Generated by Django 4.0.4 on 2022-06-15 17:13

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('airbnb_app', '0005_property_max_days_property_max_guests'),
    ]

    operations = [
        migrations.RenameField(
            model_name='booking',
            old_name='no_of_guests',
            new_name='guests',
        ),
    ]
