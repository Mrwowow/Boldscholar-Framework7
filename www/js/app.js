



// Dom7
var $ = Dom7;

// Theme
var theme = 'ios';

// Init App
var app = new Framework7({
  id: 'com.boldscholar.app',
  title: 'Boldscholar',
  name: 'Boldscholar',
  el: '#app',
  theme,
  // store.js,
  store: store,
  // routes.js,
  routes: routes,
  popup: {
    closeOnEscape: true,
  },
  sheet: {
    closeOnEscape: true,
  },
  popover: {
    closeOnEscape: true,
  },
  actions: {
    closeOnEscape: true,
  },
  vi: {
    placementId: 'pltd4o7ibb9rc653x14',
  },
toast: {
		closeTimeout: 3000
	}
});

let autocomplete;
let address1Field;
let postalField;

function initMap() {
  address1Field = document.querySelector("#pickup");
 // postalField = document.querySelector("#postcode");
  // Create the autocomplete object, restricting the search predictions to
  // addresses in the US and Canada.
  autocomplete = new google.maps.places.Autocomplete(address1Field, {
    //componentRestrictions: { country: ["us", "ca"] },
    fields: ["address_components", "geometry"],
    types: ["address"],
  });
  // When the user selects an address from the drop-down, populate the
  // address fields in the form.
  autocomplete.addListener("place_changed", fillInAddress);
}

function fillInAddress() {
  // Get the place details from the autocomplete object.
  const place = autocomplete.getPlace();
  let address1 = "";
  let postcode = "";

  // Get each component of the address from the place details,
  // and then fill-in the corresponding field on the form.
  // place.address_components are google.maps.GeocoderAddressComponent objects
  // which are documented at http://goo.gle/3l5i5Mr
  for (const component of place.address_components) {
    const componentType = component.types[0];

    switch (componentType) {
      case "street_number": {
        address1 = `${component.long_name} ${address1}`;
        break;
      }

      case "route": {
        address1 += component.short_name;
        break;
      }

      case "postal_code": {
        postcode = `${component.long_name}${postcode}`;
        break;
      }

      case "postal_code_suffix": {
        postcode = `${postcode}-${component.long_name}`;
        break;
      }
      case "locality":
        document.querySelector("#locality").value = component.long_name;
        break;
      case "administrative_area_level_1": {
        document.querySelector("#state").value = component.short_name;
        break;
      }
      case "country":
        document.querySelector("#country").value = component.long_name;
        $('#country').append($('<option selected>').val(component.long_name).text(component.long_name));
        break;
    }
  }

  address1Field.value = address1;
 // postalField.value = postcode;
  // After filling the form with address components from the Autocomplete
  // prediction, set cursor focus on the second address line to encourage
  // entry of subpremise information such as apartment, unit, or floor number.
}

// Variable for autocomplete input element
var autocompleteInput = $('#autocomplete-input')[0];

// Function to initialize Google Maps API after the script has loaded
function initMap1() {
  // Create a Google Maps autocomplete service
  var autocompleteService = new google.maps.places.AutocompleteService();

  // Add a listener to the input field where you want to enable autocomplete
  $(autocompleteInput).on('input', function () {
    var query = $(this).val();

    // Request autocomplete predictions from Google Maps API
    if (query) {
      autocompleteService.getPlacePredictions(
        { input: query },
        function (predictions, status) {
          if (status === google.maps.places.PlacesServiceStatus.OK) {
            var autocompleteResults = predictions.map(function (prediction) {
                console.log(prediction.description);
              return prediction.description;
            });

            // Create a datalist element with autocomplete results
            var datalist = $('<datalist>').attr('id', 'autocomplete-datalist');

            // Append options to the datalist
            autocompleteResults.forEach(function (result) {
              $('<option>').val(result).appendTo(datalist);
            });

            // Check if datalist already exists and replace it
            var existingDatalist = $('#autocomplete-datalist');
            if (existingDatalist.length) {
              existingDatalist.remove();
            }

            // Append the datalist to the input field
            $(autocompleteInput).attr('list', 'autocomplete-datalist').parent().append(datalist);
          } else {
            console.log('Autocomplete request failed:', status);
          }
        }
      );
    } else {
      // Clear the datalist when no input is entered
      var datalist = $('#autocomplete-datalist');
      if (datalist.length) {
        datalist.remove();
      }
    }
  });
}

// If you have any other initialization code for your app, you can place it here.


// If you have any other initialization code for your app, you can place it here.



/*
|------------------------------------------------------------------------------
| Web API Support
|------------------------------------------------------------------------------
*/

app.support.webApi = {
    appBadging: function() {
        return 'setAppBadge' in navigator;
    }(),
    batteryStatus: function() {
        return 'getBattery' in navigator || 'battery' in navigator;
    }(),
    clipboard: function() {
        return 'clipboard' in navigator;
    }(),
    contactPicker: function() {
        return 'contacts' in navigator && 'ContactsManager' in window;
    }(),
    deviceMemory: function() {
        return 'deviceMemory' in navigator;
    }(),
    deviceOrientation: function() {
        return 'DeviceOrientationEvent' in window;
    }(),
    file: function() {
        return 'File' in window && 'FileReader' in window;
    }(),
    fullscreen: function() {
        return 'requestFullscreen' in document.documentElement || 'webkitRequestFullscreen' in document.documentElement || 'mozRequestFullScreen' in document.documentElement || 'msRequestFullscreen' in document.documentElement;
    }(),
    geolocation: function() {
        return 'geolocation' in navigator;
    }(),
    getInstalledRelatedApps: function() {
        return 'getInstalledRelatedApps' in navigator;
    }(),
    localStorage: function() {
        return 'localStorage' in window;
    }(),
    networkInformation: function() {
        return 'connection' in navigator || 'webkitConnection' in navigator || 'mozConnection' in navigator || 'msConnection' in navigator;
    }(),
    notifications: function() {
        return 'Notification' in window;
    }(),
    onlineOfflineStatus: function() {
        return typeof navigator.onLine !== 'undefined';
    }(),
    pageVisibility: function() {
        return typeof document.hidden !== 'undefined' || typeof document.webkitHidden !== 'undefined' || typeof document.mozHidden !== 'undefined' || typeof document.msHidden !== 'undefined';
    }(),
    permissions: function() {
        return 'permissions' in navigator;
    }(),
    pictureInPicture: function() {
        return 'pictureInPictureEnabled' in document;
    }(),
    quotaEstimation: function() {
        return 'storage' in navigator && 'estimate' in navigator.storage;
    }(),
    screenOrientation: function() {
        return 'orientation' in screen;
    }(),
    screenWakeLock: function() {
        return 'wakeLock' in navigator;
    }(),
    serverSentEvents: function() {
        return 'EventSource' in window;
    }(),
    sessionStorage: function() {
        return 'sessionStorage' in window;
    }(),
    vibration: function() {
        return 'vibrate' in navigator;
    }(),
    webShare: function() {
        return 'share' in navigator;
    }()
}
app.on('init', function() {
	//initializeServiceWorker();
	//initializeViews();
	//initializeTheme();
	//initializeI18n();
	//initializeA2HS();
	//initializeBackButton();
	app.getInternetConnectionStatus();
	//setAJAXDefaults();
	//setFormValidatorDefaults();
	//initializeFacebookJsSdk();
    app.formValidator.initialize();
    //app.layout.initialize();
 
});
/* Show Message When App Goes Online */
app.on('online', function() {
    app.toast.show({
        text: 'Connected to Internet',
        horizontalPosition: 'center',
        position: 'top',
        cssClass: 'color-green'
    });
});

/* Show Message When App Goes Offline */
app.on('offline', function() {
    app.toast.show({
        text: 'No Internet Connection',
        horizontalPosition: 'center',
        position: 'top',
        cssClass: 'color-red'
    });
});

app.formValidator = {
    initialize: function() {
        if ('jQuery' in window && 'validator' in jQuery) {
            jQuery.validator.setDefaults({
                ignore: [],
                errorClass: 'item-input-error-message',
                errorElement : 'div',
                errorPlacement: function(error, element) {
                    jQuery(element).parents('.item-input').addClass('item-input-with-error-message');
                    jQuery(element).parents('.item-input').addClass('item-input-invalid');
                    error.appendTo(element.parents('.item-input-wrap'));
                },
                highlight: function(element, errorClass, validClass) {
                    jQuery(element).parents('.item-input').addClass('item-input-with-error-message');
                    jQuery(element).parents('.item-input').addClass('item-input-invalid');
                    jQuery(element).removeClass(errorClass);
                },
                unhighlight: function(element, errorClass, validClass) {
                    jQuery(element).parents('.item-input').removeClass('item-input-with-error-message');
                    jQuery(element).parents('.item-input').removeClass('item-input-invalid');
                },
                success: function(label, element) {
                    jQuery(element).parents('.item-input').removeClass('item-input-with-error-message');
                    jQuery(element).parents('.item-input').removeClass('item-input-invalid');
                    jQuery(element).parents('.item-input').find('.item-input-error-message').remove();
                }
            });
            jQuery.validator.addMethod(
                'regex',
                function(value, element, regexp) {
                    if (regexp.constructor != RegExp) {
                        regexp = new RegExp(regexp);
                    }
                    else if (regexp.global) {
                        regexp.lastIndex = 0;
                    }
                    return this.optional(element) || regexp.test(value);
                }, ''
            );
        }
    }
}

/*
|------------------------------------------------------------------------------
| Component - Rating
|------------------------------------------------------------------------------
*/

app.on('pageInit', function(page) {
    app.rating.initialize(page.$el);
    
 // Define a function to check if PDFViewerApplication is in the window
function isPDFViewerApplicationAvailable() {
  return typeof window.PDFViewerApplication !== 'undefined';
}   

});

app.on('tabMounted', function(tabEl) {
    app.rating.initialize(tabEl);
});

app.rating = {
    initialize: function(containerEl) {
        if ('jQuery' in window && jQuery.isFunction(jQuery.fn.rateYo)) {
            app.$(containerEl).find('.rating-init').each(function(el, index) {
                jQuery(el).rateYo({
                    halfStar: true,
                    normalFill: app.stylesheet.getPropertyValue('--color-gray-300'),
                    ratedFill: app.stylesheet.getPropertyValue('--color-amber-500'),
                    readOnly: true,
                    rtl: app.rtl,
                    spacing: '2px',
                    starWidth: '16px'
                });
            });
        }
    }
}


$(document).on('click', '.state-toggle', function() {
        let toggle = app.$(this);
        let state = toggle.hasClass('state-toggle-active') ? 1 : 0;
        if (state) {
            toggle.removeClass('state-toggle-active');
            toggle.trigger('stateChange', 0);
            app.emit('toggleStateChange', 0);
        }
        else {
            toggle.addClass('state-toggle-active');
            toggle.trigger('stateChange', 1);
            app.emit('toggleStateChange', 1);
        }
    });

/* Get External URL Target */
app.getExternalUrlTarget = function() {
    if (app.device.cordova && cordova.InAppBrowser) {
        return '_system';
    }
    else {
        return '_blank';
    }
}
/* Open External URL */
app.openExternalUrl = function(url, target) {
    if (app.device.cordova && cordova.InAppBrowser) {
        cordova.InAppBrowser.open(url, target || '_system');
    }
    else {
        window.open(url, target || '_blank');
    }
}
/* Remove Diacritics */
app.removeDiacritics = function(str) {
    return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}

/* Render Unicode */
app.renderUnicode = function(unicode) {
    return String.fromCodePoint(parseInt(unicode, 16));
}

/* Scroll To Element */
app.scrollTo = function(selector) {
    let el = app.$(selector);
    if (el) {
        app.$(el)[0].scrollIntoView({
            behavior: 'smooth',
            block: 'start',
            inline: 'nearest'
        });
    }
}


/*
|------------------------------------------------------------------------------
| Component - Timer
|------------------------------------------------------------------------------
*/

app.on('pageInit', function(page) {
    app.timer.initialize(page.$el);
});

app.on('tabMounted', function(tabEl) {
    app.timer.initialize(tabEl);
});

app.timer = {
    initialize: function(containerEl) {
        if ('easytimer' in window) {
            app.$(containerEl).find('.timer-countdown.countdown-init').each(function(countdownEl, index) {
                app.$(countdownEl).find('.countdown-result').css('display', 'none');
                app.$(countdownEl).find('.countdown-inner').css('display', 'initial');
                let countdownDateTime = app.$(countdownEl).attr('data-countdown-datetime');
                if (!countdownDateTime) return;
                let startDateTime = new Date();
                let endDateTime = new Date(countdownDateTime);
                let secondsDiff = Math.round((endDateTime.getTime() - startDateTime.getTime()) / 1000);
                let timerCountdown = new easytimer.Timer();
                timerCountdown.start({
                    countdown: true,
                    startValues: {
                        seconds: secondsDiff > 0 ? secondsDiff : 1
                    },
                    callback: function(timer) {
                        let days = (timer.getTimeValues().days).toLocaleString('en-US', {minimumIntegerDigits: 2});
                        let hours = (timer.getTimeValues().hours).toLocaleString('en-US', {minimumIntegerDigits: 2});
                        let minutes = (timer.getTimeValues().minutes).toLocaleString('en-US', {minimumIntegerDigits: 2});
                        let seconds = (timer.getTimeValues().seconds).toLocaleString('en-US', {minimumIntegerDigits: 2});
                        app.$(countdownEl).find('.countdown-days').text(days);
                        app.$(countdownEl).find('.countdown-hours').text(hours);
                        app.$(countdownEl).find('.countdown-minutes').text(minutes);
                        app.$(countdownEl).find('.countdown-seconds').text(seconds);
                        app.$(countdownEl).find('.countdown-value').text(`${days}:${hours}:${minutes}:${seconds}`);
                    }
                });
                timerCountdown.on('targetAchieved', function(event) {
                    app.$(countdownEl).find('.countdown-result').css('display', 'initial');
                    app.$(countdownEl).find('.countdown-inner').css('display', 'none');
                });
            });
        }
    }
}

document.addEventListener('deviceready', function() {
    
// Enable
function onDeviceReady() {
  window.plugins.preventscreenshot.enable(successCallback, errorCallback);
}
  // OneSignal initialization
  var notificationOpenedCallback = function(jsonData) {
    console.log('Notification opened:', jsonData);
  };

  window.plugins.OneSignal
    .startInit("0ed8aab7-f2b0-4d64-a2cb-abf1a07a05ce")
    .handleNotificationOpened(notificationOpenedCallback)
    .endInit();
}, false);


document.addEventListener('deviceready', function() {
  nfc.addNdefListener(function(nfcEvent) {
    // NFC event handler
    var tag = nfcEvent.tag;
    // Process the NFC tag data
  }, function() {
    // Success callback
  }, function(error) {
    // Error callback
  });
}, false);

/*
|------------------------------------------------------------------------------
| Component - Form Validator
|------------------------------------------------------------------------------
*/

app.on('init', function() {
    app.formValidator.initialize();
    var navigation = app.views.main.router.navigation;
});

app.formValidator = {
    initialize: function() {
        if ('jQuery' in window && 'validator' in jQuery) {
            jQuery.validator.setDefaults({
                ignore: [],
                errorClass: 'item-input-error-message',
                errorElement : 'div',
                errorPlacement: function(error, element) {
                    jQuery(element).parents('.item-input').addClass('item-input-with-error-message');
                    jQuery(element).parents('.item-input').addClass('item-input-invalid');
                    error.appendTo(element.parents('.item-input-wrap'));
                },
                highlight: function(element, errorClass, validClass) {
                    jQuery(element).parents('.item-input').addClass('item-input-with-error-message');
                    jQuery(element).parents('.item-input').addClass('item-input-invalid');
                    jQuery(element).removeClass(errorClass);
                },
                unhighlight: function(element, errorClass, validClass) {
                    jQuery(element).parents('.item-input').removeClass('item-input-with-error-message');
                    jQuery(element).parents('.item-input').removeClass('item-input-invalid');
                },
                success: function(label, element) {
                    jQuery(element).parents('.item-input').removeClass('item-input-with-error-message');
                    jQuery(element).parents('.item-input').removeClass('item-input-invalid');
                    jQuery(element).parents('.item-input').find('.item-input-error-message').remove();
                }
            });
            jQuery.validator.addMethod(
                'regex',
                function(value, element, regexp) {
                    if (regexp.constructor != RegExp) {
                        regexp = new RegExp(regexp);
                    }
                    else if (regexp.global) {
                        regexp.lastIndex = 0;
                    }
                    return this.optional(element) || regexp.test(value);
                }, ''
            );
        }
    }
}




/*
|------------------------------------------------------------------------------
| Get Internet Connection Status
|------------------------------------------------------------------------------
*/

function getInternetConnectionStatus() {
	window.addEventListener('online', function() {
		app.toast.show({
			text: 'Connected to Internet',
			position: 'bottom',
			cssClass: 'bg-color-green'
		});
	});
	window.addEventListener('offline', function() {
		app.toast.show({
			text: 'No Internet Connection',
			position: 'bottom',
			cssClass: 'bg-color-red'
		});
	});
}

window.config = {};

window.config.app = {
	id: 'com.boldscholar.app',
	version: '0.1',
	title: 'Boldscholar',
	tagline: 'Readers are Leaders',
	logo: 'img/logo.svg',
    server_key: 'd77e8daafa36811c6629ea394e209684d79d10b9-263c433be30db8cf0392f1456c47205d-11396946',
    paystack_pk_live: 'pk_live_d8141648e048747104a95f9f869e1a7572978fc1',
    paystack_sk_live: 'sk_live_871bfbd799a2dcd8c17b7f94e354c7e30fc2e357',

    paystack_pk_test:'pk_test_e48507e1bbf181f8e5ee04ad45dd133ef9b75ad8',
    paystack_sk_test: 'sk_test_d759ada22e68848cd104075d4354562f1ac8e090',

    apiurlbase: 'https://boldscholar.com /',
    lottieiurlbase: 'assets/lottie/'
};

/*
|------------------------------------------------------------------------------
| Navigation
|------------------------------------------------------------------------------
*/

window.config.navigation = {
    splash: {
        enabled: !Framework7.device.standalone && !Framework7.device.cordova
    },
    walkthrough: {
        enabled: true,
        showFirstTimeOnly: true
    },
    authentication: {
        required: false,
        guestAccess: true,
        ignoreRoutes: [
            '/',
            '/404/',
            '/about/',
            '/careers/', '/coming-soon/', '/contact/', '/cookie-policy/',
            '/faq/', '/feedback/', '/forgot-password/',
            '/home/',
            '/login/',
            '/pricing/', '/privacy-policy/',
            '/select-language/', '/select-appearance/', '/sidebar/', '/signup/', '/splash/',
            '/team/', '/terms/', '/testimonials/',
            '/under-maintenance/',
            '/verify-email/', '/verify-otp/',
            '/walkthrough/'
        ]
    },
    home: {
        url: './pages/shop.html'
    }
}

window.config.googleMaps = {
	apiKey: 'AIzaSyD3GvCcgGwnM39MYPaSGCsVNR8O05YhO4s'
};




/*
|------------------------------------------------------------------------------
| REST Countries API
|------------------------------------------------------------------------------
*/

window.config.restCountries = {
    rootEndpoint: 'https://restcountries.com/v3.1'
}

/*
|------------------------------------------------------------------------------
| Component - Form Validator
|------------------------------------------------------------------------------
*/

app.on('init', function() {
    app.formValidator.initialize();
});

app.formValidator = {
    initialize: function() {
        if ('jQuery' in window && 'validator' in jQuery) {
            jQuery.validator.setDefaults({
                ignore: [],
                errorClass: 'item-input-error-message',
                errorElement : 'div',
                errorPlacement: function(error, element) {
                    jQuery(element).parents('.item-input').addClass('item-input-with-error-message');
                    jQuery(element).parents('.item-input').addClass('item-input-invalid');
                    error.appendTo(element.parents('.item-input-wrap'));
                },
                highlight: function(element, errorClass, validClass) {
                    jQuery(element).parents('.item-input').addClass('item-input-with-error-message');
                    jQuery(element).parents('.item-input').addClass('item-input-invalid');
                    jQuery(element).removeClass(errorClass);
                },
                unhighlight: function(element, errorClass, validClass) {
                    jQuery(element).parents('.item-input').removeClass('item-input-with-error-message');
                    jQuery(element).parents('.item-input').removeClass('item-input-invalid');
                },
                success: function(label, element) {
                    jQuery(element).parents('.item-input').removeClass('item-input-with-error-message');
                    jQuery(element).parents('.item-input').removeClass('item-input-invalid');
                    jQuery(element).parents('.item-input').find('.item-input-error-message').remove();
                }
            });
            jQuery.validator.addMethod(
                'regex',
                function(value, element, regexp) {
                    if (regexp.constructor != RegExp) {
                        regexp = new RegExp(regexp);
                    }
                    else if (regexp.global) {
                        regexp.lastIndex = 0;
                    }
                    return this.optional(element) || regexp.test(value);
                }, ''
            );
        }
    }
}
/*
|------------------------------------------------------------------------------
| Check Auth Status
|------------------------------------------------------------------------------
*/

function checkAuthStatus({to, from, resolve, reject}) {
    let router = this;
    if (app.config.navigation.authentication.required) {
        if (app.store.state.isUserLoggedIn) {
            resolve();
        }
        else {
            if (app.config.navigation.authentication.ignoreRoutes.includes(to.path)) {
                resolve();
            }
            else {
                reject();
                router.navigate(
                    {
                        url: '/login/?redirect=' + to.path,
                    },
                    {
                        reloadCurrent: true
                    }
                );
                return;
            }
        }
    }
    else {
        resolve();
    }
}
$(document).on('page:init', function (e) {
  // Do something here when page loaded and initialized for all pages
  function onDeviceReady() {
  window.plugins.preventscreenshot.enable(successCallback, errorCallback);
}  
    
  //    $('html').addClass('theme-dark');
    
  function checkPermissions() {
    var permissions = cordova.plugins.permissions;

    // Check Geolocation Permission
    permissions.checkPermission(permissions.ACCESS_FINE_LOCATION, function(status) {
        if (!status.hasPermission) {
            permissions.requestPermission(permissions.ACCESS_FINE_LOCATION, function() {
                console.log('Geolocation permission granted');
            }, function() {
                console.error('Geolocation permission denied');
            });
        } else {
            console.log('Geolocation permission already granted');
        }
    });

    // Check Contacts Permission
    permissions.checkPermission(permissions.READ_CONTACTS, function(status) {
        if (!status.hasPermission) {
            permissions.requestPermission(permissions.READ_CONTACTS, function() {
                console.log('Contacts permission granted');
            }, function() {
                console.error('Contacts permission denied');
            });
        } else {
            console.log('Contacts permission already granted');
        }
    });

    // Check Camera Permission
    permissions.checkPermission(permissions.CAMERA, function(status) {
        if (!status.hasPermission) {
            permissions.requestPermission(permissions.CAMERA, function() {
                console.log('Camera permission granted');
            }, function() {
                console.error('Camera permission denied');
            });
        } else {
            console.log('Camera permission already granted');
        }
    });
}
 checkPermissions();   
  /* coverimg */
  $('.coverimg').each(function () {
    var imgpath = $(this).find('img');
    $(this).css('background-image', 'url(' + imgpath.attr('src') + ')');
    imgpath.hide();
  });

  $('.accordion-toggle').on('click', function () {
    $(this).toggleClass('active')
    $(this).closest('.accordion-list').find('.accordion-content').toggleClass('show')
  })



    // Check and request file permissions on app launch
    checkAndRequestFileSystemAccess();

function checkAndRequestFileSystemAccess() {
    // Check if the app has broad filesystem access
    cordova.plugins.permissions.hasPermission(
        cordova.plugins.permissions.MANAGE_EXTERNAL_STORAGE,
        function (status) {
            if (!status.hasPermission) {
                // Permission is not granted, request it
                requestFileSystemAccess();
            } else {
                // Permission is already granted, proceed with your logic
                console.log('Broad filesystem access is already granted.');
                  app.toast.show({
					text: 'Broad filesystem access is already granted.' ,
					position: 'center',
					cssClass: 'toast-round bg-color-green'
				});
            }
        },
        function (error) {
            console.log('Error checking MANAGE_EXTERNAL_STORAGE permission:', error);
               app.toast.show({
					text: 'Error checking MANAGE_EXTERNAL_STORAGE permission:', error ,
					position: 'center',
					cssClass: 'toast-round bg-color-red'
				});
        }
    );
}

function requestFileSystemAccess() {
    // Request broad filesystem access
    cordova.plugins.permissions.requestPermission(
        cordova.plugins.permissions.MANAGE_EXTERNAL_STORAGE,
        function (status) {
            if (status.hasPermission) {
                // Permission granted, proceed with your logic
                console.log('Broad filesystem access is granted.');
            } else {
                // Permission denied, inform the user
                console.warn('Broad filesystem access is not granted.');
            }
        },
        function (error) {
            console.error('Error requesting MANAGE_EXTERNAL_STORAGE permission:', error);
        }
    );
}

// Function to open system settings for the app
function openAppSettings() {
    cordova.plugins.diagnostic.switchToSettings(
        function (setting) {
            console.log('Opened settings:', setting);
        },
        function (error) {
            console.error('Error opening settings:', error);
        }
    );
}

  
  
  
});




$(document).on('page:afterin', function (e) {
  /* scroll from top and add class */
  $('.view-main .page-current .page-content').on('scroll', function () {
    if ($(this).scrollTop() > '10') {
      $('.view-main .navbar-current').addClass('active');
    } else {
      $('.view-main .navbar-current').removeClass('active');
    }
  });

  /* static footer*/
  if ($('.page.page-current .footer').length > 0) {
    $('.view.view-main .page-content').addClass('has-footer');
  } else {
    $('.view.view-main .page-content').removeClass('has-footer');
  }
  $('.centerbutton .nav-link').on('click', function () {
    $(this).toggleClass('active')
  })


});

$(document).on('page:init', '.page[data-name="splash"]', function (e) {
  setTimeout(function () {
    $('.loader-wrap').hide();
  }, 1000);

  setTimeout(function () {
      // var expire = localStorage.getItem('WaoCardUserTokenExpire');
					if(localStorage.getItem("BoldScholarUserData") === null)
					{
						app.views.current.router.navigate('/login-screen-page/');
					}
					
				   else {
                       app.views.current.router.navigate('/shop/', {
                    reloadCurrent: true, // Refresh the current page
                    ignoreCache: true // Ignore caching for the new page
});	
	
					}
                 
					
  
  }, 4000);
})
$(document).on('page:init', '.page[data-name="login-screen-page"]', function (e) {
   
                 
            
})
$(document).on('page:init', '.page[data-name="journal-page"]', function (e) {
   
                
            
})
$(document).on('page:init', '.page[data-name="register"]', function (e) {
  
	
    
              var input = document.querySelector("#regmobile"),
  errorMsg = document.querySelector("#error-msg"),
  validMsg = document.querySelector("#valid-msg");

// here, the index maps to the error code returned from getValidationError - see readme
var errorMap = ["Invalid", "Invalid country code", "Too short", "Too long", "Invalid"];

// initialise plugin
var iti = window.intlTelInput(input, {
    
// allowDropdown:true,
      // autoHideDialCode: false,
       autoPlaceholder: "aggressive",
      dropdownContainer: document.getElementById("countrylist"),
      // excludeCountries: ["us"],
      // formatOnDisplay: false,
          initialCountry: "ng",
     allowDropdown: false,
      geoIpLookup: function(callback) {
         $.get("https://ipinfo.io", function() {}, "jsonp").always(function(resp) {
           var countryCode = (resp && resp.country) ? resp.country : "ng";
           callback(countryCode);
         });
       },
      // hiddenInput: "full_number",
      // localizedCountries: { 'de': 'Deutschland' },
      // nationalMode: true,
      // onlyCountries: ['us', 'gb', 'ch', 'ca', 'do'],
      // placeholderNumberType: "MOBILE",
      // preferredCountries: ['ng', 'us'],
      separateDialCode: true,
  utilsScript: "vendor/intl-tel-input-master/build/js/utils.js?1638200991544"
});

var reset = function() {
  input.classList.remove("error");
  errorMsg.innerHTML = "";
  errorMsg.classList.add("hide");
  validMsg.classList.add("hide");
};

// on blur: validate
input.addEventListener('blur', function() {
  reset();
  if (input.value.trim()) {
    if (iti.isValidNumber()) {
      validMsg.classList.remove("hide");
        
     var getCode = iti.getSelectedCountryData(input).dialCode;
    localStorage.setItem("WaoCardUserCountrycode", getCode);
   
    } else {
      input.classList.add("error");
      var errorCode = iti.getValidationError();
      errorMsg.innerHTML = errorMap[errorCode];
      errorMsg.classList.remove("hide");
     
          
    }
  }
});

// on keyup / change flag: reset
input.addEventListener('change', reset);
input.addEventListener('keyup', reset);
//var getCode = $("#mobile").intlTelInput("getSelectedCountryData");
//var country_code = input.getSelectedCountryData()["dialCode"];  
                
//        app.dialog.alert(getCode, function () {
//}); 
// var getnumber = intlTelInput(input);  
 //var countryData = getnumber.getSelectedCountryData(); 
 //       console.log(countryData);
                
//var countryData = iti.getSelectedCountryData(input);
//var getCode = iti.intlTelInput('getSelectedCountryData').dialCode;
                

      //         console.log(getCode);
    
//const whatsAppClient = require("vendor/node_modules/@green-api/whatsapp-api-client/lib/whatsapp-api-client");   
        
              
            
})

$(document).on('page:init', '.page[data-name="thankyouorder"]', function (e) {
  setTimeout(function () {
    app.views.main.router.navigate('/home/');
  }, 3000);
})



$(document).on('page:init', '.page[data-name="landing"]', function (e) {
  var introswiper = new Swiper(".introswiper", {
    direction: 'vertical',
    mousewheelControl: true,
    slidesPerView: 1,
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
      renderBullet: function (index, className) {
        return '<span class="' + className + '">' + (index + 1) + "</span>";
      },
    },
  });

});
$(document).on('page:init', '.page[data-name="home_landing"]', function (e) {
    /* swiper carousel cardwiper */
  var swiper2 = new Swiper(".partnerscatswiper", {
    slidesPerView: "3",
    spaceBetween:10,
    pagination: false
  });
       // Get all radio buttons and card elements
        const radioButtons = document.querySelectorAll('[name="card-set"]');
        const cards = document.querySelectorAll('[card]');

        // Function to navigate to the previous card
        function goToPreviousCard() {
            // Find the currently checked radio button
            const checkedRadioButton = document.querySelector('[name="card-set"]:checked');
            
            // Find the index of the currently checked radio button
            const currentIndex = Array.from(radioButtons).indexOf(checkedRadioButton);
            
            // Calculate the index of the previous card (circular)
            const previousIndex = (currentIndex - 1 + radioButtons.length) % radioButtons.length;
            
            // Check the previous radio button to show the previous card
            radioButtons[previousIndex].checked = true;
        }

        // Function to navigate to the next card
        function goToNextCard() {
            // Find the currently checked radio button
            const checkedRadioButton = document.querySelector('[name="card-set"]:checked');
            
            // Find the index of the currently checked radio button
            const currentIndex = Array.from(radioButtons).indexOf(checkedRadioButton);
            
            // Calculate the index of the next card (circular)
            const nextIndex = (currentIndex + 1) % radioButtons.length;
            
            // Check the next radio button to show the next card
            radioButtons[nextIndex].checked = true;
        }

        // Event listeners for swiping or clicking
        let startX;
        let startY;
        let isSwiping = false;

        // Mouse and touch event handlers
        document.addEventListener('mousedown', (e) => {
            startX = e.clientX;
            startY = e.clientY;
            isSwiping = false;
        });

        document.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
            startY = e.touches[0].clientY;
            isSwiping = false;
        });

        document.addEventListener('mousemove', (e) => {
            if (isSwiping) {
                return;
            }
            
            const deltaX = e.clientX - startX;
            const deltaY = e.clientY - startY;
            
            if (Math.abs(deltaX) > 50 && Math.abs(deltaX) > Math.abs(deltaY)) {
                isSwiping = true;
                
                if (deltaX > 0) {
                    goToPreviousCard();
                } else {
                    goToNextCard();
                }
            }
        });

        document.addEventListener('touchmove', (e) => {
            if (isSwiping) {
                return;
            }
            
            const deltaX = e.touches[0].clientX - startX;
            const deltaY = e.touches[0].clientY - startY;
            
            if (Math.abs(deltaX) > 50 && Math.abs(deltaX) > Math.abs(deltaY)) {
                isSwiping = true;
                
                if (deltaX > 0) {
                    goToPreviousCard();
                } else {
                    goToNextCard();
                }
            }
        });
    
const buttons = document.querySelectorAll(".card-buttons button");
const sections = document.querySelectorAll(".waocard-section");
const card = document.querySelector(".wao-card");

const handleButtonClick = e => {
  const targetSection = e.target.getAttribute("data-section");
  const section = document.querySelector(targetSection);
  targetSection !== "#about" ?
  card.classList.add("is-active") :
  card.classList.remove("is-active");
  card.setAttribute("data-state", targetSection);
  sections.forEach(s => s.classList.remove("is-active"));
  buttons.forEach(b => b.classList.remove("is-active"));
  e.target.classList.add("is-active");
  section.classList.add("is-active");
};

buttons.forEach(btn => {
  btn.addEventListener("click", handleButtonClick);
});
    
// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Get all chips with the class 'chip'
    const chips = document.querySelectorAll('.chip');

    // Function to handle chip click event
    function handleChipClick(event) {
        // Get the data-card attribute value from the clicked chip
        const cardId = event.currentTarget.getAttribute('data-card');
        
        // Find the corresponding radio button based on the cardId
        const radioButton = document.getElementById(cardId);
        
        // If the radio button exists, set its checked attribute to true
        if (radioButton) {
            radioButton.checked = true;
            
            // Trigger the change event on the radio button to navigate to the card
            radioButton.dispatchEvent(new Event('change'));
        }
    }

    // Add click event listeners to all chips
    chips.forEach(chip => {
        chip.addEventListener('click', handleChipClick);
    });
});

    /* Greetings */
				var thehours = new Date().getHours();
				var themessage;
				var morning = ('Good Morning!');
				var afternoon = ('Good Afternoon!');
				var evening = ('Good Evening!');
				

	if (thehours >= 0 && thehours < 12) {
		themessage = morning; 
		$('.greet-message').html(themessage);
		$('.greet-icon').html('<img src="img/dawn.svg" height="30" alt="" />');


	} else if (thehours >= 12 && thehours < 17) {
		themessage = afternoon;
		$(".greet-message").html(themessage);
		$('.greet-icon').html('<img src="img/sun.svg" height="30" alt="" />');


	} else if (thehours >= 17 && thehours < 24) {
		themessage = evening;
		$(".greet-message").html(themessage);
		$('.greet-icon').html('<img src="img/sunset.svg" height="30" alt="" />');

	}

  var swiper = new Swiper('.swiper-intro', {
      effect: 'cards',
      grabCursor: true,
    });  
    
  
    
    // Handle click event on the "add-image" element
    $('.card-upload').on('click', function() {
           if (!$(this).closest('.card').hasClass('flipped')) {
               
                    // Display a notification
        app.dialog.confirm('Please upload an image: 1200px X 800px, JPEG/PNG, 500KB-5MB.', 'Requirement', function () {
    // User confirmed, proceed with the upload button click
    // Trigger the click event on the hidden file input element
        $('#card-image-upload').click();
  });

      }
   
        
    });
    
        // Handle file selection
$('#image-upload').on('change', function(e) {
  var file = e.target.files[0];

  // Check if the file is an image
  if (file && file.type.startsWith('image/')) {
    // Check file size
    var fileSize = file.size; // in bytes
    
    // Check if file size is within the required range
    if (fileSize >= 500 * 1024 && fileSize <= 5 * 1024 * 1024) {
      // Proceed with image processing
      var reader = new FileReader();
      
      reader.onload = function(e) {
        var imageUrl = e.target.result;
        
        // Set the background image of the card
        $('.card-custombg').css('background-image', 'url(' + imageUrl + ')');
        
        // Continue with further processing or upload
        // ...
      };
      
      reader.readAsDataURL(file);
    } else {
      // Display an error message for incorrect file size
      app.dialog.alert('Please upload an image with a file size between 500KB and 5MB.');
    }
  } else {
    // Display an error message for invalid file type
    app.dialog.alert('Please upload a valid image file (JPEG, PNG, etc.).');
  }
});
  
});
$(document).on('page:init', '.page[data-name="verify"]', function (e) {
  document.getElementById('timer').innerHTML = '01' + ':' + '00';
  startTimer();
  generateOtp();
   	function resendOtp() {
				document.getElementById('timer').innerHTML = '03' + ':' + '00';
                startTimer();			
                generateOtp();  }
  function generateOtp() {
                var token = localStorage.getItem('WaoCardUserToken');
				var length = 6;
               
				var username = 'morganvic01@gmail.com';
	            var password = 'possible';
	            var sender = 'WaoCard';
                var countrycode= localStorage.getItem('WaoCardUserCountrycode');
                
                var mobiles = localStorage.getItem('WaoCardUserPhone');	
                var mobiles = countrycode + mobiles;
				const validOtp = Math.floor(Math.pow(10, length-1) + Math.random() * (Math.pow(10, length) - Math.pow(10, length-1) - 1));
                localStorage.setItem('validOtp', validOtp);
                  var message = 'Activate your account on WaoCard with: ' + validOtp;
                 var smsapi = 'http://account.kudisms.net/api/?username='+ username + '&password='+ password + '&message=' + message + '&sender=' + sender + '&mobiles=' + mobiles;
	            var xhr = new XMLHttpRequest();
	                xhr.open("GET", smsapi, false);
	                xhr.send();
 //Update User smscode    
                var data = new FormData();
data.append("server_key", window.config.app.server_key);
data.append("sms_code", validOtp);
data.append("active", 0);
data.append("phone_number", localStorage.getItem('WaoCardUserPhone'));

var xhr = new XMLHttpRequest();
xhr.withCredentials = true;

xhr.addEventListener("readystatechange", function() {
  if(this.readyState === 4) {
    console.log(this.responseText);
  }
});

xhr.open("POST", "https://app.waocard.co/api/update-user-data?access_token="+token);

xhr.send(data);
			
			}
		
  function startTimer() {
      $("#resend").html('');
      $('.progressstimer').removeClass('hide');
    var presentTime = document.getElementById('timer').innerHTML;
    var timeArray = presentTime.split(/[:]+/);
    var m = timeArray[0];
    var s = checkSecond((timeArray[1] - 1));
    if (s == 59) { m = m - 1 }
    
    if (m < 0) {
       
    $("#resend").html('<span class="text-muted">Did not received yet?</span> <a href="#" id="resendb">Resend OTP</a>');
     const element = document.getElementById("resendb");
      element.addEventListener("click", resendOtp);
    $('.progressstimer').addClass('hide');
    return
    }
    
      
document.getElementById('timer').innerHTML = m + ":" + s;
    setTimeout(startTimer, 1000);
     
  }
  
    
   
  function checkSecond(sec) {
    if (sec < 10 && sec >= 0) { sec = "0" + sec }; // add zero in front of numbers < 10
    if (sec < 0) { sec = "59" };
    return sec;
  }
    
  const verify = document.getElementById("verifyotp");
      verify.addEventListener("click", updateOtp);  
function updateOtp(){
    let validOtp = localStorage.getItem('validOtp');
   
    let otp = $('#otp').val();
    
    let userid = localStorage.getItem("WaoCardUserId");
    var token = localStorage.getItem('WaoCardUserToken');
        
        if(validOtp === otp ){
           
 //   var data = JSON.stringify({
 // "vat_number": otp,
 // "id": userid
//});

            
//Udate Otp Verify        
 // var data = new FormData();
//data.append("server_key", window.config.app.server_key);
//data.append("phone_verify_code", otp);
            

var data = new FormData();
data.append("server_key", window.config.app.server_key);
data.append("user_id", userid);
data.append("code", otp);

var xhr = new XMLHttpRequest();
xhr.withCredentials = true;

xhr.addEventListener("readystatechange", function() {
  if(this.readyState === 4) {
    console.log(this.responseText);
      var res = JSON.parse(this.responseText);
    	if (res.api_status === 200)
				{
					
				
					localStorage.setItem("WaoCardUserActive", "1");
				
					app.toast.show({
					text: 'Account Verified',
					position: 'bottom',
					cssClass: 'toast-round bg-color-green'
				});
				app.views.current.router.navigate('/create_card/');					
					
					}
					else
					{
                      			     
                        app.dialog.alert(' ' + res.errors.error_text, function () {
       

      })  
                        
					}
  }
});

xhr.open("POST", "https://app.waocard.co/api/active_account_sms");
 xhr.send(data);        
            
            
        }else{
          app.dialog.alert('Invalid OTP', function () {
      

      })    
            
            
        }
    }
    

});

$(document).on('page:init', '.page[data-name="forgotpassword"]', function (e) {
    
app.popup.open('.popup-about');
  document.getElementById('timer').innerHTML = '01' + ':' + '00';
  startTimer();
 
   	function resendOtp() {
				document.getElementById('timer').innerHTML = '03' + ':' + '00';
                startTimer();			
                generateOtp();  }
  function generateOtp() {
      
				var length = 6;
               
				var username = 'igalaworld@gmail.com';
	            var password = 'possible';
	            var sender = 'WaoCard';
                var countrycode= localStorage.getItem('WaoCardUserCountrycode');
                
                var mobiles = localStorage.getItem('WaoCardUserPhone');	
                var mobiles = countrycode + mobiles;
				const validOtp = Math.floor(Math.pow(10, length-1) + Math.random() * (Math.pow(10, length) - Math.pow(10, length-1) - 1));
                localStorage.setItem('validOtp', validOtp);
                  var message = 'Activate your account on WaoCard with: ' + validOtp;
                 var smsapi = 'http://account.kudisms.net/api/?username='+ username + '&password='+ password + '&message=' + message + '&sender=' + sender + '&mobiles=' + mobiles;
	            var xhr = new XMLHttpRequest();
	                xhr.open("GET", smsapi, false);
	                xhr.send();
			
			}
		
  function startTimer() {
      $("#resend").html('');
      $('.progressstimer').removeClass('hide');
    var presentTime = document.getElementById('timer').innerHTML;
    var timeArray = presentTime.split(/[:]+/);
    var m = timeArray[0];
    var s = checkSecond((timeArray[1] - 1));
    if (s == 59) { m = m - 1 }
    
    if (m < 0) {
       
    $("#resend").html('<span class="text-muted">Did not received yet?</span> <a href="#" id="resendb">Resend OTP</a>');
     const element = document.getElementById("resendb");
      element.addEventListener("click", resendOtp);
    $('.progressstimer').addClass('hide');
    return
    }
    
      
document.getElementById('timer').innerHTML = m + ":" + s;
    setTimeout(startTimer, 1000);
     
  }
  
    
   
  function checkSecond(sec) {
    if (sec < 10 && sec >= 0) { sec = "0" + sec }; // add zero in front of numbers < 10
    if (sec < 0) { sec = "59" };
    return sec;
  }
  const requestresetotp = document.getElementById("passrequestotp");
     requestresetotp.addEventListener("click", phonerequestOtp);  
    function phonerequestOtp(){
    
    
    let phone = $("userphone").val();
        
        if(phone){
           
    var data = JSON.stringify({
  "userphone": phone
});

var xhr = new XMLHttpRequest();
xhr.withCredentials = true;

xhr.addEventListener("readystatechange", function() {
  if(this.readyState === 4) {
     var res = JSON.parse(this.responseText);
      	 	if (res.code === 1)
				{
					
				
					localStorage.setItem("WaoCardUserVerifyCode", otp);
				
					app.toast.show({
					text: 'Account Verified',
					position: 'bottom',
					cssClass: 'toast-round bg-color-green'
				});
				app.views.current.router.navigate('/home/');					
					
					}
					else
					{
                      			     
                        app.dialog.alert(' ' + res.message, function () {
       

      })  
                        
					}
  }
});

xhr.open("POST", "http://localhost/waocardapi/users/update_patch.php");
xhr.setRequestHeader("Content-Type", "application/json");
xhr.setRequestHeader("Authorization", "Bearer " + token);

xhr.send(data);
        }else{
          app.dialog.alert('Invalid OTP', function () {
      

      })    
            
            
        }
    }

 // const verify = document.getElementById("verifyotp");
//      verify.addEventListener("click", updateOtp);  
function updateOtp(){
    let validOtp = localStorage.getItem('validOtp');
   
    let otp = $('#otp').val();
    
    let userid = localStorage.getItem("WaoCardUserId");
    var token = localStorage.getItem('WaoCardUserToken');
        
        if(validOtp === otp ){
           
    var data = JSON.stringify({
  "vat_number": otp,
  "id": userid
});

var xhr = new XMLHttpRequest();
xhr.withCredentials = true;

xhr.addEventListener("readystatechange", function() {
  if(this.readyState === 4) {
     var res = JSON.parse(this.responseText);
      	 	if (res.code === 1)
				{
					
				
					localStorage.setItem("WaoCardUserVerifyCode", otp);
				
					app.toast.show({
					text: 'Account Verified',
					position: 'bottom',
					cssClass: 'toast-round bg-color-green'
				});
				app.views.current.router.navigate('/home/');					
					
					}
					else
					{
                      			     
                        app.dialog.alert(' ' + res.message, function () {
       

      })  
                        
					}
  }
});

xhr.open("POST", "http://localhost/waocardapi/users/update_patch.php");
xhr.setRequestHeader("Content-Type", "application/json");
xhr.setRequestHeader("Authorization", "Bearer " + token);

xhr.send(data);
        }else{
          app.dialog.alert('Invalid OTP', function () {
      

      })    
            
            
        }
    }

      function createPopup(){
      // Create popup
     
       var popup = app.popup.create({
          content: /*html*/`
            <div class="popup">
              <div class="page">
                <div class="navbar">
                  <div class="navbar-bg"></div>
                  <div class="navbar-inner">
                    <div class="title">Dynamic Popup</div>
                    <div class="right"><a href="#" class="link popup-close">Close</a></div>
                  </div>
                </div>
                <div class="page-content">
                  <div class="block">
                    <p>This popup was created dynamically</p>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse faucibus mauris leo, eu bibendum neque congue non. Ut leo mauris, eleifend eu commodo a, egestas ac urna. Maecenas in lacus faucibus, viverra ipsum pulvinar, molestie arcu. Etiam lacinia venenatis dignissim. Suspendisse non nisl semper tellus malesuada suscipit eu et eros. Nulla eu enim quis quam elementum vulputate. Mauris ornare consequat nunc viverra pellentesque. Aenean semper eu massa sit amet aliquam. Integer et neque sed libero mollis elementum at vitae ligula. Vestibulum pharetra sed libero sed porttitor. Suspendisse a faucibus lectus.</p>
                  </div>
                </div>
              </div>
            </div>
          `
        });
     
      // Open it
      popup.open();
    }


});

$(document).on('page:init', '.page[data-name="userlist"]', function (e) {
    
//getCardToken();


});


/* pwa app install */
var deferredPrompt;
window.addEventListener('beforeinstallprompt', function (e) {
  console.log('beforeinstallprompt Event fired');
  e.preventDefault();
  deferredPrompt = e;
  return false;
});
$(document).on('page:init', '.page[data-name="home"]', function (e) {
  
    
				/* Greetings */
				var thehours = new Date().getHours();
				var themessage;
				var morning = ('Good Morning!');
				var afternoon = ('Good Afternoon!');
				var evening = ('Good Evening!');
				

	if (thehours >= 0 && thehours < 12) {
		themessage = morning; 
		$('.greet-message').html(themessage);
		$('.greet-icon').html('<img src="img/dawn.svg" height="30" alt="" />');


	} else if (thehours >= 12 && thehours < 17) {
		themessage = afternoon;
		$(".greet-message").html(themessage);
		$('.greet-icon').html('<img src="img/sun.svg" height="30" alt="" />');


	} else if (thehours >= 17 && thehours < 24) {
		themessage = evening;
		$(".greet-message").html(themessage);
		$('.greet-icon').html('<img src="img/sunset.svg" height="30" alt="" />');

	}


   
    /* swiper carousel cardwiper */
  var swiper1 = new Swiper(".cardswiper", {
    slidesPerView: "auto",
    loop:true,
    spaceBetween: 0,
    centeredSlides: true,
    paginationClickable: true,
    pagination: {                       //pagination(dots)
            el: '.swiper-pagination',
        },
        navigation: {                       //navigation(arrows)
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
  
  });

    
    

})
$(document).on('page:init', '.page[data-name="home_one"]', function (e) {
//loadMap();
 function loadMap() {
  // Initialize Google Places Autocomplete
  var autocomplete = new google.maps.places.Autocomplete(
    document.getElementById('pickup')
  );
  
  // Handle the selected address
  autocomplete.addListener('place_changed', function() {
    var place = autocomplete.getPlace();
    // Access the address components
    var addressComponents = place.address_components;
    // Handle the selected address as needed
    // ...
  });
     
 }
 
    
				/* Greetings */
				var thehours = new Date().getHours();
				var themessage;
				var morning = ('Good Morning!');
				var afternoon = ('Good Afternoon!');
				var evening = ('Good Evening!');
				

	if (thehours >= 0 && thehours < 12) {
		themessage = morning; 
		$('.greet-message').html(themessage);
		$('.greet-icon').html('<img src="img/dawn.svg" height="30" alt="" />');


	} else if (thehours >= 12 && thehours < 17) {
		themessage = afternoon;
		$(".greet-message").html(themessage);
		$('.greet-icon').html('<img src="img/sun.svg" height="30" alt="" />');


	} else if (thehours >= 17 && thehours < 24) {
		themessage = evening;
		$(".greet-message").html(themessage);
		$('.greet-icon').html('<img src="img/sunset.svg" height="30" alt="" />');

	}

// open user profile
    

    
  /* footer event modal close*/
  var swipeToClosePopup = app.popup.create({
    el: '.popup-swipe-to-close',
    swipeToClose: true,
  });
  swipeToClosePopup.on('close', function (popup) {
    $('.centerbutton .nav-link').removeClass('active')
  });

  /* pwa app install */
  $('#addtohome').on('click', function () {
    if (deferredPrompt !== undefined) {
      deferredPrompt.prompt();
      deferredPrompt.userChoice.then(function (choiceResult) {

        if (choiceResult.outcome == 'dismissed') {
          console.log('User cancelled home screen install');
        }
        else {
          console.log('User added to home screen');
        }
        deferredPrompt = null;
      });
    }
  });
/*copy */


 


function unsecuredCopyToClipboard(accountno) {
    var accountno = $('.account').html();
  const textArea = document.createElement("textarea");
  textArea.value = accountno;
  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();
  try {
    document.execCommand('copy');
      app.toast.show({
					text: 'Wallet ID Copied',
					position: 'center',
					closeButton: false,
					closeButtonColor: 'red',
					closeButtonText: 'Okay',
					cssClass: 'toast-round bg-color-gray'
				});
  } catch (err) {
    console.error('Unable to copy to clipboard', err);
  }
  document.body.removeChild(textArea);
}
async function copyPageUrl(accountno) {
const copyToClipboard = (accountno) => { if (window.isSecureContext && navigator.clipboard) {
    navigator.clipboard.writeText(accountno);
  } else {
    unsecuredCopyToClipboard(accountno);
  }
};
}
 var copyAccount = document.querySelector('.copy-icon');   
copyAccount.addEventListener('click', unsecuredCopyToClipboard);
    
    
  /* dark mode switch*/
  $('#darkmodeswitch').on('click', function () {
    if ($(this).is(':checked')) {
         $('html').addClass('theme-dark');
    $('.cardlogo').html('<img src="img/logo2.png" width="30%" alt="" />');
     
        
      
    } else {
      $('html').removeClass('theme-dark');
 $('.cardlogo').html('<img src="img/blacklogo.png" width="30%" alt="" />');

    }
  });
 /* Block card*/
  $('#blockcard').on('click', function () {
    if ($(this).is(':checked')) {
    
						var dialog = app.dialog.create({
                    title: window.config.app.title,
					content: '<div class="block no-margin margin-top text-align-center"><p>To block the card, please enter your Acces Pin</p><input type="password" name="password" id="cardpin" placeholder="Access Pin" value="0000" /></div>',
					buttons: [
						{
							text: 'Cancel',
							color: 'red',
							onClick: function() {
                                const child = document.getElementById('toggleid');

                           child.remove();
                                document.getElementById("blockcard").innerHTML = "<span class='toggle-icon' id='toggleid'></span>";
								app.toast.show({
									text: 'Action Cancelled!',
									position:'bottom',
									cssClass: 'toast-round bg-color-red'
								});
							}
						},
						{
							text: 'Block',
							bold: true,
							color: 'green',
							onClick: function() {
                                this.setAttribute("checked", "checked");
                                this.checked = true;
								app.toast.show({
									text: 'Access Granted!',
									position:'bottom',
									cssClass: 'toast-round bg-color-green'
								});
							}
						}
					]
				});
				dialog.open();
				
      
    } else {
       app.dialog.password(
					'Enter password to Unblock Card',
					window.config.app.title,
					function(password) {
						app.toast.show({
							text: 'Your password is: ' + password,
							position:'bottom',
							cssClass: 'toast-round bg-color-blue'
						});
					}
				);
    }
  });
      /* toggle show-hide balance*/
  $('.hi').on('click', function () {
    if ($(this).is(':checked')) {
         $('html').addClass('theme-dark');
    $('.cardlogo').html('<img src="img/logo2.png" width="30%" alt="" />');
        
      
    } else {
      $('html').removeClass('theme-dark');
 $('.cardlogo').html('<img src="img/blacklogo.png" width="30%" alt="" />');

    }
  });
  /* Progress circle */

 
   
    /* swiper carousel cardwiper */
  var swiper1 = new Swiper(".cardswiper", {
    slidesPerView: "auto",
    spaceBetween: 0,
    pagination: false
  });
/* swiper carousel cardwiper */
  var swiper2 = new Swiper(".partnerscatswiper", {
    slidesPerView: "auto",
    spaceBetween: 5,
    pagination: false
  });
/* swiper carousel company */
 // var swiper3 = new Swiper(".companyswiper", {
 //   slidesPerView: "auto",
  //  spaceBetween: 10,
 //   pagination: false
//  });
  /* swiper carousel cardwiper */
  var swiper4 = new Swiper(".giftcardswiper", {
    slidesPerView: "auto",
    spaceBetween: 5,
    pagination: false
  });
  
/* swiper carousel cardwiper */
  var swiper5 = new Swiper(".connectionswiper", {
    slidesPerView: "auto",
    spaceBetween: 5,
    pagination: false
  });
    
    

})

$(document).on('page:init', '.page[data-name="stats"]', function (e) {

  /* footer event modal close*/
  var swipeToClosePopup = app.popup.create({
    el: '.popup-swipe-to-close',
    swipeToClose: true,
  });
  swipeToClosePopup.on('close', function (popup) {
    $('.centerbutton .nav-link').removeClass('active')
  });

  /* date picker  */
  calendarRange = app.calendar.create({
    inputEl: '#daterange',
    rangePicker: true
  });

  $('.daterange-btn').on('click', function () {
    $('#daterange').click();
  });

  /* chart js areachart */
  window.randomScalingFactor = function () {
    return Math.round(Math.random() * 60);
  }

  window.randomScalingFactor2 = function () {
    return Math.round(Math.random() * 60 - 30);
  }
  var barchart = document.getElementById('areachart').getContext('2d');
  var mybarcartCofig = {
    type: 'bar',
    data: {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
      datasets: [{
        label: '# of Votes',
        data: [
          randomScalingFactor2(),
          randomScalingFactor2(),
          randomScalingFactor2(),
          randomScalingFactor2(),
          randomScalingFactor2(),
          randomScalingFactor2(),
          randomScalingFactor2(),
          randomScalingFactor2(),
        ],
        backgroundColor: '#FF345E',
        borderWidth: 0,
        borderRadius: 10,
        borderSkipped: false,
        barThickness: 10,
      },
      {
        label: '# of Votes',
        data: [
          randomScalingFactor2(),
          randomScalingFactor2(),
          randomScalingFactor2(),
          randomScalingFactor2(),
          randomScalingFactor2(),
          randomScalingFactor2(),
          randomScalingFactor2(),
          randomScalingFactor2(),
        ],
        backgroundColor: '#00DFA3',
        borderWidth: 0,
        borderRadius: 10,
        borderSkipped: false,
        barThickness: 10,
      }]
    },
    options: {

      plugins: {
        legend: {
          display: false,
        },
      },
      scales: {
        y: {
          ticks: {
            display: false
          },
          drawBorder: false,
          label: false,
          grid: {
            display: true,
            zeroLineColor: 'rgba(219,219,219,0.3)',
            drawBorder: false,
            lineWidth: 1,
            zeroLineWidth: 2
          }
        },
        x: {
          grid: {
            display: false,
          },
        }
      }
    }
  }
  var myBarChart = new Chart(barchart, mybarcartCofig);
  /* my area chart randomize */
  setInterval(function () {
    mybarcartCofig.data.datasets.forEach(function (dataset) {
      dataset.data = dataset.data.map(function () {
        return randomScalingFactor2();
      });
    });
    myBarChart.update();
  }, 2000);
  var progressCircles2 = new ProgressBar.Circle(circleprogresstwo, {
    color: '#3AC79B',
    // This has to be the same size as the maximum width to
    // prevent clipping
    strokeWidth: 10,
    trailWidth: 10,
    easing: 'easeInOut',
    trailColor: '#d8f4eb',
    duration: 1400,
    text: {
      autoStyleContainer: false
    },
    from: { color: '#00DFA3', width: 10 },
    to: { color: '#00DFA3', width: 10 },
    // Set default step function for all animate calls
    step: function (state, circle) {
      circle.path.setAttribute('stroke', state.color);
      circle.path.setAttribute('stroke-width', state.width);

      var value = Math.round(circle.value() * 100);
      if (value === 0) {
        //  circle.setText('');
      } else {
        // circle.setText(value + "<small>%<small>");
      }

    }
  });
  // progressCircles2.text.style.fontSize = '20px';
  progressCircles2.animate(0.85);  // Number from 0.0 to 1.0

  /* Progress circle */
  var progressCircles3 = new ProgressBar.Circle(circleprogressthree, {
    color: '#F73563',
    // This has to be the same size as the maximum width to
    // prevent clipping
    strokeWidth: 10,
    trailWidth: 10,
    easing: 'easeInOut',
    trailColor: '#fdd7e0',
    duration: 1400,
    text: {
      autoStyleContainer: false
    },
    from: { color: '#F73563', width: 10 },
    to: { color: '#F73563', width: 10 },
    // Set default step function for all animate calls
    step: function (state, circle) {
      circle.path.setAttribute('stroke', state.color);
      circle.path.setAttribute('stroke-width', state.width);

      var value = Math.round(circle.value() * 100);
      if (value === 0) {
        // circle.setText('');
      } else {
        //  circle.setText(value + "<small>%<small>");
      }

    }
  });
  progressCircles3.animate(0.65);  // Number from 0.0 to 1.0


  /* Progress circle */
  var progressCircles1 = new ProgressBar.Circle(circleprogressone, {
    color: '#000000',
    // This has to be the same size as the maximum width to
    // prevent clipping
    strokeWidth: 8,
    trailWidth: 8,
    easing: 'easeInOut',
    trailColor: '#CCF9ED',
    duration: 1400,
    text: {
      autoStyleContainer: false
    },
    from: { color: '#00DFA3', width: 8 },
    to: { color: '#00DFA3', width: 8 },
    // Set default step function for all animate calls
    step: function (state, circle) {
      circle.path.setAttribute('stroke', state.color);
      circle.path.setAttribute('stroke-width', state.width);

      var value = Math.round(circle.value() * 100);
      if (value === 0) {
        circle.setText('');
      } else {
        circle.setText('<span class="size-12">' + value + '<small>%<small></span>');
      }

    }
  });
  progressCircles1.animate(0.65);  // Number from 0.0 to 1.0


  /* Progress circle */
  var progressCircles4 = new ProgressBar.Circle(circleprogressfour, {
    color: '#000000',
    // This has to be the same size as the maximum width to
    // prevent clipping
    strokeWidth: 8,
    trailWidth: 8,
    easing: 'easeInOut',
    trailColor: '#FFF1CC',
    duration: 1400,
    text: {
      autoStyleContainer: false
    },
    from: { color: '#FFBB00', width: 8 },
    to: { color: '#FFBB00', width: 8 },
    // Set default step function for all animate calls
    step: function (state, circle) {
      circle.path.setAttribute('stroke', state.color);
      circle.path.setAttribute('stroke-width', state.width);

      var value = Math.round(circle.value() * 100);
      if (value === 0) {
        circle.setText('');
      } else {
        circle.setText('<span class="size-12">' + value + '<small>%<small></span>');
      }

    }
  });
  progressCircles4.animate(0.65);  // Number from 0.0 to 1.0

  /* chart js areachart */
  var areachart2 = document.getElementById('smallchart2').getContext('2d');
  var gradient2 = areachart2.createLinearGradient(0, 0, 0, 66);
  gradient2.addColorStop(0, 'rgba(58, 199, 155, 0.6)');
  gradient2.addColorStop(1, 'rgba(58, 199, 155, 0)');
  var myareachartCofig2 = {
    type: 'line',
    data: {
      labels: ['Q1', 'Q2', 'Q3', 'Q4', 'Q5'],
      datasets: [{
        label: '# of Votes',
        data: [
          randomScalingFactor(),
          randomScalingFactor(),
          randomScalingFactor(),
          randomScalingFactor(),
          randomScalingFactor(),
        ],
        radius: 0,
        backgroundColor: gradient2,
        borderColor: '#00DFA3',
        borderWidth: 1,
        fill: true,
        tension: 0.5,
      }]
    },
    options: {
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false,
        },
      },
      scales: {
        y: {
          display: false,
          beginAtZero: true,
        },
        x: {
          display: false,
        }
      }
    }
  }
  var myAreaChart2 = new Chart(areachart2, myareachartCofig2);
  /* my area chart randomize */
  setInterval(function () {
    myareachartCofig2.data.datasets.forEach(function (dataset) {
      dataset.data = dataset.data.map(function () {
        return randomScalingFactor();
      });
    });
    myAreaChart2.update();
  }, 2000);


  /* chart js areachart */
  var areachart3 = document.getElementById('smallchart3').getContext('2d');
  var gradient3 = areachart3.createLinearGradient(0, 0, 0, 66);
  gradient3.addColorStop(0, 'rgba(247, 53, 99, 0.6)');
  gradient3.addColorStop(1, 'rgba(247, 53, 99, 0)');
  var myareachartCofig3 = {
    type: 'line',
    data: {
      labels: ['Q1', 'Q2', 'Q3', 'Q4', 'Q5'],
      datasets: [{
        label: '# of Votes',
        data: [
          randomScalingFactor(),
          randomScalingFactor(),
          randomScalingFactor(),
          randomScalingFactor(),
          randomScalingFactor(),
        ],
        radius: 0,
        backgroundColor: gradient3,
        borderColor: '#f73563',
        borderWidth: 1,
        fill: true,
        tension: 0.5,
      }]
    },
    options: {
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false,
        },
      },
      scales: {
        y: {
          display: false,
          beginAtZero: true,
        },
        x: {
          display: false,
        }
      }
    }
  }
  var myAreaChart3 = new Chart(areachart3, myareachartCofig3);
  /* my area chart randomize */
  setInterval(function () {
    myareachartCofig3.data.datasets.forEach(function (dataset) {
      dataset.data = dataset.data.map(function () {
        return randomScalingFactor();
      });
    });
    myAreaChart3.update();
  }, 2000);


  /* swiper carousel cardwiper */
  var swiper1 = new Swiper(".cardswiper", {
    slidesPerView: "auto",
    spaceBetween: 0,
    pagination: false
  });
  /* swiper carousel connectionwiper */
  var swiper2 = new Swiper(".connectionwiper", {
    slidesPerView: "auto",
    spaceBetween: 0,
    pagination: false
  });

})

$(document).on('page:init', '.page[data-name="rewards"]', function (e) {
  var swiper1 = new Swiper(".summayswiper", {
    slidesPerView: "auto",
    spaceBetween: 0,
    pagination: false
  });

  /* swiper carousel connectionwiper */
  var swiper2 = new Swiper(".connectionwiper", {
    slidesPerView: "auto",
    spaceBetween: 0,
    pagination: false
  });

  /* swiper carousel cardwiper */
  var swiper3 = new Swiper(".cardswiper", {
    slidesPerView: "auto",
    spaceBetween: 0,
    pagination: false
  });

  $('.cardswiper .swiper-slide .card').on('click', function () {
    $('.cardswiper .swiper-slide .card').removeClass('selected');
    $(this).addClass('selected').find('.form-check-input').prop('checked', true);
  });
});

$(document).on('page:init', '.page[data-name="shop"]', function (e) {
  /* footer event modal close*/
  var swipeToClosePopup = app.popup.create({
    el: '.popup-swipe-to-close',
    swipeToClose: true,
  });
  swipeToClosePopup.on('close', function (popup) {
    $('.centerbutton .nav-link').removeClass('active')
  });

  /* swiper carousel connectionwiper */
  var swiper2 = new Swiper(".connectionwiper", {
    slidesPerView: "auto",
    spaceBetween: 0,
    pagination: false
  });

  /* filter sliders range picker for filter */
  var html5Slider = document.getElementById('rangeslider');
  noUiSlider.create(html5Slider, {
    start: [100, 200],
    connect: true,
    range: {
      'min': 0,
      'max': 500
    }
  });

  var inputNumber = document.getElementById('input-number');
  var select = document.getElementById('input-select');

  html5Slider.noUiSlider.on('update', function (values, handle) {
    var value = values[handle];

    if (handle) {
      inputNumber.value = value;
    } else {
      select.value = Math.round(value);
    }
  });
  select.addEventListener('change', function () {
    html5Slider.noUiSlider.set([this.value, null]);
  });
  inputNumber.addEventListener('change', function () {
    html5Slider.noUiSlider.set([null, this.value]);
  });

});

$(document).on('page:init', '.page[data-name="product"]', function (e) {
  /* swiper carousel connectionwiper */
  
$('#flipbookcontainer').FlipBook({
        pdf: 'vendor/flipbook/3d-flip-book/books/pdf/FoxitPdfSdk.pdf',
        template: {
           html: 'vendor/flipbook/3d-flip-book/templates/default-book-view.html',
          styles: [
             'vendor/flipbook/3d-flip-book/css/short-black-book-view.css'
           ],
          links: [
            {
              rel: 'stylesheet',
              href: 'vendor/flipbook/3d-flip-book/css/font-awesome.min.css'
             }
         ],
           script: 'vendor/flipbook/3d-flip-book/js/default-book-view.js'
         }
       });
    
  var swiper2 = new Swiper(".cardswiper", {
    slidesPerView: "auto",
    spaceBetween: 0,
    pagination: false
  });

  /* swiper carousel connectionwiper */
  var swiper2 = new Swiper(".connectionwiper", {
    slidesPerView: "auto",
    spaceBetween: 0,
    pagination: false
  });
});

$(document).on('page:init', '.page[data-name="wallet"]', function (e) {
  /* swiper carousel cardwiper */
  var swiper3 = new Swiper(".cardswiper", {
    slidesPerView: "auto",
    spaceBetween: 0,
    pagination: false
  });

  /* chart js areachart */
  window.randomScalingFactor = function () {
    return Math.round(Math.random() * 60);
  }
  var areachart21 = document.getElementsByClassName('areachartsmall')[0].getContext('2d');
  var areachart31 = document.getElementsByClassName('areachartsmall')[1].getContext('2d');
  var areachart41 = document.getElementsByClassName('areachartsmall')[2].getContext('2d');
  var gradient21 = areachart21.createLinearGradient(0, 0, 0, 44);
  gradient21.addColorStop(0, 'rgba(0, 223, 163, 0.6)');
  gradient21.addColorStop(1, 'rgba(0, 223, 163, 0)');
  var myareachartCofig21 = {
    type: 'line',
    data: {
      labels: ['Q1', 'Q2', 'Q3', 'Q4', 'Q5'],
      datasets: [{
        label: '# of Votes',
        data: [
          randomScalingFactor(),
          randomScalingFactor(),
          randomScalingFactor(),
          randomScalingFactor(),
          randomScalingFactor(),
        ],
        radius: 0,
        backgroundColor: gradient21,
        borderColor: '#00DFA3',
        borderWidth: 1,
        fill: true,
        tension: 0.5,
      }]
    },
    options: {
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false,
        },
      },
      scales: {
        y: {
          display: false,
          beginAtZero: true,
        },
        x: {
          display: false,
        }
      }
    }
  }
  var myAreaChart21 = new Chart(areachart21, myareachartCofig21);
  var myAreaChart31 = new Chart(areachart31, myareachartCofig21);
  var myAreaChart41 = new Chart(areachart41, myareachartCofig21);
  /* my area chart randomize */
  setInterval(function () {
    myareachartCofig21.data.datasets.forEach(function (dataset) {
      dataset.data = dataset.data.map(function () {
        return randomScalingFactor();
      });
    });
    myAreaChart21.update();
  }, 1000);

  setInterval(function () {
    myareachartCofig21.data.datasets.forEach(function (dataset) {
      dataset.data = dataset.data.map(function () {
        return randomScalingFactor();
      });
    });
    myAreaChart31.update();
  }, 1500);

  setInterval(function () {
    myareachartCofig21.data.datasets.forEach(function (dataset) {
      dataset.data = dataset.data.map(function () {
        return randomScalingFactor();
      });
    });
    myAreaChart41.update();
  }, 2000);

});

$(document).on('page:init', '.page[data-name="bills"]', function (e) {
  /* swiper carousel connectionwiper */
  var swiper2 = new Swiper(".connectionwiper", {
    slidesPerView: "auto",
    spaceBetween: 0,
    pagination: false
  });
});
$(document).on('page:init', '.page[data-name="myestate"]', function (e) {
  /* swiper carousel connectionwiper */
  var swiper2 = new Swiper(".connectionwiper", {
    slidesPerView: "auto",
    spaceBetween: 0,
    pagination: false
  });
});
$(document).on('page:init', '.page[data-name="sendmoney"]', function (e) {
              
    
 // GET CONTACTS
    
    
// Initialize the virtual list component



   
    /* swiper carousel connectionwiper */
  
  var swiper2 = new Swiper(".connectionwiper", {
    slidesPerView: "auto",
    spaceBetween: 0,
    pagination: false
  });
    
// Search User
    
         var token = localStorage.getItem("WaoCardUserToken");
      var autocomplete = app.autocomplete.create({
  inputEl: '#autocomplete-input',
  openIn: 'dropdown',
  source: function (query, render) {
    // Fetch data from API endpoint
    var items = [
  { id: 1, title: 'Product A', subtitle: 'Category 1' },
  { id: 2, title: 'Product B', subtitle: 'Category 2' },
  { id: 3, title: 'Product C', subtitle: 'Category 1' },
  { id: 4, title: 'Product D', subtitle: 'Category 3' },
  { id: 5, title: 'Product E', subtitle: 'Category 2' },
  { id: 6, title: 'Product F', subtitle: 'Category 3' },
  { id: 7, title: 'Product G', subtitle: 'Category 1' },
  { id: 8, title: 'Product H', subtitle: 'Category 2' },
  { id: 9, title: 'Product I', subtitle: 'Category 3' },
  { id: 10, title: 'Product J', subtitle: 'Category 1' }
];
   // var items = myDatabaseQuery(query);
      
    console.log(items);
    render(items);
  },
  // Minimum input length to trigger autocomplete
  inputMinLength: 2,
  // Number of items to display in the list
  limit: 10,
  // Template for each item in the list
  renderItem: function (item, index) {
    return '<li><a href="#" class="item-link item-content">' +
      '<div class="item-inner">' +
      '<div class="item-title">' + item.title + '</div>' +
      '<div class="item-after">' + item.subtitle + '</div>' +
      '</div></a></li>';
  }
});
    
    function myDatabaseQuery(query) {
if (query !== ''){
var data = new FormData();
data.append("server_key", window.config.app.server_key);
data.append("search_key", query);

var xhr = new XMLHttpRequest();
xhr.withCredentials = true;

xhr.addEventListener("readystatechange", function() {
  if(this.readyState === 4) {
    
     var res = JSON.parse(this.responseText);
      var users = res.users;
     console.log(users);
      var datal = users.length;
          console.log(users.length);
      var results = [];
  for (var i = 0; i < datal ; i++) {
    var user = users[i];
    if (user.username.toLowerCase().indexOf(query.toLowerCase()) >= 0) {
      results.push(user);
    }
  }
  return results;
  }
});

xhr.open("POST", "https://app.waocard.co/api/search?access_token=" + token);

xhr.send(data);
    
    }

}



});
$(document).on('page:init', '.page[data-name="create_card"]', function (e) {
  /* swiper carousel cardwiper */
  var swiper1 = new Swiper(".cardswiper", {
    slidesPerView: "auto",
    spaceBetween:35,
    pagination: false
  });
 $('.cardswiper .swiper-slide .card').on('click', function () {
  // remove selected class from all cards
  $('.cardswiper .swiper-slide .card').removeClass('selected');
  
  // add selected class to the clicked card
  $(this).addClass('selected');
  
  // get the cardtype and price values of the clicked card
  var cardtype = $(this).data('cardtype');
  var price = $(this).data('price');
  var pro_type = $(this).data('pro_type');
  
  // set the form check input value to true
  $(this).find('.form-check-input').prop('checked', true);
  
  
});
    
// Add click event listener to the "Next" button
$('.button-fill').on('click', function(event) {
  // Prevent the default behavior of the link
  event.preventDefault();
  
  // Check if a card is selected
  if ($('.cardswiper .swiper-slide .card.selected').length > 0) {
    // Save card type and price to local storage
    var cardType = $('.cardswiper .swiper-slide .card.selected').data('cardtype');
    var price = $('.cardswiper .swiper-slide .card.selected').data('price');
    var pro_type = $('.cardswiper .swiper-slide .card.selected').data('pro_type');

    localStorage.setItem('cardType', cardType);
    localStorage.setItem('price', price);
     localStorage.setItem('pro_type', pro_type);
    
    // Navigate to the next page
        app.views.current.router.navigate('/register2/');  
      

  } else {
    // Show an error message
      app.dialog.alert('Please select a card before proceeding ', function () {
        //$f7.loginScreen.close();

      })  
  }
   
    
});
    
    
  // Handle click event on the "add-image" element
    $('.card-front').on('click', function() {
           if (!$(this).closest('.card').hasClass('flipped')) {
               
                    // Display a notification
        app.dialog.confirm('Please upload an image: 1200px X 800px, JPEG/PNG, 500KB-5MB.', 'Requirement', function () {
    // User confirmed, proceed with the upload button click
    // Trigger the click event on the hidden file input element
        $('#image-upload').click();
  });

      }
   
        
    });
    
    $('.card-back').click(function() {
      if ($(this).closest('.card').hasClass('flipped')) {
          console.log("back clicked");
      }
    });
  
    // Handle file selection
$('#image-upload').on('change', function(e) {
  var file = e.target.files[0];

  // Check if the file is an image
  if (file && file.type.startsWith('image/')) {
    // Check file size
    var fileSize = file.size; // in bytes
    
    // Check if file size is within the required range
    if (fileSize >= 500 * 1024 && fileSize <= 5 * 1024 * 1024) {
      // Proceed with image processing
      var reader = new FileReader();
      
      reader.onload = function(e) {
        var imageUrl = e.target.result;
        
        // Set the background image of the card
        $('.card-custombg').css('background-image', 'url(' + imageUrl + ')');
        
        // Continue with further processing or upload
        // ...
      };
      
      reader.readAsDataURL(file);
    } else {
      // Display an error message for incorrect file size
      app.dialog.alert('Please upload an image with a file size between 500KB and 5MB.');
    }
  } else {
    // Display an error message for invalid file type
    app.dialog.alert('Please upload a valid image file (JPEG, PNG, etc.).');
  }
});

   $('.f7-card').on('click', function (e) {
    $(this).toggleClass('f7-flipped');
    $(this).next('.f7-card').toggleClass('f7-flipped');
    $(this).prev('.f7-card').toggleClass('f7-flipped');
  });  
   
   //
  
   $('.swiper-slide').on('click', '.rotate', function() {
            var card = $(this).closest('.swiper-slide').find('.card');
            card.toggleClass('flipped');
        });
});
$(document).on('page:init', '.page[data-name="cardorder"]', function (e) {
 var token = localStorage.getItem("WaoCardUserToken");
      var getdata = localStorage.getItem("WaoCardUserData");
        const user = JSON.parse(getdata);
        console.log(user);   
 const userid =  user.user_id;
 const email = user.email;
 var cardtype = localStorage.getItem('cardType');
 var price = localStorage.getItem('price');
 var price = parseFloat(price);
 var pro_type = localStorage.getItem('pro_type');  
 var  shipment = 0;
 var total  = shipment + price;
    if (pro_type == "1") {
        $(".order").css("background-image", "url('img/black.png')");
    } else if (pro_type == "2") {
        $(".order").css("background-image", "url('img/white.png')");
    } else if (pro_type == "3") {
        $(".order").css("background-image", "url('img/custom.png')");
    }
    
    $(".cardtype").text(cardtype);
    $(".shipment").text(shipment);
     $(".price").text(price);
     $(".total").text(total);
     
  $('.payment').on('click', function () {
        app.dialog.create({
          title: '',
          text: 'You’re about to pay ₦ '+total +' 💳 for WaoCard ' + cardtype,
          buttons: [
            {
              text: 'Cancel',
            },
            {
              text: '<div  class="confirm elevation-3 color-theme" >Confirm</div>',
          
            },
            
          ],
            backdrop: true,
            closeByBackdropClick: false,
              onClick: function (dialog, index) {
            if(index === 0){
                //Button 1 clicked
                console.log('1');
            }
            else if(index === 1){
                //Button 2 clicked
                console.log('2');
                
                const paystack = new PaystackPop();

paystack.newTransaction({

	key:  window.config.app.paystack_pk_live,

	email: email,

	amount: total * 100,
    
  callback: function(response){
    // handle successful payment here
    console.log(response);
    localStorage.setItem("WaoCardPayData",JSON.stringify(response));
    localStorage.setItem("WaoCardPayTitle",cardtype);
    // WARNING: For POST requests, body is set to null by browsers.
  var token = localStorage.getItem('WaoCardUserToken');  
      if (response.status === "success"){
    
     var data = new FormData();
data.append("server_key", window.config.app.server_key);
data.append("type", pro_type);

var xhr = new XMLHttpRequest();
xhr.withCredentials = true;

xhr.addEventListener("readystatechange", function() {
  if(this.readyState === 4) {
    console.log(this.responseText);
       const upgrade_res = JSON.parse(this.responseText);
      if(upgrade_res.api_status === 200){ 
         
          localStorage.setItem('WaoCardUserSetup',"2");
          app.views.current.router.navigate('/thankyou3/');             
                               
      }
      else
					{
                      			     
        app.dialog.alert(' ' + upgrade_res.errors.error_text, function () {
       

      })  
                        
					} 
        		
        
      
    
  }
});

xhr.open("POST", "https://app.waocard.co/api/upgrade?access_token="+token);

xhr.send(data);     
         
          
      }
   
  },
  onClose: function(){
    app.dialog.alert('Payment Canceled', function () {

  })  
  }
});
                
              //  app.views.current.router.navigate('/thankyou3/');
            }
            else if(index === 2){
                //Button 3 clicked
                console.log('3');
            }
        },
        }).open();
      });
   
    
    
    
    
});
$(document).on('page:init', '.page[data-name="addmoney"]', function (e) {
  /* swiper carousel cardwiper */
  var swiper1 = new Swiper(".cardswiper", {
    slidesPerView: "auto",
    spaceBetween: 0,
    pagination: false
  });
  $('.cardswiper .swiper-slide .card').on('click', function () {
    $('.cardswiper .swiper-slide .card').removeClass('selected');
    $(this).addClass('selected').find('.form-check-input').prop('checked', true);
  });
});

$(document).on('page:init', '.page[data-name="airtime"]', function (e) {
   
    
   $('.rechargeb').on('click', function () {
  
  
  // get the phonenumber and network provider type
 // var network = $(this).data('network');
  //var logo = $(this).data('logo');
  var rechargenumber  = $(this).data('rechargenumber');
  var rechargename = $(this).data('username');
 //localStorage.setItem('network', network);
  //  localStorage.setItem('networklogo', logo);
     localStorage.setItem('rechargenumber', rechargenumber);
     localStorage.setItem('rechargename', rechargename);

    // Navigate to the next page
        app.views.current.router.navigate('/sendmoney2/'); 
  
  
});
    
    
});

$(document).on('page:init', '.page[data-name="new-card"]', function (e) {
  /* swiper carousel cardwiper */
  var swiper1 = new Swiper(".cardswiper", {
    slidesPerView: "4",
    spaceBetween: 0,
    pagination: false
  });
  $('.cardswiper .swiper-slide .card').on('click', function () {
    $('.cardswiper .swiper-slide .card').removeClass('selected');
    $(this).addClass('selected').find('.form-check-input').prop('checked', true);
  });
});


$(document).on('page:init', '.page[data-name="sendmoney1"]', function (e) {
  /* swiper carousel cardwiper */
  var swiper1 = new Swiper(".cardswiper", {
    slidesPerView: "auto",
    spaceBetween: 0,
    pagination: false
  });
  $('.cardswiper .swiper-slide .card').on('click', function () {
    $('.cardswiper .swiper-slide .card').removeClass('selected');
    $(this).addClass('selected').find('.form-check-input').prop('checked', true);
  });
});
$(document).on('page:init', '.page[data-name="buy-electricity"]', function (e) {
    // const balance = user.balance;
  //  $('.balance').text('₦' + Number(balance).toFixed(2));
   $('#recharge-value').on('change', function() {
    var discount =  $('#discount').text();
    let rechargevalue = $(this).val();
    rechargevalue = rechargevalue.replace(/₦/g, ''); // Removes all occurrences of the "₦" symbol
   let cashback = rechargevalue / 100 * discount;
      $('#cashback').text("₦" + cashback.toFixed(2));
  });  
    
   var inputvalue =  $('#input-value').val();
        $('#input-value').val("₦"+inputvalue);
   
     $('#save-total').on('click', function() {
         
       var inputvalue =  $('#input-value').val();
               inputvalue = inputvalue.replace(/₦/g, ''); // Removes all occurrences of the "₦" symbol

       let charge = $('#result').text();
        charge = charge.replace(/₦/g, ''); // Removes all occurrences of the "₦" symbol
     let total = parseFloat(inputvalue) + parseFloat(charge);    
    localStorage.setItem('totalAmount', total);  
    localStorage.setItem('paytype', "Wallet Funding");  

     });
    
  /* swiper carousel cardwiper */
  var swiper1 = new Swiper(".cardswiper", {
    slidesPerView: "auto",
    spaceBetween: 0,
    pagination: false
  });
  $('.cardswiper .swiper-slide .card').on('click', function () {
    $('.cardswiper .swiper-slide .card').removeClass('selected');
    $(this).addClass('selected').find('.form-check-input').prop('checked', true);
  });
});
$(document).on('page:init', '.page[data-name="sendmoney2"]', function (e) {
    
    // const balance = user.balance;
  //  $('.balance').text('₦' + Number(balance).toFixed(2));
   $('#recharge-value').on('change', function() {
    var discount =  $('#discount').text();
          console.log(discount);
   let  rechargevalue = $('#recharge-value').val();
        console.log(rechargevalue);
        rechargevalue = parseInt(rechargevalue);
       console.log(rechargevalue);
   // var rechargevalue = rechargevalue.replace(/₦/g, ''); // Removes all occurrences of the "₦" symbol
   let cashback = rechargevalue / 100 * discount;
      $('#cashback').text("₦" + cashback.toFixed(2));
  });  
    
   var inputvalue =  $('#input-value').val();
        $('#input-value').val("₦"+inputvalue);
   
     $('#save-total').on('click', function() {
         
       var inputvalue =  $('#input-value').val();
               inputvalue = inputvalue.replace(/₦/g, ''); // Removes all occurrences of the "₦" symbol

       let charge = $('#result').text();
        charge = charge.replace(/₦/g, ''); // Removes all occurrences of the "₦" symbol
     let total = parseFloat(inputvalue) + parseFloat(charge);    
    localStorage.setItem('totalAmount', total);  
    localStorage.setItem('paytype', "Wallet Funding");  

     });
    
  /* swiper carousel cardwiper */
  var swiper1 = new Swiper(".cardswiper", {
    slidesPerView: "auto",
    spaceBetween: 0,
    pagination: false
  });
  $('.cardswiper .swiper-slide .card').on('click', function () {
    $('.cardswiper .swiper-slide .card').removeClass('selected');
    $(this).addClass('selected').find('.form-check-input').prop('checked', true);
  });
});

$(document).on('page:init', '.page[data-name="addcard"]', function (e) {
    
    // const balance = user.balance;
  //  $('.balance').text('₦' + Number(balance).toFixed(2));
   $('#recharge-value').on('change', function() {
    var discount =  $('#discount').text();
          console.log(discount);
   let  rechargevalue = $('#recharge-value').val();
        console.log(rechargevalue);
        rechargevalue = parseInt(rechargevalue);
       console.log(rechargevalue);
   // var rechargevalue = rechargevalue.replace(/₦/g, ''); // Removes all occurrences of the "₦" symbol
   let cashback = rechargevalue / 100 * discount;
      $('#cashback').text("₦" + cashback.toFixed(2));
  });  
    
   var inputvalue =  $('#input-value').val();
        $('#input-value').val("₦"+inputvalue);
   
     $('#save-total').on('click', function() {
         
       var inputvalue =  $('#input-value').val();
               inputvalue = inputvalue.replace(/₦/g, ''); // Removes all occurrences of the "₦" symbol

       let charge = $('#result').text();
        charge = charge.replace(/₦/g, ''); // Removes all occurrences of the "₦" symbol
     let total = parseFloat(inputvalue) + parseFloat(charge);    
    localStorage.setItem('totalAmount', total);  
    localStorage.setItem('paytype', "Wallet Funding");  

     });
    
  /* swiper carousel cardwiper */
  var swiper1 = new Swiper(".cardswiper", {
    slidesPerView: "auto",
    spaceBetween: 0,
    pagination: false
  });
  $('.cardswiper .swiper-slide .card').on('click', function () {
    $('.cardswiper .swiper-slide .card').removeClass('selected');
    $(this).addClass('selected').find('.form-check-input').prop('checked', true);
  });
});

$(document).on('page:init', '.page[data-name="sendmoney3"]', function (e) {
    
     $('#addcard').on('click', function () {
        
           app.sheet.open('.addcard');
			});
  /* swiper carousel cardwiper */
  var swiper1 = new Swiper(".cardswiper", {
    slidesPerView: "auto",
    spaceBetween: 0,
    pagination: false
  });
  $('.cardswiper .swiper-slide .card').on('click', function () {
    $('.cardswiper .swiper-slide .card').removeClass('selected');
    $(this).addClass('selected').find('.form-check-input').prop('checked', true);
      
      
  });
});

$(document).on('page:init', '.page[data-name="login1"]', function (e) {
    
    $('.submitForm').on('click', function () {
    	
        	//app.views.current.router.navigate('/home/');	
				// Create variables from the form
				var number = $('input#number').val();
				var password = $('input#password').val(); 
        
       // var xhr = app.request.post('http://localhost/waopayadmin/api/login.php', { number: number, password: password }).then(function (res) {
    //$('.login').html(res.data);
   // console.log(res.data);
  //});
        
       			// Create variables that will be sent in a URL string to mail.php
				var dataString = 'number=' + number + '&password='+ password;
        
                 app.toast.show({
					text: dataString,
					position: 'bottom',
					cssClass: 'toast-round bg-color-green'
				});

				// The AJAX
        $.ajax({  
				  type: 'POST',
				  url: 'http://localhost/waopayadmin/api/login.php',
				  data: dataString,
				  success:(function(data) {
					// This is a callback that runs if the submission was a success.
					console.warn(data)
					var response = JSON.parse(data);
					// Clear the form
					$(':input','#login')
					 .not(':button, :submit, :reset, :hidden')
					 .val('')
					 .removeAttr('checked')
					 .removeAttr('selected');
					 
					 	if (response.error === false)
				{
					
					localStorage.setItem("WaopayUserPhone", response.userphone);
					localStorage.setItem("WaopayUserId", response.uid);
					localStorage.setItem("WaopayUserMail", response.usermail);
					localStorage.setItem("WaopayUserSetup",  "2");

					app.toast.show({
					text: 'Welcome',
					position: 'bottom',
					cssClass: 'toast-round bg-color-green'
				});
				app.views.current.router.navigate('/user-profile');					
					
					}
					else
					{
					var notification = app.notification.create({
					titleRightText: 'Now',
					subtitle: 'WaoPay',
					text: response.msg,
				});
				notification.open();
					}
					return false;
				  }),
					error:(function(){
						var self = this;
				var dialog = app.dialog.create({
					content: '<div class="block no-margin margin-top text-align-center"><i class="fa-stack fa-3x"><span class="fas fa-stack-2x fa-circle text-color-red"></span><span class="fas fa-stack-1x fa-inverse fa-times"></span></i><p>Connection Failure</p></div>',
					buttons: [
						{
							text: 'Retry',
							bold: true,
							color: 'red',
							
						}
					]
				});
				dialog.open();
	
					
					}),
				});
				
			
				
			
  });

});

$(document).on('page:init', '.page[data-name="profile"]', function (e) {
  /* swiper carousel connectionwiper */
  var swiper2 = new Swiper(".connectionwiper", {
    slidesPerView: "auto",
    spaceBetween: 0,
    pagination: false
  });
})
$(document).on('page:init', '.page[data-name="settings"]', function (e) {
    

  

})
$(document).on('page:afterin', '.page[data-name="blogs"]', function (e) {
  /* swiper carousel projects */
  var swiper12 = new Swiper(".connectionwiper", {
    slidesPerView: "auto",
    spaceBetween: 0,
    pagination: false
  });

})

$(document).on('page:init', '.page[data-name="pay"]', function (e) {
    
  //  import Html5QrcodeScanner from './vendor/node_modules/html5-qrcode/html5-qrcode.min.js';
    
  function onScanSuccess(decodedText, decodedResult) {
    // Handle on success condition with the decoded text or result.
    console.log(`Scan result: ${decodedText}`, decodedResult);
}

var html5QrcodeScanner = new Html5QrcodeScanner(
	"reader", { fps: 10, qrbox: 250 });
    
html5QrcodeScanner.render(onScanSuccess);

})