<?php

use CodeIgniter\Router\RouteCollection;

/**
 * @var RouteCollection $routes
 */

// API: Coasters
$routes->get('/api/coasters', 'API\Coaster::index');
$routes->post('/api/coasters', 'API\Coaster::create');
$routes->get('/api/coasters/(:segment)', 'API\Coaster::show/$1');
$routes->put('/api/coasters/(:segment)', 'API\Coaster::update/$1');
$routes->delete('/api/coasters/(:segment)', 'API\Coaster::delete/$1');

// API: Wagons
$routes->post('/api/coasters/(:segment)/wagons', 'API\Wagon::create/$1');
$routes->get('/api/coasters/(:segment)/wagons/(:segment)', 'API\Wagon::show/$1/$2');
$routes->put('/api/coasters/(:segment)/wagons/(:segment)', 'API\Wagon::update/$1/$2');
$routes->delete('/api/coasters/(:segment)/wagons/(:segment)', 'API\Wagon::delete/$1/$2');


// APP: Home
$routes->get('/', 'Home::index');

// APP: Coasters
$routes->get('/coasters', 'Home::index');                                       // list coasters
$routes->get('/coasters/form', 'Home::index');                                  // create new coaster
$routes->get('/coasters/(:segment)', 'Home::index');                            // show coaster
$routes->get('/coasters/(:segment)/edit', 'Home::index');                       // edit coaster
$routes->get('/coasters/(:segment)/create-wagon', 'Home::index');               // add new wagon for coaster
$routes->get('/coasters/(:segment)/edit-wagon/(:segment)', 'Home::index');      // edit wagon for coaster

// APP: SECURE
$routes->get('login', 'Secure::login');
$routes->post('login_submit', 'Secure::login_submit');
$routes->get('logout', 'Secure::logout');