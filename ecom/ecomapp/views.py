from django.shortcuts import render
from django.contrib.auth.decorators import login_required
from .models import MenuList
from django.contrib.auth.models import User

from django.shortcuts import redirect
from django.shortcuts import get_object_or_404
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
from django.core.paginator import Paginator, PageNotAnInteger, EmptyPage
from django.contrib import messages
from ecomapp.common_func import checkUserPermission
from ecomapp.models import (
     MenuList,ProductMainCategory
   
)

# Create your views here.
# Create your views here.
def ecom_dashboard(request):
   
    return render(request, 'home/home.html')


@login_required
def paginate_data(request, page_num, data_list):
    items_per_page, max_pages = 10, 10
    paginator = Paginator(data_list, items_per_page)
    last_page_number = paginator.num_pages

    try:
        data_list = paginator.page(page_num)
    except PageNotAnInteger:
        data_list = paginator.page(1)
    except EmptyPage:
        data_list = paginator.page(paginator.num_pages)

    current_page = data_list.number
    start_page = max(current_page - int(max_pages / 2), 1)
    end_page = start_page + max_pages

    if end_page > last_page_number:
        end_page = last_page_number + 1
        start_page = max(end_page - max_pages, 1)

    paginator_list = range(start_page, end_page)

    return data_list, paginator_list, last_page_number


@login_required
def setting_dashboard(request):
    get_setting_menu = MenuList.objects.filter(module_name='Setting', is_active=True)
   
    context = {
        "get_setting_menu": get_setting_menu,
        
    }
    return render(request, 'home/setting_dashboard.html', context)

@login_required 
def product_main_category_list_view(request):
    
    
    if not checkUserPermission(request, "can_view", "backend/product-main-category-list/"):
        return render(request,"403.html")

    product_main_categories = ProductMainCategory.objects.filter(is_active=True).order_by('-id')
    page_number = request.GET.get('page', 1)
    product_main_categories, paginator_list, last_page_number = paginate_data(request, page_number, product_main_categories)

    context = {
        'paginator_list': paginator_list,
        'last_page_number': last_page_number,
        'product_main_categories': product_main_categories,
    }

    return render(request, "product/main_category_list.html", context)  

@login_required
def add_product_main_category(request):
    if not checkUserPermission(request, "can_add", "backend/product-main-category-list/"):
        return render(request,"403.html")

    if request.method == 'POST':
        main_cat_name = request.POST.get('main_cat_name')
        cat_slug = request.POST.get('cat_slug')

        description = request.POST.get('description')
        
        product_main_category = ProductMainCategory(
            main_cat_name=main_cat_name,
            cat_slug=cat_slug,
            description=description,
            created_by=request.user
        )
        product_main_category.save()
        messages.success(request, 'Product Main Category added successfully.')
        return redirect('product_main_category_list')

    return render(request, 'product/add_product_main_category.html')

@login_required
def product_main_category_details(request, pk):
    if not checkUserPermission(request, "can_view", "backend/product-main-category-list/"):
        return render(request,"403.html")

    data = get_object_or_404(ProductMainCategory, pk=pk)
    
    context = {
        'data': data,
    }
    return render(request, 'product/product_main_category_details.html', context)

