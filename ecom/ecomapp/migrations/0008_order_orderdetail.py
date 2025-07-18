# Generated by Django 5.0.7 on 2025-07-13 16:10

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('ecomapp', '0007_ordercart'),
    ]

    operations = [
        migrations.CreateModel(
            name='Order',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('order_number', models.CharField(blank=True, max_length=100, null=True)),
                ('billing_address', models.CharField(blank=True, max_length=255, null=True)),
                ('status', models.CharField(choices=[('pending', 'Pending'), ('processing', 'Processing'), ('shipped', 'Shipped'), ('delivered', 'Delivered'), ('cancelled', 'Cancelled')], default='pending', max_length=20)),
                ('order_amount', models.DecimalField(decimal_places=2, default=0, max_digits=20)),
                ('shipping_charge', models.DecimalField(decimal_places=2, default=0, max_digits=20)),
                ('discount', models.DecimalField(decimal_places=2, default=0, max_digits=20)),
                ('coupon_discount', models.DecimalField(decimal_places=2, default=0, max_digits=20)),
                ('vat_amount', models.DecimalField(decimal_places=2, default=0, max_digits=20)),
                ('tax_amount', models.DecimalField(decimal_places=2, default=0, max_digits=20)),
                ('paid_amount', models.DecimalField(decimal_places=2, default=0, max_digits=20)),
                ('due_amount', models.DecimalField(decimal_places=2, default=0, max_digits=20)),
                ('grand_total', models.DecimalField(decimal_places=2, default=0, max_digits=20)),
                ('is_active', models.BooleanField(default=True)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('customer', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='ecomapp.customer')),
            ],
            options={
                'db_table': 'orders',
            },
        ),
        migrations.CreateModel(
            name='OrderDetail',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('unit_price', models.DecimalField(decimal_places=2, default=0, max_digits=10)),
                ('is_discount', models.BooleanField(default=False)),
                ('discount_price', models.DecimalField(decimal_places=2, default=0, max_digits=10)),
                ('quantity', models.PositiveIntegerField()),
                ('total_price', models.DecimalField(decimal_places=2, default=0, max_digits=10)),
                ('is_active', models.BooleanField(default=True)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('order', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='order_details', to='ecomapp.order')),
                ('product', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, to='ecomapp.product')),
            ],
            options={
                'db_table': 'order_details',
            },
        ),
    ]
