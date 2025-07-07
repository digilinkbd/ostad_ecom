from django.contrib import admin
from .models import ( ProductMainCategory)

# Register your models here.
@admin.register(ProductMainCategory)
class ProductMainCategoryAdmin(admin.ModelAdmin):
    list_display         = ('main_cat_name', 'cat_slug', 'cat_ordering', 'created_by', 'updated_by', 'created_at', 'updated_at', 'is_active')
    list_filter          = ('is_active',)
    search_fields        = ('main_cat_name', 'cat_slug')
    ordering             = ('cat_ordering',) 