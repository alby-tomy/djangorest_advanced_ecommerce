# Generated by Django 5.1 on 2024-08-19 07:07

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('ecom_app', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='products',
            name='numReviews',
            field=models.IntegerField(blank=True, default=0, null=True),
        ),
    ]
