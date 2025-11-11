from django.urls import path
from . import views

urlpatterns = [
    path('profiles/', views.UserProfileCreateView.as_view(), name='profile-create'),
    path('profiles/<int:pk>/', views.UserProfileView.as_view(), name='profile-update'),
    path('profiles/<int:pk>/delete/', views.UserProfileDeleteView.as_view(), name='profile-delete'),
    path('profiles/list/', views.UserProfileListView.as_view(), name='profile-list'),
    path('profiles/<int:pk>/detail/', views.UserProfileDetailView.as_view(), name='profile-detail'),
    
]