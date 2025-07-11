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
    path('product/<int:pk>/', views.product_detail, name='product_detail'),
    path('product/edit/<int:pk>/', views.product_edit, name='edit_product'),
    path('product-list/', views.product_list, name='product_list'),
    path('product-create/', views.add_new_product, name='add_new_product'),
    path('products/<slug:product_slug>/', views.products_details, name='products_details'),
   
   path('', views.home, name='home'),

    # Authentication
    path('login/', views.login_view, name='user_login'),
    path('register/', views.register, name='register'),
    path('logout/', views.user_logout, name='user_logout'),

    #ajax

    path('add-or-update-cart/', views.add_or_update_cart, name='add_or_update_cart'),

    path('cart/', views.cart, name='cart_view'),
]