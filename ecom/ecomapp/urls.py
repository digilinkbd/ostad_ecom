from django.urls import path
from . import views


urlpatterns = [
    path('dashboard/', views.ecom_dashboard, name='dashboard'),
    path('setting-dashboard/', views.setting_dashboard, name='setting_dashboard'),
    # path('login/', views.user_login, name='user_login'),
    # path('logout/', views.user_logout, name='logout'),
    path('product-main-category-list/', views.product_main_category_list_view, name='product_main_category_list'),
    path ('add-product-main-category/', views.add_product_main_category, name='add_product_main_category'),
    path('product-main-category/<int:pk>/', views.product_main_category_details, name='product_main_category_details'),
   
]