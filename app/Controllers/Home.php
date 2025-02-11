<?php

namespace App\Controllers;

class Home extends BaseController
{
    public function index()
    {
        if (ENVIRONMENT === 'production') {
            if (!session()->has('isLoggedIn')) {
                return redirect()->to('login');
            }
        }

        return view('index');
    }
}
