# Generated by Django 4.0.4 on 2022-05-13 22:53

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Attractions',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('amenity', models.CharField(default='', max_length=250)),
            ],
            options={
                'verbose_name_plural': 'Attractions',
            },
        ),
        migrations.CreateModel(
            name='Bathroom',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('amenity', models.CharField(default='', max_length=250)),
            ],
            options={
                'verbose_name_plural': 'Bathroom',
            },
        ),
        migrations.CreateModel(
            name='Bedroom',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('amenity', models.CharField(default='', max_length=250)),
            ],
            options={
                'verbose_name_plural': 'Bedroom',
            },
        ),
        migrations.CreateModel(
            name='Cleaning',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('amenity', models.CharField(default='', max_length=250)),
            ],
            options={
                'verbose_name_plural': 'Cleaning',
            },
        ),
        migrations.CreateModel(
            name='Entertainment',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('amenity', models.CharField(default='', max_length=250)),
            ],
            options={
                'verbose_name_plural': 'Entertainment',
            },
        ),
        migrations.CreateModel(
            name='Facilities',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('amenity', models.CharField(default='', max_length=250)),
            ],
            options={
                'verbose_name_plural': 'Facilities',
            },
        ),
        migrations.CreateModel(
            name='Family',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('amenity', models.CharField(default='', max_length=250)),
            ],
            options={
                'verbose_name_plural': 'Family',
            },
        ),
        migrations.CreateModel(
            name='HeatingAndCooling',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('amenity', models.CharField(default='', max_length=250)),
            ],
            options={
                'verbose_name_plural': 'Heating And Cooling',
            },
        ),
        migrations.CreateModel(
            name='InternetAndOffice',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('amenity', models.CharField(default='', max_length=250)),
            ],
            options={
                'verbose_name_plural': 'Internet And Office',
            },
        ),
        migrations.CreateModel(
            name='KitchenAndDining',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('amenity', models.CharField(default='', max_length=250)),
            ],
            options={
                'verbose_name_plural': 'Kitchen and Dining',
            },
        ),
        migrations.CreateModel(
            name='Outdoors',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('amenity', models.CharField(default='', max_length=250)),
            ],
            options={
                'verbose_name_plural': 'Outdoors',
            },
        ),
        migrations.CreateModel(
            name='Parking',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('amenity', models.CharField(default='', max_length=250)),
            ],
            options={
                'verbose_name_plural': 'Parking',
            },
        ),
        migrations.CreateModel(
            name='Safety',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('amenity', models.CharField(default='', max_length=250)),
            ],
            options={
                'verbose_name_plural': 'Safety',
            },
        ),
        migrations.CreateModel(
            name='Services',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('amenity', models.CharField(default='', max_length=250)),
            ],
            options={
                'verbose_name_plural': 'Services',
            },
        ),
    ]
