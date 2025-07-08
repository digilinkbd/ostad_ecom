// Sample product data
const products = [
  {
    id: 1,
    title: "Wireless Bluetooth Headphones",
    description: "High-quality wireless headphones with noise cancellation",
    price: 99.99,
    image: "/placeholder.svg?height=250&width=280",
    rating: 4.5,
    reviews: 128,
    category: "electronics",
  },
  {
    id: 2,
    title: "Smart Fitness Watch",
    description: "Track your fitness goals with this advanced smartwatch",
    price: 199.99,
    image: "/placeholder.svg?height=250&width=280",
    rating: 4.3,
    reviews: 89,
    category: "electronics",
  },
  {
    id: 3,
    title: "Premium Coffee Maker",
    description: "Brew the perfect cup of coffee every morning",
    price: 149.99,
    image: "/placeholder.svg?height=250&width=280",
    rating: 4.7,
    reviews: 156,
    category: "home",
  },
  {
    id: 4,
    title: "Designer Handbag",
    description: "Elegant and stylish handbag for any occasion",
    price: 79.99,
    image: "/placeholder.svg?height=250&width=280",
    rating: 4.4,
    reviews: 73,
    category: "fashion",
  },
  {
    id: 5,
    title: "Yoga Mat Set",
    description: "Complete yoga set with mat, blocks, and strap",
    price: 39.99,
    image: "/placeholder.svg?height=250&width=280",
    rating: 4.6,
    reviews: 94,
    category: "sports",
  },
  {
    id: 6,
    title: "Bestseller Novel Collection",
    description: "Collection of top-rated novels from acclaimed authors",
    price: 29.99,
    image: "/placeholder.svg?height=250&width=280",
    rating: 4.8,
    reviews: 201,
    category: "books",
  },
  {
    id: 7,
    title: "Skincare Essentials Kit",
    description: "Complete skincare routine with premium products",
    price: 89.99,
    image: "/placeholder.svg?height=250&width=280",
    rating: 4.5,
    reviews: 112,
    category: "beauty",
  },
  {
    id: 8,
    title: "Wireless Gaming Mouse",
    description: "High-precision gaming mouse with RGB lighting",
    price: 59.99,
    image: "/placeholder.svg?height=250&width=280",
    rating: 4.4,
    reviews: 67,
    category: "electronics",
  },
]

// Shopping cart
const cart = []
let currentProductsShown = 6

// DOM Elements
const productsGrid = document.getElementById("products-grid")
const loadMoreBtn = document.getElementById("load-more-btn")
const cartCount = document.querySelector(".cart-count")
const hamburger = document.querySelector(".hamburger")
const navMenu = document.querySelector(".nav-menu")

// Initialize the page
document.addEventListener("DOMContentLoaded", () => {
  loadProducts()
  setupEventListeners()
  updateCartCount()
})

// Load products into the grid
function loadProducts(count = currentProductsShown) {
  const productsToShow = products.slice(0, count)
  productsGrid.innerHTML = ""

  productsToShow.forEach((product) => {
    const productCard = createProductCard(product)
    productsGrid.appendChild(productCard)
  })

  // Hide load more button if all products are shown
  if (count >= products.length) {
    loadMoreBtn.style.display = "none"
  }
}

// Create product card HTML
function createProductCard(product) {
  const card = document.createElement("div")
  card.className = "product-card"
  card.innerHTML = `
        <img src="${product.image}" alt="${product.title}" class="product-image">
        <div class="product-info">
            <h3 class="product-title">${product.title}</h3>
            <p class="product-description">${product.description}</p>
            <div class="product-price">$${product.price}</div>
            <div class="product-rating">
                <span class="stars">${generateStars(product.rating)}</span>
                <span class="rating-text">(${product.reviews} reviews)</span>
            </div>
            <button class="add-to-cart" onclick="addToCart(${product.id})">
                Add to Cart
            </button>
        </div>
    `
  return card
}

// Generate star rating HTML
function generateStars(rating) {
  const fullStars = Math.floor(rating)
  const hasHalfStar = rating % 1 !== 0
  let starsHTML = ""

  for (let i = 0; i < fullStars; i++) {
    starsHTML += "⭐"
  }

  if (hasHalfStar) {
    starsHTML += "⭐"
  }

  return starsHTML
}

// Add product to cart
function addToCart(productId) {
  const product = products.find((p) => p.id === productId)
  if (product) {
    const existingItem = cart.find((item) => item.id === productId)

    if (existingItem) {
      existingItem.quantity += 1
    } else {
      cart.push({ ...product, quantity: 1 })
    }

    updateCartCount()
    showNotification(`${product.title} added to cart!`)
  }
}

// Update cart count display
function updateCartCount() {
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0)
  cartCount.textContent = totalItems
}

// Show notification
function showNotification(message) {
  // Create notification element
  const notification = document.createElement("div")
  notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: #27ae60;
        color: white;
        padding: 1rem 2rem;
        border-radius: 8px;
        box-shadow: 0 5px 15px rgba(0,0,0,0.2);
        z-index: 1001;
        animation: slideIn 0.3s ease;
    `
  notification.textContent = message

  // Add animation keyframes
  if (!document.querySelector("#notification-styles")) {
    const style = document.createElement("style")
    style.id = "notification-styles"
    style.textContent = `
            @keyframes slideIn {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
        `
    document.head.appendChild(style)
  }

  document.body.appendChild(notification)

  // Remove notification after 3 seconds
  setTimeout(() => {
    notification.remove()
  }, 3000)
}

// Setup event listeners
function setupEventListeners() {
  // Load more products button
  loadMoreBtn.addEventListener("click", () => {
    currentProductsShown += 3
    loadProducts(currentProductsShown)
  })

  // Mobile menu toggle
  hamburger.addEventListener("click", () => {
    navMenu.classList.toggle("active")
    hamburger.classList.toggle("active")
  })

  // Category cards click handlers
  const categoryCards = document.querySelectorAll(".category-card")
  categoryCards.forEach((card) => {
    card.addEventListener("click", function () {
      const category = this.dataset.category
      filterProductsByCategory(category)
    })
  })

  // Smooth scrolling for navigation links
  const navLinks = document.querySelectorAll(".nav-menu a")
  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault()
      const targetId = this.getAttribute("href")
      const targetSection = document.querySelector(targetId)
      if (targetSection) {
        targetSection.scrollIntoView({ behavior: "smooth" })
      }
    })
  })

  // Hero buttons
  const shopNowBtn = document.querySelector(".btn-primary")
  const learnMoreBtn = document.querySelector(".btn-secondary")

  shopNowBtn.addEventListener("click", () => {
    document.querySelector("#products").scrollIntoView({ behavior: "smooth" })
  })

  learnMoreBtn.addEventListener("click", () => {
    document.querySelector("#categories").scrollIntoView({ behavior: "smooth" })
  })
}

// Filter products by category
function filterProductsByCategory(category) {
  const filteredProducts = products.filter((product) => product.category === category)
  productsGrid.innerHTML = ""

  if (filteredProducts.length === 0) {
    productsGrid.innerHTML = '<p style="text-align: center; grid-column: 1/-1;">No products found in this category.</p>'
    loadMoreBtn.style.display = "none"
    return
  }

  filteredProducts.forEach((product) => {
    const productCard = createProductCard(product)
    productsGrid.appendChild(productCard)
  })

  loadMoreBtn.style.display = "none"

  // Scroll to products section
  document.querySelector("#products").scrollIntoView({ behavior: "smooth" })
}

// Search functionality (basic implementation)
const searchBtn = document.querySelector(".search-btn")
searchBtn.addEventListener("click", () => {
  const searchTerm = prompt("Enter search term:")
  if (searchTerm) {
    searchProducts(searchTerm)
  }
})

function searchProducts(term) {
  const filteredProducts = products.filter(
    (product) =>
      product.title.toLowerCase().includes(term.toLowerCase()) ||
      product.description.toLowerCase().includes(term.toLowerCase()),
  )

  productsGrid.innerHTML = ""

  if (filteredProducts.length === 0) {
    productsGrid.innerHTML = '<p style="text-align: center; grid-column: 1/-1;">No products found for your search.</p>'
    loadMoreBtn.style.display = "none"
    return
  }

  filteredProducts.forEach((product) => {
    const productCard = createProductCard(product)
    productsGrid.appendChild(productCard)
  })

  loadMoreBtn.style.display = "none"
  document.querySelector("#products").scrollIntoView({ behavior: "smooth" })
}

// Cart button functionality
const cartBtn = document.querySelector(".cart-btn")
cartBtn.addEventListener("click", () => {
  if (cart.length === 0) {
    alert("Your cart is empty!")
    return
  }

  let cartSummary = "Your Cart:\n\n"
  let total = 0

  cart.forEach((item) => {
    cartSummary += `${item.title} x${item.quantity} - $${(item.price * item.quantity).toFixed(2)}\n`
    total += item.price * item.quantity
  })

  cartSummary += `\nTotal: $${total.toFixed(2)}`
  alert(cartSummary)
})

// Add scroll effect to header
window.addEventListener("scroll", () => {
  const header = document.querySelector(".header")
  if (window.scrollY > 100) {
    header.style.background = "rgba(255, 255, 255, 0.95)"
    header.style.backdropFilter = "blur(10px)"
  } else {
    header.style.background = "#fff"
    header.style.backdropFilter = "none"
  }
})
