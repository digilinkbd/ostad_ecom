// var countryValue = null;
// var stateValue = null;
// var cityValue = null;


// $(document).ready(function () {
//     function fetchCountries() {
//         $.ajax({
//             url: '/admin/api/countries/',
//             method: 'GET',
//             success: function (data) {
//                 const countrySelect = $('#select_country');
//                 countrySelect.empty();
//                 countrySelect.append('<option value="" selected disabled>Select Country</option>');
                
//                 data.forEach(country => {
//                     countrySelect.append(
//                         `<option value="${country.id}" data-code="${country.code}">
//                             ${country.name}
//                         </option>`
//                     );
//                 });

//                 countrySelect.val(countryValue).trigger('change');
//             },
//             error: function (xhr) {
//                 console.error('Error fetching countries:', xhr);
//             }
//         });
//     }

//     function fetchStates(countryId) {
//         $.ajax({
//             url: `/admin/api/states/?country_id=${countryId}`,
//             method: 'GET',
//             success: function (data) {
//                 console.log(countryId);
//                 console.log(data);

//                 const stateSelect = $('#select_state');
//                 stateSelect.empty();
//                 stateSelect.append('<option value="" selected disabled>Select State</option>');

//                 data.forEach(state => {
//                     stateSelect.append(`<option value="${state.id}">${state.name}</option>`);
//                 });

//                 stateSelect.val(stateValue).trigger('change');
//             },
//             error: function (xhr) {
//                 console.error('Error fetching states:', xhr);
//             }
//         });
//     }

//     // Fetch and populate citys for a selected state
//     function fetchCitys(stateId) {
//         $.ajax({
//             url: `/admin/api/citys/?state_id=${stateId}`,
//             method: 'GET',
//             success: function (data) {
//                 const citySelect = $('#select_city');
//                 citySelect.empty();
//                 citySelect.append('<option value="" selected disabled>Select City</option>');

//                 data.forEach(city => {
//                     citySelect.append(`<option value="${city.id}">${city.name}</option>`);
//                 });

//                 citySelect.val(cityValue).trigger('change');
//             },
//             error: function (xhr) {
//                 console.error('Error fetching citys:', xhr);
//             }
//         });
//     }

//     if ($('#select_country')) {
//         fetchCountries();
//     }

//     // Event listeners for dropdown changes
//     $('#select_country').on('change', function () {
//         // const countryId = $(this).val();
//         const selectedOption = $(this).find(':selected');
//         const countryId = selectedOption.val();

//         const countryCode = selectedOption.data('code');

//         const countryCodeElement = document.getElementById('country_code');
//         if (countryCodeElement) {
//             countryCodeElement.value = countryCode;
//         }

//         if (countryId) {
//             fetchStates(countryId);
//             $('#select_state').empty().append('<option value="">Select State</option>').prop('disabled', false);
//         } else {
//             $('#select_state').empty().append('<option value="">Select State</option>').prop('disabled', true);
//             $('#select_city').empty().append('<option value="">Select City</option>').prop('disabled', true);
//         }
//     });

//     $('#select_state').on('change', function () {
//         const stateId = $(this).val();
//         if (stateId) {
//             fetchCitys(stateId);
//             $('#select_city').empty().append('<option value="">Select City</option>').prop('disabled', false);
//         } else {
//             $('#select_city').empty().append('<option value="">Select City</option>').prop('disabled', true);
//         }
//     });
// });

// // Set value in country
// function setCountryValue(value) {
//     countryValue = value;
// }

// // Set value in state
// function setStateValue(value) {
//     stateValue = value;
// }

// // Set value in city
// function setCityValue(value) {
//     cityValue = value;
// }


// //sticky
// var sticky_menu = document.getElementById("header_sticky");
    
// $(window).scroll(function() {
//     const scrollTop = $(window).scrollTop();
    
//     if (scrollTop > 300) {
//         sticky_menu.classList.add('sticky');
//     } else if( scrollTop < 100){
//         sticky_menu.classList.remove('sticky');
//     }
// });



// // currency popup
// function openPopup() {

//     document.body.classList.remove('item-modal-open');
//     document.getElementById('cart-pocket-box').style.display = 'none';

//     const currencyBox = document.getElementById('currency-box');
//     const currencyContainer = document.getElementById('currency-container');
//     console.log(currencyBox, currencyContainer);
    
//     if (!currencyBox || !currencyContainer) {
//         console.error('Required elements not found.');
//         return;
//     }

//     if (currencyBox.style.display === 'block') {
//         currencyBox.style.display = 'none';
//         document.body.classList.remove('modal-open');
//     } else {
//         currencyBox.style.display = 'block';
//         document.body.classList.add('modal-open');
//     }
    
// }

// function closePopup() {
//     document.body.classList.remove('modal-open');
//     document.getElementById('currency-box').style.display = 'none';
// }

// document.querySelector('.dropdown-btn').addEventListener('click', function () {
//     this.parentElement.classList.toggle('open');
// });

// function selectOption(element, value) {
//     console.log(value);
//     const currencyBox = document.getElementById('currency-box');
//     const dropdown = element.closest('.custom-dropdown');
//     const currencyButtons = document.querySelectorAll('.currency'); 

//     const selectedCurrency = element.textContent.trim(); 
//     dropdown.querySelector('.dropdown-btn').textContent = selectedCurrency; 

//     const cleanCurrency = value.replace(/\s+/g, '').toLowerCase(); 
//     const imagePath = `{% static 'images/icons/' %}` + cleanCurrency + `.png`; 

//     currencyButtons.forEach((currencyButton) => {
//         const imageElement = currencyButton.querySelector('img'); 
//         if (imageElement) {
//             imageElement.src = imagePath; 
//         }
//     });

//     dropdown.classList.remove('open');
//     console.log(`Selected: ${selectedCurrency}, Image path: ${imagePath}`);
//     currencyBox.style.display = 'none';
//     document.body.classList.remove('modal-open');

//     changeCurrency(value);
// }


// function changeCurrency(currency) {
//     fetch(`/change-currency/?currency=${currency}`, {
//         method: 'GET',
//     })
//     .then(response => response.json())
//     .then(data => {
//         location.reload();
//     })
//     .catch(error => {
//         console.error('Error:', error);
//     });
// }

// document.addEventListener('click', function (event) {
//     const currencyBox = document.getElementById('currency-box');
//     const currencyContainer = document.getElementById('currency-container');
//     const currencyButtons = document.querySelectorAll('.currency');

//     const clickedOutsideCurrencyButtons = !Array.from(currencyButtons).some((button) => button.contains(event.target));
//     if (!currencyContainer.contains(event.target) && clickedOutsideCurrencyButtons) {
//         currencyBox.style.display = 'none';
//         document.body.classList.remove('modal-open');
//     }
// });
// document.addEventListener('click', function (event) {
//     const pocketBox = document.getElementById('cart-pocket-box');
//     const pocketContainer = document.getElementById('pocket-container');
//     const cartButtons = document.querySelectorAll('.cart-qty-box');

//     const clickedOutsideCurrencyButtons = !Array.from(cartButtons).some((button) => button.contains(event.target));
//     if (!pocketContainer.contains(event.target) && clickedOutsideCurrencyButtons) {
//         pocketBox.style.display = 'none';
//         document.body.classList.remove('item-modal-open');
//     }
// });


// //Pocket
// function cart_open() {

//     document.body.classList.remove('modal-open');
//     document.getElementById('currency-box').style.display = 'none';

//     const pocketBox = document.getElementById('cart-pocket-box');
//     const pocketContainer = document.getElementById('pocket-container');
//     console.log(pocketBox, pocketContainer);
    
//     if (!pocketBox || !pocketContainer) {
//         console.error('Required elements not found.');
//         return;
//     }

//     if (pocketBox.style.display === 'block') {
//         pocketBox.style.display = 'none';
//         document.body.classList.remove('item-modal-open');
//     } else {
//         pocketBox.style.display = 'block';
//         document.body.classList.add('item-modal-open');
//     }

// }

// // For cart pocket
// document.addEventListener('DOMContentLoaded', () => {
//     // Add event listeners to all plus buttons
//     document.querySelectorAll('.plus').forEach(button => {
//         button.addEventListener('click', () => {
//             // Get the associated input field
//             const input = button.parentElement.querySelector('.pocket_qty');
//             if (input) {
//                 const max = parseInt(input.getAttribute('max')) || Infinity;
//                 let value = parseInt(input.value) || 0;

//                 // Increment value if below the max limit
//                 if (value < max) {
//                     input.value = value + 1;
//                 }
//             }
//         });
//     });

//     // Add event listeners to all minus buttons
//     document.querySelectorAll('.minus').forEach(button => {
//         button.addEventListener('click', () => {
//             // Get the associated input field
//             const input = button.parentElement.querySelector('.pocket_qty');
//             if (input) {
//                 const min = parseInt(input.getAttribute('min')) || 0;
//                 let value = parseInt(input.value) || 0;

//                 // Decrement value if above the min limit
//                 if (value > min) {
//                     input.value = value - 1;
//                 }
//             }
//         });
//     });
// });


// function closeCartPopup() {
//     document.body.classList.remove('item-modal-open');
//     document.getElementById('cart-pocket-box').style.display = 'none';
// }

// setTimeout(function() {
//     document.querySelector(".messages").style.display = "none";
// }, 3000);

// const errorElements = document.querySelectorAll('.error');
// errorElements.forEach((element) => {
//   setTimeout(() => {
//     element.style.display = 'none';
//   }, 3000);
// });

// function search_box() {
//     document.getElementById('search-box').classList.add('active');
// }
// $(document).click(function (event) {
//     if (!$(event.target).closest('#search-box').length) {
//         $('#search-box').removeClass('active');
//     }
// });
// // document.addEventListener('click', function (event) {
// //     const pocketBox = document.getElementById('cart-pocket-box');
// //     const pocketContainer = document.getElementById('pocket-container');
// //     const cartButtons = document.querySelectorAll('.cart-qty-box');

// //     const clickedOutsideCurrencyButtons = !Array.from(cartButtons).some((button) => button.contains(event.target));
// //     if (!pocketContainer.contains(event.target) && clickedOutsideCurrencyButtons) {
// //         pocketBox.style.display = 'none';
// //         document.getElementById('search-box').classList.remove('active');
// //     }
// // });